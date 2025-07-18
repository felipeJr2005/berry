/**
 * Berry PDF Facil - Authentication System
 * Replica completa do sistema Flask em JavaScript puro
 * Baseado em: apps/authentication/util.py + models.py + routes.py + config.py
 */

// ============================================================================
// CONFIGURAÇÕES (config.py)
// ============================================================================
const AuthConfig = {
  SECRET_KEY: 'Berry_PDF_Facil_S3cret_999',
  SESSION_DURATION: 3600000, // 1 hora em milliseconds
  HASH_ITERATIONS: 100000,   // Igual ao Flask PBKDF2
  SALT_LENGTH: 64,          // Igual ao Flask
  
  // OAuth Configs (visual por enquanto)
  OAUTH: {
    GOOGLE_ENABLED: true,
    GITHUB_ENABLED: false
  },
  
  // Mensagens de erro
  MESSAGES: {
    LOGIN_SUCCESS: 'Login realizado com sucesso!',
    LOGIN_ERROR: 'Usuário ou senha incorretos',
    REGISTER_SUCCESS: 'Cadastro realizado com sucesso!',
    USERNAME_EXISTS: 'Nome de usuário já está em uso',
    EMAIL_EXISTS: 'E-mail já está cadastrado',
    WEAK_PASSWORD: 'Senha deve ter pelo menos 6 caracteres',
    INVALID_EMAIL: 'E-mail inválido',
    LOGOUT_SUCCESS: 'Logout realizado com sucesso'
  }
};

// ============================================================================
// UTILITÁRIOS DE HASH (util.py)
// ============================================================================
const AuthUtils = {
  
  /**
   * Hash password usando PBKDF2 + SHA512 (igual ao Flask)
   * Replica: apps/authentication/util.py -> hash_pass()
   */
  hashPassword(password) {
    // Gerar salt aleatório (64 chars hex = 32 bytes)
    const salt = CryptoJS.lib.WordArray.random(32).toString();
    
    // PBKDF2 com SHA512, 100k iterações (igual ao Flask)
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 512/32,           // 512 bits = 64 bytes
      iterations: AuthConfig.HASH_ITERATIONS,
      hasher: CryptoJS.algo.SHA512
    }).toString();
    
    // Retornar salt + hash concatenados (igual ao Flask)
    return salt + hash;
  },

  /**
   * Verificar password contra hash armazenado
   * Replica: apps/authentication/util.py -> verify_pass()
   */
  verifyPassword(providedPassword, storedPassword) {
    try {
      // Extrair salt (primeiros 64 chars) e hash (resto)
      const salt = storedPassword.substring(0, 64);
      const storedHash = storedPassword.substring(64);
      
      // Calcular hash da senha fornecida com o salt armazenado
      const providedHash = CryptoJS.PBKDF2(providedPassword, salt, {
        keySize: 512/32,
        iterations: AuthConfig.HASH_ITERATIONS,
        hasher: CryptoJS.algo.SHA512
      }).toString();
      
      // Comparar hashes
      return providedHash === storedHash;
      
    } catch (error) {
      console.error('Erro na verificação de senha:', error);
      return false;
    }
  },

  /**
   * Gerar token de sessão seguro
   */
  generateSessionToken() {
    const timestamp = Date.now();
    const random = CryptoJS.lib.WordArray.random(16).toString();
    return CryptoJS.SHA256(AuthConfig.SECRET_KEY + timestamp + random).toString();
  },

  /**
   * Validar formato de email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validar força da senha
   */
  isValidPassword(password) {
    return password && password.length >= 6;
  }
};

