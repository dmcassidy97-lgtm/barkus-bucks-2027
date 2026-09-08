document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'barkus-pickleball-bracket-v1';

  function save() {
    const data = {};
    document.querySelectorAll('.team-input').forEach((input) => {
      data[input.id] = input.value;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* private browsing / storage blocked — bracket just won't persist */
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.entries(data).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      });
    } catch (e) {
      /* ignore corrupt/blocked storage */
    }
  }

  document.querySelectorAll('.team-input').forEach((input) => {
    input.addEventListener('input', save);
  });

  document.querySelectorAll('.win-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sourceInput = document.getElementById(btn.dataset.source);
      const targetInput = document.getElementById(btn.dataset.target);
      if (sourceInput && targetInput && sourceInput.value.trim()) {
        targetInput.value = sourceInput.value.trim();
        save();
      }
    });
  });

  const resetBtn = document.getElementById('reset-bracket');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!confirm("Clear the whole bracket? There's no undo.")) return;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      document.querySelectorAll('.team-input').forEach((input) => {
        input.value = '';
      });
    });
  }

  load();
});
