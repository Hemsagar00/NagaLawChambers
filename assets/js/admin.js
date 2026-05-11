const SUPABASE_URL = 'https://svhpxqqddrtukupkwafn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aHB4cXFkZHJ0dWt1cGt3YWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTQyMzMsImV4cCI6MjA4NDgzMDIzM30.DXZg_siYUE2j62YX5GRky05o9AQRYmxh9olJfD-Vzi8';
const AUTH_ENDPOINT = '/api/auth';

// Auth
async function attemptLogin() {
  const pass = document.getElementById('adminPassword').value;
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');
  errorEl.classList.remove('show');

  if (!pass) {
    errorEl.textContent = 'Please enter a password.';
    errorEl.classList.add('show');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

  try {
    const res = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass })
    });

    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem('adminAuth', data.token);
      sessionStorage.setItem('adminExpires', data.expiresAt);
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminPanel').classList.add('show');
      loadCases();
    } else {
      errorEl.textContent = data.error || 'Invalid password. Try again.';
      errorEl.classList.add('show');
    }
  } catch (err) {
    errorEl.textContent = 'Network error. Please try again.';
    errorEl.classList.add('show');
  }

  btn.disabled = false;
  btn.innerHTML = 'Login';
}

function logout() {
  sessionStorage.removeItem('adminAuth');
  sessionStorage.removeItem('adminExpires');
  location.reload();
}

// Check auth on load
(function() {
  const authToken = sessionStorage.getItem('adminAuth');
  const expiresAt = sessionStorage.getItem('adminExpires');
  if (authToken && expiresAt && Date.now() < parseInt(expiresAt)) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').classList.add('show');
    loadCases();
  }
})();

// Tabs
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
  });
});

function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const targetTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
  if (targetTab) targetTab.classList.add('active');
  const targetContent = document.getElementById('tab-' + tabName);
  if (targetContent) targetContent.classList.add('active');
  if (tabName === 'updates') loadCasesDropdown();
}

// API helpers
function checkAuth() {
  const expires = sessionStorage.getItem('adminExpires');
  if (!expires || Date.now() >= parseInt(expires)) {
    logout();
    throw new Error('Session expired');
  }
}

async function supaFetch(endpoint, options = {}) {
  checkAuth();
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + endpoint, {
    ...options,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': options.method === 'POST' ? 'return=representation' : 'return=minimal',
      ...options.headers
    }
  });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      logout();
      throw new Error('Access denied. Please login again.');
    }
    throw new Error(await res.text());
  }
  return options.method === 'DELETE' ? null : res.json();
}

