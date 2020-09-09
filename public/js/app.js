console.log("added file")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...'
    fetch('/weather?address=' +  encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            message1.textContent = '';
            message2.textContent = '';
            if (data.errorMessage) {
                message1.textContent = data.errorMessage;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast
            }
            
            
        })
    })
    
})