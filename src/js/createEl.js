export default function createEl(elName, classes = "", id = "", parent = null) {
  try {
    const result = document.createElement(elName);
    if (parent) {
      parent.appendChild(result);
    }
    if (classes) {
      result.setAttribute("class", classes.trim());
    }

    if (id) {
      result.setAttribute("id", id);
    }
    return result;
  } catch (err) {
    throw new Error("Error in createElement func. Trying to do ".concat(elName).concat(" html tag")
      .concat(" Errr log: ").concat(err));
  }
}

export function configurateButton(newInnnerText, classes = "", id, parent = null) {
  const newButton = createEl("button", "basic_button ".concat(classes), id, parent);
  newButton.innerText = newInnnerText;
  return newButton;
}

export function setElementOrder(countryButton, newOrder) {
  const button = countryButton;
  button.style.order = newOrder;
}

export function setElementInnerText(element, newText) {
  const el = element;
  el.innerText = newText;
}

export function hideElement(element) {
  element.classList.add("hide");
}

export function unhideElement(element) {
  element.classList.remove("hide");
}
