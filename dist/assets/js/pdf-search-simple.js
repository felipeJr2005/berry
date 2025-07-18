/**
 * Berry PDF Facil - Simple Search Implementation
 * Busca nos cards das ferramentas na área principal (pc-content)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Aguardar Berry carregar completamente
  setTimeout(function() {
    initSimpleSearch();
    initOrdenacaoAZ();
  }, 500);
});

function initSimpleSearch() {
  const searchInput = document.querySelector('.header-search input');
  
  if (!searchInput) return;
  
  // Funcionalidade de busca nos cards das ferramentas
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    searchInCards(query);
  });
}

function initOrdenacaoAZ() {
  const filtroBtn = document.querySelector('.btn-search');
  if (!filtroBtn) return;
  
  let isAlphabeticalOrder = false;
  let originalOrder = [];
  
  filtroBtn.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Encontrar especificamente a row dos cards das ferramentas
    const allRows = document.querySelectorAll('.pc-content .row');
    let cardContainer = null;
    
    // Procurar pela row que tem cards das ferramentas (modular - independe do grid lg)
    allRows.forEach(row => {
      const toolCards = row.querySelectorAll('.col-md-6.mb-4');
      if (toolCards.length > 0) {
        cardContainer = row;
      }
    });
    
    if (!cardContainer) {
      console.log('Container dos cards das ferramentas não encontrado');
      return;
    }
    
    // Pegar cards das ferramentas (modular - exclui card azul de introdução)
    const cards = Array.from(cardContainer.querySelectorAll('.col-md-6.mb-4')).filter(card => {
      const h3 = card.querySelector('h3');
      return h3 && !card.querySelector('.card-header.bg-primary');
    });
    
    // Salvar ordem original na primeira execução
    if (originalOrder.length === 0) {
      originalOrder = [...cards];
    }
    
    let ordenados;
    
    if (!isAlphabeticalOrder) {
      // Ordenar A-Z
      ordenados = [...cards].sort((a, b) => {
        const nomeA = a.querySelector('h3')?.textContent.trim().toLowerCase() || '';
        const nomeB = b.querySelector('h3')?.textContent.trim().toLowerCase() || '';
        return nomeA.localeCompare(nomeB);
      });
      isAlphabeticalOrder = true;
      
      // Feedback visual - botão ativo
      filtroBtn.style.backgroundColor = '#007bff';
      filtroBtn.style.color = 'white';
      filtroBtn.title = 'Ordenação A-Z ativa - Clique para voltar ao original';
      
    } else {
      // Voltar à ordem original
      ordenados = [...originalOrder];
      isAlphabeticalOrder = false;
      
      // Feedback visual - botão normal
      filtroBtn.style.backgroundColor = '';
      filtroBtn.style.color = '';
      filtroBtn.title = 'Ordenar A-Z';
    }
    
    // Reordenar no DOM sem remover (preserva estado de busca)
    ordenados.forEach(card => {
      cardContainer.appendChild(card);
    });
  });
}

function searchInCards(query) {
  // Buscar nos cards das ferramentas PDF na área principal
  const toolCards = document.querySelectorAll('.pc-content .card');
  let hasResults = false;
  
  // Palavras-chave para melhorar a busca
  const keywords = {
    'comprimir': ['reduzir', 'tamanho', 'size', 'compactar', 'diminuir'],
    'converter': ['word', 'docx', 'txt', 'texto', 'imagem', 'jpg', 'png', 'excel', 'xlsx'],
    'juntar': ['combinar', 'merge', 'unir', 'concatenar', 'mesclar'],
    'dividir': ['separar', 'split', 'cortar', 'partir'],
    'editar': ['modificar', 'alterar', 'mudar', 'editor'],
    'extrair': ['extrair', 'extrair paginas', 'extrair imagens', 'pagina', 'paginas', 'página', 'páginas', 'imagem', 'imagens'],
    'filtro': ['filtrar', 'ajustar', 'efeitos', 'qualidade'],
    'otimizar': ['pje', 'judicial', 'processo', 'adequar'],
    'remover': ['deletar', 'apagar', 'excluir', 'pagina', 'paginas', 'página', 'páginas'],
    'reorganizar': ['reordenar', 'ordenar', 'organizar', 'sequencia'],
    'rotacionar': ['girar', 'rodar', 'orientacao', 'rotacao'],
    'ocr': ['reconhecer', 'texto', 'digitalizacao', 'scanear']
  };
  
  toolCards.forEach((card, index) => {
    const parentCol = card.closest('.col-lg-4, .col-md-6, .col-12');
    
    if (!parentCol) return;
    
    // Buscar no nome da ferramenta
    const toolName = card.querySelector('h3');
    const toolDescription = card.querySelector('p.text-muted, .text-muted');
    
    if (!toolName) return;
    
    const nameText = toolName.textContent.toLowerCase();
    const descriptionText = toolDescription ? toolDescription.textContent.toLowerCase() : '';
    
    // Busca mais flexível (remove acentos e normaliza)
    const normalizedQuery = removeAccents(query);
    const normalizedName = removeAccents(nameText);
    const normalizedDesc = removeAccents(descriptionText);
    
    // Busca básica
    let isMatch = query === '' || 
                 normalizedName.includes(normalizedQuery) || 
                 normalizedDesc.includes(normalizedQuery);
    
    // Busca por palavras-chave
    if (!isMatch) {
      for (const [tool, words] of Object.entries(keywords)) {
        if (normalizedName.includes(tool)) {
          isMatch = words.some(word => removeAccents(word).includes(normalizedQuery));
          if (isMatch) break;
        }
      }
    }
    
    if (isMatch) {
      parentCol.style.display = 'block';
      hasResults = true;
    } else {
      parentCol.style.display = 'none';
    }
  });
  
  // Mostrar mensagem se não houver resultados
  toggleNoResults(!hasResults && query !== '');
}

function toggleNoResults(show) {
  // Remover mensagem anterior se existir
  const existingMsg = document.querySelector('.no-results-message');
  if (existingMsg) {
    existingMsg.remove();
  }
  
  if (show) {
    const container = document.querySelector('.pc-content .row');
    if (container) {
      const noResultsHtml = `
        <div class="col-12 no-results-message">
          <div class="card">
            <div class="card-body text-center py-5">
              <i class="ti ti-search text-muted" style="font-size: 48px;"></i>
              <h5 class="mt-3 text-muted">Nenhuma ferramenta encontrada</h5>
              <p class="text-muted">Tente pesquisar com outros termos</p>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', noResultsHtml);
    }
  }
}

function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}