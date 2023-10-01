const logout = document.querySelector("#logout")

if(logout){
  logout.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/api/logout', {
      method: 'POST',
      body: {},
    }).then(res => {
      if(res.status == 200) {
        location.reload()
      }
    }).catch(err => {
      console.log(`Error logging out: ${err}`)
    })
  })
}
