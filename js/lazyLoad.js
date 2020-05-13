import { createLinkNode, createScriptNode, linkToHTML }  from './modules.js'

const htmlStyle = document.querySelector('script');
const jsScripts = document.querySelector('#add-dynamic-scripts');

if (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  const modal = createLinkNode('./css/common/modal.css');
  const modalTouch = createLinkNode('./css/touch/modal-touch.css');
  const touchStyle = createLinkNode('./css/touch/touch.css');
  linkToHTML(htmlStyle, modal, modalTouch, touchStyle);

  const touch = createScriptNode('./js/touch/touch.js');
  linkToHTML(jsScripts, touch);

} else {
  const style = createLinkNode('./css/main/style.css');
  const modal = createLinkNode('./css/common/modal.css');
  const mainModal = createLinkNode('./css/main/main-modal.css')
  linkToHTML(htmlStyle, style, modal, mainModal);

  const script = createScriptNode('./js/main/dragndrop.js');
  const db = createScriptNode('./js/main/database.js');
  linkToHTML(jsScripts, script, db);
}