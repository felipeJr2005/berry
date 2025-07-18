/**
 * Berry PDF Facil - Login Page Script
 * Script específico para pages/login-v3.html
 * Integra com auth-system.js e berry-ajax-navigation.js
 */

class LoginPage {
  constructor() {
    this.form = null;
    this.submitButton = null;
    this.usernameInput = null;
    this.passwordInput = null;
    this.rememberCheckbox = null;
    
    this.init();
  }

  init() {
    // Aguardar DOM e Berry carregarem
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Verificar se já está autenticado
    if (typeof AuthSystem !== 'undefined' && AuthSystem.isAuthenticated()) {
      this.redirectToDashboard();
      return;
    }

    // Aguardar auth-system.js carregar
    if (typeof AuthSystem === 'undefined') {
      setTimeout(() => this.setup(), 100);
      return;
    }

    this.bindElements();
    this.bindEvents();
    this.setupFormValidation();
    this.loadRememberedCredentials();
    
    console.log('✅ Login Page - Inicializado');
  }

  bindElements() {
    // Elementos do formulário
    this.usernameInput = document.querySelector('#floatingInput');
    this.passwordInput = document.querySelector('#floatingInput1');
    this.rememberCheckbox = document.querySelector('#customCheckc1');
    this.submitButton = document.querySelector('.btn-secondary');
    
    // Botões OAuth
    this.googleButton = document.querySelector('.btn.bg-light-primary');
    
    if (!this.usernameInput || !this.passwordInput || !this.submitButton) {
      console.error('❌ Elementos do formulário não encontrados');
      return;
    }
  }

