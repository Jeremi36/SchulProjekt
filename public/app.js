(() => {
  'use strict';

  const app = document.getElementById('app');
  const toastRegion = document.getElementById('toast-region');
  let modalReturnFocus = null;

  const icons = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    checklist: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 2 2 3-4M14 9h3M7 15h2M12 15h5"/>',
    exam: '<path d="M6 3h12l2 4-2 14H6L4 7z"/><path d="M4 7h16M9 11h6M9 15h6"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 20h14"/>',
    bot: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    school: '<path d="m3 10 9-5 9 5-9 5z"/><path d="M5 12v5l7 4 7-4v-5M3 10v6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.8 2.1c-.8.5-1.3 1-1.3 2.4M12 17h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.36.36.7.6 1 .28.33.67.53 1.1.6h.1v4h-.1a1.7 1.7 0 0 0-1.7.4z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    arrow: '<path d="m9 18 6-6-6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2.8 19h18.4z"/><path d="M12 9v4M12 16h.01"/>',
    file: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    paperclip: '<path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 1 1-2.8-2.8l8.3-8.3"/>',
    sparkles: '<path d="m12 3-1.3 3.7L7 8l3.7 1.3L12 13l1.3-3.7L17 8l-3.7-1.3zM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8zM19 14l-.8 2.2L16 17l2.2.8L19 20l.8-2.2L22 17l-2.2-.8z"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12"/><circle cx="12" cy="12" r="2.5"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6"/>',
    pin: '<path d="M12 22s7-6 7-13a7 7 0 1 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.2 12 19.8 19.8 0 0 1 2.1 3.4 2 2 0 0 1 4.1 1.2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.2a16 16 0 0 0 6.8 6.8l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
    clipboard: '<path d="M9 5h6M9 3h6v4H9z"/><path d="M7 5H5v17h14V5h-2M8 12h8M8 16h5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
    save: '<path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    star: '<path d="m12 2 3 6 6 .9-4.5 4.4 1.1 6.2L12 16.6 6.4 19.5l1.1-6.2L3 8.9 9 8z"/>',
    presentation: '<rect x="3" y="3" width="18" height="13" rx="1"/><path d="M8 21l4-5 4 5M12 16v5"/>'
  };

  const icon = (name, cls = '') => `<span class="icon ${cls}" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[name] || icons.info}</svg></span>`;

  const state = {
    role: null,
    view: 'dashboard',
    sidebarOpen: false,
    completedTasks: new Set(['bio-worksheet']),
    selectedConversation: 'mathe-10a',
    aiMessages: [
      { from: 'bot', text: 'Hallo Jeremi! Ich kann dir Aufgaben erklären, dich abfragen oder aus einem Hefteintrag eine Zusammenfassung erstellen. Womit möchtest du anfangen?' }
    ],
    grades: [
      { subject: 'Mathematik', type: 'Schulaufgabe', date: '10.06.2026', grade: 2, weight: 2 },
      { subject: 'Englisch', type: 'Kurzarbeit', date: '03.06.2026', grade: 2, weight: 1 },
      { subject: 'Chemie', type: 'Schulaufgabe', date: '28.05.2026', grade: 3, weight: 2 },
      { subject: 'Deutsch', type: 'Mündlich', date: '20.05.2026', grade: 1, weight: 1 },
      { subject: 'Französisch', type: 'Schulaufgabe', date: '12.05.2026', grade: 4, weight: 2 }
    ]
  };

  const schoolEvents = [
    { date: 'Freitag, 26.06.2026', time: '10:20', title: 'Allgemeiner Unterrichtsschluss', type: 'school' },
    { date: 'Mittwoch, 01.07.2026', time: '19:00', title: 'Theateraufführung „Spotlights“', type: 'school' },
    { date: 'Donnerstag, 02.07.2026', time: '19:00', title: 'Theateraufführung „Spotlights“', type: 'school' },
    { date: '06.07. – 10.07.2026', time: 'ganztägig', title: 'ILV-Repetitorium', type: 'school' },
    { date: 'Montag, 06.07.2026', time: '08:50', title: '10+11: Exkursion Ethik', type: 'school' },
    { date: 'Dienstag, 07.07.2026', time: '19:00', title: 'Theateraufführung „Wilde 13“', type: 'school' },
    { date: 'Mittwoch, 08.07.2026', time: '18:00', title: 'Elternbeiratssitzung mit Förderverein', type: 'school' },
    { date: 'Mittwoch, 08.07.2026', time: '19:00', title: 'Theateraufführung „Wilde 13“', type: 'school' }
  ];

  const studentNav = [
    { section: 'Übersicht' },
    { id: 'dashboard', label: 'Startseite', icon: 'home' },
    { id: 'calendar', label: 'Kalender', icon: 'calendar' },
    { id: 'homework', label: 'Hausaufgaben', icon: 'checklist', badge: 3 },
    { id: 'exams', label: 'Leistungsnachweise', icon: 'exam' },
    { section: 'Lernen' },
    { id: 'subjects', label: 'Stoff & Lernpläne', icon: 'layers' },
    { id: 'notes', label: 'Hefteinträge', icon: 'upload' },
    { id: 'ai', label: 'Übungen & KI', icon: 'bot' },
    { id: 'grades', label: 'Notenmanager', icon: 'chart' },
    { section: 'Organisation' },
    { id: 'timetable', label: 'Stundenplan', icon: 'clock' },
    { id: 'chat', label: 'Chats', icon: 'chat', badge: 2 },
    { id: 'letters', label: 'Elternbriefe', icon: 'mail', badge: 1 }
  ];

  const teacherNav = [
    { section: 'Übersicht' },
    { id: 'dashboard', label: 'Startseite', icon: 'home' },
    { id: 'classes', label: 'Meine Klassen', icon: 'users' },
    { id: 'calendar', label: 'Kalender', icon: 'calendar' },
    { section: 'Unterricht' },
    { id: 'homework', label: 'Hausaufgaben', icon: 'checklist', badge: 4 },
    { id: 'exams', label: 'Leistungsnachweise', icon: 'exam' },
    { id: 'subjects', label: 'Stoff & Materialien', icon: 'layers' },
    { id: 'notes', label: 'Hefteinträge', icon: 'upload', badge: 6 },
    { id: 'ai', label: 'KI-Werkzeuge', icon: 'bot' },
    { id: 'grades', label: 'Notenmanager', icon: 'chart' },
    { section: 'Kommunikation' },
    { id: 'timetable', label: 'Stundenplan', icon: 'clock' },
    { id: 'chat', label: 'Chats', icon: 'chat', badge: 3 },
    { id: 'letters', label: 'Mitteilungen', icon: 'mail' }
  ];

  function parseRoute() {
    const decoded = decodeURIComponent(location.pathname).replace(/\/+$/, '') || '/';
    if (decoded === '/') return { role: null, view: 'landing' };
    const parts = decoded.split('/').filter(Boolean);
    const first = (parts[0] || '').toLowerCase();
    let role = null;
    if (first === 'schüler' || first === 'schueler') role = 'student';
    if (first === 'lehrer') role = 'teacher';
    const aliases = {
      startseite: 'dashboard', kalender: 'calendar', hausaufgaben: 'homework',
      leistungsnachweise: 'exams', stoff: 'subjects', hefteintraege: 'notes',
      'hefteinträge': 'notes', uebungen: 'ai', 'übungen': 'ai', noten: 'grades',
      stundenplan: 'timetable', chats: 'chat', elternbriefe: 'letters',
      mitteilungen: 'letters', klassen: 'classes'
    };
    const requestedView = parts[1] || 'dashboard';
    return { role, view: aliases[requestedView.toLowerCase()] || requestedView };
  }

  function pathFor(role, view = 'dashboard') {
    const base = role === 'teacher' ? '/lehrer' : '/schüler';
    const slugs = {
      calendar: 'kalender', homework: 'hausaufgaben', exams: 'leistungsnachweise',
      subjects: 'stoff', notes: 'hefteinträge', ai: 'übungen', grades: 'noten',
      timetable: 'stundenplan', chat: 'chats', letters: role === 'teacher' ? 'mitteilungen' : 'elternbriefe',
      classes: 'klassen'
    };
    return view === 'dashboard' ? base : `${base}/${slugs[view] || view}`;
  }

  function setSidebarOpen(open) {
    state.sidebarOpen = Boolean(open);
    document.querySelector('.app-shell')?.classList.toggle('sidebar-open', state.sidebarOpen);
    document.body.classList.toggle('sidebar-open-lock', state.sidebarOpen && window.matchMedia('(max-width: 900px)').matches);
  }

  function closeDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.remove());
  }

  function navigate(role, view = 'dashboard') {
    closeModal(false);
    closeDropdowns();
    setSidebarOpen(false);
    state.role = role;
    state.view = view;
    history.pushState({}, '', pathFor(role, view));
    render();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_error) { /* Browser ohne Scroll-API */ }
  }

  function toast(message, type = 'success') {
    const node = document.createElement('div');
    node.className = `toast ${type}`;
    node.innerHTML = `<span class="toast-icon">${icon(type === 'success' ? 'check' : 'info')}</span><span>${message}</span>`;
    toastRegion.appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }

  function openModal(title, body, options = {}) {
    closeModal(false);
    closeDropdowns();
    modalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <section class="modal ${options.large ? 'large' : ''}" role="dialog" aria-modal="true" aria-label="${title}" tabindex="-1">
        <header class="modal-head">
          <h2>${title}</h2>
          <button class="close-modal" data-action="close-modal" aria-label="Dialog schließen">${icon('close')}</button>
        </header>
        <div class="modal-body">${body}</div>
        <footer class="modal-foot">
          ${options.extra || ''}
          <button class="secondary-btn" data-action="close-modal">Schließen</button>
          ${options.primary ? `<button class="primary-btn" data-action="${options.primary.action || 'close-modal'}">${options.primary.label}</button>` : ''}
        </footer>
      </section>`;
    document.body.appendChild(backdrop);
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => backdrop.querySelector('.close-modal')?.focus());
  }

  function closeModal(restoreFocus = true) {
    const modal = document.querySelector('.modal-backdrop');
    if (!modal) return;
    modal.remove();
    document.body.classList.remove('modal-open');
    const returnFocus = modalReturnFocus;
    modalReturnFocus = null;
    if (restoreFocus && returnFocus) {
      requestAnimationFrame(() => {
        if (document.contains(returnFocus)) returnFocus.focus();
      });
    }
  }

  function handleModalAction(actionEl) {
    const action = actionEl?.dataset?.action;
    if (!action) return false;
    if (action === 'close-modal') {
      closeModal();
      return true;
    }
    if (action === 'mark-read') {
      closeModal();
      toast('Der Elternbrief wurde als gelesen markiert.');
      return true;
    }
    if (action === 'save-generic') {
      closeModal();
      toast('Änderung wurde im Prototyp gespeichert.');
      return true;
    }
    if (action === 'go-ai') {
      closeModal(false);
      navigate(state.role, 'ai');
      return true;
    }
    if (action === 'finish-upload') {
      closeModal();
      toast('Hefteintrag hochgeladen und zur KI-Analyse vorgemerkt.');
      return true;
    }
    return false;
  }

  function renderLanding() {
    app.innerHTML = `
      <main class="landing">
        <div class="landing-shell">
          <nav class="landing-nav">
            <div class="logo">
              <div class="logo-mark">${icon('book')}</div>
              <div class="logo-copy">Know your Schoolday<small>Schule einfach im Blick</small></div>
            </div>
            <div class="prototype-pill">Interaktiver GUI-Prototyp</div>
          </nav>

          <section class="hero">
            <div class="hero-copy">
              <div class="eyebrow">Teams trifft Schulmanager</div>
              <h1>Dein Schulalltag.<br><span>Endlich übersichtlich.</span></h1>
              <p>Hausaufgaben, Hefteinträge, Lernstoff, Schulaufgaben, Noten und Kommunikation – gebündelt in einer Oberfläche, die Schüler und Lehrkräfte sofort verstehen.</p>
              <div class="hero-actions">
                <button class="primary-btn" data-enter-role="student">${icon('user')} Schüler-Demo öffnen</button>
                <button class="secondary-btn" data-enter-role="teacher">${icon('briefcase')} Lehrer-Demo öffnen</button>
              </div>
            </div>
            <div class="hero-preview" aria-hidden="true">
              <div class="preview-window">
                <div class="preview-top"><i class="preview-dot"></i><i class="preview-dot"></i><i class="preview-dot"></i></div>
                <div class="preview-body">
                  <div class="preview-side"><div class="preview-logo"></div>${Array(7).fill('<div class="preview-navline"></div>').join('')}</div>
                  <div class="preview-main"><div class="preview-welcome"></div><div class="preview-grid"><div class="preview-card"></div><div class="preview-card"></div><div class="preview-card"></div></div></div>
                </div>
              </div>
              <div class="floating-card"><div class="float-icon">${icon('check')}</div><strong>Alles erledigt</strong><small>3 Hausaufgaben abgeschlossen. Der Lernplan wurde automatisch aktualisiert.</small></div>
            </div>
          </section>

          <section class="role-section">
            <button class="role-card" data-enter-role="student">
              <div class="role-card-icon">${icon('school')}</div>
              <div><h3>Ansicht für Schüler</h3><p>Aufgaben, Lernstoff, Noten, Stundenplan, KI-Übungen und Schulinfos.</p></div>
              <span class="role-arrow">${icon('arrow')}</span>
            </button>
            <button class="role-card" data-enter-role="teacher">
              <div class="role-card-icon teacher">${icon('briefcase')}</div>
              <div><h3>Ansicht für Lehrkräfte</h3><p>Klassen, Stoffplanung, Uploads, Leistungsnachweise, Noten und Kommunikation.</p></div>
              <span class="role-arrow">${icon('arrow')}</span>
            </button>
          </section>

          <footer class="landing-footer"><span>Know your Schoolday · Schulprojekt 2026</span><span>Nur Demonstrationsdaten · keine echte Anmeldung erforderlich</span></footer>
        </div>
      </main>`;
  }

  function navHtml(role) {
    const config = role === 'teacher' ? teacherNav : studentNav;
    return config.map(item => item.section
      ? `<div class="nav-label">${item.section}</div>`
      : `<button class="nav-item ${state.view === item.id ? 'active' : ''}" data-nav="${item.id}">${icon(item.icon)}<span>${item.label}</span>${item.badge ? `<span class="badge-count">${item.badge}</span>` : ''}</button>`
    ).join('');
  }

  function renderShell() {
    const teacher = state.role === 'teacher';
    const name = teacher ? 'Frau Schneider' : 'Jeremi Gürtler';
    const roleLine = teacher ? 'Lehrkraft · Mathematik / Physik' : 'Klasse 10A · Gregor-Mendel-Gymnasium';
    const title = teacher ? 'Lehrerbereich' : 'Schülerbereich';
    app.innerHTML = `
      <div class="app-shell ${state.sidebarOpen ? 'sidebar-open' : ''}">
        <button class="sidebar-backdrop" data-action="close-sidebar" aria-label="Menü schließen"></button>
        <aside class="app-rail">
          <button class="rail-logo" data-action="landing" aria-label="Zur Startseite">${icon('book')}</button>
          <button class="rail-item active" data-nav="dashboard">${icon('school')}<span class="rail-tooltip">Schule</span></button>
          <button class="rail-item" data-nav="chat">${icon('chat')}<span class="rail-tooltip">Chat</span></button>
          <button class="rail-item" data-nav="calendar">${icon('calendar')}<span class="rail-tooltip">Kalender</span></button>
          <button class="rail-item bottom" data-action="demo-settings">${icon('settings')}<span class="rail-tooltip">Einstellungen</span></button>
        </aside>

        <aside class="sidebar">
          <div class="sidebar-head">
            <div class="logo-mark" style="width:34px;height:34px;border-radius:9px">${icon('book')}</div>
            <div class="sidebar-title">Know your Schoolday<small>${title}</small></div>
            <button class="icon-btn sidebar-close" data-action="close-sidebar" aria-label="Menü schließen">${icon('close')}</button>
          </div>
          <nav class="sidebar-nav">${navHtml(state.role)}</nav>
          <div class="sidebar-profile">
            <div class="avatar ${teacher ? 'teacher' : ''}">${teacher ? 'FS' : 'JG'}</div>
            <div class="profile-copy"><strong>${name}</strong><small>${roleLine}</small></div>
            <button class="icon-btn" data-action="profile-menu" aria-label="Profilmenü">${icon('more')}</button>
          </div>
        </aside>

        <header class="topbar">
          <button class="icon-btn mobile-menu" data-action="toggle-sidebar" aria-label="Menü öffnen">${icon('menu')}</button>
          <div class="search-wrap">${icon('search')}<input class="global-search" id="global-search" placeholder="In Know your Schoolday suchen …"></div>
          <div class="top-actions">
            <select class="role-switch" data-action="role-switch" aria-label="Ansicht wechseln">
              <option value="student" ${!teacher ? 'selected' : ''}>Schüleransicht</option>
              <option value="teacher" ${teacher ? 'selected' : ''}>Lehreransicht</option>
            </select>
            <button class="icon-btn" data-action="help" aria-label="Hilfe">${icon('help')}</button>
            <button class="icon-btn" data-action="notifications" aria-label="Benachrichtigungen">${icon('bell')}<span class="notification-dot"></span></button>
          </div>
        </header>

        <main class="main">${renderPage()}</main>
      </div>`;
  }

  function pageHead(title, subtitle, actions = '') {
    return `<div class="page-head"><div class="page-title"><h1>${title}</h1><p>${subtitle}</p></div>${actions ? `<div class="page-actions">${actions}</div>` : ''}</div>`;
  }

  function renderPage() {
    const pages = {
      dashboard: state.role === 'teacher' ? teacherDashboard : studentDashboard,
      classes: teacherClasses,
      calendar: calendarPage,
      homework: homeworkPage,
      exams: examsPage,
      subjects: subjectsPage,
      notes: notesPage,
      ai: aiPage,
      grades: gradesPage,
      timetable: timetablePage,
      chat: chatPage,
      letters: lettersPage
    };
    return (pages[state.view] || pages.dashboard)();
  }

  function studentDashboard() {
    return `<div class="page">
      <section class="dashboard-welcome">
        <h1>Herzlich willkommen, Jeremi Gürtler</h1>
        <p>Montag, 22. Juni 2026 · Du hast heute 6 Unterrichtsstunden, eine offene Hausaufgabe und in zwei Tagen eine Mathematik-Schulaufgabe.</p>
        <div class="welcome-meta"><span class="welcome-chip">Klasse 10A</span><span class="welcome-chip">Nächste Stunde: Mathematik · B204</span><span class="welcome-chip">Unterrichtsschluss 13:00 Uhr</span></div>
      </section>

      <section class="grid dashboard-widgets">
        ${statCard('Hausaufgaben', '3 offen', 'checklist', 'orange', '1 bis morgen')}
        ${statCard('Nächste Schulaufgabe', 'Mathematik', 'exam', 'blue', 'Mi., 24.06. · 4. Stunde')}
        ${statCard('Aktueller Schnitt', '2,4', 'chart', 'green', '0,2 besser als zuletzt')}
      </section>

      <section class="grid dashboard-top">
        <article class="panel">
          <header class="panel-head"><div><h2>Informationen der Schule</h2><div class="panel-sub">Aktuelle Hinweise des Gregor-Mendel-Gymnasiums</div></div><button class="panel-link" data-action="all-school-notices">Alle anzeigen</button></header>
          <div class="panel-body">
            <div class="notice-list">
              ${noticeItem('Termine zur Nachprüfung bzw. Besonderen Prüfung', 'Die Prüfungen finden in der letzten Woche der Sommerferien statt. Anmeldung spätestens bis 07. August, 12:00 Uhr.', 'Neu', 'exam', 'special-exams')}
              ${noticeItem('Hinweise zu Attesten', 'Wann ein ärztliches Attest erforderlich ist und wo es abgegeben werden muss.', '18.06.', 'file', 'medical-certificates')}
              ${noticeItem('Beurlaubungen für 2025/26', 'Bitte das Schulfest am Freitag, 24.07.2026, mit Anwesenheitspflicht beachten.', '15.06.', 'calendar', 'leave-info')}
            </div>
          </div>
        </article>

        <article class="panel">
          <header class="panel-head"><div><h2>Ungelesene Elternbriefe</h2><div class="panel-sub">1 neue Nachricht</div></div><button class="panel-link" data-nav="letters">Alle öffnen</button></header>
          <div class="panel-body">
            <div class="notice-item" data-modal="parent-letter"><div class="notice-item-top"><div class="notice-icon">${icon('mail')}</div><div class="notice-copy"><strong>GMG-Fashion Bestellung und Lagerausverkauf am Elternsprechabend</strong><p>Versendet am 17.06.2026</p></div><div class="unread-mark"></div></div></div>
            <button class="primary-btn" style="width:100%;margin-top:12px" data-modal="parent-letter">${icon('eye')} Lesen</button>
          </div>
        </article>
      </section>

      <section class="grid dashboard-widgets">
        <article class="panel">
          <header class="panel-head"><div><h2>Aufkommende Termine</h2><div class="panel-sub">Schulveranstaltungen und Fristen</div></div><button class="panel-link" data-nav="calendar">Zum Kalender</button></header>
          <div class="panel-body"><div class="timeline-list">${schoolEvents.map(e => timelineItem(e.time, e.title, e.date)).join('')}</div></div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>Klassenarbeiten</h2><div class="panel-sub">Deine nächsten Leistungsnachweise</div></div><button class="panel-link" data-nav="exams">Details</button></header>
          <div class="panel-body">
            ${examRow('24', 'Jun', 'Mathematik', 'Mi., 24.06. · 4. Stunde', 'math')}
            ${examRow('01', 'Jul', 'Englisch', 'Mi., 01.07. · 2. Stunde', 'english')}
            ${examRow('14', 'Jul', 'Chemie', 'Di., 14.07. · 3./4. Stunde', 'bio')}
          </div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>Heute</h2><div class="panel-sub">Dein persönlicher Tagesplan</div></div><button class="panel-link" data-nav="timetable">Stundenplan</button></header>
          <div class="panel-body">
            ${taskRow('08:00', 'Mathematik', 'Quadratische Funktionen · B204', 'math')}
            ${taskRow('09:45', 'Englisch', 'Text analysis · A112', 'english')}
            ${taskRow('11:30', 'Chemie', 'Redoxreaktionen · C104', 'bio')}
            ${taskRow('13:00', 'Unterrichtsschluss', 'Keine Nachmittagsstunden', '')}
          </div>
        </article>
      </section>

      <section class="grid grid-3">
        ${infoWidget('Hinweise für Schulunfälle', 'alert', `<p><strong>Neu:</strong> Bei der Unfallanzeige werden Name und Anschrift der Krankenversicherung abgefragt.</p><p>Unfallpraxis Amberg<br>Regensburger Str. 11 + 13 · 92224 Amberg<br>Telefon: 09621 / 897934-0</p><p>Zur Aufnahme der Unfallanzeige bitte bei OStRin Krämer melden.</p>`)}
        ${infoWidget('5. Jgst. · Forscherstunden', 'sparkles', `<p><strong>Klasse 5A:</strong> Montag, 13:55–15:25 Uhr, 14-tägig.</p><p>Nächste Termine: 22.06. · 06.07. · 20.07.</p><p><strong>Klasse 5B:</strong> Nächste Termine: 29.06. · 13.07. · 27.07.</p>`)}
        ${infoWidget('6. Jgst. · Tastenschreiben', 'edit', `<p><strong>Klasse 6C:</strong> Donnerstag, 13:10–13:55 Uhr.</p><p>Nächste Termine: 25.06. · 09.07.</p><p><strong>Klasse 6D:</strong> 02.07. · 16.07.</p>`)}
        ${infoWidget('Wahlunterrichte am GMG', 'users', `<p>Schulspiel, Legoroboter, Schulgarten, Bigband, Chor, Parkour, Tischtennis, Volleyball, Sportklettern und Eishockey.</p><p>Die Wahlunterrichte beginnen in der Regel in der zweiten Schulwoche.</p>`)}
        ${infoWidget('Freiwillige Intensivierungsstunden', 'layers', `<p><strong>Jgst. 6:</strong> Englisch und Mathematik, montags 7. Stunde.</p><p><strong>Jgst. 7:</strong> Mathematik, Latein, Französisch und Englisch.</p><p><strong>Jgst. 8:</strong> Französisch, Latein und Englisch.</p>`)}
        ${infoWidget('Schnellzugriff', 'sparkles', `<button class="secondary-btn" style="width:100%;margin-bottom:8px" data-nav="ai">${icon('bot')} Mit KI üben</button><button class="secondary-btn" style="width:100%;margin-bottom:8px" data-nav="notes">${icon('upload')} Hefteintrag hochladen</button><button class="secondary-btn" style="width:100%" data-nav="grades">${icon('chart')} Noten berechnen</button>`)}
      </section>
    </div>`;
  }

  function teacherDashboard() {
    return `<div class="page">
      <section class="dashboard-welcome teacher-welcome">
        <h1>Guten Morgen, Frau Schneider</h1>
        <p>Heute unterrichten Sie die Klassen 8A, 9B und 10A. Sechs neue Hefteinträge warten auf Freigabe, außerdem sind drei Nachrichten ungelesen.</p>
        <div class="welcome-meta"><span class="welcome-chip">1. Stunde frei</span><span class="welcome-chip">Nächste Klasse: 8A · 08:50 Uhr</span><span class="welcome-chip">Vertretung: 5. Stunde · 9C</span></div>
      </section>

      <section class="grid grid-4" style="margin-bottom:16px">
        ${statCard('Klassen', '5', 'users', 'blue', '128 Schülerinnen & Schüler')}
        ${statCard('Offene Abgaben', '18', 'checklist', 'orange', '6 neu seit gestern')}
        ${statCard('Hefteinträge prüfen', '6', 'upload', 'green', 'Ø 2 Minuten pro Eintrag')}
        ${statCard('Nachrichten', '3', 'chat', '', '2 von Eltern')}
      </section>

      <section class="grid dashboard-top">
        <article class="panel">
          <header class="panel-head"><div><h2>Heute unterrichten</h2><div class="panel-sub">Montag, 22. Juni 2026</div></div><button class="panel-link" data-nav="timetable">Ganzer Stundenplan</button></header>
          <div class="panel-body">
            ${teacherLessonRow('08:50', '8A · Mathematik', 'Lineare Gleichungssysteme · Raum B204', '28 Schüler', 'math')}
            ${teacherLessonRow('10:35', '10A · Mathematik', 'Quadratische Funktionen · Raum B204', '27 Schüler', 'math')}
            ${teacherLessonRow('11:30', '9B · Physik', 'Elektrische Energie · Raum P102', '25 Schüler', 'bio')}
            ${teacherLessonRow('12:15', '9C · Vertretung', 'Arbeitsauftrag im Schulmanager · Raum A208', '26 Schüler', 'german')}
          </div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>Wichtig für heute</h2><div class="panel-sub">Aufgaben und Erinnerungen</div></div><button class="panel-link" data-action="add-reminder">+ Erinnerung</button></header>
          <div class="panel-body">
            ${teacherTodo('Schulaufgabe 10A freigeben', 'Bis 14:00 Uhr', 'danger')}
            ${teacherTodo('6 Hefteinträge prüfen', 'Klassen 8A und 9B', 'open')}
            ${teacherTodo('Elternanfrage beantworten', 'Familie Müller · 10A', 'info')}
            ${teacherTodo('Noten der 9B eintragen', 'Physik Kurzarbeit', 'neutral')}
          </div>
        </article>
      </section>

      <section class="grid dashboard-widgets">
        <article class="panel">
          <header class="panel-head"><div><h2>Meine Klassen</h2><div class="panel-sub">Schnellübersicht</div></div><button class="panel-link" data-nav="classes">Alle Klassen</button></header>
          <div class="panel-body">
            ${classMiniRow('10A', 'Mathematik', '27 Lernende', '2 offene Aufgaben')}
            ${classMiniRow('9B', 'Physik', '25 Lernende', 'Noten fehlen')}
            ${classMiniRow('8A', 'Mathematik', '28 Lernende', '6 neue Uploads')}
          </div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>Neue Hefteinträge</h2><div class="panel-sub">Warten auf Prüfung</div></div><button class="panel-link" data-nav="notes">Alle prüfen</button></header>
          <div class="panel-body">
            ${fileRow('LGS – Einsetzungsverfahren', 'Lisa M. · 8A · vor 12 Min.', 'image')}
            ${fileRow('Quadratische Funktionen', 'Max R. · 10A · vor 25 Min.', 'file')}
            ${fileRow('Elektrische Leistung', 'Jonas K. · 9B · vor 44 Min.', 'image')}
          </div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>Nachrichten</h2><div class="panel-sub">3 ungelesen</div></div><button class="panel-link" data-nav="chat">Zum Chat</button></header>
          <div class="panel-body">
            ${messagePreview('Anna Müller', 'Frage zur Mathematik-Schulaufgabe', 'vor 8 Min.', true)}
            ${messagePreview('Eltern Müller', 'Gesprächstermin diese Woche', 'vor 31 Min.', true)}
            ${messagePreview('Kollegium Mathematik', 'Material für die 10. Klassen', 'gestern', false)}
          </div>
        </article>
      </section>

      <section class="grid grid-2">
        <article class="panel">
          <header class="panel-head"><div><h2>Anstehende Leistungsnachweise</h2><div class="panel-sub">Planung und Veröffentlichung</div></div><button class="panel-link" data-nav="exams">Verwalten</button></header>
          <div class="panel-body">${examRow('24','Jun','10A · Mathematik','Schulaufgabe · 4. Stunde','math')}${examRow('30','Jun','9B · Physik','Kurzarbeit · 3. Stunde','bio')}${examRow('08','Jul','8A · Mathematik','Stegreifaufgabe · 2. Stunde','math')}</div>
        </article>
        <article class="panel">
          <header class="panel-head"><div><h2>KI-Unterrichtsassistent</h2><div class="panel-sub">Material schneller vorbereiten</div></div><button class="panel-link" data-nav="ai">Öffnen</button></header>
          <div class="panel-body"><div class="demo-note">${icon('sparkles')} Aus dem Stoffplan „Quadratische Funktionen“ kann automatisch ein Übungsblatt mit drei Schwierigkeitsstufen erstellt werden.</div><div class="grid grid-2"><button class="secondary-btn" data-action="generate-worksheet">${icon('file')} Übungsblatt erstellen</button><button class="secondary-btn" data-action="summarize-notes">${icon('bot')} Hefteinträge zusammenfassen</button></div></div>
        </article>
      </section>
    </div>`;
  }

  function statCard(label, value, iconName, color, trend) {
    return `<article class="stat-card"><div class="stat-head"><div class="stat-icon ${color}">${icon(iconName)}</div>${trend ? `<span class="stat-trend">${trend}</span>` : ''}</div><div class="stat-number">${value}</div><div class="stat-label">${label}</div></article>`;
  }

  function noticeItem(title, text, date, iconName, modalId) {
    return `<div class="notice-item" data-modal="${modalId}"><div class="notice-item-top"><div class="notice-icon">${icon(iconName)}</div><div class="notice-copy"><strong>${title}</strong><p>${text}</p></div><span class="notice-date">${date}</span></div></div>`;
  }

  function timelineItem(time, title, subtitle) {
    return `<div class="timeline-item"><div class="timeline-time">${time}</div><div class="timeline-line"><i class="timeline-dot"></i></div><div class="timeline-content"><strong>${title}</strong><small>${subtitle}</small></div></div>`;
  }

  function examRow(day, month, subject, details, subjectClass) {
    return `<div class="exam-row"><div class="date-box"><strong>${day}</strong><small>${month}</small></div><span class="subject-dot ${subjectClass}"></span><div class="row-main"><strong>${subject}</strong><small>${details}</small></div><button class="mini-btn" data-action="show-exam" data-subject="${subject}">Details</button></div>`;
  }

  function taskRow(time, title, details, subjectClass) {
    return `<div class="task-row"><div class="date-box"><strong style="font-size:11px">${time}</strong></div>${subjectClass ? `<span class="subject-dot ${subjectClass}"></span>` : ''}<div class="row-main"><strong>${title}</strong><small>${details}</small></div></div>`;
  }

  function infoWidget(title, iconName, body) {
    return `<article class="info-widget"><header class="info-widget-head">${icon(iconName)}<strong>${title}</strong></header><div class="info-widget-body">${body}</div></article>`;
  }

  function teacherLessonRow(time, title, details, meta, subjectClass) {
    return `<div class="task-row"><div class="date-box"><strong style="font-size:11px">${time}</strong></div><span class="subject-dot ${subjectClass}"></span><div class="row-main"><strong>${title}</strong><small>${details}</small></div><span class="status neutral">${meta}</span></div>`;
  }

  function teacherTodo(title, subtitle, status) {
    return `<div class="task-row"><button class="checkbox" data-action="toggle-checkbox"></button><div class="row-main"><strong>${title}</strong><small>${subtitle}</small></div><span class="status ${status}">${status === 'danger' ? 'Dringend' : status === 'open' ? 'Offen' : status === 'info' ? 'Nachricht' : 'Geplant'}</span></div>`;
  }

  function classMiniRow(name, subject, people, note) {
    return `<div class="task-row"><div class="class-badge" style="width:38px;height:38px;border-radius:9px">${name}</div><div class="row-main"><strong>${subject}</strong><small>${people}</small></div><span class="status neutral">${note}</span></div>`;
  }

  function fileRow(title, subtitle, type) {
    return `<div class="file-row"><div class="file-icon">${icon(type)}</div><div class="row-main"><strong>${title}</strong><small>${subtitle}</small></div><div class="file-actions"><button class="icon-btn" data-action="preview-file">${icon('eye')}</button><button class="icon-btn" data-action="approve-file">${icon('check')}</button></div></div>`;
  }

  function messagePreview(sender, subject, date, unread) {
    return `<div class="task-row" data-nav="chat" style="cursor:pointer"><div class="avatar ${state.role === 'teacher' ? 'teacher' : ''}">${sender.split(' ').map(x => x[0]).join('').slice(0,2)}</div><div class="row-main"><strong>${sender}${unread ? ' · Neu' : ''}</strong><small>${subject}</small></div><span style="font-size:10px;color:var(--subtle)">${date}</span></div>`;
  }

  function teacherClasses() {
    return `<div class="page">${pageHead('Meine Klassen', 'Klassen, Kurse, Lernfortschritt und offene Aufgaben verwalten.', `<button class="secondary-btn" data-action="export-classes">${icon('download')} Exportieren</button><button class="primary-btn" data-action="create-class">${icon('plus')} Klasse hinzufügen</button>`)}
      <div class="filters"><button class="filter-chip active">Alle Klassen</button><button class="filter-chip">Mathematik</button><button class="filter-chip">Physik</button><button class="filter-chip">Heute</button></div>
      <section class="class-grid">
        ${classCard('10A','Mathematik','27','2','1','76%')}
        ${classCard('9B','Physik','25','3','0','81%')}
        ${classCard('8A','Mathematik','28','4','6','72%')}
        ${classCard('9C','Mathematik','26','1','0','84%')}
        ${classCard('7B','Mathematik','24','2','2','79%')}
      </section>
    </div>`;
  }

  function classCard(name, subject, students, tasks, uploads, progress) {
    return `<article class="class-card"><div class="class-card-top"><div class="class-badge">${name}</div><button class="icon-btn" data-action="class-menu">${icon('more')}</button></div><h3>${name} · ${subject}</h3><p>Gregor-Mendel-Gymnasium · Schuljahr 2025/26</p><div class="class-stats"><div class="class-stat"><strong>${students}</strong><small>Lernende</small></div><div class="class-stat"><strong>${tasks}</strong><small>Aufgaben</small></div><div class="class-stat"><strong>${uploads}</strong><small>Uploads</small></div></div><div class="progress"><span style="width:${progress}"></span></div><div class="subject-card-footer"><span>Lernfortschritt ${progress}</span><button class="panel-link" data-action="open-class" data-class="${name}">Öffnen</button></div></article>`;
  }

  function calendarPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead('Kalender', teacher ? 'Unterricht, Leistungsnachweise, Konferenzen und schulische Termine.' : 'Hausaufgaben, Schulaufgaben und Schulveranstaltungen an einem Ort.', `<button class="secondary-btn" data-action="calendar-today">Heute</button><button class="primary-btn" data-action="new-calendar-item">${icon('plus')} Neuer Termin</button>`)}
      <div class="filters"><button class="filter-chip active">Alle</button><button class="filter-chip">Unterricht</button><button class="filter-chip">Hausaufgaben</button><button class="filter-chip">Leistungsnachweise</button><button class="filter-chip">Schule</button></div>
      <section class="calendar-shell">
        <div class="calendar-card">
          <div class="calendar-toolbar"><div style="display:flex;gap:5px"><button class="icon-btn" data-action="calendar-prev">${icon('left')}</button><button class="icon-btn" data-action="calendar-next">${icon('right')}</button></div><div class="calendar-title">Juni 2026</div><button class="mini-btn">Monat</button></div>
          ${calendarGrid()}
        </div>
        <aside class="panel"><header class="panel-head"><div><h2>Nächste Termine</h2><div class="panel-sub">Ab Montag, 22. Juni</div></div></header><div class="panel-body"><div class="agenda">${schoolEvents.slice(0,6).map(e => `<div class="agenda-item"><div class="agenda-date">${e.date}</div><strong>${e.title}</strong><small>${e.time}</small></div>`).join('')}</div></div></aside>
      </section>
    </div>`;
  }

  function calendarGrid() {
    const weekdays = ['Mo','Di','Mi','Do','Fr','Sa','So'];
    const cells = [];
    const start = 1; // June 2026 starts Monday
    for (let i = 1; i < start; i++) cells.push({ day: '', muted: true });
    for (let d = 1; d <= 30; d++) cells.push({ day: d, muted: false });
    while (cells.length % 7) cells.push({ day: cells.length - 29, muted: true });
    const eventMap = {
      22: [{ t:'08:50 Mathe 10A', c:'homework' },{ t:'HA Englisch',c:'homework'}],
      23: [{ t:'Chemie lernen',c:'homework'}],
      24: [{ t:'SA Mathematik',c:'exam'}],
      25: [{ t:'Hefteintrag Bio',c:'homework'}],
      26: [{ t:'10:20 Unterrichtsschluss',c:'school'}],
      29: [{ t:'HA Deutsch',c:'homework'}],
      30: [{ t:'Physik Kurzarbeit',c:'exam'}]
    };
    return `<div class="calendar-grid">${weekdays.map(w => `<div class="calendar-weekday">${w}</div>`).join('')}${cells.map(c => `<div class="calendar-day ${c.muted ? 'muted' : ''} ${c.day === 22 && !c.muted ? 'today' : ''}"><div class="day-number">${c.day}</div>${!c.muted && eventMap[c.day] ? eventMap[c.day].map(e => `<div class="cal-event ${e.c}" data-action="calendar-event">${e.t}</div>`).join('') : ''}</div>`).join('')}</div>`;
  }

  function homeworkPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead('Hausaufgaben', teacher ? 'Aufgaben erstellen, verteilen und Abgaben kontrollieren.' : 'Offene, laufende und erledigte Aufgaben im Überblick.', `<button class="secondary-btn" data-action="filter-homework">${icon('filter')} Filtern</button><button class="primary-btn" data-action="new-homework">${icon('plus')} ${teacher ? 'Aufgabe erstellen' : 'Eigene Aufgabe'}</button>`)}
      <div class="demo-note">${icon('info')} Dieser Bereich ist im Prototyp klickbar. Aufgaben können abgehakt und zwischen den Statusspalten simuliert werden.</div>
      <section class="board">
        ${boardColumn(teacher ? 'Entwürfe' : 'Offen', teacher ? teacherDrafts() : studentOpenTasks(), 3)}
        ${boardColumn(teacher ? 'Veröffentlicht' : 'In Bearbeitung', teacher ? teacherPublished() : studentProgressTasks(), 2)}
        ${boardColumn(teacher ? 'Abgeschlossen' : 'Erledigt', teacher ? teacherClosed() : studentDoneTasks(), 3)}
      </section>
    </div>`;
  }

  function boardColumn(title, cards, count) {
    return `<div class="board-column"><div class="board-head"><strong>${title}</strong><span class="board-count">${count}</span></div>${cards}</div>`;
  }

  function taskCard(id, subject, title, text, due, progress, done = false) {
    const checked = done || state.completedTasks.has(id);
    return `<article class="task-card"><div class="task-card-top"><span class="task-subject">${subject}</span><button class="checkbox ${checked ? 'checked' : ''}" data-action="toggle-task" data-task-id="${id}">${checked ? icon('check') : ''}</button></div><h3>${title}</h3><p>${text}</p>${progress !== null ? `<div class="progress"><span style="width:${progress}%"></span></div>` : ''}<div class="task-meta"><span>${icon('clock')} ${due}</span><button class="panel-link" data-action="task-details">Öffnen</button></div></article>`;
  }

  function studentOpenTasks() {
    return taskCard('math-p12','Mathematik','S. 124, Nr. 3–6','Quadratische Gleichungen mit Lösungsweg bearbeiten.','Morgen · 08:00',0) + taskCard('english-vocab','Englisch','Vocabulary Unit 4','Vokabeln S. 218–221 lernen.','Mi. · 09:45',0) + taskCard('german-reading','Deutsch','Lektüre Kapitel 7','Kapitel lesen und drei Textstellen markieren.','Fr. · 10:35',0);
  }
  function studentProgressTasks() {
    return taskCard('chem-sheet','Chemie','Arbeitsblatt Redox','Teilgleichungen vervollständigen und hochladen.','Do. · 11:30',65) + taskCard('history-presentation','Geschichte','Kurzpräsentation Weimar','Eine Folie zur politischen Situation 1929 erstellen.','Mo. · 12:15',35);
  }
  function studentDoneTasks() {
    return taskCard('bio-worksheet','Biologie','Arbeitsblatt Zellteilung','Abgegeben am 19.06.2026.','Erledigt',100,true) + taskCard('french-text','Französisch','Textproduktion Schweiz','Monolog als Stichpunkte vorbereitet.','Erledigt',100,true) + taskCard('physics-formulas','Physik','Formeln Energie','Formelsammlung ergänzt.','Erledigt',100,true);
  }
  function teacherDrafts() {
    return taskCard('td1','Mathematik · 10A','Übungsblatt Quadratische Funktionen','Aufgaben in drei Schwierigkeitsstufen.','Noch nicht veröffentlicht',25) + taskCard('td2','Physik · 9B','Energie im Alltag','Rechercheauftrag mit zwei Leitfragen.','Noch nicht veröffentlicht',50) + taskCard('td3','Mathematik · 8A','LGS wiederholen','Aufgaben aus dem Schulbuch auswählen.','Entwurf',10);
  }
  function teacherPublished() {
    return taskCard('tp1','Mathematik · 10A','S. 124, Nr. 3–6','24 von 27 Lernenden haben begonnen.','Fällig morgen',78) + taskCard('tp2','Physik · 9B','Arbeitsblatt Leistung','18 von 25 Abgaben vorhanden.','Fällig Donnerstag',72);
  }
  function teacherClosed() {
    return taskCard('tc1','Mathematik · 8A','Einsetzungsverfahren','28 von 28 Abgaben.','Abgeschlossen',100,true) + taskCard('tc2','Physik · 9B','Schaltpläne','25 von 25 Abgaben.','Abgeschlossen',100,true) + taskCard('tc3','Mathematik · 10A','Parabeln zeichnen','27 von 27 Abgaben.','Abgeschlossen',100,true);
  }

  function examsPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead('Leistungsnachweise', teacher ? 'Schulaufgaben, Kurzarbeiten und Stegreifaufgaben planen.' : 'Termine, Lernstoff und Vorbereitungsstand deiner Prüfungen.', `<button class="secondary-btn" data-action="old-exams">${icon('file')} Alte Schulaufgaben</button><button class="primary-btn" data-action="new-exam">${icon('plus')} ${teacher ? 'Termin anlegen' : 'Lernplan erstellen'}</button>`)}
      <div class="tabs"><button class="tab active">Anstehend</button><button class="tab">Vergangen</button><button class="tab">Alte Schulaufgaben</button><button class="tab">Lernpläne</button></div>
      <section class="grid grid-3">
        ${examCard('Mathematik', teacher ? '10A' : 'Schulaufgabe', 'Mi., 24.06.2026 · 4. Stunde', 'Quadratische Funktionen, Nullstellen, Scheitelpunktform', 78, 'math')}
        ${examCard('Englisch', teacher ? '9C' : 'Schulaufgabe', 'Mi., 01.07.2026 · 2. Stunde', 'Reading comprehension, text analysis, mediation', 52, 'english')}
        ${examCard('Chemie', teacher ? '10B' : 'Kurzarbeit', 'Di., 14.07.2026 · 3./4. Stunde', 'Redoxreaktionen, Oxidationszahlen und Ester', 34, 'bio')}
      </section>
      <section class="panel" style="margin-top:16px"><header class="panel-head"><div><h2>${teacher ? 'Prüfungsplanung' : 'Empfohlene Vorbereitung'}</h2><div class="panel-sub">Automatisch aus Terminen und Stoffgebieten erstellt</div></div></header><div class="panel-body">${teacher ? teacherExamPlan() : studentStudyPlan()}</div></section>
    </div>`;
  }

  function examCard(subject, type, date, topics, progress, cls) {
    return `<article class="subject-card ${cls}"><div class="subject-card-top"><div class="subject-icon">${icon('exam')}</div><span class="status ${progress > 70 ? 'done' : progress > 45 ? 'open' : 'danger'}">${progress}% vorbereitet</span></div><h3>${subject}</h3><p><strong>${type}</strong><br>${date}<br><br>${topics}</p><div class="progress"><span style="width:${progress}%"></span></div><div class="subject-card-footer"><span>${progress}%</span><button class="panel-link" data-action="show-exam" data-subject="${subject}">Details öffnen</button></div></article>`;
  }

  function studentStudyPlan() {
    return `<div class="grid grid-3">${studyStep('Heute','Mathematik','Scheitelpunktform wiederholen',true)}${studyStep('Dienstag','Mathematik','Gemischte Übungsaufgaben bearbeiten',false)}${studyStep('Mittwoch','Vor der SA','Formeln 15 Minuten ansehen',false)}</div>`;
  }
  function teacherExamPlan() {
    return `<div class="grid grid-3">${studyStep('Heute','10A Mathematik','Aufgaben final prüfen',true)}${studyStep('Dienstag','10A Mathematik','Kopien und Sitzplan vorbereiten',false)}${studyStep('Mittwoch','4. Stunde','Schulaufgabe durchführen',false)}</div>`;
  }
  function studyStep(date, subject, text, active) {
    return `<div class="agenda-item" style="${active ? 'border-color:#bdb9f4;background:#f8f7ff' : ''}"><div class="agenda-date">${date}</div><strong>${subject}</strong><small>${text}</small></div>`;
  }

  function subjectsPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead(teacher ? 'Stoff & Materialien' : 'Stoff & Lernpläne', teacher ? 'Unterrichtsinhalte strukturiert veröffentlichen und Materialien zuordnen.' : 'Alle Fächer, Themen, Zusammenfassungen und Übungen an einem Ort.', `<button class="secondary-btn" data-action="filter-subjects">${icon('filter')} Filtern</button><button class="primary-btn" data-action="new-topic">${icon('plus')} ${teacher ? 'Thema hinzufügen' : 'Lernplan starten'}</button>`)}
      <div class="subject-cards">
        ${subjectCard('Mathematik','Quadratische Funktionen','8 Themen · 24 Übungen','76%','math','chart')}
        ${subjectCard('Deutsch','Argumentation & Lektüre','6 Themen · 12 Materialien','64%','german','book')}
        ${subjectCard('Englisch','Unit 4 · Globalisation','7 Themen · 18 Übungen','58%','english','chat')}
        ${subjectCard('Chemie','Redox & Ester','9 Themen · 21 Übungen','43%','chemistry','sparkles')}
        ${subjectCard('Geschichte','Weimarer Republik','5 Themen · 9 Materialien','81%','history','school')}
        ${subjectCard('Biologie','Genetik','6 Themen · 14 Übungen','69%','bio','layers')}
      </div>
      <section class="grid grid-2" style="margin-top:16px">
        <article class="panel"><header class="panel-head"><div><h2>${teacher ? 'Zuletzt bearbeitete Stoffpläne' : 'Als Nächstes lernen'}</h2><div class="panel-sub">Vorschläge auf Basis der anstehenden Termine</div></div></header><div class="panel-body">${taskRow('Heute','Quadratische Funktionen','Nullstellen mit der pq-Formel','math')}${taskRow('Morgen','Englisch Unit 4','Writing: comment','english')}${taskRow('Do.','Chemie Redox','Oxidations- und Reduktionsmittel','bio')}</div></article>
        <article class="panel"><header class="panel-head"><div><h2>Alte Schulaufgaben & Lösungen</h2><div class="panel-sub">Zum Üben und Vergleichen</div></div><button class="panel-link" data-action="old-exams">Alle Dateien</button></header><div class="panel-body">${fileRow('Mathematik SA 2 · 2025','Mit Musterlösung · PDF','file')}${fileRow('Englisch Schulaufgabe · Unit 3','Aufgaben und Erwartungshorizont','file')}${fileRow('Chemie Kurzarbeit · Redox','Lösungen freigegeben','file')}</div></article>
      </section>
    </div>`;
  }

  function subjectCard(title, subtitle, meta, progress, cls, iconName) {
    return `<article class="subject-card ${cls}" data-action="open-subject" data-subject="${title}"><div class="subject-card-top"><div class="subject-icon">${icon(iconName)}</div><button class="icon-btn">${icon('more')}</button></div><h3>${title}</h3><p>${subtitle}</p><div class="progress"><span style="width:${progress}"></span></div><div class="subject-card-footer"><span>${meta}</span><strong>${progress}</strong></div></article>`;
  }

  function notesPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead('Hefteinträge', teacher ? 'Uploads prüfen, freigeben und automatisch zusammenfassen.' : 'Hefteinträge hochladen, vervollständigen und von der KI zusammenfassen lassen.', `<button class="secondary-btn" data-action="scan-note">${icon('image')} Kamera-Scan</button><button class="primary-btn" data-action="upload-note">${icon('upload')} Hochladen</button>`)}
      <section class="grid content-sidebar">
        <div>
          <article class="panel"><header class="panel-head"><div><h2>${teacher ? 'Neue Uploads prüfen' : 'Neuen Hefteintrag hochladen'}</h2><div class="panel-sub">Fotos oder PDF-Dateien werden automatisch erkannt</div></div></header><div class="panel-body"><div class="upload-zone" data-action="upload-note"><div><div class="upload-icon">${icon('upload')}</div><strong>Datei hier ablegen oder auswählen</strong><p>JPG, PNG oder PDF · maximal 15 MB</p></div></div></div></article>
          <article class="panel" style="margin-top:16px"><header class="panel-head"><div><h2>${teacher ? 'Warteschlange' : 'Meine Hefteinträge'}</h2><div class="panel-sub">Zuletzt hochgeladen und bearbeitet</div></div><button class="panel-link">Sortieren</button></header><div class="panel-body">
            ${fileRow('Quadratische Funktionen – Scheitelpunktform', `${teacher ? 'Lisa M. · 10A' : 'Mathematik'} · Heute, 09:14 · 3 Seiten`, 'image')}
            ${fileRow('Redoxreaktionen in saurer Lösung', `${teacher ? 'Jonas K. · 10B' : 'Chemie'} · Gestern · 2 Seiten`, 'file')}
            ${fileRow('Weimarer Republik – Krisenjahr 1923', `${teacher ? 'Anna B. · 9C' : 'Geschichte'} · 18.06. · 4 Seiten`, 'image')}
            ${fileRow('Text analysis – stylistic devices', `${teacher ? 'Max R. · 10A' : 'Englisch'} · 17.06. · 2 Seiten`, 'file')}
          </div></article>
        </div>
        <aside class="panel"><header class="panel-head"><div><h2>KI-Zusammenfassung</h2><div class="panel-sub">Automatisch aus dem letzten Upload</div></div></header><div class="panel-body"><div class="demo-note">${icon('sparkles')} Vorschau: „Quadratische Funktionen – Scheitelpunktform“</div><h3 style="font-size:14px;margin:0 0 9px">Das Wichtigste</h3><p style="font-size:12px;color:var(--muted);line-height:1.65">Die Scheitelpunktform lautet <strong>f(x) = a(x − d)² + e</strong>. Der Scheitelpunkt ist S(d|e). Der Parameter a bestimmt Öffnung und Streckung der Parabel.</p><ul style="font-size:12px;color:var(--muted);line-height:1.7;padding-left:18px"><li>Scheitelpunkt direkt ablesen</li><li>Verschiebung in x- und y-Richtung</li><li>Umformen aus der Normalform</li></ul><button class="primary-btn" style="width:100%;margin-top:12px" data-action="create-summary">${icon('bot')} Vollständige Zusammenfassung</button></div></aside>
      </section>
    </div>`;
  }

  function aiPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead(teacher ? 'KI-Werkzeuge' : 'Übungen & KI-Lernhilfe', teacher ? 'Materialien, Aufgaben und Zusammenfassungen für den Unterricht erstellen.' : 'Lass dir Aufgaben erklären, erstelle Übungen oder werde passend zu deinem Stoff abgefragt.', `<button class="secondary-btn" data-action="clear-ai">${icon('refresh')} Neuer Chat</button>`)}
      <div class="ai-layout">
        <aside class="ai-side"><h3>${teacher ? 'Werkzeuge' : 'Übungsbereiche'}</h3>
          ${practiceCard(teacher ? 'Arbeitsblatt erstellen' : 'Mathematik: Nullstellen','12 Aufgaben · drei Stufen',true)}
          ${practiceCard(teacher ? 'Stoff zusammenfassen' : 'Chemie: Redox','Abfrage mit Feedback',false)}
          ${practiceCard(teacher ? 'Testfragen generieren' : 'Englisch: Unit 4','Vokabeln und Writing',false)}
          ${practiceCard(teacher ? 'Differenzieren' : 'Deutsch: Argumentation','Aufbau und Formulierungen',false)}
          <button class="secondary-btn" style="width:100%;margin-top:8px" data-action="new-practice">${icon('plus')} Neu erstellen</button>
        </aside>
        <section class="ai-main">
          <header class="ai-header"><div class="ai-header-title"><div class="ai-bot">${icon('bot')}</div><div><strong>Schoolday AI</strong><small>● Bereit</small></div></div><span class="status info">Prototyp</span></header>
          <div class="chat-stream" id="ai-stream">${state.aiMessages.map(message => chatBubble(message.from, message.text)).join('')}</div>
          <div class="chat-composer"><textarea id="ai-input" placeholder="${teacher ? 'z. B. Erstelle ein Übungsblatt zu quadratischen Funktionen …' : 'z. B. Erkläre mir die Scheitelpunktform einfach …'}"></textarea><button class="send-btn" data-action="send-ai">${icon('send')}</button></div>
        </section>
      </div>
    </div>`;
  }

  function practiceCard(title, subtitle, active) {
    return `<div class="practice-card ${active ? 'active' : ''}"><strong>${title}</strong><small>${subtitle}</small></div>`;
  }

  function chatBubble(from, text) {
    return `<div class="chat-message ${from === 'user' ? 'user' : ''}"><div class="chat-avatar">${icon(from === 'user' ? 'user' : 'bot')}</div><div class="chat-bubble">${text}</div></div>`;
  }

  function gradesPage() {
    const teacher = state.role === 'teacher';
    const average = gradeAverage();
    return `<div class="page">${pageHead('Notenmanager', teacher ? 'Noten erfassen, gewichten und den aktuellen Leistungsstand auswerten.' : 'Noten, Gewichtungen und deinen aktuellen Schnitt nachvollziehen.', `<button class="secondary-btn" data-action="grade-export">${icon('download')} Exportieren</button><button class="primary-btn" data-action="add-grade">${icon('plus')} Note hinzufügen</button>`)}
      <section class="grade-layout">
        <article class="panel"><header class="panel-head"><div><h2>${teacher ? 'Noten der Klasse 10A' : 'Meine Noten'}</h2><div class="panel-sub">Schuljahr 2025/26 · 2. Halbjahr</div></div><select class="mini-btn"><option>Alle Fächer</option><option>Mathematik</option><option>Englisch</option></select></header><div class="panel-body no-pad"><div style="overflow:auto"><table class="grade-table"><thead><tr><th>Fach</th><th>Leistungsnachweis</th><th>Datum</th><th>Gewichtung</th><th>Note</th></tr></thead><tbody>${state.grades.map(g => `<tr><td><strong>${g.subject}</strong></td><td>${g.type}</td><td>${g.date}</td><td>${g.weight}×</td><td><span class="grade-chip grade-${g.grade}">${g.grade}</span></td></tr>`).join('')}</tbody></table></div></div></article>
        <aside class="panel"><header class="panel-head"><div><h2>Aktueller Schnitt</h2><div class="panel-sub">Gewichteter Durchschnitt</div></div></header><div class="grade-summary"><div class="grade-ring" style="background:conic-gradient(var(--brand) 0 ${Math.max(10,100-average*13)}%,#ececf2 ${Math.max(10,100-average*13)}% 100%)"><span class="grade-ring-value">${average.toFixed(2).replace('.',',')}</span></div><p>${teacher ? 'Klassendurchschnitt der Auswahl' : 'Dein Schnitt aus allen eingetragenen Noten'}</p><div class="calculator-row"><div class="field"><label>Neue Note</label><input id="calc-grade" type="number" min="1" max="6" step="1" value="2"></div><div class="field"><label>Gewichtung</label><select id="calc-weight"><option value="1">1×</option><option value="2" selected>2×</option><option value="3">3×</option></select></div></div><button class="primary-btn" style="width:100%;margin-top:10px" data-action="calculate-grade">Neuen Schnitt berechnen</button><div id="grade-result" style="margin-top:10px;font-size:12px;color:var(--muted)"></div></div></aside>
      </section>
      <section class="grid grid-3" style="margin-top:16px">${statCard('Beste Leistung','Deutsch · 1','star','green','Mündliche Mitarbeit')}${statCard('Nächster Eintrag','Mathematik','calendar','blue','Nach der SA am 24.06.')}${statCard('Ziel bis Jahresende','≤ 2,3','chart','orange','Noch erreichbar')}</section>
    </div>`;
  }

  function gradeAverage() {
    const totals = state.grades.reduce((a, g) => ({ sum: a.sum + g.grade * g.weight, weight: a.weight + g.weight }), { sum: 0, weight: 0 });
    return totals.sum / totals.weight;
  }

  function timetablePage() {
    const teacher = state.role === 'teacher';
    const days = ['Zeit','Montag','Dienstag','Mittwoch','Donnerstag','Freitag'];
    const rows = [
      { time:'08:00', end:'08:45', lessons:[['Deutsch','A101','german'],['Mathematik','B204','math'],['Englisch','A112','english'],['Sport','DTH','bio'],['Geschichte','A210','history']] },
      { time:'08:50', end:'09:35', lessons:[['Mathematik','B204','math'],['Chemie','C104','bio'],['Deutsch','A101','german'],['Englisch','A112','english'],['Mathematik','B204','math']] },
      { time:'09:45', end:'10:30', lessons:[['Englisch','A112','english'],['Geschichte','A210','history'],['Mathematik','B204','math'],['Chemie','C104','bio'],['Deutsch','A101','german']] },
      { time:'10:35', end:'11:20', lessons:[['Physik','P102','bio'],['Deutsch','A101','german'],['Sport','DTH','bio'],['Mathematik','B204','math'],['Englisch','A112','english']] },
      { time:'11:30', end:'12:15', lessons:[['Chemie','C104','bio'],['Englisch','A112','english'],['Geschichte','A210','history'],['Deutsch','A101','german'],['Physik','P102','bio']] },
      { time:'12:15', end:'13:00', lessons:[['Religion','A208','history'],['Biologie','B108','bio'],['Deutsch','A101','german'],['Geschichte','A210','history'],['Mathematik','B204','math']] }
    ];
    return `<div class="page">${pageHead('Stundenplan', teacher ? 'Eigener Unterricht, Räume und Vertretungen.' : 'Deine Unterrichtswoche mit Räumen, Lehrkräften und Änderungen.', `<button class="secondary-btn" data-action="print-timetable">${icon('download')} Exportieren</button><button class="primary-btn" data-action="week-next">Nächste Woche ${icon('right')}</button>`)}
      <div class="demo-note">${icon('info')} Woche vom 22. bis 26. Juni 2026 · Änderungen und Vertretungen sind farblich hervorgehoben.</div>
      <section class="panel timetable"><div class="timetable-grid">${days.map(d => `<div class="tt-cell tt-head">${d}</div>`).join('')}${rows.map(row => `<div class="tt-cell tt-time"><strong>${row.time}</strong><span>${row.end}</span></div>${row.lessons.map((l, i) => `<div class="tt-cell"><div class="lesson ${l[2]}"><strong>${teacher ? (i % 2 ? '9B · ' : '10A · ') : ''}${l[0]}</strong><small>${l[1]}${teacher ? ' · Unterricht' : ' · Fachlehrkraft'}</small></div></div>`).join('')}`).join('')}</div></section>
    </div>`;
  }

  const conversations = [
    { id:'mathe-10a', name:'Mathematik 10A', initials:'10A', preview:'Frau Schneider: Bitte denkt an …', time:'10:42', type:'group' },
    { id:'anna', name:'Anna Müller', initials:'AM', preview:'Hast du die Hausaufgabe verstanden?', time:'09:18', type:'direct' },
    { id:'teacher', name:'Frau Schneider', initials:'FS', preview:'Der Lernstoff wurde aktualisiert.', time:'Gestern', type:'direct' },
    { id:'class', name:'Klasse 10A', initials:'10A', preview:'Max: Weiß jemand den Raum?', time:'Gestern', type:'group' },
    { id:'chem', name:'Chemie Lerngruppe', initials:'CH', preview:'Ich habe eine Zusammenfassung …', time:'Fr.', type:'group' }
  ];

  function chatPage() {
    const teacher = state.role === 'teacher';
    const active = conversations.find(c => c.id === state.selectedConversation) || conversations[0];
    return `<div class="page">${pageHead('Chats', teacher ? 'Mit Klassen, einzelnen Lernenden, Eltern und Kolleginnen kommunizieren.' : 'Mit Mitschülern und Lehrkräften kommunizieren.', `<button class="primary-btn" data-action="new-chat">${icon('plus')} Neuer Chat</button>`)}
      <section class="messages-layout">
        <aside class="conversation-list"><div class="conversation-search"><input placeholder="Unterhaltungen suchen …"></div>${conversations.map(c => `<div class="conversation ${c.id === active.id ? 'active' : ''}" data-action="select-conversation" data-conversation="${c.id}"><div class="avatar ${teacher ? 'teacher' : ''}">${c.initials}</div><div class="conversation-copy"><div class="conversation-top"><strong>${c.name}</strong><time>${c.time}</time></div><p>${c.preview}</p></div></div>`).join('')}</aside>
        <div class="message-pane"><header class="message-head"><div class="avatar ${teacher ? 'teacher' : ''}">${active.initials}</div><div><strong>${active.name}</strong><small>● online</small></div><button class="icon-btn" style="margin-left:auto" data-action="chat-info">${icon('info')}</button></header><div class="message-body" id="message-body"><div class="message-date">Heute</div>${messageThread(active.id)}</div><div class="message-composer"><button class="icon-btn" data-action="attach-chat">${icon('paperclip')}</button><textarea id="message-input" placeholder="Nachricht schreiben …"></textarea><button class="send-btn" data-action="send-message">${icon('send')}</button></div></div>
      </section>
    </div>`;
  }

  function messageThread(id) {
    if (id === 'anna') return chatBubble('bot','Hey, hast du bei Aufgabe 4 auch zwei Lösungen?') + chatBubble('user','Ja, ich habe x₁ = 2 und x₂ = −3.') + chatBubble('bot','Perfekt, dann habe ich es doch richtig. Danke!');
    if (id === 'teacher') return chatBubble('bot','Hallo Jeremi, ich habe den Lernstoff für die Schulaufgabe aktualisiert. Der Abschnitt zu Extremwerten kommt nicht dran.') + chatBubble('user','Danke für die Information!');
    return chatBubble('bot','Guten Morgen zusammen! Bitte denkt daran, die Hausaufgabe bis morgen 08:00 Uhr abzugeben.') + chatBubble('user','Kommt bei der Schulaufgabe auch die allgemeine Form dran?') + chatBubble('bot','Ja, Normalform und Scheitelpunktform. Die genaue Übersicht findet ihr unter Leistungsnachweise.');
  }

  function lettersPage() {
    const teacher = state.role === 'teacher';
    return `<div class="page">${pageHead(teacher ? 'Mitteilungen & Elternbriefe' : 'Elternbriefe', teacher ? 'Informationen verfassen, Zielgruppen wählen und Lesebestätigungen prüfen.' : 'Schulische Informationen, Rückmeldungen und Lesebestätigungen.', `<button class="secondary-btn" data-action="archive-letters">${icon('layers')} Archiv</button><button class="primary-btn" data-action="new-letter">${icon('plus')} ${teacher ? 'Mitteilung verfassen' : 'Rückmeldung geben'}</button>`)}
      <section class="grid content-sidebar">
        <article class="panel"><header class="panel-head"><div><h2>${teacher ? 'Versendete und geplante Mitteilungen' : 'Posteingang'}</h2><div class="panel-sub">Schuljahr 2025/26</div></div></header><div class="panel-body">
          ${letterRow('GMG-Fashion Bestellung und Lagerausverkauf am Elternsprechabend','17.06.2026','Schulleitung',true)}
          ${letterRow('Informationen zum Schulfest am 24.07.2026','12.06.2026','Organisationsteam',false)}
          ${letterRow('Einverständniserklärung zur Exkursion Ethik','08.06.2026','Fachschaft Ethik',false)}
          ${letterRow('Hinweise zum Jahreszeugnis und Schuljahresende','02.06.2026','Schulleitung',false)}
          ${letterRow('Anmeldung zu freiwilligen Intensivierungsstunden','27.05.2026','Sekretariat',false)}
        </div></article>
        <aside class="panel"><header class="panel-head"><div><h2>${teacher ? 'Versandstatus' : 'Benötigte Rückmeldungen'}</h2><div class="panel-sub">Aktuelle Übersicht</div></div></header><div class="panel-body">${teacher ? `<div class="grade-summary"><div class="grade-ring"><span class="grade-ring-value">87%</span></div><p>Elternbrief zum Schulfest gelesen</p></div>` : `${teacherTodo('Exkursion Ethik bestätigen','Frist: 26.06.2026','open')}${teacherTodo('Datenschutz-Einwilligung','Bereits bestätigt','done')}${teacherTodo('Schulfest-Helferliste','Optional','neutral')}`}</div></aside>
      </section>
    </div>`;
  }

  function letterRow(title, date, sender, unread) {
    return `<div class="task-row" data-modal="parent-letter" style="cursor:pointer"><div class="notice-icon">${icon('mail')}</div><div class="row-main"><strong>${title}${unread ? ' · Neu' : ''}</strong><small>${sender} · Versendet am ${date}</small></div>${unread ? '<span class="unread-mark"></span>' : '<span class="status neutral">Gelesen</span>'}<button class="mini-btn">Lesen</button></div>`;
  }

  function modalContent(id) {
    const contents = {
      'special-exams': {
        title: 'Termine zur Nachprüfung bzw. Besonderen Prüfung',
        body: `<p>Die Nachprüfungen der Jahrgangsstufen 6–9 beziehungsweise die Besondere Prüfung der Jahrgangsstufe 10 finden in der letzten Woche der Sommerferien statt.</p><p>Die Nachprüfungen finden am Gregor-Mendel-Gymnasium statt. Den Zulassungsbescheid mit den genauen Zeiten erhalten Sie nach der Anmeldung per Post.</p><h3>Prüfungstermine</h3><ul><li>Deutsch: Mittwoch, 09.09.2026, 09:00–12:00 Uhr</li><li>Mathematik: Donnerstag, 10.09.2026, 09:00–11:00 Uhr</li><li>1. bzw. 2. Fremdsprache: Freitag, 11.09.2026, 09:00–11:00 Uhr</li></ul><p>Anmeldeformulare sind bei OStRin Krämer erhältlich und möglichst in der letzten Schulwoche, spätestens bis 07. August 2026 um 12:00 Uhr, einzureichen.</p>`
      },
      'medical-certificates': {
        title: 'Hinweise zu Attesten',
        body: `<p>Ein ärztliches Attest ist in den Jahrgangsstufen 5–11 erforderlich, wenn eine Schülerin oder ein Schüler länger als fünf Schultage am Stück erkrankt ist oder sich unmittelbar vor einem angesagten Leistungsnachweis im Sekretariat befreien lässt.</p><p>Alle Atteste werden grundsätzlich erst nach dem Wiederscheinen bei den Absentenheftführern abgegeben.</p><div class="demo-note">${icon('alert')} Ärztliche Atteste für Sportbefreiungen müssen direkt bei der Sportlehrkraft abgegeben werden.</div>`
      },
      'leave-info': {
        title: 'Beurlaubungen für 2025/26',
        body: `<p>Bei unaufschiebbaren Facharztterminen oder persönlichen Angelegenheiten, die einen großen Leistungsnachweis betreffen, soll die Fachlehrkraft möglichst zeitnah informiert werden.</p><h3>Schulfest</h3><p>Freitag, 24.07.2026, 14:00–18:00 Uhr mit Anwesenheitspflicht. Beurlaubungen können an diesem Tag nur bei äußerst wichtigen Gründen genehmigt werden.</p>`
      },
      'parent-letter': {
        title: 'GMG-Fashion Bestellung und Lagerausverkauf',
        body: `<p><strong>Versendet am 17.06.2026</strong></p><p>Liebe Eltern und Erziehungsberechtigte,</p><p>am kommenden Elternsprechabend besteht erneut die Möglichkeit, Artikel unserer GMG-Fashion-Kollektion zu bestellen. Zusätzlich bieten wir ausgewählte Restbestände zu reduzierten Preisen an.</p><p>Die Ausgabe und Bestellung findet im Bereich vor der Aula statt. Bitte beachten Sie, dass nicht alle Größen in unbegrenzter Anzahl verfügbar sind.</p><p>Mit freundlichen Grüßen<br>Ihr GMG-Team</p><div class="demo-note">${icon('info')} Dies ist ein Beispiel-Elternbrief innerhalb des Prototyps.</div>`
      }
    };
    return contents[id];
  }

  function showGenericForm(title, fields, actionLabel = 'Speichern') {
    const formHtml = fields.map(f => {
      let control = '';
      if (f.type === 'textarea') {
        control = `<textarea placeholder="${f.placeholder || ''}"></textarea>`;
      } else if (f.type === 'select') {
        control = `<select>${(f.options || []).map(o => `<option>${o}</option>`).join('')}</select>`;
      } else {
        control = `<input type="${f.type || 'text'}" placeholder="${f.placeholder || ''}" value="${f.value || ''}">`;
      }
      return `<div class="field" style="${f.full ? 'grid-column:1/-1' : ''}"><label>${f.label}</label>${control}</div>`;
    }).join('');
    openModal(title, `<div class="grid grid-2">${formHtml}</div>`, { primary: { label: actionLabel, action: 'save-generic' } });
  }

  app.addEventListener('click', event => {
    const enter = event.target.closest('[data-enter-role]');
    if (enter) return navigate(enter.dataset.enterRole, 'dashboard');

    const nav = event.target.closest('[data-nav]');
    if (nav) return navigate(state.role, nav.dataset.nav);

    const modal = event.target.closest('[data-modal]');
    if (modal) {
      const content = modalContent(modal.dataset.modal);
      if (content) openModal(content.title, content.body, { primary: { label: 'Als gelesen markieren', action: 'mark-read' } });
      return;
    }

    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    if (handleModalAction(actionEl)) return;
    if (action === 'landing') { closeDropdowns(); setSidebarOpen(false); history.pushState({}, '', '/'); state.role = null; render(); }
    else if (action === 'toggle-sidebar') setSidebarOpen(!state.sidebarOpen);
    else if (action === 'close-sidebar') setSidebarOpen(false);
    else if (action === 'notifications') showNotifications(actionEl);
    else if (action === 'profile-menu') showProfileMenu(actionEl);
    else if (action === 'help') openModal('Hilfe zum Prototyp', `<p>Alle wichtigen Bereiche sind über die linke Navigation erreichbar. Die Daten dienen nur der Präsentation.</p><ul><li>Aufgaben können abgehakt werden.</li><li>Die KI-Demo reagiert auf Texteingaben.</li><li>Noten können testweise neu berechnet werden.</li><li>Dialoge und Detailansichten sind klickbar.</li></ul>`);
    else if (action === 'demo-settings') openModal('Einstellungen', `<div class="field"><label>Darstellung</label><select><option>Systemstandard</option><option>Hell</option><option>Dunkel</option></select></div><div class="field" style="margin-top:14px"><label>Benachrichtigungen</label><select><option>Alle aktiviert</option><option>Nur wichtige</option><option>Deaktiviert</option></select></div>`, { primary: { label: 'Speichern', action: 'save-generic' } });
    else if (action === 'toggle-checkbox') { actionEl.classList.toggle('checked'); actionEl.innerHTML = actionEl.classList.contains('checked') ? icon('check') : ''; toast(actionEl.classList.contains('checked') ? 'Aufgabe erledigt.' : 'Aufgabe wieder geöffnet.', 'info'); }
    else if (action === 'toggle-task') {
      const id = actionEl.dataset.taskId;
      if (state.completedTasks.has(id)) state.completedTasks.delete(id); else state.completedTasks.add(id);
      render();
      toast(state.completedTasks.has(id) ? 'Aufgabe als erledigt markiert.' : 'Aufgabe wieder geöffnet.', 'info');
    }
    else if (action === 'show-exam') showExam(actionEl.dataset.subject || 'Leistungsnachweis');
    else if (action === 'task-details') openModal('Aufgabendetails', `<h3>Arbeitsauftrag</h3><p>Bearbeite die angegebenen Aufgaben vollständig und notiere deinen Lösungsweg. Du kannst deine Lösung anschließend als Foto oder PDF hochladen.</p><h3>Material</h3><p>Schulbuch, Hefteintrag und verknüpfte Lernübersicht.</p>`, { primary: { label: 'Als erledigt markieren', action: 'save-generic' } });
    else if (action === 'open-subject') showSubject(actionEl.dataset.subject);
    else if (action === 'upload-note' || action === 'scan-note') simulateUpload();
    else if (action === 'preview-file') openModal('Dateivorschau', `<div style="min-height:340px;background:#f4f4f7;border:1px solid var(--border);border-radius:10px;display:grid;place-items:center;text-align:center;padding:25px"><div><div class="upload-icon">${icon('file')}</div><strong>Vorschau des Hefteintrags</strong><p style="color:var(--muted)">Im echten System würde hier das Foto oder PDF angezeigt.</p></div></div>`, { large: true });
    else if (action === 'approve-file') toast('Hefteintrag geprüft und freigegeben.');
    else if (action === 'create-summary' || action === 'summarize-notes') { toast('KI-Zusammenfassung wurde erstellt.'); navigate(state.role, 'ai'); }
    else if (action === 'generate-worksheet') { toast('Ein Beispiel-Übungsblatt wurde erstellt.'); navigate(state.role, 'ai'); }
    else if (action === 'send-ai') sendAiMessage();
    else if (action === 'clear-ai') { state.aiMessages = [{ from:'bot', text:'Neuer Chat gestartet. Welches Thema möchtest du bearbeiten?' }]; render(); }
    else if (action === 'calculate-grade') calculateGradePreview();
    else if (action === 'add-grade') showGenericForm('Note hinzufügen', [{label:'Fach',type:'select',options:['Mathematik','Deutsch','Englisch','Chemie','Französisch']},{label:'Note',type:'number',value:'2'},{label:'Art',type:'select',options:['Schulaufgabe','Kurzarbeit','Mündlich','Referat']},{label:'Gewichtung',type:'select',options:['1×','2×','3×']}], 'Note eintragen');
    else if (action === 'select-conversation') { state.selectedConversation = actionEl.dataset.conversation; render(); }
    else if (action === 'send-message') sendMessage();
    else if (action === 'new-homework') showGenericForm(state.role === 'teacher' ? 'Hausaufgabe erstellen' : 'Eigene Aufgabe hinzufügen', [{label:'Titel',placeholder:'z. B. S. 124, Nr. 3–6'},{label:'Fach',type:'select',options:['Mathematik','Deutsch','Englisch','Chemie']},{label:'Fällig am',type:'date'},{label:'Beschreibung',type:'textarea',full:true,placeholder:'Arbeitsauftrag …'}], 'Aufgabe speichern');
    else if (action === 'new-calendar-item') showGenericForm('Termin anlegen', [{label:'Titel',placeholder:'Terminbezeichnung'},{label:'Kategorie',type:'select',options:['Unterricht','Hausaufgabe','Leistungsnachweis','Schule']},{label:'Datum',type:'date'},{label:'Uhrzeit',type:'time'}], 'Termin speichern');
    else if (action === 'new-exam') showGenericForm(state.role === 'teacher' ? 'Leistungsnachweis anlegen' : 'Lernplan erstellen', [{label:'Fach',type:'select',options:['Mathematik','Englisch','Chemie','Deutsch']},{label:'Datum',type:'date'},{label:'Art',type:'select',options:['Schulaufgabe','Kurzarbeit','Stegreifaufgabe']},{label:'Lernstoff',type:'textarea',full:true}], 'Erstellen');
    else if (action === 'new-topic') showGenericForm(state.role === 'teacher' ? 'Thema hinzufügen' : 'Lernplan starten', [{label:'Fach',type:'select',options:['Mathematik','Englisch','Chemie','Deutsch']},{label:'Thema',placeholder:'z. B. Quadratische Funktionen'},{label:'Beschreibung',type:'textarea',full:true}], 'Speichern');
    else if (action === 'create-class') showGenericForm('Klasse hinzufügen', [{label:'Klasse',placeholder:'z. B. 10A'},{label:'Fach',type:'select',options:['Mathematik','Physik']},{label:'Schuljahr',value:'2025/26'}], 'Klasse anlegen');
    else if (action === 'open-class') openModal(`Klasse ${actionEl.dataset.class}`, `<div class="grid grid-3">${statCard('Lernende','27','users','blue','Vollständig')}${statCard('Offene Aufgaben','2','checklist','orange','Diese Woche')}${statCard('Schnitt','2,6','chart','green','Aktueller Stand')}</div><h3>Letzte Aktivität</h3><p>24 Abgaben zur Mathematik-Hausaufgabe, drei ausstehend.</p>`, { large:true });
    else if (['export-classes','grade-export','print-timetable','old-exams','archive-letters'].includes(action)) toast('Demo-Export wurde vorbereitet. In der echten App würde jetzt eine Datei geladen.','info');
    else if (action === 'new-chat') showGenericForm('Neuen Chat starten', [{label:'Empfänger',placeholder:'Name, Klasse oder Gruppe'},{label:'Nachricht',type:'textarea',full:true}], 'Chat starten');
    else if (action === 'new-letter') showGenericForm(state.role === 'teacher' ? 'Mitteilung verfassen' : 'Rückmeldung geben', [{label:'Betreff',placeholder:'Betreff'},{label:'Empfänger',type:'select',options:['Klasse 10A','Alle Eltern','Jahrgangsstufe 10']},{label:'Nachricht',type:'textarea',full:true}], 'Senden');
    else if (action === 'add-reminder') showGenericForm('Erinnerung hinzufügen', [{label:'Titel',placeholder:'Was ist zu erledigen?'},{label:'Fällig am',type:'date'},{label:'Notiz',type:'textarea',full:true}], 'Erinnerung speichern');
    else if (action === 'all-school-notices') openModal('Alle Schulmeldungen', schoolEvents.map(e => `<div class="agenda-item" style="margin-bottom:8px"><div class="agenda-date">${e.date}</div><strong>${e.title}</strong><small>${e.time}</small></div>`).join(''), { large:true });
    else if (['calendar-prev','calendar-next','calendar-today','week-next','filter-homework','filter-subjects','calendar-event','attach-chat','chat-info','new-practice','class-menu'].includes(action)) toast('Diese Bedienung ist für die Präsentation vorbereitet.','info');
  });

  app.addEventListener('change', event => {
    if (event.target.matches('[data-action="role-switch"]')) navigate(event.target.value, 'dashboard');
  });

  app.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && event.target.id === 'ai-input') { event.preventDefault(); sendAiMessage(); }
    if (event.key === 'Enter' && !event.shiftKey && event.target.id === 'message-input') { event.preventDefault(); sendMessage(); }
    if (event.key === 'Enter' && event.target.id === 'global-search') {
      const value = event.target.value.trim();
      if (value) { toast(`Suche nach „${value}“ gestartet.`, 'info'); event.target.value = ''; }
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (document.querySelector('.modal-backdrop')) {
      event.preventDefault();
      closeModal();
    } else if (state.sidebarOpen) {
      event.preventDefault();
      setSidebarOpen(false);
    } else {
      closeDropdowns();
    }
  });

  document.addEventListener('click', event => {
    const modalAction = event.target.closest('.modal-backdrop [data-action]');
    if (modalAction) {
      event.preventDefault();
      handleModalAction(modalAction);
      return;
    }
    if (event.target.classList.contains('modal-backdrop')) {
      closeModal();
      return;
    }
    if (!event.target.closest('.dropdown') && !event.target.closest('[data-action="notifications"]') && !event.target.closest('[data-action="profile-menu"]')) closeDropdowns();
  });

  window.addEventListener('popstate', () => {
    closeModal(false);
    closeDropdowns();
    setSidebarOpen(false);
    render();
  });

  function showNotifications(anchor) {
    document.querySelectorAll('.dropdown').forEach(d => d.remove());
    const rect = anchor.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'dropdown';
    el.style.top = `${rect.bottom + 7}px`;
    el.style.right = `${Math.max(10, innerWidth - rect.right)}px`;
    el.innerHTML = `<div class="dropdown-head">Benachrichtigungen</div><div class="dropdown-item"><div class="notice-icon">${icon('exam')}</div><div><strong>Mathematik-Schulaufgabe</strong><small>In zwei Tagen · Lernplan zu 78% erledigt</small></div></div><div class="dropdown-item"><div class="notice-icon">${icon('mail')}</div><div><strong>Neuer Elternbrief</strong><small>GMG-Fashion Bestellung und Lagerausverkauf</small></div></div><div class="dropdown-item"><div class="notice-icon">${icon('checklist')}</div><div><strong>Hausaufgabe bald fällig</strong><small>Mathematik · morgen 08:00 Uhr</small></div></div>`;
    document.body.appendChild(el);
  }

  function showProfileMenu(anchor) {
    document.querySelectorAll('.dropdown').forEach(d => d.remove());
    const rect = anchor.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'dropdown';
    el.style.left = `${Math.max(10, rect.left - 210)}px`;
    el.style.bottom = `${innerHeight - rect.top + 7}px`;
    el.innerHTML = `<div class="dropdown-head">Mein Profil</div><div class="dropdown-item" data-action="demo-settings">${icon('settings')}<div><strong>Einstellungen</strong><small>Darstellung und Benachrichtigungen</small></div></div><div class="dropdown-item" data-action="landing">${icon('logout')}<div><strong>Demo verlassen</strong><small>Zur Rollenwahl zurückkehren</small></div></div>`;
    document.body.appendChild(el);
  }

  function showExam(subject) {
    openModal(`${subject} · Details`, `<div class="grid grid-2"><div class="agenda-item"><div class="agenda-date">Termin</div><strong>Mittwoch, 24.06.2026</strong><small>4. Stunde · Raum B204</small></div><div class="agenda-item"><div class="agenda-date">Vorbereitung</div><strong>78% abgeschlossen</strong><small>Noch zwei Übungsbereiche offen</small></div></div><h3>Lernstoff</h3><ul><li>Normalform und Scheitelpunktform</li><li>Nullstellen berechnen</li><li>Parabeln zeichnen und verschieben</li><li>Sachaufgaben mit quadratischen Funktionen</li></ul><h3>Materialien</h3>${fileRow('Lernübersicht Quadratische Funktionen','PDF · 4 Seiten','file')}${fileRow('Übungsblatt mit Lösungen','PDF · 12 Aufgaben','file')}`, { large:true, primary:{ label:'Mit KI üben', action:'go-ai' } });
  }

  function showSubject(subject) {
    openModal(subject || 'Fach', `<div class="tabs"><button class="tab active">Übersicht</button><button class="tab">Stoff</button><button class="tab">Übungen</button><button class="tab">Dateien</button></div><div class="grid grid-3">${statCard('Themen','8','layers','blue','2 neu')}${statCard('Übungen','24','checklist','green','18 erledigt')}${statCard('Fortschritt','76%','chart','orange','Auf Kurs')}</div><h3>Aktuelles Thema</h3><p>Quadratische Funktionen: Normalform, Scheitelpunktform, Nullstellen und Anwendungsaufgaben.</p>`, { large:true, primary:{ label:'Übungen öffnen', action:'go-ai' } });
  }

  function simulateUpload() {
    openModal('Hefteintrag hochladen', `<div class="upload-zone" style="min-height:250px"><div><div class="upload-icon">${icon('upload')}</div><strong>Beispieldatei auswählen</strong><p>Für den Prototyp wird ein erfolgreicher Upload simuliert.</p><input type="file" style="margin-top:14px;max-width:100%"></div></div><div class="field" style="margin-top:14px"><label>Fach</label><select><option>Mathematik</option><option>Chemie</option><option>Deutsch</option><option>Englisch</option></select></div>`, { primary:{ label:'Upload simulieren', action:'finish-upload' } });
  }

  function sendAiMessage() {
    const input = document.getElementById('ai-input');
    if (!input || !input.value.trim()) return;
    const prompt = input.value.trim();
    state.aiMessages.push({ from:'user', text: prompt.replace(/</g,'&lt;') });
    const lower = prompt.toLowerCase();
    let answer;
    if (lower.includes('scheitelpunkt')) answer = 'Die Scheitelpunktform ist f(x) = a(x − d)² + e. Der Scheitelpunkt liegt bei S(d|e). Beispiel: f(x) = 2(x − 3)² + 1 hat den Scheitelpunkt S(3|1). Möchtest du dazu eine Übungsaufgabe?';
    else if (lower.includes('redox')) answer = 'Bei einer Redoxreaktion laufen Oxidation und Reduktion gleichzeitig ab. Oxidation bedeutet Elektronenabgabe, Reduktion Elektronenaufnahme. Das Oxidationsmittel wird dabei selbst reduziert.';
    else if (lower.includes('arbeitsblatt') || lower.includes('aufgaben')) answer = 'Ich habe einen Entwurf mit drei leichten, drei mittleren und zwei anspruchsvollen Aufgaben vorbereitet. Im echten System könnte er direkt als PDF gespeichert und einer Klasse zugewiesen werden.';
    else answer = state.role === 'teacher' ? 'Ich habe deinen Auftrag verstanden. Für den Prototyp würde jetzt ein passendes Unterrichtsmaterial erzeugt und zur Bearbeitung angezeigt.' : 'Gerne! Ich würde das Thema zuerst kurz erklären, dann ein Beispiel gemeinsam lösen und dir anschließend eine passende Aufgabe geben.';
    state.aiMessages.push({ from:'bot', text: answer });
    render();
    requestAnimationFrame(() => { const stream = document.getElementById('ai-stream'); if (stream) stream.scrollTop = stream.scrollHeight; });
  }

  function calculateGradePreview() {
    const grade = Number(document.getElementById('calc-grade')?.value || 0);
    const weight = Number(document.getElementById('calc-weight')?.value || 1);
    if (grade < 1 || grade > 6) return toast('Bitte eine Note zwischen 1 und 6 eingeben.', 'info');
    const totals = state.grades.reduce((a,g) => ({ sum:a.sum+g.grade*g.weight, weight:a.weight+g.weight }), {sum:0,weight:0});
    const next = (totals.sum + grade*weight)/(totals.weight+weight);
    const result = document.getElementById('grade-result');
    if (result) result.innerHTML = `Neuer Schnitt: <strong style="color:var(--brand)">${next.toFixed(2).replace('.',',')}</strong>`;
  }

  function sendMessage() {
    const input = document.getElementById('message-input');
    if (!input || !input.value.trim()) return;
    const body = document.getElementById('message-body');
    if (body) body.insertAdjacentHTML('beforeend', chatBubble('user', input.value.trim().replace(/</g,'&lt;')));
    input.value = '';
    if (body) body.scrollTop = body.scrollHeight;
    toast('Nachricht im Prototyp gesendet.');
  }

  function render() {
    const route = parseRoute();
    state.role = route.role;
    state.view = route.view;
    if (!state.role) {
      setSidebarOpen(false);
      renderLanding();
    } else {
      renderShell();
    }
    if (!document.querySelector('.modal-backdrop')) document.body.classList.remove('modal-open');
    document.title = state.role ? `${state.role === 'teacher' ? 'Lehrer' : 'Schüler'} · Know your Schoolday` : 'Know your Schoolday';
  }

  render();
})();
