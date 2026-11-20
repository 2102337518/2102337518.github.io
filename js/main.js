/* =====================================================================
 * main.js — 页面渲染与交互
 * 从 content.js 读取 SITE_DATA，渲染整页内容；
 * 处理中英切换（localStorage 记忆）与深浅色切换。
 * 一般不需要修改这个文件。
 * ===================================================================== */
(function () {
  'use strict';

  var DATA = window.SITE_DATA;
  var APP = document.getElementById('app');
  var BRAND = document.getElementById('site-brand');
  var LANG_BTN = document.getElementById('lang-btn');
  var THEME_BTN = document.getElementById('theme-btn');
  var FOOTER_COPY = document.getElementById('footer-copy');
  var LANG_KEY = 'site-lang';
  var THEME_KEY = 'site-theme';

  if (!DATA) {
    APP.innerHTML = '<p class="boot-msg">加载失败：请确认 js/content.js 存在且格式正确。<br>' +
      'Failed to load: please check js/content.js exists and is valid.</p>';
    return;
  }

  /* ---------- 安全的 localStorage 存取 ----------
   * 部分浏览器（禁用 Cookie、沙箱 iframe 等）访问 localStorage 会直接抛异常，
   * 必须用 try/catch 保护，否则整个页面会卡在加载状态。 */
  function storeGet(k) {
    try { return window.localStorage.getItem(k); } catch (e) { return null; }
  }
  function storeSet(k, v) {
    try { window.localStorage.setItem(k, v); } catch (e) { /* 忽略存储失败 */ }
  }

  /* ---------- 语言 ---------- */
  /* 默认英文；用户手动切换过的选择保存在 localStorage，优先于默认值 */
  var lang = storeGet(LANG_KEY);
  if (lang !== 'zh' && lang !== 'en') {
    lang = 'en';
  }

  /* 取当前语言下的文本：双语字段返回对应语言，普通字段原样返回 */
  function t(v) {
    if (v && typeof v === 'object') {
      if (v[lang]) return v[lang];
      if (v.en) return v.en;
      return '';
    }
    return (v === undefined || v === null) ? '' : String(v);
  }

  /* HTML 转义，防止内容中的特殊字符破坏页面结构 */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- 图标库（内联 SVG） ---------- */
  var STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    /* 品牌图标（填充式） */
    github:  { fill: true, body: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>' },
    scholar: { fill: true, body: '<path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>' },
    linkedin:{ fill: true, body: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>' },
    x:       { fill: true, body: '<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>' },
    /* 线性图标（描边式） */
    email:   { body: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
    bilibili: { body: '<rect x="2" y="5" width="20" height="13" rx="2"/><path d="M8 5l4-3 4 3"/><path d="M7 22v-4"/><path d="M17 22v-4"/><path d="M10 11.5h.01"/><path d="M14 11.5h.01"/>' },
    zhihu:   { text: '知' },
    youtube: { body: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
    external:{ body: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>' },
    file:    { body: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    code:    { body: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
    homepage:{ body: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    image:   { body: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' }
  };

  function icon(name, size) {
    var d = ICONS[name];
    if (!d) return '';
    var s = size || 17;
    if (d.text) {
      return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true">' +
        '<text x="12" y="17" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor" font-family="\'Noto Sans SC\', sans-serif">' + d.text + '</text></svg>';
    }
    var attrs = d.fill ? 'fill="currentColor"' : STROKE;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true" ' + attrs + '>' + d.body + '</svg>';
  }

  /* ---------- 链接按钮（小胶囊样式） ---------- */
  function linkChip(l) {
    if (!l || !l.url) return '';
    var label = t(l.label) || 'Link';
    var ic = l.icon ? icon(l.icon, 14) : icon('external', 14);
    var external = /^https?:\/\//.test(l.url) ? ' target="_blank" rel="noopener"' : '';
    return '<a class="chip" href="' + esc(l.url) + '"' + external + '>' + ic + '<span>' + esc(label) + '</span></a>';
  }

  /* ---------- 各板块模板 ---------- */
  function profileHTML() {
    var p = DATA.profile;
    var links = (p.links || []).map(function (l) {
      var external = /^https?:\/\//.test(l.url) ? ' target="_blank" rel="noopener"' : '';
      return '<a class="social-link" href="' + esc(l.url) + '"' + external + ' title="' + esc(t(l.label)) + '">' +
        icon(l.icon, 18) + '<span>' + esc(t(l.label)) + '</span></a>';
    }).join('');
    var cv = p.cv ? '<a class="btn-cv" href="' + esc(p.cv) + '" target="_blank" rel="noopener">' +
      icon('file', 15) + '<span>' + (lang === 'zh' ? '简历 / CV' : 'CV / Résumé') + '</span></a>' : '';

    return '' +
      '<section class="section profile" id="about">' +
        '<img class="avatar" src="' + esc(p.avatar) + '" alt="' + esc(t(p.name)) + '">' +
        '<div class="profile-text">' +
          '<h1 class="name">' + esc(t(p.name)) + '</h1>' +
          (p.role ? '<p class="role">' + esc(t(p.role)) + '</p>' : '') +
          (p.affiliation ? '<p class="affiliation">' + esc(t(p.affiliation)) + '</p>' : '') +
          (p.bio ? '<p class="bio">' + esc(t(p.bio)) + '</p>' : '') +
          '<div class="social-row">' + links + '</div>' +
          cv +
        '</div>' +
      '</section>';
  }

  function newsHTML() {
    var items = DATA.news || [];
    if (!items.length) return '';
    var lis = items.map(function (n) {
      return '<li><span class="news-date">' + esc(n.date) + '</span>' + esc(t(n)) + '</li>';
    }).join('');
    return '<section class="section" id="news">' +
      '<h2>' + (lang === 'zh' ? '新闻' : 'News') + '</h2>' +
      '<ul class="news-list">' + lis + '</ul>' +
      '</section>';
  }

  function projectsHTML() {
    var items = DATA.projects || [];
    if (!items.length) return '';
    var cards = items.map(function (pr) {
      var thumb;
      if (pr.img) {
        /* 项目图 alt 留空：紧邻的 <h3> 已给出项目名，避免读屏重复播报 */
        thumb = '<img class="project-thumb-img" loading="lazy" src="' + esc(pr.img) + '" alt="">';
      } else {
        thumb = '<div class="project-thumb-fallback">' + icon('image', 34) + '</div>';
      }
      var tags = (pr.tags || []).map(function (tag) {
        return '<span class="tag">' + esc(tag) + '</span>';
      }).join('');
      var chips = (pr.links || []).map(linkChip).join('');
      return '<article class="project-card">' +
        '<div class="project-thumb">' + thumb + '</div>' +
        '<div class="project-body">' +
          '<h3 class="project-title">' + esc(t(pr.title)) + '</h3>' +
          (tags ? '<div class="project-tags">' + tags + '</div>' : '') +
          (pr.desc ? '<p class="project-desc">' + esc(t(pr.desc)) + '</p>' : '') +
          (pr.video ? '<video class="project-video" controls muted playsinline preload="metadata"' + (pr.img ? ' poster="' + esc(pr.img) + '"' : '') + ' src="' + esc(pr.video) + '"></video>' : '') +
          (pr.diagram ? '<figure class="project-figure"><a href="' + esc(pr.diagram) + '" target="_blank" rel="noopener" title="' + (lang === 'zh' ? '点击查看大图' : 'Click to enlarge') + '"><img class="project-diagram" loading="lazy" src="' + esc(pr.diagram) + '" alt="' + esc(t(pr.title)) + '"></a><figcaption>' + (lang === 'zh' ? '算法框图' : 'Network Architecture') + '</figcaption></figure>' : '') +
          (chips ? '<div class="project-links">' + chips + '</div>' : '') +
        '</div>' +
      '</article>';
    }).join('');
    return '<section class="section" id="projects">' +
      '<h2>' + (lang === 'zh' ? '项目' : 'Projects') + '</h2>' +
      '<div class="projects-grid">' + cards + '</div>' +
      '</section>';
  }

  function experienceHTML() {
    var items = DATA.experience || [];
    if (!items.length) return '';
    var rows = items.map(function (e) {
      return '<div class="exp-item">' +
        '<div class="exp-period">' + esc(e.period) + '</div>' +
        '<div class="exp-body">' +
          '<div class="exp-org">' + esc(t(e.org)) + '</div>' +
          (e.role ? '<div class="exp-role">' + esc(t(e.role)) + '</div>' : '') +
          (e.desc ? '<p class="exp-desc">' + esc(t(e.desc)) + '</p>' : '') +
        '</div>' +
      '</div>';
    }).join('');
    return '<section class="section" id="experience">' +
      '<h2>' + (lang === 'zh' ? '经历' : 'Experience') + '</h2>' +
      '<div class="exp-list">' + rows + '</div>' +
      '</section>';
  }

  function honorsHTML() {
    var items = DATA.honors || [];
    if (!items.length) return '';
    var rows = items.map(function (h) {
      return '<li>' +
        (h.year ? '<span class="honor-year">' + esc(h.year) + '</span>' : '') +
        esc(t(h)) +
      '</li>';
    }).join('');
    return '<section class="section" id="honors">' +
      '<h2>' + (lang === 'zh' ? '荣誉奖项' : 'Honors &amp; Awards') + '</h2>' +
      '<ul class="honor-list">' + rows + '</ul>' +
      '</section>';
  }

  function publicationsHTML() {
    var items = DATA.publications || [];
    if (!items.length) return '';
    var rows = items.map(function (p) {
      var chips = (p.links || []).map(linkChip).join('');
      return '<div class="pub-item">' +
        '<div class="pub-title">' + esc(p.title) + '</div>' +
        (p.authors ? '<div class="pub-authors">' + esc(p.authors) + '</div>' : '') +
        (p.venue ? '<div class="pub-venue">' + esc(p.venue) + '</div>' : '') +
        (chips ? '<div class="pub-links">' + chips + '</div>' : '') +
      '</div>';
    }).join('');
    return '<section class="section" id="publications">' +
      '<h2>' + (lang === 'zh' ? '论文' : 'Publications') + '</h2>' +
      '<div class="pub-list">' + rows + '</div>' +
      '</section>';
  }

  /* ---------- 渲染 ---------- */
  function render() {
    document.documentElement.lang = lang;
    document.title = t(DATA.profile.name) + (lang === 'zh' ? ' — 个人主页' : ' — Personal Homepage');
    if (BRAND) BRAND.textContent = t(DATA.profile.name);
    if (LANG_BTN) LANG_BTN.textContent = lang === 'zh' ? 'EN' : '中文';
    if (LANG_BTN) LANG_BTN.setAttribute('aria-label', lang === 'zh' ? 'Switch to English / 切换到英文' : '切换到中文 / Switch to Chinese');
    if (FOOTER_COPY) FOOTER_COPY.textContent = t(DATA.footer);

    /* 页脚的双语说明：只显示当前语言的一句（index.html 中带 data-lang 的 span） */
    if (document.querySelectorAll) {
      var noteEls = document.querySelectorAll('.footer-note [data-lang]');
      for (var i = 0; i < noteEls.length; i++) {
        noteEls[i].style.display = noteEls[i].getAttribute('data-lang') === lang ? '' : 'none';
      }
    }

    APP.innerHTML = profileHTML() + newsHTML() + projectsHTML() + experienceHTML() + honorsHTML() + publicationsHTML();
  }

  LANG_BTN.addEventListener('click', function () {
    lang = lang === 'zh' ? 'en' : 'zh';
    storeSet(LANG_KEY, lang);
    render();
  });

  /* ---------- 深浅色主题 ---------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (THEME_BTN) {
      THEME_BTN.classList.toggle('is-dark', theme === 'dark');
      THEME_BTN.setAttribute('aria-label', theme === 'dark'
        ? '切换到浅色模式 / Switch to light mode'
        : '切换深色模式 / Toggle dark mode');
    }
  }

  var savedTheme = storeGet(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  THEME_BTN.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storeSet(THEME_KEY, next);
  });

  render();
})();
