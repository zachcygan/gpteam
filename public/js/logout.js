const logoutButton = $('#log');

if (logoutButton.text() === 'Logout') {
  logoutButton.on('click', async (event) => {
    console.log('CLICKED')
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  });

}

