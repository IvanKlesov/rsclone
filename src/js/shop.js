let currentColor;
const blueCards = ["wheatField", "farm", "flowerGarden", "forest", "longboat", "mine", "appleOrchard", "trawler"];
const greenCards = [
  "bakery",
  "store",
  "flowerStore",
  "cheeseDairy",
  "furnitureFactory",
  "vegetableMarket",
  "groceryWarehouse",
];
const redCards = ["sushiBar", "cafe", "pizzeria", "diner", "restaurant"];
const purpleCards = ["businessCenter", "stadium", "telecentre", "publishingHouse", "tax"];
const attractionCards = ["port", "railwayStation", "shoppingCenter", "amusementPark", "radioTower", "airport"];

export default function createShop(color) {
  currentColor = color;
  let countCards;
  switch (currentColor) {
    case ".picture-blue":
      countCards = 8;
      break;
    case ".picture-green":
      countCards = 7;
      break;
    case ".picture-red":
      countCards = 5;
      break;
    case ".picture-purple":
      countCards = 5;
      break;
    case ".picture-attractions":
      countCards = 6;
      break;
    default:
      countCards = 8;
  }
  const shopContent = document.querySelector(".shop-content");
  if (document.querySelector(".canvas-shop")) {
    shopContent.removeChild(document.querySelector(".canvas-shop"));
  }
  const canvasShop = document.createElement("canvas");
  canvasShop.classList.add("canvas-shop");
  shopContent.appendChild(canvasShop);
  const ctx = canvasShop.getContext("2d");
  const padding = 20;
  const border = 7;
  const elements = [];
  const widthShop = shopContent.offsetWidth - (border * 2 + padding * 2);
  const images = document.querySelectorAll(color);
  const arrayImages = Array.from(images);
  const widthImg = 180;
  const heightImg = 275;
  let countImgBlock = Math.floor((widthShop - 60) / widthImg);
  let margin = (widthShop - countImgBlock * widthImg) / (countImgBlock + 1);

  if (widthShop < 240) {
    margin = 20;
    countImgBlock = 1;
  }
  const countImgLine = Math.ceil(countCards / countImgBlock);
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
    case 6:
      heightShop = heightImg * countImgLine + padding * 5 + padding * 3;
      break;
    case 7:
      heightShop = heightImg * countImgLine + padding * 6 + padding * 3;
      break;
    case 8:
      heightShop = heightImg * countImgLine + padding * 7 + padding * 3;
      break;
    default:
      heightShop = heightImg + padding * 3;
  }

  canvasShop.setAttribute("width", widthShop);
  canvasShop.setAttribute("height", heightShop);

  ctx.clearRect(0, 0, canvasShop.width, canvasShop.height, countImgLine);

  function drawShop() {
    let x = margin;
    let y = 0;
    for (let i = 0; i < arrayImages.length; i += 1) {
      switch (currentColor) {
        case ".picture-blue":
          elements.push({
            name: blueCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
          break;
        case ".picture-green":
          elements.push({
            name: greenCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
          break;
        case ".picture-red":
          elements.push({
            name: redCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
          break;
        case ".picture-purple":
          elements.push({
            name: purpleCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
          break;
        case ".picture-attractions":
          elements.push({
            name: attractionCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
          break;
        default:
          elements.push({
            name: blueCards[i],
            left: x,
            top: y,
            width: 180,
            height: 275,
          });
      }
      ctx.drawImage(arrayImages[i], x, y, 180, 275);
      x += widthImg + margin;
      if (widthShop - x < margin + widthImg) {
        x = margin;
        y = y + heightImg + padding;
      }
    }
  }

  drawShop();

  canvasShop.addEventListener("click", (event) => {
    const box = canvasShop.getBoundingClientRect();

    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    elements.forEach((element) => {
      if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
        alert(element.name);
      }
    });
  });
}

window.addEventListener("resize", () => {
  createShop(currentColor);
});
