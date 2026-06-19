/* ==========================================================================
   main.js — Portfólio Gustavo Barroso

   Responsabilidades deste arquivo:
     1. Traduções    — textos em PT e EN para toda a página
     2. Dados        — skills e projetos (edite aqui para atualizar o site)
     3. Constantes   — IDs de elementos DOM e configurações
     4. Utilitários  — funções que constroem fragmentos de HTML
     5. Renderização — funções que escrevem os dados no DOM
     6. Tema         — alternância escuro/claro com persistência em localStorage
     7. Idioma       — alternância PT/EN com re-renderização do conteúdo
     8. Eventos      — scroll suave, CV, tema e idioma
     9. Inicialização — ponto de entrada único
   ========================================================================== */


/* ==========================================================================
   1. TRADUÇÕES
   Objeto que centraliza todos os textos da página em dois idiomas.
   Estrutura de chaves idêntica em "pt" e "en" para facilitar a busca.
   O atributo data-i18n no HTML indica qual chave cada elemento usa.
   ========================================================================== */
const TRANSLATIONS = {
  pt: {
    /* Navbar */
    'nav.about':        'Sobre',
    'nav.projects':     'Projetos',
    'nav.skills':       'Skills',
    'nav.contact':      'Contato',
    'nav.cv':           'CV',
    'nav.theme.label':  'Mudar para tema claro',
    'nav.lang.label':   'Switch to English',
    'nav.lang.toggle':  'EN',  /* Sigla exibida no botão (indica o outro idioma) */

    /* Hero */
    'hero.greeting':         'Olá, eu sou',
    'hero.description':      'Desenvolvedor focado em automação de processos, análise de dados e segurança da informação — transformando rotinas manuais em soluções eficientes.',
    'hero.cta.projects':     'Ver projetos →',
    'hero.cta.contact':      'Contato',

    /* Seções */
    'skills.title':          'Skills',
    'projects.title':        'Projetos',

    /* Contato */
    'contact.title':         'Vamos trabalhar juntos?',
    'contact.description':   'Disponível para projetos de automação, análise de dados e oportunidades full-time.',
    'contact.email':         'Enviar e-mail',

    /* Projetos — título e stack (referenciados nos dados de PROJECTS) */
    'project.rats.title':      'Automação de RATs',
    'project.forensics.title': 'Forense Digital — Cadeia de Custódia',
    'project.apps.title':      'Apps de Controle',
    'project.link':            'Ver projeto',
  },

  en: {
    /* Navbar */
    'nav.about':        'About',
    'nav.projects':     'Projects',
    'nav.skills':       'Skills',
    'nav.contact':      'Contact',
    'nav.cv':           'CV',
    'nav.theme.label':  'Switch to light theme',
    'nav.lang.label':   'Mudar para Português',
    'nav.lang.toggle':  'PT',

    /* Hero */
    'hero.greeting':         'Hi, I\'m',
    'hero.description':      'Developer focused on process automation, data analysis, and information security — turning manual routines into efficient solutions.',
    'hero.cta.projects':     'View projects →',
    'hero.cta.contact':      'Contact',

    /* Seções */
    'skills.title':          'Skills',
    'projects.title':        'Projects',

    /* Contato */
    'contact.title':         'Let\'s work together?',
    'contact.description':   'Available for automation projects, data analysis, and full-time opportunities.',
    'contact.email':         'Send email',

    /* Projetos */
    'project.rats.title':      'RAT Automation',
    'project.forensics.title': 'Digital Forensics — Chain of Custody',
    'project.apps.title':      'Control Apps',
    'project.link':            'View project',
  }
};


/* ==========================================================================
   2. DADOS
   Arrays de skills e projetos. As chaves de tradução (titleKey) permitem
   que o JS busque o texto correto conforme o idioma ativo.
   ========================================================================== */

/**
 * Lista de habilidades exibidas na seção Skills.
 * @type {Array<{label: string, svg: string}>}
 */
