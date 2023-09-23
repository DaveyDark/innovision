const registerForm = document.querySelector("#register-form")

registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const branchSelect = document.getElementById("branch");
  const yearSelect = document.getElementById("year");

  const selectedBranchOption = Array.from(branchSelect.selectedOptions).map(option => option.value);
  const selectedYearOption = Array.from(yearSelect.selectedOptions).map(option => option.value);
  const formData = {};
  const formElements = e.target.elements;

  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    if (element.tagName === 'INPUT') {
      formData[element.name] = element.value;
    }
  }
  formData['branch'] = selectedBranchOption[0];
  formData['year'] = selectedYearOption[0];
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then(response => {
      if (response.status === 201) {
        window.location.href = '/';
      } else {
        console.error('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
})
