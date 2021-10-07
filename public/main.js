document.addEventListener('DOMContentLoaded', () => {
    const update = document.querySelector('#update-button');
    update.addEventListener('click', () => {
        fetch('/todo', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'cosita nueva',
                description: 'jehaaaw'
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(response => {
                console.log(response)
                window.location.reload(true)
            })
    })

    const deleteButton = document.querySelector('#delete-button');
    deleteButton.addEventListener('click', () => {
        fetch('/todo', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'nombresito'
            })
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(response => {
                console.log(response);
                if(response ==='No quote to delete'){
                    messageDiv.textContent = 'Nada que eliminar'
                }else{
                    window.location.reload(true);
                }
                
            })
    })
});