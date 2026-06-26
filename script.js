document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('searchInput');
  const themeToggle = document.getElementById('themeToggle');

  // ========== 主题切换功能 ==========
  function initTheme() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // 使用保存的设置
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeButton(true);
      } else {
        updateThemeButton(false);
      }
    } else {
      // 默认使用浅色主题
      // 根据时间段自动切换功能已注释
      // const hour = new Date().getHours();
      // 晚上 6 点到早上 6 点使用暗色主题
      // if (hour >= 18 || hour < 6) {
      //   document.body.classList.add('dark-mode');
      //   updateThemeButton(true);
      // } else {
      updateThemeButton(false);
      // }
    }
    
    // 监听时间变化，每小时检查一次 - 已注释
    // setInterval(() => {
    //   const hour = new Date().getHours();
    //   const isDarkTime = hour >= 18 || hour < 6;
    //   const hasDarkMode = document.body.classList.contains('dark-mode');
    //   
    //   if (isDarkTime && !hasDarkMode) {
    //     document.body.classList.add('dark-mode');
    //     localStorage.setItem('theme', 'dark');
    //     updateThemeButton(true);
    //   } else if (!isDarkTime && hasDarkMode) {
    //     document.body.classList.remove('dark-mode');
    //     localStorage.setItem('theme', 'light');
    //     updateThemeButton(false);
    //   }
    // }, 60000); // 每分钟检查一次
  }

  // 更新主题按钮图标
  function updateThemeButton(isDark) {
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.title = isDark ? '切换到亮色模式' : '切换到暗色模式';
    }
  }

  // 向 iframe 发送主题消息并注入样式
  function sendThemeToIframe() {
    const contentFrame = document.getElementById('contentFrame');
    const isDark = document.body.classList.contains('dark-mode');
    if (contentFrame) {
      try {
        // 方法1: 通过postMessage发送主题
        contentFrame.contentWindow.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
        
        // 方法2: 尝试向iframe内部注入暗色主题CSS(MSEdge等浏览器兼容)
        setTimeout(() => {
          try {
            const iframeDoc = contentFrame.contentDocument || contentFrame.contentWindow.document;
            if (iframeDoc && iframeDoc.body) {
              // 创建一个style标签注入暗色主题样式
              const darkStyle = iframeDoc.createElement('style');
              darkStyle.id = 'injected-dark-mode';
              darkStyle.textContent = `
                body.dark-mode {
                  background-color: #1a1a2e !important;
                  color: #eaeaea !important;
                }
                body.dark-mode h1,
                body.dark-mode h2,
                body.dark-mode h3,
                body.dark-mode h4,
                body.dark-mode h5,
                body.dark-mode h6 {
                  color: #eaeaea !important;
                }
                body.dark-mode p,
                body.dark-mode span,
                body.dark-mode div,
                body.dark-mode li,
                body.dark-mode td,
                body.dark-mode th {
                  color: #cccccc !important;
                }
                body.dark-mode a {
                  color: #4a9eff !important;
                }
                body.dark-mode .container {
                  background: #16213e !important;
                }
                body.dark-mode .feature-card {
                  background: #2d3748 !important;
                }
                body.dark-mode pre {
                  background: #1a1a2e !important;
                }
                body.dark-mode code {
                  background: #2d3748 !important;
                  color: #4a9eff !important;
                }
                body.dark-mode .intro-section {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }
                body.dark-mode .warning {
                  background: #7f1d1d !important;
                }
                body.dark-mode hr {
                  border-top-color: #2d3748 !important;
                }
                body:not(.dark-mode) #injected-dark-mode {
                  display: none;
                }
              `;
              // 移除已存在的旧样式
              const oldStyle = iframeDoc.getElementById('injected-dark-mode');
              if (oldStyle) oldStyle.remove();
              // 添加新样式
              iframeDoc.head.appendChild(darkStyle);
              
              // 应用或移除dark-mode类
              if (isDark) {
                iframeDoc.body.classList.add('dark-mode');
              } else {
                iframeDoc.body.classList.remove('dark-mode');
              }
            }
          } catch (e) {
            // 跨域限制时忽略错误
            console.log('iframe样式注入受限:', e.message);
          }
        }, 300);
      } catch (e) {
        // 跨域限制时忽略错误
        console.log('iframe访问受限:', e.message);
      }
    }
  }

  // 主题切换按钮点击事件
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeButton(isDark);
      
      // 向 iframe 发送主题变化消息并注入样式
      sendThemeToIframe();
    });
  }

  initTheme();
  
  // 初始化移动端sidebar状态
  function initSidebarState() {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('collapsed');
    } else {
      sidebar.classList.remove('mobile-open');
    }
  }
  initSidebarState();
  
  // 监听来自 iframe 的主题请求
  window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'getTheme') {
      // 发送当前主题状态
      const isDark = document.body.classList.contains('dark-mode');
      event.source.postMessage({ theme: isDark ? 'dark' : 'light' }, event.origin);
    }
  });
  
  // 等待 iframe 加载完成后发送主题
  window.addEventListener('load', function() {
    setTimeout(sendThemeToIframe, 200);
  });

  // 主页按钮点击事件
  const homeLink = document.querySelector('.home-link');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      // 设置 iframe 内容为简介页面
      const contentFrame = document.getElementById('contentFrame');
      if (contentFrame) {
        contentFrame.src = 'docs/简介.htm';
        // 发送当前主题状态
        sendThemeToIframe();
      }
    });
  }

  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });
  
  // 移动端:点击sidebar外部区域关闭菜单
  if (window.innerWidth <= 768) {
    document.addEventListener('click', function(e) {
      if (sidebar.classList.contains('mobile-open')) {
        if (!sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
          sidebar.classList.remove('mobile-open');
        }
      }
    });
  }
  
  // 窗口大小变化时同步sidebar状态
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('mobile-open');
    }
  });

  const sectionLinks = document.querySelectorAll('.nav-item > .nav-link[data-section]');
  sectionLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const children = link.nextElementSibling;
      if (children && children.classList.contains('nav-children')) {
        children.classList.toggle('expanded');
      }
    });
  });

  const contentLinks = document.querySelectorAll('.nav-children .nav-link');
  contentLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      contentLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });

  if (sectionLinks.length > 0) {
    const firstChildren = sectionLinks[0].nextElementSibling;
    if (firstChildren && firstChildren.classList.contains('nav-children')) {
      firstChildren.classList.add('expanded');
    }
  }

  searchInput.addEventListener('input', function () {
    const keyword = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll('.nav-children li');

    if (keyword === '') {
      items.forEach(function (item) { item.style.display = ''; });
      document.querySelectorAll('.nav-children').forEach(function (c) {
        c.classList.remove('expanded');
      });
      if (sectionLinks.length > 0) {
        const firstChildren = sectionLinks[0].nextElementSibling;
        if (firstChildren) firstChildren.classList.add('expanded');
      }
      return;
    }

    items.forEach(function (item) {
      const text = item.textContent.toLowerCase();
      if (text.indexOf(keyword) !== -1) {
        item.style.display = '';
        const parent = item.closest('.nav-children');
        if (parent) parent.classList.add('expanded');
      } else {
        item.style.display = 'none';
      }
    });
  });
});
