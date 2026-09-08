document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const loginMsg = document.getElementById('login-msg');
  const logoutBtn = document.getElementById('logout-btn');
  const tbody = document.getElementById('fines-tbody');
  const emptyMsg = document.getElementById('empty-msg');
  const statTotal = document.getElementById('stat-total');
  const statOpen = document.getElementById('stat-open');
  const statResolved = document.getElementById('stat-resolved');

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  async function checkSession() {
    try {
      const res = await fetch('/api/admin/session');
      const data = await res.json();
      if (data.isAdmin) {
        showDashboard();
        return;
      }
    } catch (err) {
      // fall through to login view
    }
    loginView.style.display = 'block';
    dashboardView.style.display = 'none';
  }

  function showDashboard() {
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    loadFines();
  }

  async function loadFines() {
    const res = await fetch('/api/admin/fines');
    if (res.status === 401) {
      loginView.style.display = 'block';
      dashboardView.style.display = 'none';
      return;
    }
    const fines = await res.json();
    renderFines(fines);
  }

  function renderFines(fines) {
    tbody.innerHTML = '';
    statTotal.textContent = fines.length;
    statOpen.textContent = fines.filter(f => !f.resolved).length;
    statResolved.textContent = fines.filter(f => f.resolved).length;

    emptyMsg.style.display = fines.length ? 'none' : 'block';

    fines.forEach(fine => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${escapeHtml(fine.accused)}</strong></td>
        <td>${escapeHtml(fine.reason)}</td>
        <td>${escapeHtml(fine.offense_date)}</td>
        <td>${escapeHtml(fine.submitted_by)}</td>
        <td><input type="text" class="punishment-input" data-id="${fine.id}" value="${escapeHtml(fine.punishment || '')}" placeholder="assign one..." style="min-width:140px;"></td>
        <td><button class="status-pill ${fine.resolved ? 'resolved' : 'open'}" data-id="${fine.id}" data-resolved="${fine.resolved ? 1 : 0}">${fine.resolved ? 'Resolved' : 'Open'}</button></td>
        <td><button class="small-btn delete-btn" data-id="${fine.id}">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.status-pill').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const newResolved = btn.dataset.resolved === '1' ? 0 : 1;
        await fetch(`/api/admin/fines/${id}/resolve`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resolved: newResolved }),
        });
        loadFines();
      });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this fine permanently?')) return;
        const id = btn.dataset.id;
        await fetch(`/api/admin/fines/${id}`, { method: 'DELETE' });
        loadFines();
      });
    });

    tbody.querySelectorAll('.punishment-input').forEach(input => {
      input.addEventListener('change', async () => {
        const id = input.dataset.id;
        await fetch(`/api/admin/fines/${id}/punishment`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ punishment: input.value }),
        });
      });
    });
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMsg.className = 'form-msg';
    const password = document.getElementById('password').value;
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok) {
      loginForm.reset();
      showDashboard();
    } else {
      loginMsg.textContent = data.error || 'Login failed.';
      loginMsg.className = 'form-msg show error';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    dashboardView.style.display = 'none';
    loginView.style.display = 'block';
  });

  checkSession();
});
