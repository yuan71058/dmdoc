document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('searchInput');

  // ========== 主题切换功能 ==========
  function initTheme() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // 使用保存的设置
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
      }
    } else {
      // 根据时间段自动切换
      const hour = new Date().getHours();
      // 晚上 6 点到早上 6 点使用暗色主题
      if (hour >= 18 || hour < 6) {
        document.body.classList.add('dark-mode');
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
      } else if (!isDarkTime && hasDarkMode) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    }, 60000); // 每分钟检查一次
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
