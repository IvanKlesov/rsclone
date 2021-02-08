const multiItemSlider = (function sliderCards() {
  return function callbackSlider(selector, configValue) {
    const mainElement = document.querySelector(selector);
    const sliderWrapper = mainElement.querySelector(".slider-wrapper");
    const sliderItems = mainElement.querySelectorAll(".slider-item");
    const sliderControls = mainElement.querySelectorAll(".slider-control");
    const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
    const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width) / 2;
    let positionLeftItem = 0;
    let transform = 0;
    const step = (itemWidth / wrapperWidth) * 100;
    const items = [];
    let interval = 0;
    const config = {
      isCycling: false,
      direction: "right",
      interval: 5000,
      pause: true,
    };

    const arrKeys = Object.keys(configValue);
    for (let i = 0; i < arrKeys.length; i += 1) {
      if (arrKeys[i] in config) {
        config[arrKeys[i]] = configValue[arrKeys[i]];
      }
    }

    sliderItems.forEach((item, index) => {
      items.push({ item, position: index, transform: 0 });
    });

    const position = {
      getItemMin() {
        let indexItem = 0;
        items.forEach((item, index) => {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax() {
        let indexItem = 0;
        items.forEach((item, index) => {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin() {
        return items[position.getItemMin()].position;
      },
      getMax() {
        return items[position.getItemMax()].position;
      },
    };

    const transformItem = function transformSlider(direction) {
      let nextItem;
      if (direction === "right") {
        positionLeftItem += 1;
        if (positionLeftItem + wrapperWidth / itemWidth - 1 > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }
        transform -= step;
      }
      if (direction === "left") {
        positionLeftItem -= 1;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }
        transform += step;
      }
      sliderWrapper.style.transform = `translateX(${transform}%)`;
    };

    const cycle = function cycleSlider(direction) {
      if (!config.isCycling) {
        return;
      }
      interval = setInterval(() => {
        transformItem(direction);
      }, config.interval);
    };

    const controlClick = function eventSlider(e) {
      if (e.target.classList.contains("slider-control")) {
        e.preventDefault();
        const direction = e.target.classList.contains("slider-control-right") ? "right" : "left";
        transformItem(direction);
        clearInterval(interval);
        cycle(config.direction);
      }
    };

    const setUpListeners = function fillListenersSlider() {
      sliderControls.forEach((item) => {
        item.addEventListener("click", controlClick);
      });
      if (config.pause && config.isCycling) {
        mainElement.addEventListener("mouseenter", () => {
          clearInterval(interval);
        });
        mainElement.addEventListener("mouseleave", () => {
          clearInterval(interval);
          cycle(config.direction);
        });
      }
    };

    setUpListeners();
    cycle(config.direction);

    return {
      right() {
        transformItem("right");
      },
      left() {
        transformItem("left");
      },
      stop() {
        config.isCycling = false;
        clearInterval(interval);
      },
      cycle() {
        config.isCycling = true;
        clearInterval(interval);
        cycle();
      },
    };
  };
}());

multiItemSlider(".slider", {
  isCycling: true,
});