  bindEvents() {
    // Submit do formulário
    if (this.submitButton) {
      this.submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Enter nos campos
    [this.usernameInput, this.passwordInput].forEach(input => {
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.handleLogin();
          }
        });
      }
    });

    // OAuth Google (simulado)
    if (this.googleButton) {
      this.googleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleGoogleLogin();
      });
    }

    // Link para registro
    const registerLink = document.querySelector('a[href*="register"]');
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToRegister();
      });
    }

    // Link "Esqueceu a senha?"
    const forgotLink = document.querySelector('.text-secondary');
    if (forgotLink && forgotLink.textContent.includes('Esqueceu')) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleForgotPassword();
      });
    }
  }

  setupFormValidation() {
    // Validação em tempo real
    if (this.usernameInput) {
      this.usernameInput.addEventListener('input', () => {
        this.validateUsername();
      });
    }

    if (this.passwordInput) {
      this.passwordInput.addEventListener('input', () => {
        this.validatePassword();
      });
    }
  }

  validateUsername() {
    const username = this.usernameInput.value.trim();
    const isValid = username.length >= 3;
    
    this.toggleInputValidation(this.usernameInput, isValid);
    return isValid;
  }

  validatePassword() {
    const password = this.passwordInput.value;
    const isValid = password.length >= 6;
    
    this.toggleInputValidation(this.passwordInput, isValid);
    return isValid;
  }

  toggleInputValidation(input, isValid) {
    input.classList.remove('is-valid', 'is-invalid');
    
    if (input.value.trim() !== '') {
      input.classList.add(isValid ? 'is-valid' : 'is-invalid');
    }
  }

  async handleLogin() {
    try {
      // Validações básicas
      if (!this.validateForm()) {
        return;
      }

      // Obter dados do formulário
      const username = this.usernameInput.value.trim();
      const password = this.passwordInput.value;
      const remember = this.rememberCheckbox ? this.rememberCheckbox.checked : false;

      // Mostrar loading
      AuthUI.toggleButtonLoading(this.submitButton, true);

      // Simular delay de requisição (mais realista)
      await this.delay(800);

      // Tentar login
      const result = AuthSystem.login(username, password);

      // Esconder loading
      AuthUI.toggleButtonLoading(this.submitButton, false);

      if (result.success) {
        // Salvar credenciais se solicitado
        if (remember) {
          this.saveCredentials(username);
        } else {
          this.clearSavedCredentials();
        }

        // Mostrar sucesso
        AuthUI.showToast(result.message, 'success');

        // Aguardar um pouco para o usuário ver o toast
        await this.delay(1000);

        // Redirecionar para dashboard
        this.redirectToDashboard();

      } else {
        // Mostrar erro
        AuthUI.showToast(result.message, 'danger');
        
        // Focar no campo senha
        if (this.passwordInput) {
          this.passwordInput.select();
          this.passwordInput.focus();
        }
      }

    } catch (error) {
      console.error('Erro no login:', error);
      AuthUI.toggleButtonLoading(this.submitButton, false);
      AuthUI.showToast('Erro interno. Tente novamente.', 'danger');
    }
  }

  validateForm() {
    let isValid = true;

    // Validar username
    if (!this.validateUsername()) {
      AuthUI.showToast('Username deve ter pelo menos 3 caracteres', 'warning');
      this.usernameInput.focus();
      isValid = false;
    }

    // Validar senha
    if (isValid && !this.validatePassword()) {
      AuthUI.showToast('Senha deve ter pelo menos 6 caracteres', 'warning');
      this.passwordInput.focus();
      isValid = false;
    }

    return isValid;
  }

  handleGoogleLogin() {
    // Simular login OAuth Google
    AuthUI.showToast('Login com Google em desenvolvimento...', 'info');
    
    // Para demonstração, vamos simular um login automático
    setTimeout(() => {
      // Criar usuário demo Google se não existir
      const googleUser = AuthUsers.findByEmail('demo@gmail.com');
      if (!googleUser) {
        AuthUsers.create({
          username: 'demo_google',
          email: 'demo@gmail.com',
          password: 'google_oauth_password',
          oauth_google: 'demo_google_id'
        });
      }

      // Fazer login automático
      const result = AuthSystem.login('demo@gmail.com', 'google_oauth_password');
      if (result.success) {
        AuthUI.showToast('Login com Google realizado!', 'success');
        setTimeout(() => this.redirectToDashboard(), 1000);
      }
    }, 1500);
  }

  handleForgotPassword() {
    // Implementar reset de senha
    AuthUI.showToast('Funcionalidade de recuperação em desenvolvimento...', 'info');
  }

  navigateToRegister() {
    // Usar navegação AJAX se disponível
    if (typeof BerryAjaxNavigation !== 'undefined') {
      const navigation = new BerryAjaxNavigation();
      navigation.navigateTo('pages/register-v3.html');
    } else {
      // Fallback para navegação normal
      window.location.href = 'register-v3.html';
    }
  }

  redirectToDashboard() {
    // Usar navegação AJAX se disponível
    if (typeof BerryAjaxNavigation !== 'undefined') {
      const navigation = new BerryAjaxNavigation();
      navigation.navigateTo('../dashboard/index.html');
    } else {
      // Fallback para navegação normal
      window.location.href = '../dashboard/index.html';
    }
  }

  saveCredentials(username) {
    try {
      localStorage.setItem('berry_remember_username', username);
    } catch (error) {
      console.warn('Não foi possível salvar credenciais:', error);
    }
  }

  loadRememberedCredentials() {
    try {
      const savedUsername = localStorage.getItem('berry_remember_username');
      if (savedUsername && this.usernameInput) {
        this.usernameInput.value = savedUsername;
        if (this.rememberCheckbox) {
          this.rememberCheckbox.checked = true;
        }
        // Focar na senha se username foi preenchido
        if (this.passwordInput) {
          this.passwordInput.focus();
        }
      }
    } catch (error) {
      console.warn('Não foi possível carregar credenciais salvas:', error);
    }
  }

  clearSavedCredentials() {
    try {
      localStorage.removeItem('berry_remember_username');
    } catch (error) {
      console.warn('Não foi possível limpar credenciais:', error);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES PARA DEMO
// ============================================================================

/**
 * Criar usuários demo para teste
 */
function createDemoUsers() {
  // Verificar se já existem usuários demo
  if (AuthUsers.findByUsername('admin')) {
    return; // Já existem
  }

  // Criar usuário admin demo
  AuthUsers.create({
    username: 'admin',
    email: 'admin@pdffacil.com',
    password: 'admin123',
    bio: 'Administrador do sistema'
  });

  // Criar usuário demo
  AuthUsers.create({
    username: 'demo',
    email: 'demo@pdffacil.com', 
    password: 'demo123',
    bio: 'Usuário de demonstração'
  });

  console.log('🎭 Usuários demo criados:');
  console.log('👤 admin / admin123');
  console.log('👤 demo / demo123');
}

/**
 * Mostrar dicas de login na página
 */
function showLoginHints() {
  // Adicionar dicas visuais discretas
  const cardBody = document.querySelector('.card-body');
  if (cardBody && AuthUsers.getAllUsers().length > 0) {
    const hintsHtml = `
      <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
        <small>
          <strong>💡 Dicas para teste:</strong><br>
          • Usuário: <code>admin</code> / Senha: <code>admin123</code><br>
          • Usuário: <code>demo</code> / Senha: <code>demo123</code>
        </small>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    // Adicionar antes do primeiro botão
    const firstButton = cardBody.querySelector('.btn');
    if (firstButton) {
      firstButton.insertAdjacentHTML('beforebegin', hintsHtml);
    }
  }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

// Aguardar carregamento completo
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar auth-system.js carregar
  const checkAuthSystem = () => {
    if (typeof AuthSystem !== 'undefined') {
      // Criar usuários demo
      createDemoUsers();
      
      // Inicializar página de login
      new LoginPage();
      
      // Mostrar dicas (apenas em desenvolvimento)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(showLoginHints, 500);
      }
      
    } else {
      // Tentar novamente em 100ms
      setTimeout(checkAuthSystem, 100);
    }
  };
  
  checkAuthSystem();
});

// Expor para debug
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.LoginPage = LoginPage;
}