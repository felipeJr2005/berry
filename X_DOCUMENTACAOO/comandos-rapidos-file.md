# Comandos Rápidos - Berry PDF Facil

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

## Estrutura HTML Base

### Template Básico Berry
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <link rel="stylesheet" href="../assets/fonts/feather.css" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/style-preset.css" />
</head>
<body>
  <div class="loader-bg"></div>
  <header class="pc-header"></header>
  <nav class="pc-sidebar"></nav>
  <div class="pc-container">
    <div class="pc-content">
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

### Layout
```css
.pc-header          /* Header principal */
.pc-sidebar         /* Sidebar navigation */
.pc-container       /* Container principal */
.pc-content         /* Área de conteúdo */
.pc-footer          /* Footer */
.page-header        /* Breadcrumb/título */
```

### Componentes
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

---

## Templates Rápidos

### Card Ferramenta PDF
```html
<div class="col-lg-4 col-md-6">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <i class="feather icon-[ICONE] text-primary"></i>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="mb-0">[NOME]</h6>
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

### Área Upload
```html
<div class="card">
  <div class="card-header">
    <h5>Upload de Arquivo</h5>
  </div>
  <div class="card-body">
    <div class="dropzone-area">
      <i class="feather icon-upload"></i>
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

### Inicialização
```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (typeof PcodedConfig !== 'undefined') {
    initPDFTools();
  }
});
```

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

## Ícones Feather Úteis

```
icon-minimize-2     # Comprimir
icon-refresh-cw     # Converter
icon-scissors       # Dividir
icon-edit          # Editar
icon-copy          # Extrair Páginas
icon-image         # Extrair Imagens
icon-filter        # Filtro
icon-plus-square   # Juntar
icon-tool          # Otimizar PJE
icon-trash-2       # Remover
icon-shuffle       # Reorganizar
icon-rotate-cw     # Rotacionar
icon-eye           # OCR
icon-alert-circle  # Erro 404
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