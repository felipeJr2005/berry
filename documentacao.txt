TASK: Migrate pdffacil.com to Berry Bootstrap 5. Execute steps sequentially. Do not proceed without validation.

---

BERRY BOOTSTRAP DOCUMENTATION

FREE RESOURCES (USE ONLY THESE):
- Basic dashboard (1 dashboard only)
- UI components: buttons, cards, alerts, forms, tables, modals, toasts, progress bars, dropdowns, collapse, offcanvas
- Bootstrap 5 grid system
- Sidebar standard
- Dark/light mode
- 7 preset colors
- RTL support
- Responsive layout
- Authentication pages

PRO RESOURCES (NEVER USE):
- Multiple dashboards
- Advanced charts (ApexCharts)
- Complex apps (Calendar, Chat, Email)
- Advanced widgets
- DataTables advanced
- WYSIWYG editors
- Vector maps
- Advanced upload (Uppy)

MANDATORY HTML STRUCTURE:
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
</head>
<body>
<div class="loader-bg"></div>
<header class="pc-header"></header>
<nav class="pc-sidebar"></nav>
<div class="pc-container">
<div class="pc-content">
[CONTENT]
</div>
</div>
<footer class="pc-footer"></footer>
<script src="../assets/js/plugins/bootstrap.min.js"></script>
<script src="../assets/js/pcoded.js"></script>
</body>
</html>
```

MANDATORY DIRECTORY STRUCTURE:
```
berry-pdffacil/
src/
  assets/
    scss/custom/
    js/pdf-tools/
    images/
  html/
    dashboard/
    tools/
    pages/
dist/
gulpfile.js
```

GULP COMMANDS:
```bash
npm i
gulp
gulp sass
gulp build
gulp watch
```

THEME CONFIGURATION (gulpfile.js):
```javascript
const dark_layout = 'false';
const rtl_layout = 'false';
const preset_theme = 'preset-1';
const font_name = 'Roboto';
const box_container = 'false';
```

CSS CLASSES BERRY:
.pc-header .pc-sidebar .pc-container .pc-content .pc-footer .page-header .card .btn .form-control .modal .alert .toast .progress .dropdown .collapse .offcanvas

JAVASCRIPT PATTERN:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  if (typeof PcodedConfig !== 'undefined') {
    initPDFTools();
  }
});
```

---

PROJECT DATA

SOURCE: https://github.com/felipeJr2005/pdf-facil
CURRENT STACK: HTML 69.1% + PHP 19.3% + JavaScript 9.5% + CSS 2.1%

FEATURES TO MIGRATE (14 TOTAL):
1. Dashboard - tool selection menu
2. Comprimir - reduce PDF size
3. Converter - PDF to Word/Text/Image/Excel
4. Dividir - split PDF pages
5. Editar - PDF editor interface
6. Extrair Paginas - extract specific pages
7. Extrair Imagens - extract images from PDF
8. Filtro - apply PDF filters
9. Juntar - merge multiple PDFs
10. Otimizar PJE - PJE specific optimization
11. Remover Paginas - delete pages
12. Reorganizar - reorder pages
13. Rotacionar - rotate pages
14. Error 404 - error page

EXCLUDE FROM MIGRATION:
ajuda/ investimento/ manutencao/ pjefacil/ ocr/

---

EXECUTION RULES

NEVER:
- Mix old HTML/JS/CSS with Berry
- Import old project libraries
- Modify Berry core files (style.css, pcoded.js)
- Use PRO resources without confirmation
- Reuse old HTML structure

ALWAYS:
- Use Berry native components only
- Follow Berry HTML structure
- Implement with Berry JavaScript patterns
- Test FREE compatibility before implementation
- Recreate functionality from scratch in Berry patterns

---

STEP BY STEP EXECUTION

STEP 1: BERRY SETUP
Execute these commands:
Install Berry Bootstrap clean
Configure gulpfile.js with theme settings above
Create directory structure as specified
Run npm i
Run gulp
Test build works without errors

Deliver: Working Berry structure + build confirmation

STEP 2: DASHBOARD IMPLEMENTATION
Create src/html/dashboard/index.html
Use this exact structure:

```html
<div class="pc-content">
<div class="page-header">
<div class="page-block">
<div class="row align-items-center">
<div class="col-md-12">
<div class="page-header-title">
<h2 class="mb-0">PDF FACIL</h2>
</div>
<ul class="breadcrumb">
<li class="breadcrumb-item">Selecione uma funcao</li>
</ul>
</div>
</div>
</div>
</div>
<div class="row">
<div class="col-lg-4 col-md-6">
<div class="card">
<div class="card-body">
<div class="d-flex align-items-center">
<div class="flex-shrink-0">
<i class="feather icon-minimize-2 text-primary"></i>
</div>
<div class="flex-grow-1 ms-3">
<h6 class="mb-0">Comprimir</h6>
<p class="text-muted mb-0">Reduzir tamanho</p>
</div>
</div>
<div class="mt-3">
<a href="comprimir.html" class="btn btn-primary btn-sm">Acessar</a>
</div>
</div>
</div>
</div>
[REPEAT FOR ALL 14 TOOLS]
</div>
</div>
```

Create cards for all 14 tools with appropriate Feather icons
Implement working links to each tool page
Test responsive grid on mobile/tablet/desktop

Deliver: Complete dashboard with 14 working tool cards

STEP 3: UNIVERSAL TOOL TEMPLATE
Create src/html/tools/template.html
Use this exact structure:

