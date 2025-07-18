# Berry Bootstrap 5 - Guia Técnico de Desenvolvimento
**Versão: FREE vs PRO - Referência Rápida**

---

## 🚀 INSTALAÇÃO E SETUP ✅ FREE

### Comandos Básicos
```bash
# Navegar para pasta do projeto
cd berry-bootstrap

# Instalar dependências
npm i

# Iniciar desenvolvimento
gulp
```

### Estrutura de Diretórios ✅ FREE
```
dist/
├── assets/
│   ├── css/
│   ├── fonts/
│   ├── images/
│   ├── js/
│   ├── json/
├── dashboard/           ✅ Dashboard básico (FREE)
├── elements/           ✅ Componentes básicos (FREE)
├── forms/              ✅ Formulários básicos (FREE)
├── pages/              ✅ Páginas básicas (FREE)
├── table/              ✅ Tabelas básicas (FREE)
├── admins/             💰 Múltiplos dashboards (PRO)
├── application/        💰 Apps avançadas (PRO)
├── chart/              💰 Charts avançados (PRO)
├── layouts/            💰 Layouts múltiplos (PRO)
├── widget/             💰 Widgets avançados (PRO)
├── demo/               ❓ UNCLEAR
├── other/              ❓ UNCLEAR
└── index.html          ✅ FREE
```

---

## ⚙️ COMANDOS GULP ✅ FREE

### Comandos Principais
```bash
# Comando padrão - build completo
gulp

# Tarefas específicas
gulp sass          # Compilar SCSS
gulp imgmin        # Otimizar imagens
gulp build         # Copiar assets
gulp build-html    # Compilar HTML
gulp build-js      # Build JavaScript
gulp watch         # Watch mode
gulp watch-minify  # Watch com minificação
```

---

## 📄 ESTRUTURA HTML BASE ✅ FREE

### Template Básico
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Berry Bootstrap 5 Admin Template</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
  
  <!-- Fonts e Icons ✅ FREE -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <link rel="stylesheet" href="../assets/fonts/tabler-icons.min.css" />
  <link rel="stylesheet" href="../assets/fonts/feather.css" />
  <link rel="stylesheet" href="../assets/fonts/fontawesome.css" />
  <link rel="stylesheet" href="../assets/fonts/material.css" />
  
  <!-- CSS Principal ✅ FREE -->
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/style-preset.css" />
</head>

<body>
  <!-- Pre-loader ✅ FREE -->
  <div class="loader-bg"></div>
  
  <!-- Header ✅ FREE -->
  <header class="pc-header"></header>
  
  <!-- Sidebar ✅ FREE -->
  <nav class="pc-sidebar"></nav>
  
  <!-- Main Content ✅ FREE -->
  <div class="pc-container">
    <div class="pc-content">
      <div class="page-header"></div>
      <div class="row"></div>
    </div>
  </div>
  
  <!-- Footer ✅ FREE -->
  <footer class="pc-footer"></footer>

  <!-- Scripts Obrigatórios ✅ FREE -->
  <script src="../assets/js/plugins/popper.min.js"></script>
  <script src="../assets/js/plugins/simplebar.min.js"></script>
  <script src="../assets/js/plugins/bootstrap.min.js"></script>
  <script src="../assets/js/pcoded.js"></script>
  <script src="../assets/js/plugins/feather.min.js"></script>
