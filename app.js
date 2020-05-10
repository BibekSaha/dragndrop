const boxes = document.querySelectorAll('.box');
const drops = document.querySelectorAll('.drop');
const dropContainer = document.querySelector('.drop-container');
const toast = document.querySelector('.toast');

// dragstart event
boxes.forEach(box => {
  box.addEventListener('dragstart', e => {
    e.dataTransfer.setData('data/string', e.target.style.backgroundColor);
    e.dataTransfer.effectAllowed = 'copy';
  });
});

// dragover event
drops.forEach(drop => {
  drop.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
});

// drop event
drops.forEach(drop => {
  drop.addEventListener('drop', e => {
    const color = e.dataTransfer.getData('data/string');
    e.target.style.backgroundColor = color;
    e.target.style.border = 'none';
    e.target.setAttribute('title', 'click to copy color code');
    e.target.style.cursor = 'pointer';
  });
});

// Copying to clipboard
dropContainer.addEventListener('click', e => {
  if (e.target.hasAttribute('title')) {
    const color = e.target.style.backgroundColor;
    navigator.clipboard.writeText(color)
      .then(() => {
        showToast(color, true);
      })
      .catch(() => {
        showToast('Internal Error 403!');
      })
  }
});

// show toast
function showToast(data, success=false) {
  toast.style.visibility = 'visible';
  if (success) {
    toast.innerHTML = `<span>Color Copied: ${data}</span>`;
    toast.style.color = '#38C172';
    toast.style.borderLeft = '5px solid #38C172';
  } else {
    toast.innerHTML = `<span>${data}</span>`;
    toast.style.color = '#E3342F';
    toast.style.borderLeft = '5px solid #E3342F';
  }
  setTimeout(() => {
    toast.style.visibility = 'hidden';
  }, 3000);
}