// Load Cases
async function loadCases() {
  try {
    const cases = await supaFetch('cases?order=created_at.desc');
    const tbody = document.getElementById('casesTableBody');
    if (cases.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);">No cases found</td></tr>';
      return;
    }
    tbody.innerHTML = cases.map(c => `
      <tr>
        <td><strong>${c.case_number || '-'}</strong></td>
        <td>${c.title || '-'}</td>
        <td><span class="status-pill status-${c.status}">${formatStatus(c.status)}</span></td>
        <td>${c.next_hearing_date ? new Date(c.next_hearing_date).toLocaleDateString('en-IN') : '-'}</td>
        <td>
          <button class="action-btn" onclick="openEditModal('${c.id}')"><i class="fa-solid fa-edit"></i></button>
          <button class="action-btn delete" onclick="deleteCase('${c.id}')"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
    const tbody = document.getElementById('casesTableBody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--danger);">Failed to load cases. <a href="#" onclick="loadCases();return false;" style="color:var(--accent-gold);text-decoration:underline;">Retry</a></td></tr>';
  }
}

function formatStatus(s) {
  return s ? s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown';
}

// Add Case
async function addCase(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  try {
    await supaFetch('cases', {
      method: 'POST',
      body: JSON.stringify({
        case_number: document.getElementById('newCaseNumber').value,
        title: document.getElementById('newTitle').value,
        status: document.getElementById('newStatus').value,
        case_type: document.getElementById('newCaseType').value,
        court_name: document.getElementById('newCourtName').value,
        next_hearing_date: document.getElementById('newHearingDate').value || null,
        priority: document.getElementById('newPriority').value,
        description: document.getElementById('newDescription').value
      })
    });
    showToast('Case added successfully!');
    e.target.reset();
    showTab('cases');
    loadCases();
  } catch (err) {
    showToast('Failed to add case: ' + err.message, true);
  }
  btn.disabled = false;
}

// Load cases for dropdown
async function loadCasesDropdown() {
  try {
    const cases = await supaFetch('cases?select=id,case_number,title&order=created_at.desc');
    const select = document.getElementById('updateCaseId');
    select.innerHTML = '<option value="">-- Select a case --</option>' +
      cases.map(c => `<option value="${c.id}">${c.case_number} - ${c.title}</option>`).join('');
  } catch (e) { console.error(e); }
}

// Add Update
async function addUpdate(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.disabled = true;

  const caseSelect = document.getElementById('updateCaseId');
  const caseName = caseSelect.options[caseSelect.selectedIndex].text;
  let phone = document.getElementById('clientPhone').value.replace(/\D/g, '');
  const title = document.getElementById('updateTitle').value;
  const text = document.getElementById('updateText').value;

  if (!phone.startsWith('91')) {
    phone = '91' + phone;
  }
  if (phone.length !== 12 || !/^91[6-9]\d{9}$/.test(phone)) {
    showToast('Please enter a valid 10-digit Indian phone number', true);
    btn.disabled = false;
    return;
  }

  try {
    await supaFetch('case_updates', {
      method: 'POST',
      body: JSON.stringify({
        case_id: caseSelect.value,
        update_title: title,
        update_text: text,
        update_type: 'note',
        is_visible_to_client: document.getElementById('updateVisible').checked
      })
    });
    showToast('Update posted successfully!');

    const message = `🔔 *Case Update - Naga Law Chambers*\n\n📁 *Case:* ${caseName}\n\n📌 *${title}*\n${text}\n\n🔗 Check status: https://nagalawchambers.com/case-status.html\n\n📞 For queries: +91 9440000417`;
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    document.getElementById('whatsappLink').href = waLink;
    document.getElementById('whatsappBox').style.display = 'block';

    e.target.reset();
  } catch (err) {
    showToast('Failed to post update: ' + err.message, true);
  }
  btn.disabled = false;
}

// Edit Modal
async function openEditModal(id) {
  try {
    const cases = await supaFetch(`cases?id=eq.${id}`);
    if (cases.length === 0) return;
    const c = cases[0];
    document.getElementById('editCaseId').value = c.id;
    document.getElementById('editCaseNumber').value = c.case_number || '';
    document.getElementById('editTitle').value = c.title || '';
    document.getElementById('editStatus').value = c.status || 'pending';
    document.getElementById('editHearingDate').value = c.next_hearing_date || '';
    document.getElementById('editCourtName').value = c.court_name || '';
    document.getElementById('editModal').classList.add('show');
  } catch (e) { showToast('Failed to load case', true); }
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
}

async function saveEdit(e) {
  e.preventDefault();
  const id = document.getElementById('editCaseId').value;
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  try {
    await supaFetch(`cases?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        case_number: document.getElementById('editCaseNumber').value,
        title: document.getElementById('editTitle').value,
        status: document.getElementById('editStatus').value,
        next_hearing_date: document.getElementById('editHearingDate').value || null,
        court_name: document.getElementById('editCourtName').value
      })
    });
    showToast('Case updated!');
    closeEditModal();
    loadCases();
  } catch (err) {
    showToast('Failed to update: ' + err.message, true);
  }
  btn.disabled = false;
}

// Delete
async function deleteCase(id) {
  if (!confirm('Are you sure you want to delete this case?')) return;
  try {
    await supaFetch(`cases?id=eq.${id}`, { method: 'DELETE' });
    showToast('Case deleted');
    loadCases();
  } catch (e) { showToast('Failed to delete', true); }
}

// Toast
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
