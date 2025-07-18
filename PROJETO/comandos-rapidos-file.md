# Comandos Rápidos - Berry PDF Facil + Sistema de Animações

## Comandos Desenvolvimento

### Setup Inicial
```bash
cd berry-bootstrap
npm i
gulp
```

### Comandos Gulp Principais
```bash
gulp                # Build completo + watch
gulp sass          # Compilar SCSS apenas
gulp build         # Build sem watch
gulp watch         # Watch mode
gulp build-html    # Compilar HTML apenas
```

---

## 🎬 SISTEMA DE ANIMAÇÕES - COMANDOS E TEMPLATES

### Arquivos Obrigatórios
```html
<!-- NO <HEAD> -->
<link rel="stylesheet" href="../assets/css/animate.min.css" />
<link rel="stylesheet" href="../assets/css/animacoes-icones.css" />
```

### Estrutura Base Animações
```css
/* PADRÃO UNIVERSAL */
.animated [ANIMACAO] [MODIFICADORES]

/* EXEMPLOS RÁPIDOS */
.animated swing infinite        /* Tagline oficial */
.animated pulse infinite        /* Elementos importantes */
.animated bounce infinite       /* Botões divertidos */
.animated fadeIn               /* Aparecer uma vez */
.animated zoomOut faster       /* Sair rápido */
```

### Comandos Rápidos por Categoria

#### 🎯 Attention Seekers (Infinitos)
```css
bounce infinite      /* Saltitante */
flash infinite       /* Pisca-pisca */
pulse infinite       /* Respiração */
rubberBand infinite  /* Elástico */
shake infinite       /* Tremor */
headShake infinite   /* Negação */
swing infinite       /* Pendular - TAGLINE OFICIAL */
tada infinite        /* Celebração */
wobble infinite      /* Oscilação */
jello infinite       /* Gelatina */
heartBeat infinite   /* Batimento cardíaco */
```

#### ⬇️ Entradas (Uma vez)
```css
bounceIn            /* Aparição saltitante */
fadeIn              /* Aparecer suave */
slideInUp           /* Deslizar de baixo */
zoomIn              /* Zoom entrada */
flipInX             /* Virar X */
lightSpeedIn        /* Super-rápido */
rotateIn slower     /* Rotacionar (CORRIGIDA) */
```

#### ⬆️ Saídas (Uma vez)
```css
bounceOut           /* Saída saltitante */
fadeOut             /* Desaparecer suave */
slideOutDown        /* Deslizar para baixo */
zoomOut             /* Zoom saída */
flipOutY            /* Virar Y */
lightSpeedOut slower /* Super-rápido (CORRIGIDA) */
rotateOut           /* Rotacionar saída */
```

#### ⚙️ Modificadores de Velocidade
```css
faster              /* 0.5s */
fast                /* 0.8s */
                    /* 1s (padrão) */
slow                /* 2s */
slower              /* 3s */
```

#### ⏱️ Modificadores de Delay
```css
delay-1s            /* Atraso 1 segundo */
delay-2s            /* Atraso 2 segundos */
delay-3s            /* Atraso 3 segundos */
delay-4s            /* Atraso 4 segundos */
delay-5s            /* Atraso 5 segundos */
```

---

## 🎯 TEMPLATES ESPECÍFICOS PDF FACIL

### Tagline Oficial
```html
<!-- IMPLEMENTAÇÃO OFICIAL -->
<h4>PDFFácil É Rápido... 
  <span class="text-primary fw-bold fs-1 animated swing infinite d-inline-block">0</span> 
  Stress!
</h4>

<!-- ALTERNATIVAS TESTADAS -->
<span class="animated pulse infinite d-inline-block">0</span>     <!-- Respiração -->
<span class="animated bounce infinite d-inline-block">0</span>    <!-- Saltitante -->
<span class="animated heartBeat infinite d-inline-block">0</span> <!-- Batimento -->
<span class="animated tada infinite slower d-inline-block">0</span> <!-- Celebração -->
```

