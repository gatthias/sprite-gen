export class HSV {

  constructor(h, s, v){
    this.h = h;
    this.s = s;
    this.v = v;
  }

  toRGB(){
    return HSV.hsv2rgb(this.h, this.s, this.v);
  }
}

/**
 * input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
 */
HSV.hsv2rgb = function hsv2rgb(h,s,v) {                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5),f(3),f(1)];       
}   