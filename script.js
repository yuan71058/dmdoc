document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const searchInput = document.getElementById('searchInput');

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

  const contentFrame = document.getElementById('contentFrame');
  const contentLinks = document.querySelectorAll('.nav-children .nav-link');
  contentLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const rawHref = link.getAttribute('href');
      if (rawHref && rawHref !== '#') {
        contentFrame.setAttribute('src', encodeURI(rawHref));
      }
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