### Card Ferramenta PDF com Animação
```html
<div class="col-lg-4 col-md-6">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <!-- ÍCONE COM ANIMAÇÃO ESPECÍFICA -->
          <div class="avtar avtar-md bg-primary">
            <i class="ti ti-arrows-minimize fs-4 animated pulse infinite"></i>
          </div>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="mb-0">[NOME_FERRAMENTA]</h6>
          <p class="text-muted mb-0">[DESCRIÇÃO]</p>
        </div>
      </div>
      <div class="mt-3">
        <a href="[LINK].html" class="btn btn-primary btn-sm">Acessar</a>
      </div>
    </div>
  </div>
</div>
```

### Animações por Ferramenta PDF
```html
<!-- COMPRIMIR - Pulse (Respiração = Compressão) -->
<i class="ti ti-arrows-minimize animated pulse infinite"></i>

<!-- CONVERTER - Swing (Transformação Suave) -->
<i class="ti ti-file-export animated swing infinite"></i>

<!-- DIVIDIR - Bounce (Movimento de Corte) -->
<i class="ti ti-cut animated bounce infinite"></i>

<!-- EDITAR - HeartBeat (Vida = Edição) -->
<i class="ti ti-edit animated heartBeat infinite"></i>

<!-- EXTRAIR PÁGINAS - Tada (Celebração = Extração) -->
<i class="ti ti-file-export animated tada infinite slower"></i>

<!-- EXTRAIR IMAGENS - Flash (Destaque Visual) -->
<i class="ti ti-photo animated flash infinite"></i>

<!-- JUNTAR - RubberBand (Elasticidade = União) -->
<i class="ti ti-files animated rubberBand infinite"></i>

<!-- FILTROS - Wobble (Oscilação = Ajuste) -->
<i class="ti ti-adjustments animated wobble infinite"></i>

<!-- OTIMIZAR PJE - Shake (Atenção Jurídica) -->
<i class="ti ti-scale animated shake infinite"></i>

<!-- REMOVER PÁGINAS - FadeOut (Desaparecimento) -->
<i class="ti ti-trash animated fadeOut"></i>

<!-- REORGANIZAR - SlideInUp (Movimento Organização) -->
<i class="ti ti-sort-ascending animated slideInUp"></i>

<!-- ROTACIONAR - RotateIn (Rotação Óbvia) -->
<i class="ti ti-rotate animated rotateIn slower"></i>

<!-- OCR - Jello (Reconhecimento Fluido) -->
<i class="ti ti-scan animated jello infinite"></i>
```

---

## Estrutura HTML Base

### Template Básico Berry + Animações
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <link rel="stylesheet" href="../assets/fonts/tabler-icons.min.css" />
  <link rel="stylesheet" href="../assets/fonts/feather.css" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/style-preset.css" />
  
  <!-- 🎬 SISTEMA DE ANIMAÇÕES -->
  <link rel="stylesheet" href="../assets/css/animate.min.css" />
  <link rel="stylesheet" href="../assets/css/animacoes-icones.css" />
</head>
<body>
  <div class="loader-bg"></div>
  <header class="pc-header"></header>
  <nav class="pc-sidebar"></nav>
  <div class="pc-container">
    <div class="pc-content">
      <!-- TAGLINE COM ANIMAÇÃO -->
      <h5>PDFFácil É Rápido... 
        <span class="text-primary fw-bold fs-1 animated swing infinite d-inline-block">0</span> 
        Stress!
      </h5>
      [CONTEÚDO]
    </div>
  </div>
  <footer class="pc-footer"></footer>
  <script src="../assets/js/plugins/bootstrap.min.js"></script>
  <script src="../assets/js/pcoded.js"></script>