// ============================================================================
// MODELO DE USUÁRIOS (models.py)
// ============================================================================
const AuthUsers = {
  
  /**
   * Buscar usuário por username
   * Replica: apps/authentication/models.py -> find_by_username()
   */
  findByUsername(username) {
    const users = this.getAllUsers();
    return users.find(user => user.username === username) || null;
  },

  /**
   * Buscar usuário por email
   * Replica: apps/authentication/models.py -> find_by_email()
   */
  findByEmail(email) {
    const users = this.getAllUsers();
    return users.find(user => user.email === email) || null;
  },

  /**
   * Buscar usuário por ID
   * Replica: apps/authentication/models.py -> find_by_id()
   */
  findById(id) {
    const users = this.getAllUsers();
    return users.find(user => user.id === id) || null;
  },

  /**
   * Criar novo usuário
   * Replica: apps/authentication/models.py -> save()
   */
  create(userData) {
    try {
      const users = this.getAllUsers();
      
      // Gerar ID único
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      
      // Criar objeto usuário (estrutura igual ao Flask)
      const newUser = {
        id: newId,
        username: userData.username,
        email: userData.email,
        password: AuthUtils.hashPassword(userData.password), // Hash automático
        bio: userData.bio || null,
        oauth_github: userData.oauth_github || null,
        oauth_google: userData.oauth_google || null,
        created_at: new Date().toISOString()
      };
      
      // Adicionar à lista
      users.push(newUser);
      
      // Salvar no localStorage
      localStorage.setItem('berry_pdf_users', JSON.stringify(users));
      
      return newUser;
      
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro interno ao criar usuário');
    }
  },

  /**
   * Obter todos os usuários do localStorage
   */
  getAllUsers() {
    try {
      const usersJson = localStorage.getItem('berry_pdf_users');
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      return [];
    }
  },

  /**
   * Atualizar dados de usuário
   */
  update(userId, updateData) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        throw new Error('Usuário não encontrado');
      }
      
      // Atualizar dados (exceto campos readonly)
      const readonlyFields = ['id', 'username', 'email', 'oauth_github', 'oauth_google'];
      Object.keys(updateData).forEach(key => {
        if (!readonlyFields.includes(key)) {
          users[userIndex][key] = updateData[key];
        }
      });
      
      users[userIndex].updated_at = new Date().toISOString();
      
      // Salvar
      localStorage.setItem('berry_pdf_users', JSON.stringify(users));
      
      return users[userIndex];
      
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }
};

// ============================================================================
// SISTEMA DE SESSÕES
// ============================================================================
const AuthSession = {
  
  /**
   * Criar sessão de usuário
   * Replica: Flask-Login -> login_user()
   */
  create(user) {
    const sessionData = {
      user_id: user.id,
      username: user.username,
      email: user.email,
      token: AuthUtils.generateSessionToken(),
      created_at: Date.now(),
      expires_at: Date.now() + AuthConfig.SESSION_DURATION
    };
    
    sessionStorage.setItem('berry_pdf_session', JSON.stringify(sessionData));
    return sessionData;
  },

  /**
   * Obter sessão atual
   */
  get() {
    try {
      const sessionJson = sessionStorage.getItem('berry_pdf_session');
      if (!sessionJson) return null;
      
      const session = JSON.parse(sessionJson);
      
      // Verificar se não expirou
      if (Date.now() > session.expires_at) {
        this.destroy();
        return null;
      }
      
      return session;
      
    } catch (error) {
      console.error('Erro ao obter sessão:', error);
      return null;
    }
  },

  /**
   * Destruir sessão
   * Replica: Flask-Login -> logout_user()
   */
  destroy() {
    sessionStorage.removeItem('berry_pdf_session');
  },

  /**
   * Verificar se usuário está autenticado
   * Replica: Flask-Login -> current_user.is_authenticated
   */
  isAuthenticated() {
    return this.get() !== null;
  },

  /**
   * Obter usuário atual da sessão
   * Replica: Flask-Login -> current_user
   */
  getCurrentUser() {
    const session = this.get();
    if (!session) return null;
    
    return AuthUsers.findById(session.user_id);
  }
};