```html
<div class="pc-content">
<div class="page-header">
<div class="page-block">
<div class="row align-items-center">
<div class="col-md-12">
<div class="page-header-title">
<h2 class="mb-0">[TOOL_NAME]</h2>
</div>
<ul class="breadcrumb">
<li class="breadcrumb-item"><a href="index.html">PDF Facil</a></li>
<li class="breadcrumb-item active">[TOOL_NAME]</li>
</ul>
</div>
</div>
</div>
</div>
<div class="row">
<div class="col-md-6">
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
</div>
<div class="col-md-6">
<div class="card">
<div class="card-header">
<h5>Configuracoes</h5>
</div>
<div class="card-body">
[TOOL_SPECIFIC_OPTIONS]
</div>
</div>
</div>
</div>
<div class="row">
<div class="col-md-12">
<div class="card d-none" id="resultado-area">
<div class="card-header">
<h5>Resultado</h5>
</div>
<div class="card-body">
<div class="row">
<div class="col-md-8">
<div id="preview-area"></div>
</div>
<div class="col-md-4">
<div class="d-grid gap-2">
<button type="button" class="btn btn-success" id="btn-download">
<i class="feather icon-download"></i> Download
</button>
<button type="button" class="btn btn-outline-secondary" id="btn-novo">
<i class="feather icon-plus"></i> Novo Arquivo
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

Test template with one tool (comprimir.html)
Implement drag and drop functionality
Add file validation
Test upload area responsiveness

Deliver: Working template for one tool

STEP 4: IMPLEMENT SPECIFIC TOOLS

TOOL 4.1: COMPRIMIR
Create src/html/tools/comprimir.html
Add these specific options in [TOOL_SPECIFIC_OPTIONS]:

```html
<div class="mb-3">
<label class="form-label">Qualidade de Compressao</label>
<input type="range" class="form-range" min="1" max="100" value="75" id="qualidade-range">
<div class="d-flex justify-content-between">
<small class="text-muted">Maxima</small>
<small class="text-muted">Media</small>
<small class="text-muted">Minima</small>
</div>
</div>
<div class="mb-3">
<div class="form-check">
<input class="form-check-input" type="checkbox" id="manter-qualidade">
<label class="form-check-label" for="manter-qualidade">
Manter qualidade das imagens
</label>
</div>
</div>
```

Add compression logic
Implement progress bar
Add before/after size display
Test functionality

TOOL 4.2: CONVERTER
Create src/html/tools/converter.html
Add format selection in [TOOL_SPECIFIC_OPTIONS]:

```html
<div class="row">
<div class="col-md-6 mb-3">
<div class="card format-card" data-format="word">
<div class="card-body text-center">
<i class="feather icon-file-text text-primary"></i>
<h6 class="mt-2">Word (DOCX)</h6>
<p class="text-muted small">Melhor para edicao de texto</p>
</div>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card format-card" data-format="texto">
<div class="card-body text-center">
<i class="feather icon-type text-success"></i>
<h6 class="mt-2">Texto (TXT)</h6>
<p class="text-muted small">Extracao direta via PyMuPDF</p>
</div>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card format-card" data-format="imagem">
<div class="card-body text-center">
<i class="feather icon-image text-warning"></i>
<h6 class="mt-2">Imagem</h6>
<p class="text-muted small">JPG ou PNG</p>
</div>
</div>
</div>
<div class="col-md-6 mb-3">
<div class="card format-card" data-format="excel">
<div class="card-body text-center">
<i class="feather icon-grid text-info"></i>
<h6 class="mt-2">Excel (XLSX)</h6>
<p class="text-muted small">Melhor para tabelas (Em breve)</p>
</div>
</div>
</div>
</div>
```

Add format-specific options
Implement conversion logic
Test all format options

CONTINUE FOR ALL 14 TOOLS USING SAME PATTERN

Deliver: One complete tool at a time with validation

STEP 5: UNIVERSAL JAVASCRIPT
Create src/assets/js/pdf-tools/universal.js:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    if (typeof PcodedConfig !== 'undefined') {
        initPDFTools();
    }
});

function initPDFTools() {
    initDragDrop();
    initProgressBars();
    initToasts();
    initFileValidation();
}

function initDragDrop() {
    const dropzones = document.querySelectorAll('.dropzone-area');
    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFileUpload(files[0]);
        });
    });
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

function updateProgress(percent) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';
    }
}
```

Add universal functionality for all tools
Test drag and drop on all pages
Implement toast notifications
Test progress bars

Deliver: Working universal JavaScript system

STEP 6: FINAL BUILD
Execute gulp build
Test all 14 tools functionality
Validate responsive design on mobile/tablet/desktop
Test browser compatibility
Prepare for deployment

Deliver: Complete working Berry PDF Facil application

---

RESPONSE FORMAT

Respond exactly in this format:

```
STEP [NUMBER] - [STEP_NAME]
STATUS: [INITIATED/IN_PROGRESS/COMPLETE]

FILES CREATED:
- file1.html
- file2.js
- file3.scss

CODE IMPLEMENTED:
[COMPLETE CODE - DO NOT TRUNCATE]

VALIDATIONS:
PASSED: [what worked]
FAILED: [what failed]

NEXT TASK:
[exact next action]

CONFIRM BEFORE PROCEEDING:
[what needs validation]
```

VALIDATION REQUIREMENTS BEFORE EACH STEP:
1. Confirm using only Berry FREE resources
2. Test gulp build works without errors
3. Validate responsive design mobile/tablet/desktop
4. Confirm Berry HTML structure compliance
5. Test implemented functionality works

Do not proceed to next step without complete validation of current step.

---

BEGIN EXECUTION

Start with STEP 1: BERRY SETUP
Install clean Berry Bootstrap, configure theme settings, create directory structure, test build functionality.