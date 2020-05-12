export function refreshColorUI(boxes, themeColor) {
  function randomColorGenerator() {
    function randomColor() {
      return Math.round(Math.random() * 255);
    }
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  }
  themeColor.setAttribute('content', randomColorGenerator());
  boxes.forEach(box => {
    box.style.backgroundColor = randomColorGenerator();
  });
}

export function copyToClipboard(data, errData, func) {
  navigator.clipboard.writeText(data)
    .then(() => {
      func(data, true);
    })
    .catch(() => {
      func(errData)
    });
}

export function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  return newNode;
}

export function createLinkNode(src) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = src;
  return link;
}

export function createScriptNode(src) {
  const script = document.createElement('script');
  script.src = src;
  script.type = 'module';
  return script;
}

export function linkToHTML(startNode, firstNode, ...nodes) {
  let oldNode = insertAfter(firstNode, startNode);
  nodes.forEach(node => {
    insertAfter(node, oldNode);
    oldNode = node;
  });
}