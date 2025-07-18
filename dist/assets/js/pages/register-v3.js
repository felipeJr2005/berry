/**
 * Berry PDF Facil - Register Page Script
 * Script específico para pages/register-v3.html
 * Integra com auth-system.js e berry-ajax-navigation.js
 */

class RegisterPage {
  constructor() {
    this.form = null;
    this.submitButton = null;
    this.firstNameInput = null;
    this.lastNameInput = null;
    this.emailInput = null;
    this.passwordInput = null;
    this.termsCheckbox = null;
    
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
    this.setupPasswordStrengthIndicator();
    
    console.log('✅ Register Page - Inicializado');
  }

  bindElements() {
    // Elementos do formulário (baseado no HTML fornecido)
    this.firstNameInput = document.querySelector('#floatingInput');      // Nome
    this.lastNameInput = document.querySelector('#floatingInput1');      // Sobrenome
    this.emailInput = document.querySelector('#floatingInput2');         // Email
    this.passwordInput = document.querySelector('#floatingInput3');      // Senha
    this.termsCheckbox = document.querySelector('#customCheckc1');       // Termos
    this.submitButton = document.querySelector('.btn-secondary');        // Botão Cadastrar
    
    // Botão OAuth Google
    this.googleButton = document.querySelector('.btn.bg-light-primary');
    
    if (!this.firstNameInput || !this.emailInput || !this.passwordInput || !this.submitButton) {
      console.error('❌ Elementos do formulário não encontrados');
      return;
    }
  }

