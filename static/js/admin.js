const deletes = document.getElementsByClassName('delete-button')

for (const del of deletes) {
  del.addEventListener('click', function (e) {
    e.preventDefault();
    const body = {event_id: del.getAttribute('val')}
    fetch(`/api/events/delete`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => {
        if(res.status == 200) location.reload()
        else console.log(`Error deleting: Server returned ${res.status}`)
      }).catch(err => {
        console.log(`Error deleting: ${err}`)
      })
  });
}