</body>
</html>
```

---

## Classes CSS Principais

### Layout Berry
```css
.pc-header          /* Header principal */
.pc-sidebar         /* Sidebar navigation */
.pc-container       /* Container principal */
.pc-content         /* Área de conteúdo */
.pc-footer          /* Footer */
.page-header        /* Breadcrumb/título */
```

### Componentes Berry
```css
.card               /* Cards padrão */
.btn                /* Botões */
.form-control       /* Inputs */
.modal              /* Modais */
.alert              /* Alertas */
.toast              /* Notificações */
.progress           /* Progress bars */
.dropdown           /* Dropdowns */
.collapse           /* Accordion */
.offcanvas          /* Sidebar lateral */
```

### Sistema de Ícones
```css
.ti                 /* Prefixo Tabler Icons */
.ti-[nome]          /* Ícone específico */
.avtar              /* Container ícone Berry */
.avtar-md           /* Tamanho médio */
.bg-primary         /* Cor de fundo azul */
.bg-success         /* Cor de fundo verde */
.bg-warning         /* Cor de fundo amarelo */
.bg-danger          /* Cor de fundo vermelho */
.bg-info            /* Cor de fundo azul claro */
.bg-secondary       /* Cor de fundo cinza */
```

---

## 🎮 JavaScript Patterns para Animações

### Inicialização Universal
```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (typeof PcodedConfig !== 'undefined') {
    initAnimations();
  }
});

function initAnimations() {
  // Aplicar animações específicas
  applyToolAnimations();
  // Configurar controles interativos
  setupAnimationControls();
}
```

### Função Universal para Controle de Animações
```javascript
function restartAnimation(elementId, animationClass, modifiers = []) {
  const element = document.getElementById(elementId);
  
  // Remove todas as classes de animação
  element.className = element.className.replace(/\banimated\s+\w+/g, '').trim();
  
  // Força o reflow
  element.offsetHeight;
  
  // Adiciona nova animação
  setTimeout(() => {
    element.classList.add('animated', animationClass, ...modifiers);
  }, 10);
}

// EXEMPLOS DE USO
restartAnimation('meuIcone', 'pulse', ['infinite']);
restartAnimation('botao', 'bounce', ['infinite', 'slow']);
restartAnimation('elemento', 'fadeIn');
```

### Auto-restart para Animações Não Infinitas
```javascript
// Lista de animações que param
const nonInfiniteAnimations = [
  'bounceIn', 'fadeIn', 'slideInUp', 'zoomIn', 'flipInX',
  'bounceOut', 'fadeOut', 'slideOutDown', 'zoomOut', 'flipOutY',
  'lightSpeedIn', 'rotateIn', 'rollIn', 'jackInTheBox'
];

// Auto-restart a cada 4 segundos
setInterval(() => {
  const randomAnimation = nonInfiniteAnimations[
    Math.floor(Math.random() * nonInfiniteAnimations.length)
  ];
  
  const elements = document.querySelectorAll('.auto-animate');
  elements.forEach(element => {
    restartSingleElementAnimation(element, randomAnimation);
  });
}, 4000);

function restartSingleElementAnimation(element, animationClass) {
  element.classList.remove('animated', ...nonInfiniteAnimations);
  element.offsetHeight;
  setTimeout(() => {
    element.classList.add('animated', animationClass);
  }, 10);
}
```

### Aplicar Animações Específicas por Ferramenta
```javascript
function applyToolAnimations() {
  const toolAnimations = {
    'comprimir': 'pulse infinite',
    'converter': 'swing infinite',
    'dividir': 'bounce infinite',
    'editar': 'heartBeat infinite',
    'extrair-paginas': 'tada infinite slower',
    'extrair-imagens': 'flash infinite',
    'juntar': 'rubberBand infinite',
    'filtros': 'wobble infinite',
    'pje': 'shake infinite',
    'remover': 'fadeOut',
    'reorganizar': 'slideInUp',
    'rotacionar': 'rotateIn slower',
    'ocr': 'jello infinite'
  };
  
  Object.entries(toolAnimations).forEach(([tool, animation]) => {
    const element = document.querySelector(`[data-tool="${tool}"] i`);
    if (element) {
      element.className += ` animated ${animation}`;
    }
  });
}
```

---

## 🔧 Correções para Animações Problemáticas

### Animações que Precisam de Modificadores
```javascript
// Correções aplicadas automaticamente
const animationFixes = {
  'flash': 'infinite slower',
  'lightSpeedOut': 'slower',
  'rotateIn': 'slower',
  'hinge': 'slower'
};

