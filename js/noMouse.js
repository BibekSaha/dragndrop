import { copyToClipboard } from './modules.js'

if (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  const modal = document.querySelector('.modal');
  const modalOKBtn = document.querySelector('.modal-content a');
  const touchRemove = document.querySelector('.no-touch');
  const boxes = document.querySelectorAll('.box');
  const footer = document.querySelector('footer');
  const giude = document.querySelector('.wrapper p:first-child');
  const toast = document.querySelector('.modal ~ .touch-toast');

  touchRemove.remove();
  giude.style.display = 'inherit';
  modal.style.display = 'inherit';

  modalOKBtn.addEventListener('click', () => {
    navigator.vibrate(50);
    modal.style.display = 'none';
  });

  boxes.forEach(box => {
    box.addEventListener('click', e => {
      const color = e.target.style.backgroundColor;
      /* *
      * if success is true then showTouchToast is called with color and success == true 
      * if success is false then showTouchToast is called with errData and success == false 
      **/
      copyToClipboard(color, 'Internal Error 403', showTouchToast);
      navigator.vibrate(50);
    });
  });

  function showTouchToast(data, success=false) {
    toast.style.display = 'inherit';
    footer.style.marginBottom = '90px';
    if (success) {
      toast.innerHTML = `<span>Color Copied: ${data}</span>`;
      toast.style.color = `${data}` // '#38C172';
      toast.style.borderLeft = `10px solid ${data}`; // '5px solid #38C172';
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
}