const SKILLS = [
  {
    label: 'Python',
    svg: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>'
  },
  {
    label: 'SQL',
    svg: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>'
  },
  {
    label: 'Power BI',
    svg: '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>'
  },
  {
    label: 'SAP',
    svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'
  },
  {
    label: 'Power Automate',
    svg: '<circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3"/>'
  },
  {
    label: 'Power Apps',
    svg: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  },
  {
    label: 'Git / GitHub',
    svg: '<circle cx="12" cy="12" r="3"/><line x1="3" y1="9" x2="9" y2="9"/><line x1="15" y1="15" x2="21" y2="15"/><line x1="6" y1="3" x2="6" y2="9"/><line x1="18" y1="15" x2="18" y2="21"/>'
  },
  {
    label: 'Cyber Security',
    svg: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/>'
  },
  {
    label: 'Cloud / IA',
    svg: '<path d="M17.5 19a4.5 4.5 0 1 0 0-9 5.5 5.5 0 0 0-10.7-1.5A4 4 0 1 0 6 19z"/>'
  },
  {
    label: 'Pacote Office',
    svg: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
  }
];

/**
 * Lista de projetos exibidos na seção Projetos.
 * titleKey: chave de tradução para buscar o título no idioma ativo.
 * @type {Array<{titleKey: string, stack: string, contactAnchor: string, svgPath: string}>}
 */
const PROJECTS = [
  {
    titleKey: 'project.rats.title',
    stack: 'Python (FastAPI) + Notion + Google Drive',
    contactAnchor: '#contato',
    svgPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>'
  },
  {
    titleKey: 'project.forensics.title',
    stack: 'Python + Forense Digital + Chain of Custody',
    /* Link real do repositório no GitHub — abre em nova aba.
       Diferente dos outros projetos (que ainda usam #contato como
       placeholder), este já tem um link público definitivo. */
    contactAnchor: 'https://github.com/Gustavo988/forense-digital-chain-of-custody',
    externalLink: true,
    svgPath: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M9 16h6M9 8h2"/><circle cx="6.5" cy="8" r="0.5" fill="currentColor"/>'
  },
  {
    titleKey: 'project.apps.title',
    stack: 'Power Apps + Power Automate',
    contactAnchor: '#contato',
    svgPath: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
  }
];


/* ==========================================================================
   3. CONSTANTES
   IDs e configurações centralizadas para evitar "magic strings" no código.
   ========================================================================== */

const ID_SKILLS_GRID  = 'js-skills-grid';
const ID_PROJECTS_GRID = 'js-projects-grid';
const ID_CV_BUTTON    = 'js-cv-btn';
const ID_THEME_BTN    = 'js-theme-btn';
const ID_LANG_BTN     = 'js-lang-btn';
const ID_LANG_LABEL   = 'js-lang-label';

const STORAGE_KEY_THEME = 'portfolio-theme';  /* Chave usada no localStorage */
const STORAGE_KEY_LANG  = 'portfolio-lang';

/** URL do currículo em PDF. Deixe vazio para exibir alerta de configuração. */
const CV_URL = '';


/* ==========================================================================
   4. UTILITÁRIOS
   Funções puras: recebem dados, retornam strings HTML. Não acessam o DOM.
   ========================================================================== */

/**
 * Retorna o texto traduzido para a chave e idioma informados.
 * Se a chave não existir, retorna a própria chave como fallback seguro.
 *
 * @param {string} key  — Chave de tradução (ex: 'hero.greeting')
 * @param {string} lang — Código do idioma ('pt' | 'en')
 * @returns {string}
 */
function t(key, lang) {
  return TRANSLATIONS[lang]?.[key] ?? key;
}

/**
 * Constrói um SVG de ícone padrão (30×30) com o conteúdo informado.
 * aria-hidden="true": oculta do leitor de tela (ícone decorativo).
 *
 * @param {string} pathData — Elementos internos do SVG
 * @returns {string}
 */
function buildIconSvg(pathData) {
  return `
    <svg width="30" height="30" viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      ${pathData}
    </svg>
  `;
}

/**
 * Constrói um SVG de seta diagonal para o link "Ver projeto".
 *
 * @param {number} [size=13]
 * @returns {string}
 */
