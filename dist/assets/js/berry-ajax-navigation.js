/**
 * Berry PDF Facil - Dynamic Navigation System
 * Mantém header, sidebar e footer fixos, carrega apenas conteúdo principal
 */

class BerryAjaxNavigation {
  constructor() {
    this.contentContainer = document.querySelector('.pc-content');
    this.currentUrl = window.location.pathname;
    this.loadingClass = 'pc-content-loading';
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupHistoryNavigation();
    this.markActiveMenuItem();
  }

  setupEventListeners() {
    // Interceptar clicks nos links das ferramentas PDF
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      
      if (link && this.shouldInterceptLink(link)) {
        e.preventDefault();
        this.navigateTo(link.href);
      }
    });
  }

  shouldInterceptLink(link) {
    const href = link.getAttribute('href');
    
    // Interceptar apenas links internos das ferramentas PDF
    if (href.startsWith('#') || href.startsWith('http') || href.includes('target="_blank"')) {
      return false;
    }
    
    // Interceptar links das ferramentas PDF (mesma pasta) + INDEX.HTML + ESTATISTICAS.HTML
    const pdfTools = [
      'index.html', 'estatisticas.html', 'comprimir.html', 'converter.html', 'dividir.html', 'editar.html',
      'extrair-paginas.html', 'extrair-imagens.html', 'filtro.html', 
      'juntar.html', 'otimizar-pje.html', 'remover-paginas.html',
      'reorganizar.html', 'rotacionar.html', 'ocr.html', '404.html',
      'sobre.html', 'contato.html', 'privacidade.html'
    ];
    
    return pdfTools.some(tool => href.includes(tool));
  }

  async navigateTo(url) {
    try {
      // Mostrar loading
      this.showLoading();
      
      // Fazer requisição AJAX
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      
      // Extrair apenas o conteúdo principal
      const content = this.extractMainContent(html);
      
      // Atualizar conteúdo
      this.updateContent(content);
      
      // Atualizar URL e histórico
      this.updateHistory(url);
      
      // Atualizar menu ativo
      this.markActiveMenuItem(url);
      
      // Esconder loading
      this.hideLoading();
      
      // Reinicializar componentes Berry se necessário
      this.reinitializeBerryComponents();
      
    } catch (error) {
      console.error('Erro ao carregar página:', error);
      this.showError('Erro ao carregar a página. Tente novamente.');
      this.hideLoading();
    }
  }

  extractMainContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Extrair apenas a área pc-content
    const content = doc.querySelector('.pc-content');
    
    if (!content) {
      throw new Error('Conteúdo principal não encontrado');
    }
    
    return content.innerHTML;
  }

  updateContent(newContent) {
    // Fade out suave
    this.contentContainer.style.opacity = '0.5';
    
    setTimeout(() => {
      // Substituir conteúdo
      this.contentContainer.innerHTML = newContent;
      
      // Fade in
      this.contentContainer.style.opacity = '1';
      
      // Scroll to top suave
      this.scrollToTop();
    }, 150);
  }

  updateHistory(url) {
    this.currentUrl = url;
    history.pushState({ url: url }, '', url);
  }

  setupHistoryNavigation() {
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.url) {
        this.navigateTo(event.state.url);
      }
    });
  }

  markActiveMenuItem(url = null) {
    const targetUrl = url || window.location.pathname;
    
    // Remover classe active de todos os itens
    document.querySelectorAll('.pc-navbar .pc-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Adicionar classe active ao item atual
    document.querySelectorAll('.pc-navbar .pc-item a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && targetUrl.includes(href.split('/').pop())) {
        link.closest('.pc-item').classList.add('active');
      }
    });
  }

  showLoading() {
    this.contentContainer.classList.add(this.loadingClass);
    
    // Adicionar overlay de loading se não existir
    if (!document.querySelector('.ajax-loading-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'ajax-loading-overlay';
      overlay.innerHTML = `
        <div class="d-flex justify-content-center align-items-center h-100">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Carregando...</span>
          </div>
        </div>
      `;
      this.contentContainer.appendChild(overlay);
    }
  }

  hideLoading() {
    this.contentContainer.classList.remove(this.loadingClass);
    
    const overlay = document.querySelector('.ajax-loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  showError(message) {
    // Usar toast do Berry para mostrar erro
    if (typeof PNotify !== 'undefined') {
      new PNotify({
        title: 'Erro',
        text: message,
        type: 'error'
      });
    } else {
      // Fallback para alert
      alert('Erro: ' + message);
    }
  }

  scrollToTop() {
    // Scroll suave para o topo da área de conteúdo
    this.contentContainer.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }

  reinitializeBerryComponents() {
    // Reinicializar componentes Berry que podem ter sido carregados dinamicamente
    
    // Feather Icons
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
    
    // Bootstrap tooltips
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
    
    // Bootstrap popovers
    if (typeof bootstrap !== 'undefined') {
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
      });
    }
    
    // Trigger eventos customizados para outros plugins
    document.dispatchEvent(new CustomEvent('berryContentLoaded'));
  }
}

// CSS para loading overlay
const ajaxStyles = `
<style>
.pc-content-loading {
  position: relative;
}

.ajax-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.pc-content {
  transition: opacity 0.15s ease-in-out;
}

/* Loading animation para melhor UX */
.pc-content-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #4680ff, transparent);
  animation: loadingBar 1.5s ease-in-out infinite;
  z-index: 1001;
}

@keyframes loadingBar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', ajaxStyles);

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Aguardar carregamento completo do Berry
  if (typeof PcodedConfig !== 'undefined') {
    new BerryAjaxNavigation();
  } else {
    // Fallback - tentar novamente após delay
    setTimeout(() => {
      new BerryAjaxNavigation();
    }, 500);
  }
});

// Export para uso em outros scripts se necessário
window.BerryAjaxNavigation = BerryAjaxNavigation;