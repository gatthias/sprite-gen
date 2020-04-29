import { Sprite } from './Sprite.js';

const SPRITE_SIZE = 10;
const EXPORT_SIZE = 80;
const ITERATIONS = 5;

const SPRITES_NUM = 16;

const $canvas = document.getElementById("main-canvas");
const $grid = document.getElementById("sprites-grid");
const $resetBtn = document.getElementById("btn-reset");

$canvas.width = $canvas.height = EXPORT_SIZE;

$resetBtn.addEventListener("click", reset);

reset();

function reset(){
  let html = "";
  for(let i = 0; i < SPRITES_NUM; ++i){
    const sprite = new Sprite(SPRITE_SIZE, EXPORT_SIZE, ITERATIONS);
    const b64 = sprite.getDataURL($canvas);
    html += `<img src="${b64}"/>`;
  }
  $grid.innerHTML = html;
}