function buildArrowSvg(size = 13) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24"
         fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>
  `;
}


/* ==========================================================================
   5. RENDERIZAÇÃO
   Funções que escrevem HTML gerado a partir dos dados no DOM.
   Recebem o idioma ativo como parâmetro para buscar as traduções corretas.
   ========================================================================== */

/**
 * Gera e insere os itens de skill no container.
 * Skills não têm tradução (nomes técnicos são universais).
 *
 * @param {typeof SKILLS} skills
 * @param {HTMLElement}   container
 */
function renderSkills(skills, container) {
  const items = skills.map(({ label, svg }) => `
    <li class="skill">
      ${buildIconSvg(svg)}
      <span class="skill__label">${label}</span>
    </li>
  `).join('');

  container.innerHTML = items;
}

/**
 * Gera e insere os cards de projeto no container.
 * Usa t() para buscar o título traduzido conforme o idioma ativo.
 *
 * @param {typeof PROJECTS} projects
 * @param {HTMLElement}     container
 * @param {string}          lang — Idioma ativo ('pt' | 'en')
 */
/**
 * Gera e insere os cards de projeto no container.
 * Usa t() para buscar o título traduzido conforme o idioma ativo.
 *
 * Projetos com externalLink: true apontam para uma URL real (ex: GitHub)
 * e abrem em nova aba com rel="noopener noreferrer" por segurança.
 * Projetos sem essa flag usam contactAnchor como âncora interna (#contato).
 *
 * @param {typeof PROJECTS} projects
 * @param {HTMLElement}     container
 * @param {string}          lang — Idioma ativo ('pt' | 'en')
 */
function renderProjects(projects, container, lang) {
  const cards = projects.map(({ titleKey, stack, contactAnchor, svgPath, externalLink }) => {
    /* Define os atributos do link conforme o tipo: externo (GitHub) ou interno (#contato) */
    const linkAttrs = externalLink
      ? `href="${contactAnchor}" target="_blank" rel="noopener noreferrer"`
      : `href="${contactAnchor}"`;

    return `
    <article class="project">
      <div class="project__icon">
        ${buildIconSvg(svgPath)}
      </div>
      <h3 class="project__title">${t(titleKey, lang)}</h3>
      <p class="project__stack">${stack}</p>
      <a class="project__link" ${linkAttrs}>
        ${t('project.link', lang)} ${buildArrowSvg()}
      </a>
    </article>
  `;
  }).join('');

  container.innerHTML = cards;
}

/**
 * Atualiza todos os elementos com atributo data-i18n na página.
 * Percorre o DOM buscando a chave de cada elemento e substitui o texto.
 * Também atualiza atributos dinâmicos do botão de idioma.
 *
 * @param {string} lang — Idioma para o qual traduzir ('pt' | 'en')
 */
function applyTranslations(lang) {
  /* Atualiza elementos estáticos com data-i18n */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, lang);
  });

  /* Atualiza o aria-label e o texto do botão de idioma */
  const langBtn   = document.getElementById(ID_LANG_BTN);
  const langLabel = document.getElementById(ID_LANG_LABEL);
  if (langBtn)   langBtn.setAttribute('aria-label', t('nav.lang.label', lang));
  if (langLabel) langLabel.textContent = t('nav.lang.toggle', lang);

  /* Atualiza o aria-label do botão de tema */
  const themeBtn = document.getElementById(ID_THEME_BTN);
  if (themeBtn)  themeBtn.setAttribute('aria-label', t('nav.theme.label', lang));

  /* Atualiza o atributo lang do <html> para acessibilidade e SEO */
  document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
}


/* ==========================================================================
   6. TEMA
   Alterna entre tema escuro e claro escrevendo data-theme no <html>.
   A preferência é salva no localStorage para persistir entre sessões.
   ========================================================================== */

/**
 * Lê o tema salvo no localStorage.
 * Se nenhum tema foi salvo, retorna 'dark' como padrão.
 *
 * @returns {'dark' | 'light'}
 */
function getSavedTheme() {
  return localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
}

/**
 * Aplica o tema informado ao <html> e salva a preferência.
 *
 * @param {'dark' | 'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY_THEME, theme);
}

/**
 * Alterna entre os temas escuro e claro.
 * Lê o tema atual no atributo data-theme do <html> e inverte.
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme    = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}


/* ==========================================================================
   7. IDIOMA
   Alterna entre PT e EN, re-renderizando os textos dinâmicos
   e chamando applyTranslations para os textos estáticos.
   A preferência é salva no localStorage.
   ========================================================================== */

/**
 * Lê o idioma salvo no localStorage.
 * Padrão: 'pt'.
 *
 * @returns {'pt' | 'en'}
 */
function getSavedLang() {
  return localStorage.getItem(STORAGE_KEY_LANG) || 'pt';
}

/**
 * Aplica o idioma: traduz textos estáticos, re-renderiza conteúdo
 * dinâmico (projetos) e salva a preferência.
 *
 * @param {'pt' | 'en'} lang
 */
function applyLang(lang) {
  /* Salva a preferência do usuário */
  localStorage.setItem(STORAGE_KEY_LANG, lang);

  /* Atualiza o atributo data-lang no <html> (útil para debug e extensões) */
  document.documentElement.setAttribute('data-lang', lang);

  /* Traduz textos estáticos (data-i18n) */
  applyTranslations(lang);

  /* Re-renderiza projetos pois seus títulos mudam com o idioma */
  const projectsGrid = document.getElementById(ID_PROJECTS_GRID);
  if (projectsGrid) renderProjects(PROJECTS, projectsGrid, lang);
}

/**
 * Alterna entre PT e EN e aplica o novo idioma.
 */
function toggleLang() {
  const currentLang = document.documentElement.getAttribute('data-lang') || 'pt';
  const nextLang    = currentLang === 'pt' ? 'en' : 'pt';
  applyLang(nextLang);
}


/* ==========================================================================
   8. EVENTOS
   ========================================================================== */

/**
 * Scroll suave para links de âncora internos.
 * Guard clauses antecipam saídas inválidas sem aninhamento de if/else.
 *
 * @param {MouseEvent} event
 */
function handleSmoothScroll(event) {
  const href = event.currentTarget.getAttribute('href');
  const isValidAnchor = href && href.startsWith('#') && href.length > 1;
  if (!isValidAnchor) return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Abre o currículo em nova aba, ou exibe alerta se CV_URL estiver vazio.
 *
 * @param {MouseEvent} event
 */
function handleCvClick(event) {
  event.preventDefault();

  if (CV_URL) {
    window.open(CV_URL, '_blank', 'noopener,noreferrer');
  } else {
    alert('Adicione o link do seu currículo na constante CV_URL em main.js.');
  }
}

/**
 * Registra o scroll suave em todos os links de âncora da página.
 */
function bindSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });
}

/**
 * Registra os eventos nos botões da navbar.
 * Guards (if btn) previnem erros caso algum elemento não exista.
 */
function bindNavButtons() {
  const cvBtn    = document.getElementById(ID_CV_BUTTON);
  const themeBtn = document.getElementById(ID_THEME_BTN);
  const langBtn  = document.getElementById(ID_LANG_BTN);

  if (cvBtn)    cvBtn.addEventListener('click', handleCvClick);
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (langBtn)  langBtn.addEventListener('click', toggleLang);
}


/* ==========================================================================
   9. INICIALIZAÇÃO
   Ponto de entrada único: restaura preferências, renderiza conteúdo
   e registra eventos. Executado após o DOM estar completamente carregado.
   ========================================================================== */

/**
 * Inicializa a página na ordem correta:
 * 1. Aplica tema salvo (evita flash de tema errado)
 * 2. Renderiza skills (sem tradução — nomes técnicos)
 * 3. Aplica idioma salvo (renderiza projetos + traduz textos estáticos)
 * 4. Registra eventos de interação
 */
function init() {
  /* 1. Tema */
  applyTheme(getSavedTheme());

  /* 2. Skills */
  const skillsGrid = document.getElementById(ID_SKILLS_GRID);
  if (skillsGrid) renderSkills(SKILLS, skillsGrid);

  /* 3. Idioma (inclui renderização de projetos) */
  applyLang(getSavedLang());

  /* 4. Eventos */
  bindSmoothScroll();
  bindNavButtons();
}

document.addEventListener('DOMContentLoaded', init);