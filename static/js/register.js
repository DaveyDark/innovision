const form = document.querySelector("#register-form")

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  let valid = true;

  function validateName() {
    const nameField = document.getElementById("name");
    const nameValue = nameField.value.trim();
    const nameFeedback = nameField.nextElementSibling;
    if (nameValue === "" || nameValue.length > 30) {
      nameFeedback.textContent = "Name is required and should not exceed 30 characters.";
      valid = false;
    } else {
      nameFeedback.textContent = "";
    }
  }

  function validateCRN() {
    const crnField = document.getElementById("crn");
    const crnValue = crnField.value.trim();
    const crnFeedback = crnField.nextElementSibling;
    if (!/^\d{7}$/.test(crnValue)) {
      crnFeedback.textContent = "Valid CRN is required (7 digits).";
      valid = false;
    } else {
      crnFeedback.textContent = "";
    }
  }

  function validateURN() {
    const urnField = document.getElementById("urn");
    const urnValue = urnField.value.trim();
    const urnFeedback = urnField.nextElementSibling;
    if (!/^\d{7}$/.test(urnValue)) {
      urnFeedback.textContent = "Valid URN is required (7 digits).";
      valid = false;
    } else {
      urnFeedback.textContent = "";
    }
  }

  function validateEmail() {
    const emailField = document.getElementById("email");
    const emailValue = emailField.value.trim();
    const emailFeedback = emailField.nextElementSibling;
    if (!/^[\w.-]+@gndec\.ac\.in$/.test(emailValue) || emailValue.length > 30) {
      emailFeedback.textContent = "Please enter a valid GNDEC email address (max 30 characters).";
      valid = false;
    } else {
      emailFeedback.textContent = "";
    }
  }

  function validatePassword() {
    const passwordField = document.getElementById("password");
    const passwordConfirmField = document.getElementById("passwordConfirm");
    const passwordValue = passwordField.value.trim();
    const passwordConfirmValue = passwordConfirmField.value.trim();
    const passwordFeedback = passwordField.nextElementSibling;
    const passwordConfirmFeedback = passwordConfirmField.nextElementSibling;

    if (passwordValue.length < 8 || passwordValue.length > 30) {
      passwordFeedback.textContent = "Password must be 8-30 characters long.";
      valid = false;
    } else if (passwordValue !== passwordConfirmValue) {
      passwordFeedback.textContent = "Passwords don't match.";
      valid = false;
    } else {
      passwordFeedback.textContent = "";
      passwordConfirmFeedback.textContent = "";
    }
  }

  function validateSports() {
    const sportsCheckboxes = document.querySelectorAll("[name='sports']");
    const sportsFeedback = document.querySelector("#sports-error");
    const checkedSports = Array.from(sportsCheckboxes).filter((checkbox) => checkbox.checked);
    if (checkedSports.length === 0) {
      sportsFeedback.textContent = "Please select at least one sport.";
      valid = false;
    } else {
      sportsFeedback.textContent = "";
    }
  }

  validateName();
  validateCRN();
  validateURN();
  validateEmail();
  validatePassword();
  validateSports();

  if (!valid) {
    return;
  }

  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  }).then(res => {
    if(res.status == 200) {
      window.location = '/login'
    } else if (res.status === 409) {
      const crnField = document.getElementById('crn');
      const crnFeedback = crnField.nextElementSibling;
      crnFeedback.textContent = 'CRN is already in use.';
      crnField.classList.add('is-invalid');
    }
  }).catch(err => {
    console.log(`Error sumitting form: ${err}`)
  })
})
