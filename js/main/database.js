(function() {
  if (!window.indexedDB) {
    console.log('IndexedDB is Not Supported'); // Modal would be shown
    return
  }

  let db;
  const openDBRequest = indexedDB.open('colors', 1);
  const saveBtn = document.querySelector('#save-button');
  const dropContainer = document.querySelector('.drop-container');

  openDBRequest.onsuccess = function(e) {
    db = e.target.result;
  }

  openDBRequest.onupgradeneeded = function(e) {
    db = e.target.result;
    let colorObjectStore = db.createObjectStore('colorStore', {autoIncrement: true});

    colorObjectStore.transaction.oncomplete = function(e) {
      console.log('Object Store Created');
    }
  }

  openDBRequest.onerror = function(e) {
    console.log('Error estabilishing connection to the database');
  }

  saveBtn.addEventListener('click', () => {
    let color = Array.from(dropContainer.children).map(drop => {
      if (drop.style.backgroundColor) {
        return drop.style.backgroundColor;
      }
    });
    color = {color};
    
    let colorObjectStore = db.transaction('colorStore', 'readwrite').objectStore('colorStore');
    colorObjectStore.add(color);
    console.log(color);
  })
})();