function applyAnimationFixes() {
  Object.entries(animationFixes).forEach(([animation, fix]) => {
    const elements = document.querySelectorAll(`.${animation}`);
    elements.forEach(element => {
      fix.split(' ').forEach(modifier => {
        element.classList.add(modifier);
      });
    });
  });
}

// Aplicar correções automaticamente
document.addEventListener('DOMContentLoaded', applyAnimationFixes);
```

---

## 📱 Responsividade com Animações

### CSS para Dispositivos Móveis
```css
/* Animações mais rápidas em mobile */
@media (max-width: 768px) {
  .animated {
    animation-duration: 0.8s !important;
  }
  .animated.infinite {
    animation-duration: 1.2s !important;
  }
  .animated.slower {
    animation-duration: 2s !important;
  }
}

/* Respeitar preferências do usuário */
@media (prefers-reduced-motion: reduce) {
  .animated {
    animation-duration: 0.1s !important;
    animation-iteration-count: 1 !important;
  }
}

/* Ocultar animações em impressão */
@media print {
  .animated {
    animation: none !important;
  }
}
```

---

## 🎯 Templates Completos Prontos para Uso

### Template Página Ferramenta com Animações
```html
<div class="pc-content">
  <!-- Page Header com Tagline -->
  <div class="page-header">
    <div class="page-block">
      <div class="row align-items-center">
        <div class="col-md-12">
          <div class="page-header-title">
            <h2 class="mb-0">[NOME_FERRAMENTA]</h2>
            <p class="text-muted">PDFFácil É Rápido... 
              <span class="text-primary fw-bold animated swing infinite d-inline-block">0</span> 
              Stress!
            </p>
          </div>
          <ul class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">PDF Facil</a></li>
            <li class="breadcrumb-item active">[NOME_FERRAMENTA]</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Área de Upload com Ícone Animado -->
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h5>
            <div class="avtar avtar-md bg-primary me-2 d-inline-flex">
              <i class="ti ti-upload animated bounce infinite"></i>
            </div>
            Upload de Arquivo
          </h5>
        </div>
        <div class="card-body">
          <div class="dropzone-area text-center p-4">
            <i class="ti ti-file-text fs-1 text-primary animated pulse infinite mb-3"></i>
            <h6>Arraste e solte seu PDF aqui</h6>
            <p class="text-muted">ou clique para selecionar</p>
            <input type="file" class="form-control d-none" accept=".pdf">
            <button type="button" class="btn btn-outline-primary">Selecionar Arquivo</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Área de Configurações -->
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h5>
            <div class="avtar avtar-md bg-success me-2 d-inline-flex">
              <i class="ti ti-settings animated wobble infinite"></i>
            </div>
            Configurações
          </h5>
        </div>
        <div class="card-body">
          [CONFIGURAÇÕES_ESPECÍFICAS]
        </div>
      </div>
    </div>
  </div>

  <!-- Área de Resultado -->
  <div class="row">
    <div class="col-md-12">
      <div class="card d-none" id="resultado-area">
        <div class="card-header">
          <h5>
            <div class="avtar avtar-md bg-warning me-2 d-inline-flex">
              <i class="ti ti-check animated tada infinite"></i>
            </div>
            Resultado
          </h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8">
              <div id="preview-area"></div>
            </div>
            <div class="col-md-4">
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-success animated pulse infinite" id="btn-download">
                  <i class="ti ti-download me-2"></i> Download
                </button>
                <button type="button" class="btn btn-outline-secondary" id="btn-novo">
                  <i class="ti ti-plus me-2"></i> Novo Arquivo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Templates Rápidos

### Área Upload
```html
<div class="card">
  <div class="card-header">
    <h5>Upload de Arquivo</h5>
  </div>
  <div class="card-body">
    <div class="dropzone-area">
      <i class="ti ti-upload animated bounce infinite"></i>
      <h6>Arraste e solte seu PDF aqui</h6>
      <p class="text-muted">ou clique para selecionar</p>
      <input type="file" class="form-control d-none" accept=".pdf">
      <button type="button" class="btn btn-outline-primary">Selecionar Arquivo</button>
    </div>
  </div>
</div>
```

