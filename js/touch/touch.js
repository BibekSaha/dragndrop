import { copyToClipboard, insertAfter, createModal } from '../modules.js'

const modal = document.querySelector('.modal');
const touchRemove = document.querySelectorAll('.remove-for-touch');
const boxes = document.querySelectorAll('.box');
const footer = document.querySelector('footer');
const wrapper = document.querySelector('.wrapper').firstChild;

// process for modal's dynamic content
const [okBtn, modalContent] = createModal('touch-modal', 'Touch input detected', `<p>Sorry! Touch input is not supported</p><p>Some features would be restricted</p>`, 'OK');
okBtn.addEventListener('click', () => {
  modalContent.classList.remove('touch-modal');
  navigator.vibrate(30);
  modal.style.display = 'none';
});

// creating the touch toast
const toast = document.createElement('div');
toast.classList.add('touch-toast');
insertAfter(toast, modal);

// removes all the content not needed for touch display
touchRemove.forEach(item => {
    item.remove();
});

//create the guide text for touch surface
const guide = document.createElement('p');
guide.id = 'guide-p';
guide.appendChild(document.createTextNode('Tap on the color to copy it'));
wrapper.parentElement.insertBefore(guide, wrapper);

// show the guide text
guide.style.display = 'inherit';

boxes.forEach(box => {
  box.addEventListener('click', e => {
    const color = e.target.style.backgroundColor;
    /**
     * if success is true then showTouchToast is called with color and success == true 
     * if success is false then showTouchToast is called with errData and success == false 
     */
    copyToClipboard(color, 'Internal Error 403', showTouchToast);
    navigator.vibrate(50);
  });
});

function showTouchToast(data, success=false) {
  toast.style.display = 'inherit';
  footer.style.marginBottom = '90px';
  if (success) {
    toast.innerHTML = `<span>Color Copied: ${data}</span>`;
    toast.style.color = `${data}`;
    toast.style.borderLeft = `10px solid ${data}`;
  } else {
    toast.innerHTML = `<span>${data}</span>`;
    toast.style.color = '#E3342F';
    toast.style.borderLeft = '10px solid #E3342F';
  }
  setTimeout(() => {
    toast.style.display = 'none';
    footer.style.marginBottom = '-90px';
  }, 5000);
}
