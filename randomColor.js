(function () {
  const boxes = document.querySelectorAll('.box');

  function randomColorGenerator() {
    function randomColor() {
      return Math.round(Math.random() * 255);
    }
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  }

  boxes.forEach(box => {
    box.style.backgroundColor = randomColorGenerator();
  });
})();