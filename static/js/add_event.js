const form = document.querySelector("#add-event-form")

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)

  fetch('/api/events/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  }).then(res => {
    if(res.status == 200) {
      window.location = '/admin'
    }
  }).catch(err => {
    console.log(`Error sumitting form: ${err}`)
  })
})
