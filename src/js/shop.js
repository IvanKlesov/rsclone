let currentColor;

export function createShop(color) {
  currentColor = color;
  const shopContent = document.querySelector(".shop-content");
  const padding = 20;
  const border = 7;
  const widthShop = shopContent.offsetWidth - (border * 2 + padding * 2);
  const images = document.querySelectorAll(color);
  const canvasShop = document.querySelector(".canvas-shop");
  const ctx = canvasShop.getContext("2d");
  const arrayImages = Array.from(images);
  const widthImg = 180;
  const heightImg = 275;
  const countImgBlock = Math.floor((widthShop - 100) / widthImg);
  const margin = (widthShop - countImgBlock * widthImg + 100) / (countImgBlock * 2);

  const countImgLine = Math.ceil(8 / countImgBlock);
  let heightShop;

  switch (countImgLine) {
    case 2:
      heightShop = heightImg * countImgLine + padding + padding * 3;
      break;
    case 3:
      heightShop = heightImg * countImgLine + padding * 2 + padding * 3;
      break;
    case 4:
      heightShop = heightImg * countImgLine + padding * 3 + padding * 3;
      break;
    case 5:
      heightShop = heightImg * countImgLine + padding * 4 + padding * 3;
      break;
    default:
      heightShop = heightImg + padding * 3;
  }

  canvasShop.setAttribute("width", widthShop);
  canvasShop.setAttribute("height", heightShop);

  ctx.clearRect(0, 0, canvasShop.width, canvasShop.height);

  console.log(widthShop, countImgBlock, margin);

  function drawShop() {
    let x = margin;
    let y = 0;
    for (let i = 0; i < arrayImages.length; i += 1) {
      ctx.drawImage(arrayImages[i], x, y, 180, 275);
      x += widthImg + margin;
      if (widthShop - x <= margin + widthImg) {
        console.log(countImgLine);
        x = margin;
        y = y + heightImg + padding;
      }
    }
  }

  drawShop();
}

console.log(currentColor);
window.addEventListener("resize", () => {
  createShop(currentColor);
});
