const loginForm = document.querySelector("#login-form")

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = {};
  const formElements = e.target.elements;

  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    if (element.tagName === 'INPUT') {
      formData[element.name] = element.value;
    }
  }
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then(response => {
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
})
