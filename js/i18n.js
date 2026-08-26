// ============================================================
// i18n — Language Switcher (EN / ID)
// ============================================================

'use strict';

const TRANSLATIONS = {
  en: {
    // ---- Navbar ----
    'nav.home':       'Home',
    'nav.about':      'About',
    'nav.skills':     'Skills',
    'nav.projects':   'Projects',
    'nav.experience': 'Experience',
    'nav.contact':    'Contact',
    'nav.cv':         'CV',
    'nav.cv.mobile':  'Download CV',
    // ---- Hero ----
    'hero.badge':  'Computer Systems Student',
    'hero.heading':'Hello, I\'m',
    'hero.sub':    'I build digital experiences, web applications, and creative solutions through technology.',
    'hero.cta1':   'View My Work',
    'hero.cta2':   'Contact Me',
    'hero.scroll': 'scroll',
    // ---- About ----
    'about.label':        'About Me',
    'about.title':        'Passionate about',
    'about.title2':       'tech & design.',
    'about.p1':           "I'm <strong>Een Vandicto Satya Ady</strong>, a Computer Systems / Computer Engineering student with a genuine curiosity for how technology shapes the world around us. From writing clean code to designing intuitive interfaces, I enjoy the intersection of technical precision and creative thinking.",
    'about.p2':           "My work spans web development, IT support, graphic design, and software exploration. I believe great digital products are born at the intersection of solid engineering and thoughtful design — and that's exactly the space I want to grow in.",
    'about.p3':           'Currently open to freelance projects, collaborations, and new opportunities to build something meaningful.',
    'about.card1.label':  'Education',
    'about.card1.value':  'Computer Systems / Computer Engineering Student',
    'about.card2.label':  'Expertise',
    'about.card2.value':  'Web Development · IT Systems · Graphic Design',
    'about.card3.label':  'Interest',
    'about.card3.value':  'Technology · UI/UX · Creative Design',
    'about.card4.label':  'Availability',
    'about.card4.value':  'Open for Freelance & Collaboration',
    // ---- Skills ----
    'skills.label': 'Tech Stack',
    'skills.title': 'Tools I work with.',
    // ---- Projects ----
    'projects.label':  'Selected Projects',
    'projects.title':  "Things I've ",
    'projects.title2': 'worked on.',
    'proj1.title': 'Laptop & Computer Repair',
    'proj1.desc':  'Laptop and computer repair services including deep cleaning, thermal paste replacement, RAM & SSD upgrades, as well as hardware and software troubleshooting to boost overall device performance.',
    'proj2.title': 'Network Switch Replacement',
    'proj2.desc':  'Freelance project replacing a 24-port network switch at a state-owned bank. Covered downtime planning, configuration migration, device installation, connectivity testing, and network documentation.',
    'proj3.title': 'UMKM Sate Jamur — Web Profile',
    'proj3.desc':  "Business profile website built for a local mushroom satay food stall. Features menu, product gallery, location, and contact info. Designed with a modern, responsive layout to strengthen the business's digital presence.",
    'proj.view':   'View Details',
    // ---- Experience ----
    'exp.label':    'Experience',
    'exp.title':    "Where I've",
    'exp.title2':   'made an impact.',
    'exp.sub':      'A collection of professional experiences across design, IT, and technical support roles.',
    'exp1.role':    'Freelance Graphic Designer',
    'exp1.company': 'ITO DESIGN',
    'exp1.desc':    'Creating visual identities, branding materials, and digital design assets for various clients. Specializing in logo design, poster creation, and social media graphics.',
    'exp2.role':    'Freelance Computer Technician',
    'exp2.company': 'Computer & Laptop Maintenance',
    'exp2.desc':    'Providing computer and laptop repair services including hardware troubleshooting, OS installation, performance optimization, and component upgrades for individual and small business clients.',
    'exp3.role':    'IT Vendor / Freelance IT Support',
    'exp3.company': 'Network & Hardware Services',
    'exp3.desc':    'Handling network setup, hardware configuration, and IT infrastructure support for clients. Tasks include network cable installation, router configuration, and general IT consultation.',
    // ---- Footer ----
    'footer.role':      'Computer Systems Student & IT Enthusiast',
    'footer.available': 'Available for Collaboration',
    'footer.nav':       'Navigation',
    'footer.contact':   'Contact',
    'footer.copy':      'All rights reserved.',
    'footer.built':     'Built with HTML · CSS · JavaScript',
  },

  id: {
    // ---- Navbar ----
    'nav.home':       'Beranda',
    'nav.about':      'Tentang',
    'nav.skills':     'Keahlian',
    'nav.projects':   'Proyek',
    'nav.experience': 'Pengalaman',
    'nav.contact':    'Kontak',
    'nav.cv':         'CV',
    'nav.cv.mobile':  'Unduh CV',
    // ---- Hero ----
    'hero.badge':  'Mahasiswa Sistem Komputer',
    'hero.heading':'Halo, saya',
    'hero.sub':    'Saya membangun pengalaman digital, aplikasi web, dan solusi kreatif melalui teknologi.',
    'hero.cta1':   'Lihat Karya Saya',
    'hero.cta2':   'Hubungi Saya',
    'hero.scroll': 'gulir',
    // ---- About ----
    'about.label':        'Tentang Saya',
    'about.title':        'Bersemangat tentang',
    'about.title2':       'teknologi & desain.',
    'about.p1':           'Saya <strong>Een Vandicto Satya Ady</strong>, mahasiswa Sistem Komputer / Teknik Komputer dengan rasa ingin tahu yang besar tentang bagaimana teknologi membentuk dunia di sekitar kita. Dari menulis kode yang bersih hingga merancang antarmuka yang intuitif, saya menikmati perpaduan antara presisi teknis dan pemikiran kreatif.',
    'about.p2':           'Pekerjaan saya mencakup pengembangan web, dukungan IT, desain grafis, dan eksplorasi perangkat lunak. Saya percaya produk digital yang hebat lahir dari perpaduan rekayasa yang solid dan desain yang thoughtful — dan itulah ruang yang ingin saya kembangkan.',
    'about.p3':           'Saat ini terbuka untuk proyek freelance, kolaborasi, dan peluang baru untuk membangun sesuatu yang bermakna.',
    'about.card1.label':  'Pendidikan',
    'about.card1.value':  'Mahasiswa Sistem Komputer / Teknik Komputer',
    'about.card2.label':  'Keahlian',
    'about.card2.value':  'Pengembangan Web · Sistem IT · Desain Grafis',
    'about.card3.label':  'Minat',
    'about.card3.value':  'Teknologi · UI/UX · Desain Kreatif',
    'about.card4.label':  'Ketersediaan',
    'about.card4.value':  'Terbuka untuk Freelance & Kolaborasi',
    // ---- Skills ----
    'skills.label': 'Tech Stack',
    'skills.title': 'Alat yang saya gunakan.',
    // ---- Projects ----
    'projects.label':  'Proyek Pilihan',
    'projects.title':  'Hal yang telah ',
    'projects.title2': 'saya kerjakan.',
    'proj1.title': 'Servis Laptop & Komputer',
    'proj1.desc':  'Layanan servis laptop dan komputer meliputi pembersihan menyeluruh, penggantian pasta termal, upgrade RAM & SSD, serta troubleshooting hardware dan software untuk meningkatkan performa perangkat secara keseluruhan.',
    'proj2.title': 'Penggantian Network Switch',
    'proj2.desc':  'Proyek freelance penggantian network switch 24-port di bank BUMN. Mencakup perencanaan downtime, migrasi konfigurasi, instalasi perangkat, pengujian konektivitas, dan dokumentasi jaringan.',
    'proj3.title': 'UMKM Sate Jamur — Web Profile',
    'proj3.desc':  'Website profil bisnis yang dibangun untuk warung sate jamur lokal. Menampilkan menu, galeri produk, lokasi, dan informasi kontak. Dirancang dengan tata letak modern dan responsif untuk memperkuat kehadiran digital usaha.',
    'proj.view':   'Lihat Detail',
    // ---- Experience ----
    'exp.label':    'Pengalaman',
    'exp.title':    'Di mana saya telah',
    'exp.title2':   'memberikan dampak.',
    'exp.sub':      'Kumpulan pengalaman profesional di bidang desain, IT, dan peran dukungan teknis.',
    'exp1.role':    'Desainer Grafis Freelance',
    'exp1.company': 'ITO DESIGN',
    'exp1.desc':    'Membuat identitas visual, materi branding, dan aset desain digital untuk berbagai klien. Spesialisasi dalam desain logo, pembuatan poster, dan grafis media sosial.',
    'exp2.role':    'Teknisi Komputer Freelance',
    'exp2.company': 'Servis Komputer & Laptop',
    'exp2.desc':    'Menyediakan layanan perbaikan komputer dan laptop termasuk troubleshooting hardware, instalasi OS, optimasi performa, dan upgrade komponen untuk klien individu dan usaha kecil.',
    'exp3.role':    'IT Vendor / IT Support Freelance',
    'exp3.company': 'Layanan Jaringan & Hardware',
    'exp3.desc':    'Menangani setup jaringan, konfigurasi hardware, dan dukungan infrastruktur IT untuk klien. Tugas meliputi instalasi kabel jaringan, konfigurasi router, dan konsultasi IT umum.',
    // ---- Footer ----
    'footer.role':      'Mahasiswa Sistem Komputer & Penggemar IT',
    'footer.available': 'Tersedia untuk Kolaborasi',
    'footer.nav':       'Navigasi',
    'footer.contact':   'Kontak',
    'footer.copy':      'Hak cipta dilindungi.',
    'footer.built':     'Dibangun dengan HTML · CSS · JavaScript',
  }
};

// ---- Apply all translations to DOM ----
function applyTranslations(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] === undefined) return;

    if (el.hasAttribute('data-i18n-html')) {
      // Keys that contain HTML markup
      el.innerHTML = t[key];
    } else if (el.hasAttribute('data-i18n-text')) {
      // Replace only the first plain text node (preserves child SVGs / spans)
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = t[key];
          break;
        }
      }
    } else {
      el.textContent = t[key];
    }
  });

  document.documentElement.lang = lang;

  // Sync toggle button badge
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.setAttribute('aria-label',
      lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English');
    btn.querySelector('.lang-label').textContent = lang === 'en' ? 'ID' : 'EN';
  }
}

// ---- Bootstrap ----
function initI18n() {
  const saved = localStorage.getItem('lang') || 'en';
  applyTranslations(saved);

  const btn = document.getElementById('langToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'en';
    const next    = current === 'en' ? 'id' : 'en';
    localStorage.setItem('lang', next);

    // Quick fade-swap animation
    document.body.classList.add('lang-transition');
    setTimeout(() => {
      applyTranslations(next);
      document.body.classList.remove('lang-transition');
    }, 150);
  });
}

document.addEventListener('DOMContentLoaded', initI18n);
