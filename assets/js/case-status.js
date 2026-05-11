const SUPABASE_URL = 'https://svhpxqqddrtukupkwafn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aHB4cXFkZHJ0dWt1cGt3YWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTQyMzMsImV4cCI6MjA4NDgzMDIzM30.DXZg_siYUE2j62YX5GRky05o9AQRYmxh9olJfD-Vzi8';

async function searchCase() {
  const caseNumber = document.getElementById('caseNumber').value.trim();
  if (!caseNumber || caseNumber.length < 3) {
    showError('Please enter a valid case number (minimum 3 characters)');
    return;
  }

  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  const errorBox = document.getElementById('errorBox');
  const btn = document.getElementById('searchBtn');

  results.classList.remove('show');
  errorBox.classList.remove('show');
  loading.classList.add('show');
  btn.disabled = true;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/cases?case_number=ilike.*${encodeURIComponent(caseNumber)}*&select=*`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok || data.length === 0) {
      showError('Case not found. Please check the case number and try again.');
      return;
    }

    const caseData = data[0];

    const updatesResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/case_updates?case_id=eq.${caseData.id}&order=created_at.desc&limit=5`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );
    const updates = await updatesResponse.json();

    displayCase(caseData, updates);

  } catch (err) {
    console.error(err);
    showError('An error occurred. Please try again later.');
  } finally {
    loading.classList.remove('show');
    btn.disabled = false;
  }
}

function displayCase(c, updates) {
  document.getElementById('caseTitle').textContent = c.title || 'Untitled Case';
  document.getElementById('caseNum').textContent = c.case_number || '-';
  document.getElementById('caseType').textContent = c.case_type || '-';
  document.getElementById('courtName').textContent = c.court_name || '-';
  document.getElementById('priority').textContent = c.priority || 'Normal';

  if (c.next_hearing_date) {
    const date = new Date(c.next_hearing_date);
    document.getElementById('nextHearing').textContent = date.toLocaleDateString('en-IN', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
  } else {
    document.getElementById('nextHearing').textContent = 'Not scheduled';
  }

  const badge = document.getElementById('statusBadge');
  const status = (c.status || 'active').toLowerCase();
  badge.textContent = c.status || 'Active';
  badge.className = 'status-badge status-' + status.replace(/\s+/g, '-');

  const updatesList = document.getElementById('updatesList');
  if (updates && updates.length > 0) {
    updatesList.innerHTML = updates.map(u => `
      <div class="update-item">
        <div class="update-date">${new Date(u.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })} - <strong>${u.update_title || 'Update'}</strong></div>
        <div class="update-text">${u.update_text || 'Status updated'}</div>
      </div>
    `).join('');
    document.getElementById('updatesSection').style.display = 'block';
  } else {
    updatesList.innerHTML = '<p style="color:var(--text-secondary); font-style:italic;">No updates available yet.</p>';
    document.getElementById('updatesSection').style.display = 'block';
  }

  document.getElementById('results').classList.add('show');
}

function showError(message) {
  const errorBox = document.getElementById('errorBox');
  document.getElementById('errorText').textContent = message;
  errorBox.classList.add('show');
  document.getElementById('loading').classList.remove('show');
  document.getElementById('searchBtn').disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('caseNumber').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchCase();
  });
});
