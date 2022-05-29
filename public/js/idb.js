
//variable holding db connection
let db  

const request = indexedDB.open('budget_tracker', 1)


request.onupgradeneeded = function(event) {
    const db = event.target.result
    db.createObjectStore('new_item', {autoIncrement: true})
}

request.onsuccess = function(event) {
    db= event.target.result


if(navigator.online) {
    uploadItem()
}
}

request.onerror = function(event) {
    console.log(event.target.errorCode)
}


function saveRecord(record) {
   
    const transaction = db.transaction(['new_item'], 'readwrite')

    const itemObjectStore = transaction.objectStore('new_item')

    itemObjectStore.add(record)
}

//this function is not working!!!

function uploadItem() {
    const transaction = db.transaction(['new_item'], 'readwrite')
    const itemObjectStore = transaction.objectStore('new_item')

    const getAll = itemObjectStore.getAll()

    getAll.onsuccess = function() {
        if(getAll.result.length > 0) {
            //check url
            fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if(serverResponse.message) {
                    throw new Error(serverResponse)
                }

                const transaction = db.transaction(['new_item'], 'readwrite')
                const itemObjectStore = transaction.objectStore('new_item')
                itemObjectStore.clear()
                alert('You are back online')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}

window.addEventListener('online', uploadItem)