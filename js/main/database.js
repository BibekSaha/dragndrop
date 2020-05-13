import {createModal} from '../modules.js';

(function() {
  if (!window.indexedDB) {
    alert('IndexedDB is Not Supported');
    return
  }

  let db;
  const openDBRequest = indexedDB.open('colors', 1);
  const bookmark = document.querySelector('#bookmark');
  const dropContainer = document.querySelector('.drop-container');

  openDBRequest.onsuccess = function(e) {
    db = e.target.result;
  }

  openDBRequest.onupgradeneeded = function(e) {
    db = e.target.result;
    let colorObjectStore = db.createObjectStore('colorStore', {keyPath: 'id', autoIncrement: true});
  }

  openDBRequest.onerror = function(e) {
    console.log('Error estabilishing connection to the database');
  }

  bookmark.addEventListener('click', e => {
    if (!e.target.hasAttribute('title')) return;
    const content = `
      <input type="text"><br>
    `;
    const [saveBtn, modalContent] = createModal('add-modal', 'Name of the palette', content, 'save');
    saveBtn.addEventListener('click', () => {
      let color = Array.from(dropContainer.children).map(drop => {
        if (drop.style.backgroundColor) {
          return drop.style.backgroundColor;
        }
      });
      color = {
        name: modalContent.querySelector('input').value,
        color
      };
      
      let colorObjectStore = db.transaction('colorStore', 'readwrite').objectStore('colorStore');
      colorObjectStore.add(color);
      window.location.href = 'http://bibeksaha.github.io/palette.html';
    })
  })
})();