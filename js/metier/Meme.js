export class Meme {
  titre = "";
  text = "";
  x = 0;
  y = 20;
  imageId = -1;
  fontSize = 20;
  fontWeight = "500";
  underline = false;
  italic = false;
  color = "#000000";
  static render(meme, svgSelector, image) {
    const svg = document.querySelector(svgSelector);
    svg.setAttribute(
      "viewBox",
      `0 0 ${undefined !== image ? image.w : 500} ${
        undefined !== image ? image.h : 500
      }`
    );
    const svgimg=svg.querySelector('image');
    svgimg.setAttribute('xlink:href',undefined!==image?image.url:'');
    const text=svg.querySelector('text');
    text.innerHTML=meme.text;
    text.setAttribute('x',meme.x);
    text.setAttribute('y',meme.y);
    text.style.fill=meme.color;
    text.style.textDecoration=meme.underline?'underline':'none';
    text.style.fontStyle=meme.italic?'italic':'normal';
    text.style.fontSize=meme.fontSize;
    text.style.fontWeight=meme.fontWeight;
  }
}