// ============================================================================
// SISTEMA PRINCIPAL DE AUTENTICAÇÃO (routes.py)
// ============================================================================
const AuthSystem = {
  
  /**
   * Realizar login
   * Replica: apps/authentication/routes.py -> login()
   */
  login(username, password) {
    try {
      // Validações básicas
      if (!username || !password) {
        return {
          success: false,
          message: 'Username e senha são obrigatórios'
        };
      }
      
      // Buscar usuário (aceita username ou email)
      let user = AuthUsers.findByUsername(username);
      if (!user) {
        user = AuthUsers.findByEmail(username);
      }
      
      // Verificar se usuário existe
      if (!user) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.LOGIN_ERROR
        };
      }
      
      // Verificar senha
      if (!AuthUtils.verifyPassword(password, user.password)) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.LOGIN_ERROR
        };
      }
      
      // Criar sessão
      const session = AuthSession.create(user);
      
      return {
        success: true,
        message: AuthConfig.MESSAGES.LOGIN_SUCCESS,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        },
        session: session
      };
      
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: 'Erro interno no servidor'
      };
    }
  },

  /**
   * Realizar registro
   * Replica: apps/authentication/routes.py -> register()
   */
  register(userData) {
    try {
      const { username, email, password, firstName, lastName } = userData;
      
      // Validações básicas
      if (!username || !email || !password) {
        return {
          success: false,
          message: 'Todos os campos são obrigatórios'
        };
      }
      
      // Validar formato do email
      if (!AuthUtils.isValidEmail(email)) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.INVALID_EMAIL
        };
      }
      
      // Validar força da senha
      if (!AuthUtils.isValidPassword(password)) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.WEAK_PASSWORD
        };
      }
      
      // Verificar se username já existe
      if (AuthUsers.findByUsername(username)) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.USERNAME_EXISTS
        };
      }
      
      // Verificar se email já existe
      if (AuthUsers.findByEmail(email)) {
        return {
          success: false,
          message: AuthConfig.MESSAGES.EMAIL_EXISTS
        };
      }
      
      // Criar usuário
      const newUser = AuthUsers.create({
        username: username,
        email: email,
        password: password, // Será hashada automaticamente
        bio: firstName && lastName ? `${firstName} ${lastName}` : null
      });
      
      return {
        success: true,
        message: AuthConfig.MESSAGES.REGISTER_SUCCESS,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      };
      
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        message: 'Erro interno no servidor'
      };
    }
  },

  /**
   * Realizar logout
   * Replica: apps/authentication/routes.py -> logout()
   */
  logout() {
    try {
      AuthSession.destroy();
      return {
        success: true,
        message: AuthConfig.MESSAGES.LOGOUT_SUCCESS
      };
    } catch (error) {
      console.error('Erro no logout:', error);
      return {
        success: false,
        message: 'Erro ao fazer logout'
      };
    }
  },

  /**
   * Verificar se está autenticado
   */
  isAuthenticated() {
    return AuthSession.isAuthenticated();
  },

  /**
   * Obter usuário atual
   */
  getCurrentUser() {
    return AuthSession.getCurrentUser();
  },

  /**
   * Middleware de proteção de páginas
   * Replica: @login_required decorator
   */
  requireAuth(redirectUrl = 'pages/login-v3.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }
};

// ============================================================================
// UTILITÁRIOS PARA INTERFACE
// ============================================================================
const AuthUI = {
  
  /**
   * Mostrar toast notification (usar sistema Berry)
   */
  showToast(message, type = 'success') {
    // Tentar usar sistema de toast Berry se disponível
    if (typeof bootstrap !== 'undefined') {
      const toast = document.createElement('div');
      toast.className = `toast align-items-center text-white bg-${type} border-0`;
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `;
      
      // Container de toasts
      let toastContainer = document.querySelector('.toast-container');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
      }
      
      toastContainer.appendChild(toast);
      const bsToast = new bootstrap.Toast(toast);
      bsToast.show();
      
      // Remover após 5s
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 5000);
      
    } else {
      // Fallback para alert
      alert(message);
    }
  },

  /**
   * Mostrar/esconder loading no botão
   */
  toggleButtonLoading(button, loading = true) {
    if (loading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Carregando...';
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalText || button.innerHTML;
    }
  },

  /**
   * Atualizar interface com dados do usuário
   */
  updateUserInterface(user) {
    // Atualizar nome de usuário na interface se existir
    const userElements = document.querySelectorAll('[data-user-name]');
    userElements.forEach(el => {
      el.textContent = user.username;
    });
    
    // Atualizar email se existir
    const emailElements = document.querySelectorAll('[data-user-email]');
    emailElements.forEach(el => {
      el.textContent = user.email;
    });
    
    // Mostrar/esconder elementos baseado na autenticação
    const authElements = document.querySelectorAll('[data-auth-required]');
    authElements.forEach(el => {
      el.style.display = AuthSystem.isAuthenticated() ? 'block' : 'none';
    });
    
    const guestElements = document.querySelectorAll('[data-guest-only]');
    guestElements.forEach(el => {
      el.style.display = AuthSystem.isAuthenticated() ? 'none' : 'block';
    });
  }
};

// ============================================================================
// INICIALIZAÇÃO E DEBUG
// ============================================================================

// Verificar se CryptoJS está disponível
if (typeof CryptoJS === 'undefined') {
  console.error('CryptoJS não encontrado! Adicione o script CryptoJS antes deste arquivo.');
}

// Log de inicialização
console.log('🔐 Berry PDF Facil - Sistema de Autenticação carregado');
console.log('📊 Usuários cadastrados:', AuthUsers.getAllUsers().length);
console.log('🔑 Sessão ativa:', AuthSession.isAuthenticated());

// Expor para uso global
window.AuthSystem = AuthSystem;
window.AuthUI = AuthUI;
window.AuthConfig = AuthConfig;

// Debug mode - remover em produção
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.AuthUsers = AuthUsers;
  window.AuthSession = AuthSession;
  window.AuthUtils = AuthUtils;
  
  console.log('🛠️ Modo DEBUG ativo - Objetos auth disponíveis no console');
}