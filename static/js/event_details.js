const registerButton = document.getElementById('register')
const unregisterButton = document.getElementById('unregister')

if(registerButton) {
  registerButton.addEventListener('click', e => {
    e.preventDefault()
    const event_id = parseInt(window.location.pathname.match(/\d+$/)[0])
    const body = {
      event_id: event_id,
    }
    fetch('/api/events/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
        if(res.status == 200) {
          location.reload()
        } else {
          console.error(`Error: registeration failed; Server returned ${res.status}`)
        }
      }).catch(err => {
        console.error(`Error registering: ${err}`)
      })
  })
} else {
  unregisterButton.addEventListener('click', e => {
    e.preventDefault()
    const event_id = parseInt(window.location.pathname.match(/\d+$/)[0])
    const body = {
      event_id: event_id,
    }
    fetch('/api/events/unregister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
        if(res.status == 200) {
          location.reload()
        } else {
          console.error(`Error: unregisteration failed; Server returned ${res.status}`)
        }
      }).catch(err => {
        console.error(`Error unregistering: ${err}`)
      })
  })
}
