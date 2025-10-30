// Fetch data from Node.js API and show in table
fetch('/api/users')
  .then(res => res.json())
  .then(users => {
    const tableBody = document.querySelector('#userTable tbody');
    users.forEach(u => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.email}</td>`;
      tableBody.appendChild(row);
    });
  })
  .catch(err => console.error('Error:', err));
