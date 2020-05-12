import { refreshColorUI } from './modules.js'

const boxes = document.querySelectorAll('.box');
const themeColor = document.querySelector('meta[name="theme-color"]');

window.onload = refreshColorUI(boxes, themeColor);

// Making the refresh button work
const refresh = document.getElementById('refresh-icon');
refresh.addEventListener('click', () => { refreshColorUI(boxes, themeColor); });