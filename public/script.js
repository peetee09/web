document.addEventListener('DOMContentLoaded', () => {
  const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
  loginModal.show();

  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      })
    });
    const data = await res.json();
    if (data.success) {
      document.getElementById('currentUser').textContent = data.username;
      document.getElementById('app').style.display = 'block';
      loginModal.hide();
      loadDiscrepancies();
    } else {
      alert('Login failed');
    }
  };

  document.getElementById('logoutBtn').onclick = async () => {
    await fetch('/api/logout', { method: 'POST' });
    location.reload();
  };
});

// Then your original script.js logic, but replace localStorage with API calls
async function loadDiscrepancies() {
  const res = await fetch('/api/discrepancies');
  const data = await res.json();
  discrepancies = data;
  renderTable();
}