  bindEvents() {
    // Submit do formulário
    if (this.submitButton) {
      this.submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleRegister();
      });
    }

    // Enter nos campos
    [this.firstNameInput, this.lastNameInput, this.emailInput, this.passwordInput].forEach(input => {
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            this.handleRegister();
          }
        });
      }
    });

    // OAuth Google (simulado)
    if (this.googleButton) {
      this.googleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleGoogleRegister();
      });
    }

    // Link para login
    const loginLink = document.querySelector('a[href*="login"]');
    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToLogin();
      });
    }

    // Link para termos e condições
    const termsLink = document.querySelector('a[href*="privacidade"]');
    if (termsLink) {
      termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.showTermsModal();
      });
    }
  }

  setupFormValidation() {
    // Validação em tempo real para cada campo
    if (this.firstNameInput) {
      this.firstNameInput.addEventListener('input', () => {
        this.validateFirstName();
      });
    }

    if (this.lastNameInput) {
      this.lastNameInput.addEventListener('input', () => {
        this.validateLastName();
      });
    }

    if (this.emailInput) {
      this.emailInput.addEventListener('input', () => {
        this.validateEmail();
      });
      
      // Verificação de disponibilidade com delay
      this.emailInput.addEventListener('input', this.debounce(() => {
        this.checkEmailAvailability();
      }, 800));
    }

    if (this.passwordInput) {
      this.passwordInput.addEventListener('input', () => {
        this.validatePassword();
        this.updatePasswordStrength();
      });
    }

    if (this.termsCheckbox) {
      this.termsCheckbox.addEventListener('change', () => {
        this.validateTerms();
      });
    }
  }

  validateFirstName() {
    const firstName = this.firstNameInput.value.trim();
    const isValid = firstName.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(firstName);
    
    this.toggleInputValidation(this.firstNameInput, isValid, 
      isValid ? 'Nome válido' : 'Nome deve ter pelo menos 2 caracteres e conter apenas letras');
    
    return isValid;
  }

  validateLastName() {
    const lastName = this.lastNameInput.value.trim();
    const isValid = lastName.length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(lastName);
    
    this.toggleInputValidation(this.lastNameInput, isValid,
      isValid ? 'Sobrenome válido' : 'Sobrenome deve ter pelo menos 2 caracteres e conter apenas letras');
    
    return isValid;
  }

  validateEmail() {
    const email = this.emailInput.value.trim();
    const isValid = AuthUtils.isValidEmail(email);
    
    this.toggleInputValidation(this.emailInput, isValid,
      isValid ? 'E-mail válido' : 'Digite um e-mail válido');
    
    return isValid;
  }

  async checkEmailAvailability() {
    const email = this.emailInput.value.trim();
    
    if (!AuthUtils.isValidEmail(email)) {
      return;
    }

    // Verificar se e-mail já está em uso
    const existingUser = AuthUsers.findByEmail(email);
    const isAvailable = !existingUser;
    
    this.toggleInputValidation(this.emailInput, isAvailable,
      isAvailable ? 'E-mail disponível' : 'Este e-mail já está em uso');
  }

  validatePassword() {
    const password = this.passwordInput.value;
    const strength = this.calculatePasswordStrength(password);
    const isValid = strength.score >= 3; // Mínimo "Good"
    
    this.toggleInputValidation(this.passwordInput, isValid, strength.message);
    
    return isValid;
  }

  validateTerms() {
    const accepted = this.termsCheckbox ? this.termsCheckbox.checked : false;
    
    // Adicionar indicação visual no checkbox
    const checkboxContainer = this.termsCheckbox.closest('.form-check');
    if (checkboxContainer) {
      checkboxContainer.classList.toggle('text-danger', !accepted);
      checkboxContainer.classList.toggle('text-success', accepted);
    }
    
    return accepted;
  }

  calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    // Critérios de força da senha
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('pelo menos 8 caracteres');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('letras minúsculas');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('letras maiúsculas');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('números');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('símbolos especiais');
    }

    // Determinar nível e mensagem
    const levels = {
      0: { level: 'Very Weak', color: 'danger', message: 'Senha muito fraca' },
      1: { level: 'Weak', color: 'danger', message: 'Senha fraca' },
      2: { level: 'Fair', color: 'warning', message: 'Senha regular' },
      3: { level: 'Good', color: 'info', message: 'Senha boa' },
      4: { level: 'Strong', color: 'success', message: 'Senha forte' },
      5: { level: 'Very Strong', color: 'success', message: 'Senha muito forte' }
    };

    const result = levels[score] || levels[0];
    
    if (feedback.length > 0) {
      result.message += ` (falta: ${feedback.join(', ')})`;
    }

    return { ...result, score };
  }

  setupPasswordStrengthIndicator() {
    if (!this.passwordInput) return;

    // Criar indicador de força da senha
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength-indicator mt-2';
    strengthIndicator.innerHTML = `
      <div class="progress" style="height: 5px;">
        <div class="progress-bar" role="progressbar" style="width: 0%"></div>
      </div>
      <small class="text-muted strength-text">Digite uma senha</small>
    `;

    // Inserir após o campo de senha
    this.passwordInput.parentNode.insertAdjacentElement('afterend', strengthIndicator);
    
    this.strengthIndicator = strengthIndicator;
  }

  updatePasswordStrength() {
    if (!this.strengthIndicator) return;

    const password = this.passwordInput.value;
    const strength = this.calculatePasswordStrength(password);
    
    const progressBar = this.strengthIndicator.querySelector('.progress-bar');
    const strengthText = this.strengthIndicator.querySelector('.strength-text');
    
    // Atualizar barra de progresso
    const percentage = (strength.score / 5) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.className = `progress-bar bg-${strength.color}`;
    
    // Atualizar texto
    strengthText.textContent = strength.message;
    strengthText.className = `text-${strength.color}`;
  }

  toggleInputValidation(input, isValid, message = '') {
    input.classList.remove('is-valid', 'is-invalid');
    
    // Remover feedback anterior
    const existingFeedback = input.parentNode.querySelector('.valid-feedback, .invalid-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }
    
    if (input.value.trim() !== '') {
      input.classList.add(isValid ? 'is-valid' : 'is-invalid');
      
      // Adicionar feedback
      if (message) {
        const feedback = document.createElement('div');
        feedback.className = isValid ? 'valid-feedback' : 'invalid-feedback';
        feedback.textContent = message;
        input.parentNode.appendChild(feedback);
      }
    }
  }

  async handleRegister() {
    try {
      // Validações básicas
      if (!this.validateForm()) {
        return;
      }

      // Obter dados do formulário
      const formData = {
        firstName: this.firstNameInput.value.trim(),
        lastName: this.lastNameInput.value.trim(),
        email: this.emailInput.value.trim(),
        password: this.passwordInput.value,
        username: this.generateUsername()
      };

      // Mostrar loading
      AuthUI.toggleButtonLoading(this.submitButton, true);

      // Simular delay de requisição
      await this.delay(1000);

      // Tentar registro
      const result = AuthSystem.register(formData);

      // Esconder loading
      AuthUI.toggleButtonLoading(this.submitButton, false);

      if (result.success) {
        // Mostrar sucesso
        AuthUI.showToast(result.message, 'success');

        // Aguardar um pouco para o usuário ver o toast
        await this.delay(1500);

        // Redirecionar para login
        this.navigateToLogin();

      } else {
        // Mostrar erro
        AuthUI.showToast(result.message, 'danger');
      }

    } catch (error) {
      console.error('Erro no registro:', error);
      AuthUI.toggleButtonLoading(this.submitButton, false);
      AuthUI.showToast('Erro interno. Tente novamente.', 'danger');
    }
  }

  validateForm() {
    let isValid = true;
    let firstInvalidField = null;

    // Validar nome
    if (!this.validateFirstName()) {
      isValid = false;
      firstInvalidField = firstInvalidField || this.firstNameInput;
    }

    // Validar sobrenome
    if (!this.validateLastName()) {
      isValid = false;
      firstInvalidField = firstInvalidField || this.lastNameInput;
    }

    // Validar email
    if (!this.validateEmail()) {
      isValid = false;
      firstInvalidField = firstInvalidField || this.emailInput;
    }

    // Verificar disponibilidade do email
    const existingUser = AuthUsers.findByEmail(this.emailInput.value.trim());
    if (existingUser) {
      AuthUI.showToast('Este e-mail já está cadastrado', 'warning');
      isValid = false;
      firstInvalidField = firstInvalidField || this.emailInput;
    }

    // Validar senha
    if (!this.validatePassword()) {
      isValid = false;
      firstInvalidField = firstInvalidField || this.passwordInput;
    }

    // Validar termos
    if (!this.validateTerms()) {
      AuthUI.showToast('Você deve aceitar os termos e condições', 'warning');
      isValid = false;
    }

    // Focar no primeiro campo inválido
    if (!isValid && firstInvalidField) {
      firstInvalidField.focus();
    }

    return isValid;
  }

  generateUsername() {
    // Gerar username baseado no nome e sobrenome
    const firstName = this.firstNameInput.value.trim().toLowerCase();
    const lastName = this.lastNameInput.value.trim().toLowerCase();
    
    // Remover acentos e espaços
    const cleanFirstName = this.removeAccents(firstName).replace(/\s+/g, '');
    const cleanLastName = this.removeAccents(lastName).replace(/\s+/g, '');
    
    // Criar username base
    let username = `${cleanFirstName}.${cleanLastName}`;
    
    // Verificar se já existe, se sim, adicionar número
    let counter = 1;
    let finalUsername = username;
    
    while (AuthUsers.findByUsername(finalUsername)) {
      finalUsername = `${username}${counter}`;
      counter++;
    }
    
    return finalUsername;
  }

  removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  handleGoogleRegister() {
    // Simular registro OAuth Google
    AuthUI.showToast('Cadastro com Google em desenvolvimento...', 'info');
  }

  showTermsModal() {
    // Mostrar modal com termos e condições
    const modalHtml = `
      <div class="modal fade" id="termsModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Termos e Condições</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <h6>1. Uso do Serviço</h6>
              <p>O PDF Facil é uma plataforma gratuita para manipulação de documentos PDF...</p>
              
              <h6>2. Privacidade</h6>
              <p>Seus documentos são processados localmente e não são armazenados em nossos servidores...</p>
              
              <h6>3. Limitações</h6>
              <p>O serviço é fornecido "como está" sem garantias...</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" id="acceptTerms">Aceitar Termos</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('termsModal'));
    modal.show();

    // Botão aceitar
    document.getElementById('acceptTerms').addEventListener('click', () => {
      if (this.termsCheckbox) {
        this.termsCheckbox.checked = true;
        this.validateTerms();
      }
      modal.hide();
    });

    // Remover modal do DOM quando fechado
    document.getElementById('termsModal').addEventListener('hidden.bs.modal', function() {
      this.remove();
    });
  }

  navigateToLogin() {
    // Usar navegação AJAX se disponível
    if (typeof BerryAjaxNavigation !== 'undefined') {
      const navigation = new BerryAjaxNavigation();
      navigation.navigateTo('pages/login-v3.html');
    } else {
      // Fallback para navegação normal
      window.location.href = 'login-v3.html';
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

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
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
      // Inicializar página de registro
      new RegisterPage();
      
    } else {
      // Tentar novamente em 100ms
      setTimeout(checkAuthSystem, 100);
    }
  };
  
  checkAuthSystem();
});

// Expor para debug
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.RegisterPage = RegisterPage;
}