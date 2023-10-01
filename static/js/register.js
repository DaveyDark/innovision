const registerForm = document.querySelector("#register-form")

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(registerForm)

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  }).then(res => {
    if(res.status == 200) {
      window.location = '/login'
    }
  }).catch(err => {
    console.log(`Error sumitting form: ${err}`)
  })
})
