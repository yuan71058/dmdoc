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
      // 根据时间段自动切换
      const hour = new Date().getHours();
      // 晚上 6 点到早上 6 点使用暗色主题
      if (hour >= 18 || hour < 6) {
        document.body.classList.add('dark-mode');
        updateThemeButton(true);
      } else {
        updateThemeButton(false);
      }
    }
    
    // 监听时间变化，每小时检查一次
    setInterval(() => {
      const hour = new Date().getHours();
      const isDarkTime = hour >= 18 || hour < 6;
      const hasDarkMode = document.body.classList.contains('dark-mode');
      
      if (isDarkTime && !hasDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeButton(true);
      } else if (!isDarkTime && hasDarkMode) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateThemeButton(false);
      }
    }, 60000); // 每分钟检查一次
  }

  // 更新主题按钮图标
  function updateThemeButton(isDark) {
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.title = isDark ? '切换到亮色模式' : '切换到暗色模式';
    }
  }

  // 主题切换按钮点击事件
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeButton(isDark);
    });
  }

  initTheme();

  menuToggle.addEventListener('click', function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('mobile-open');
    } else {
      sidebar.classList.toggle('collapsed');
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
