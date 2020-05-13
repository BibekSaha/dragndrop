const colors = document.querySelector('.colors');

export function createCard(name, pk, colorsList) {
  const wrapperDiv = document.createElement('div')
  wrapperDiv.className = 'color-wrapper';
  
  const para = document.createElement('p');
  para.appendChild(document.createTextNode(name));
  wrapperDiv.appendChild(para);

  const i = document.createElement('i');
  i.className = 'fa fa-times-circle';
  i.setAttribute('pk', pk);

  wrapperDiv.appendChild(i);

  const colorContainer = document.createElement('div');
  colorContainer.className = 'color-container';

  colorsList.forEach(color => {
    const innerDiv = document.createElement('div');
    innerDiv.className = 'main-color';
    innerDiv.style.backgroundColor = color;
    colorContainer.appendChild(innerDiv);
  });
  wrapperDiv.appendChild(colorContainer);
  colors.appendChild(wrapperDiv);

  return wrapperDiv;
}

const paletteColor = document.getElementById('palette-color');
const textPart = document.getElementById('text-part');
const colorPart = document.getElementById('color-part');

export function showColorCopiedStickBar(data, success=false) {
  paletteColor.style.display = 'flex';
  if (success) {
    colorPart.style.backgroundColor = data;
  } else {
    textPart.textContent = data;
    colorPart.style.backgroundColor = '#E3342F';
  }
  setTimeout(() => {
    paletteColor.style.display = 'none';
  }, 5000);
}