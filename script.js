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

  // 向 iframe 注入主题样式（通用解决方案）
  function injectThemeToIframe() {
    const contentFrame = document.getElementById('contentFrame');
    if (!contentFrame || !contentFrame.contentDocument) return;
    
    try {
      const iframeDoc = contentFrame.contentDocument;
      const isDark = document.body.classList.contains('dark-mode');
      
      // 检查是否已注入过样式
      if (iframeDoc.getElementById('parent-theme-injected-style')) return;
      
      // 创建样式元素
      const style = iframeDoc.createElement('style');
      style.id = 'parent-theme-injected-style';
      
      if (isDark) {
        style.textContent = `
          body {
            background-color: #1a1a2e !important;
            color: #eaeaea !important;
          }
          body * {
            color: inherit !important;
          }
          p, li, div, span {
            color: #eaeaea !important;
          }
          a {
            color: #4a9eff !important;
          }
          h1, h2, h3, h4, h5, h6 {
            color: #eaeaea !important;
          }
          .MsoNormal, .style1 {
            color: #eaeaea !important;
          }
          style {
            color: #4a9eff !important;
          }
        `;
      } else {
        style.textContent = `
          body {
            color: #333 !important;
          }
        `;
      }
      
      iframeDoc.head.appendChild(style);
    } catch (e) {
      console.warn('无法注入主题样式到 iframe:', e);
    }
  }

  // 向 iframe 发送主题消息
  function sendThemeToIframe() {
    const contentFrame = document.getElementById('contentFrame');
    const isDark = document.body.classList.contains('dark-mode');
    if (contentFrame && contentFrame.contentWindow) {
      try {
        contentFrame.contentWindow.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
      } catch (e) {
        console.warn('无法向 iframe 发送主题消息:', e);
      }
    }
    // 同时注入样式（作为后备方案）
    injectThemeToIframe();
  }

  // 主题切换按钮点击事件
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeButton(isDark);
      
      // 向 iframe 发送主题变化消息
      sendThemeToIframe();
    });
  }

  initTheme();
  
  // 监听来自 iframe 的主题请求
  window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'getTheme') {
      // 发送当前主题状态
      const isDark = document.body.classList.contains('dark-mode');
      try {
        event.source.postMessage({ theme: isDark ? 'dark' : 'light' }, event.origin || '*');
      } catch (e) {
        console.warn('无法响应 iframe 主题请求:', e);
      }
    }
  });
  
  // 等待 iframe 加载完成后发送主题
  window.addEventListener('load', function() {
    setTimeout(function() {
      sendThemeToIframe();
    }, 500);
  });

  // 监听 iframe 导航事件，在新页面加载时重新发送主题
  const contentFrame = document.getElementById('contentFrame');
  if (contentFrame) {
    contentFrame.addEventListener('load', function() {
      setTimeout(sendThemeToIframe, 300);
    });
    
    // 初始化时也注入样式
    setTimeout(sendThemeToIframe, 200);
  }
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

  menuToggle.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
    }
  });

  // 为移动端菜单按钮添加触摸优化
  if (menuToggle && window.innerWidth <= 768) {
    menuToggle.style.touchAction = 'manipulation';
    menuToggle.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    
    // 添加触摸开始事件，防止双击缩放
    menuToggle.addEventListener('touchstart', function(e) {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
      } else {
        sidebar.classList.toggle('collapsed');
      }
    }, { passive: false });
  }

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
