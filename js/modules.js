export function refreshColorUI(boxes) {
  function randomColorGenerator() {
    function randomColor() {
      return Math.round(Math.random() * 255);
    }
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  }

  boxes.forEach(box => {
    box.style.backgroundColor = randomColorGenerator();
  });
}

/**
 * copies the data(color) to the clipboard and the toast(func) is called
 * with 2 argument the data(color or err) and success == true or false 
 **/ 
export function copyToClipboard(data, errData, func) {
  navigator.clipboard.writeText(data)
    .then(() => {
      func(data, true);
    })
    .catch(() => {
      func(errData)
    });
}