### Page Header (Breadcrumb)
```html
<div class="page-header">
  <div class="page-block">
    <div class="row align-items-center">
      <div class="col-md-12">
        <div class="page-header-title">
          <h2 class="mb-0">[TÍTULO]</h2>
        </div>
        <ul class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">PDF Facil</a></li>
          <li class="breadcrumb-item active">[PÁGINA ATUAL]</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## JavaScript Patterns

### Toast Notification
```javascript
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-white bg-${type} border-0`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);
  new bootstrap.Toast(toast).show();
}
```

### Progress Bar
```javascript
function updateProgress(percent) {
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = percent + '%';
    progressBar.textContent = percent + '%';
  }
}
```

---

## Validações Rápidas

### Teste Build
```bash
gulp
# Verificar se build ocorre sem erros
# Verificar se dist/ é gerado
```

### Teste Responsivo
- Desktop: F12 > Toggle device toolbar
- Tablet: iPad (768px)
- Mobile: iPhone (375px)

### Teste Berry Compatibilidade
- Verificar se classes Berry funcionam
- Confirmar que não há conflitos CSS
- Validar que componentes respondem

---

## Ícones Tabler Úteis

```
ti-arrows-minimize    # Comprimir
ti-file-export        # Converter
ti-cut                # Dividir
ti-edit               # Editar
ti-file-export        # Extrair Páginas
ti-photo              # Extrair Imagens
ti-adjustments        # Filtro
ti-files              # Juntar
ti-scale              # Otimizar PJE
ti-trash              # Remover
ti-sort-ascending     # Reorganizar
ti-rotate             # Rotacionar
ti-scan               # OCR
ti-alert-circle       # Erro 404
```

---

## Estrutura Arquivos

### Desenvolvimento
```
src/html/dashboard/index.html     # Dashboard principal
src/html/tools/[ferramenta].html  # Páginas ferramentas
src/assets/scss/custom/           # Estilos customizados
src/assets/js/pdf-tools/          # JavaScript específico
```

### Build Final
```
dist/index.html                   # Página principal
dist/assets/css/style.css         # CSS compilado
dist/assets/js/                   # JS compilado
```

---

## Cores Berry Padrão

### Primary Colors
```css
.text-primary       /* Azul principal */
.text-success       /* Verde */
.text-warning       /* Amarelo */
.text-danger        /* Vermelho */
.text-info          /* Azul claro */
.text-secondary     /* Cinza */
```

### Background Colors
```css
.bg-primary         /* Fundo azul */
.bg-success         /* Fundo verde */
.bg-warning         /* Fundo amarelo */
.bg-danger          /* Fundo vermelho */
.bg-light           /* Fundo claro */
.bg-dark            /* Fundo escuro */
```

---

## Grid System Berry

### Breakpoints
```css
.col-              # Extra small (<576px)
.col-sm-           # Small (≥576px)
.col-md-           # Medium (≥768px)
.col-lg-           # Large (≥992px)
.col-xl-           # Extra large (≥1200px)
.col-xxl-          # Extra extra large (≥1400px)
```

### Layout Cards Grid
```html
<div class="row">
  <div class="col-lg-4 col-md-6"><!-- Card 1 --></div>
  <div class="col-lg-4 col-md-6"><!-- Card 2 --></div>
  <div class="col-lg-4 col-md-6"><!-- Card 3 --></div>
</div>
```

---

## Debug e Troubleshooting

### Build Errors
```bash
# Limpar cache
rm -rf node_modules
npm cache clean --force
npm i

# Rebuild
gulp build
```

### CSS não carrega
- Verificar paths relativos em HTML
- Confirmar se gulp sass rodou sem erros
- Validar se dist/assets/css existe

### JavaScript não funciona
- Verificar se pcoded.js carregou
- Confirmar Bootstrap 5 está incluído
- Testar no console do navegador

### Animações não funcionam
- Verificar se animate.min.css está carregado
- Confirmar estrutura de classes: .animated [NOME] [MODIFICADORES]
- Validar se o elemento tem display adequado (inline-block para textos)

### Animações muito rápidas/lentas
- Usar modificadores: faster, fast, slow, slower
- Aplicar correções para animações problemáticas
- Ajustar CSS media queries para mobile