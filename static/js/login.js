const loginForm = document.querySelector("#loginForm")
const helptext = document.querySelector('#error-message')

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(loginForm)

  console.log(data)
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  }).then(res => {
    if(res.status == 200) {
      window.location = '/'
    } else if(res.status == 202) {
      window.location = '/admin'
    } else if(res.status == 401) {
      helptext.classList.remove('d-none');
    }
  }).catch(err => {
    console.log(`Error sumitting form: ${err}`)
  })
})
