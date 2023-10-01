const registerForm = document.querySelector("#register-form")

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(registerForm)
  console.log(data)
})
