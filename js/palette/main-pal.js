import {createCard, showColorCopiedStickBar} from './module-pal.js'
import {copyToClipboard} from '../modules.js'

(function() {
  if (!window.indexedDB) {
    alert('IndexedDB is Not Supported');
    return
  }

  let db, cardList= [];
  const openDBRequest = indexedDB.open('colors', 1);

  openDBRequest.onsuccess = function(e) {
    db = e.target.result;

    const colorObjectStore = db.transaction('colorStore', 'readwrite').objectStore('colorStore');

    // iterate over the db in a reverse manner
    colorObjectStore.openCursor(null, 'prev').onsuccess = function(e) {
      let cursor = e.target.result;
      if (cursor) {
        let card = createCard(cursor.value.name.slice(0, 50), cursor.primaryKey, cursor.value.color);

        card.addEventListener('click', e => {
          if (e.target.classList.contains('main-color')) {
            const color = e.target.style.backgroundColor;
            copyToClipboard(color, 'Internal Server Error', showColorCopiedStickBar);
          } else if (e.target.tagName === 'I') {
            const primaryKey = Number(e.target.getAttribute('pk'));
            const check = db.transaction('colorStore', 'readwrite')
              .objectStore('colorStore')
              .delete(primaryKey);
            check.onsuccess = function() {
              card.style.display = 'none';
            }
          }
        });
        cursor.continue();
      }
    }
  }

  openDBRequest.onupgradeneeded = function(e) {
    alert('Database was NOT found!');
  }

  openDBRequest.onerror = function(e) {
    alert('Error estabilishing connection to the database');
  }
})();