</body>
</html>
```

---

## 🎨 CONFIGURAÇÕES DE TEMA

### Light/Dark Layout ✅ FREE
```javascript
// Em gulpfile.js
const dark_layout = 'true';   // Dark
const dark_layout = 'false';  // Light  
const dark_layout = 'default'; // Sistema OS
```

### RTL Layout ✅ FREE
```javascript
// Em gulpfile.js
const rtl_layout = 'true';   // RTL
const rtl_layout = 'false';  // LTR (padrão)
```

### Preset Colors ✅ FREE
```javascript
// Em gulpfile.js
const preset_theme = 'preset-1';
// Opções: 'preset-1' até 'preset-7'
```

### Font Family ✅ FREE
```javascript
// Em gulpfile.js
const font_name = 'Roboto';
// Opções: 'Roboto', 'Poppins', 'Inter'
```

### Container Layout ✅ FREE
```javascript
// Em gulpfile.js
const box_container = 'true';   // Fixed width
const box_container = 'false';  // Full width
```

---

## 📦 DEPENDÊNCIAS PRINCIPAIS (FREE)

### Core Dependencies ✅ FREE
```json
{
  "bootstrap": "5.3.3",
  "@popperjs/core": "2.11.8",
  "simplebar": "6.2.5",
  "feather-icons": "4.29.1"
}
```

### Basic Plugins ✅ FREE (Confirmados)
```json
{
  "animate.css": "4.1.1",
  "clipboard": "2.0.11",
  "flatpickr": "4.6.13",
  "sweetalert2": "11.10.5",
  "wow.js": "1.2.2"
}
```

### Prováveis PRO-Only 💰
```json
{
  "apexcharts": "3.46.0",           // Charts avançados
  "fullcalendar": "6.1.11",        // Calendar apps
  "datatables.net-*": "várias",    // DataTables avançadas
  "@ckeditor/*": "41.1.0",         // Editores avançados
  "tinymce": "6.8.3",              // Editor WYSIWYG
  "uppy": "3.22.1",                // Upload avançado
  "jsvectormap": "1.5.3"           // Mapas
}
```

---

## 🚨 RECURSOS PRO vs FREE

### ✅ DISPONÍVEL NO FREE
- **Dashboard básico** (1 dashboard)
- **Componentes UI básicos** (buttons, cards, alerts)
- **Formulários simples** (inputs, validation)
- **Tabelas básicas** (responsive tables)
- **Páginas de autenticação** (login, register)
- **Temas e cores** (7 presets)
- **Layout responsivo**
- **Dark/Light mode**
- **RTL support**

### 💰 APENAS NO PRO
- **Múltiplos dashboards** (Finance, Course, Membership, etc.)
- **Apps completas** (Calendar, Chat, Email, etc.)
- **Charts avançados** (ApexCharts, etc.)
- **Widgets complexos**
- **DataTables avançadas**
- **Editores WYSIWYG**
- **Layouts múltiplos**
- **Mapas interativos**
- **Upload de arquivos avançado**

---

## 🔧 DESENVOLVIMENTO - DICAS PRÁTICAS

### Arquivos Principais para Modificar ✅ FREE
```
src/
├── assets/
│   ├── scss/           # Estilos customizados
│   ├── js/             # JavaScript customizado  
│   └── images/         # Imagens do projeto
├── html/               # Templates HTML
└── gulpfile.js         # Configurações do build
```

### Classes CSS Principais ✅ FREE
```css
.pc-header              /* Header principal */
.pc-sidebar             /* Sidebar navigation */
.pc-container           /* Container principal */
.pc-content             /* Área de conteúdo */
.pc-footer              /* Footer */
.page-header            /* Breadcrumb area */
```

### JavaScript Principal ✅ FREE
```javascript
// pcoded.js - Funcionalidades principais
// - Toggle sidebar
// - Responsive handling  
// - Theme switching
// - Layout management
```

---

## ⚠️ ATENÇÃO - LIMITAÇÕES FREE

1. **Não tente implementar** recursos marcados como 💰 PRO
2. **Foque primeiro** em recursos ✅ FREE confirmados  
3. **Teste antes** recursos marcados como ❓ UNCLEAR
4. **A versão FREE** é totalmente funcional para dashboards básicos
5. **Para recursos avançados**, considere implementação customizada

---

## 📋 CHANGELOG RELEVANTE

### v1.4.0 (09-12-2024) ✅ FREE
- Melhoria na estrutura JavaScript
- Atualização de pacotes
- Integração i18n no sidebar
- Melhoria UI para laptops

### v1.3.0 (2-05-2024) ❓ Alguns PRO
- Update Gulp  
- **Finance Dashboard** 💰 PRO
- **Online Course Admin** 💰 PRO
- **Membership Admin** 💰 PRO
- **Helpdesk Admin** 💰 PRO
- **Invoice Admin** 💰 PRO

---

**💡 Dica Final:** Sempre verifique se um componente funciona antes de investir tempo. Se der erro, provavelmente é PRO-only!