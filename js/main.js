// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll + Back to top visibility
const navbar = document.querySelector('.navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    if (navbar) {
        if (currentScroll > 50) {
            navbar.style.background = isLight ? 'rgba(248, 250, 252, 0.95)' : 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = isLight ? 'rgba(248, 250, 252, 0.9)' : 'rgba(10, 10, 15, 0.8)';
        }
    }

    if (backToTop) {
        if (currentScroll > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Back to top click
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codex-theme', theme);
}

// Initialize theme
const savedTheme = localStorage.getItem('codex-theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// Search
const searchPages = [
    { title: { zh: '安装与配置', en: 'Installation', ja: 'インストールと設定', es: 'Instalación' }, url: 'guides/installation.html', category: 'Guide' },
    { title: { zh: '核心概念', en: 'Core Concepts', ja: '基本概念', es: 'Conceptos Core' }, url: 'guides/concepts.html', category: 'Guide' },
    { title: { zh: '基础用法', en: 'Basic Usage', ja: '基本的な使い方', es: 'Uso Básico' }, url: 'guides/basic-usage.html', category: 'Guide' },
    { title: { zh: 'Slash 命令', en: 'Slash Commands', ja: 'Slashコマンド', es: 'Comandos Slash' }, url: 'guides/slash-commands.html', category: 'Guide' },
    { title: { zh: 'AGENTS.md', en: 'AGENTS.md', ja: 'AGENTS.md', es: 'AGENTS.md' }, url: 'guides/agents-md.html', category: 'Guide' },
    { title: { zh: 'Skills 扩展', en: 'Skills Extension', ja: 'Skills拡張', es: 'Extensión Skills' }, url: 'guides/skills.html', category: 'Guide' },
    { title: { zh: 'MCP 集成', en: 'MCP Integration', ja: 'MCP統合', es: 'Integración MCP' }, url: 'guides/mcp.html', category: 'Guide' },
    { title: { zh: '高级技巧', en: 'Advanced', ja: '高度なテクニック', es: 'Avanzado' }, url: 'guides/advanced.html', category: 'Guide' },
    { title: { zh: '快速搭建 React 项目', en: 'Build React Project', ja: 'Reactプロジェクトの構築', es: 'Construir Proyecto React' }, url: 'examples/react-setup.html', category: 'Example' },
    { title: { zh: 'API 后端开发', en: 'API Backend Development', ja: 'APIバックエンド開発', es: 'Desarrollo Backend API' }, url: 'examples/api-backend.html', category: 'Example' },
    { title: { zh: '代码重构与优化', en: 'Code Refactoring', ja: 'コードリファクタリング', es: 'Refactorización de Código' }, url: 'examples/refactoring.html', category: 'Example' },
    { title: { zh: '多 Agent 协作开发', en: 'Multi-Agent Collaboration', ja: 'マルチエージェント協業', es: 'Colaboración Multi-Agente' }, url: 'examples/multi-agent.html', category: 'Example' },
];

const searchToggle = document.getElementById('searchToggle');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function getCurrentLang() {
    return localStorage.getItem('codex-lang') || 'zh';
}

function renderSearchResults(query) {
    if (!searchResults) return;
    const lang = getCurrentLang();
    const q = query.toLowerCase().trim();

    if (!q) {
        searchResults.innerHTML = '';
        return;
    }

    const matches = searchPages.filter(p => {
        const title = p.title[lang] || p.title.en;
        return title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    });

    if (matches.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }

    // Determine base path
    const isSubpage = window.location.pathname.includes('/guides/') || window.location.pathname.includes('/examples/');
    const prefix = isSubpage ? '../' : '';

    searchResults.innerHTML = matches.map(p => {
        const title = p.title[lang] || p.title.en;
        return `<a class="search-result-item" href="${prefix}${p.url}">
            <div class="result-title">${title}</div>
            <div class="result-category">${p.category}</div>
        </a>`;
    }).join('');
}

function openSearch() {
    if (searchModal) {
        searchModal.classList.add('active');
        searchInput?.focus();
    }
}

function closeSearch() {
    if (searchModal) {
        searchModal.classList.remove('active');
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
}

if (searchToggle) {
    searchToggle.addEventListener('click', openSearch);
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearch();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchModal?.classList.contains('active') ? closeSearch() : openSearch();
    }
});

// Copy code functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.parentElement.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy';
            }, 2000);
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .module-card, .example-card, .path-item').forEach(el => {
    observer.observe(el);
});

// Syntax highlighting (called here at end of body so DOM is ready)
if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
}
