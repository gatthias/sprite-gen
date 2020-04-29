import { HSV } from "./HSV.js";

export class Sprite {

  constructor(spriteSize = 10, exportSize = 80, iterations = 2) {
    this.spriteSize = spriteSize;
    this.exportSize = exportSize;
    this.initGrid();
    this.image = null;
    this.DEBUG = false;

    this.init(iterations);
    this.update(this.rndColor, new HSV(0, 0, 0.3));
  }

  countNeighborhood(y, x) {
    let n = 0;

    if (y >= 1) {
        n += this.spriteGrid[y - 1][x].previous;
    }
    if (y <= this.spriteSize - 2) {
        n += this.spriteGrid[y + 1][x].previous;
    }
    if (x >= 1) {
        n += this.spriteGrid[y][x - 1].previous;
    }
    if (x <= this.spriteSize / 2 - 2) {
        n += this.spriteGrid[y][x + 1].previous;
    }

    return n;
  }

  grow() {
    for (let y = 1; y < this.spriteSize - 1; ++y) {
        for (let x = 1; x < this.spriteSize / 2; ++x) {
            const prev = this.spriteGrid[y][x].previous;
            const n = this.countNeighborhood(y, x);
            this.spriteGrid[y][x].current = (prev == false && n <= 1) || (prev == true && (n == 2 || n == 3));
        }
    }
    for (let row of this.spriteGrid) {
      for(let cell of row){
        cell.previous = cell.current;
      }
    }
  }

  initGrid(){
    this.spriteGrid = [];
    for(let i = 0; i < this.spriteSize; ++i){
      this.spriteGrid[i] = [];
      for(let j = 0; j < this.spriteSize / 2; ++j){
        this.spriteGrid[i][j] = { previous: false, current: false }
      }
    }
  }

  init(growCount) {
    for (let y = 1; y < this.spriteSize - 1; ++y) {
      for (let x = 1; x < this.spriteSize / 2; ++x) {
          this.spriteGrid[y][x] = { previous: !!(Math.random() < 0.5), current: false };
        }
    }
    this.rndColor = new HSV(360 * Math.random(), 0.6, 0.6 + (0.8 - 0.6)*Math.random());
    for (let i = 0; i < growCount; ++i) {
      if(this.DEBUG){
        console.log(`===================[Iter ${i}]===================`)
        this.printGrid();
      }
      this.grow();
    }
  }

  update(baseColor, bgColor) {
    this.image = this.grid2image(this.exportSize, baseColor, bgColor);
  }

  printGrid(){
    let str = "";
    for (let y = 0; y < this.spriteSize; ++y) {
      for (let x = 0; x < this.spriteSize / 2; ++x) {
        str += this.spriteGrid[y][x].previous ? 'o' : '.'
      }
      for (let x = 0; x < this.spriteSize / 2; ++x) {
        str += this.spriteGrid[y][Math.floor(this.spriteSize / 2 - x - 1)].previous ? 'o' : '.'
      }
      str += "\n";
    }
    console.log(str)
  }

  getImage(){
    return this.image;
  }

  grid2image(exportSize, baseColor, bgColor) {
    const ratio = Math.round(exportSize / this.spriteSize / Math.sqrt(2));

    const offset = Math.floor((exportSize - this.spriteSize * ratio) / 2);
    const posGap = exportSize % 2;

    // Prepare img array
    const retImage = []
    for(let x = 0; x < exportSize; ++x){
      retImage[x] = [];
      for(let y = 0; y < exportSize; ++y){
        retImage[x][y] = bgColor;
      }
    }

    for (let y = 0; y < this.spriteSize * ratio; ++y) {
        for (let x = 0; x < this.spriteSize * ratio / 2; ++x) {
            const posY = offset + y;
            const posX = offset + x;
            const posMirrorX = exportSize - (posX + 1) - posGap;
            if (this.spriteGrid[Math.floor(y / ratio)][Math.floor(x / ratio)].previous) {
                retImage[posY][posX] = retImage[posY][posMirrorX] = baseColor;
            }
            else if (this.countNeighborhood(Math.floor(y / ratio), Math.floor(x / ratio))) {
                retImage[posY][posX] = retImage[posY][posMirrorX] = new HSV(baseColor.h - 15, baseColor.s, baseColor.v * 0.4);
            }
        }
    }

    return retImage;
  }

  getDataURL(canvas){
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(this.exportSize, this.exportSize);

    for(let y = 0; y < this.exportSize; ++y){
      for(let x = 0; x < this.exportSize; ++x){
        const pixelIdx = (y * this.exportSize + x) * 4;
        const [ r, g, b ] = this.image[y][x].toRGB().map(val => Math.floor(val * 255));
        imgData.data[pixelIdx] = r;
        imgData.data[pixelIdx + 1] = g;
        imgData.data[pixelIdx + 2] = b;
        imgData.data[pixelIdx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const base64 = canvas.toDataURL();
    return base64;
  }


}