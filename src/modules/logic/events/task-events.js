import * as image from "../../dom/image-elements";

// const _toggleCheckboxHover = (img, isHovered) => {
//     const checkedStatus = img.closest("li").classList.contains("checked") ? true : false;

//     const createImg = () => {
//         if (!isHovered) {
//             return checkedStatus ? image.createCheckedHoverIcon() : image.createUncheckedHoverIcon();
//         } else {
//             return checkedStatus ? image.createCheckedIcon() : image.createUncheckedIcon();
//         };
//     };

//     const btn = img.parentElement;
//     const newImg = createImg();
//     btn.replaceChild(newImg, img);
// };

// const _emitMouseoverEvents = (e) => {
//     if (
//         e.target.nodeName === "IMG" &&
//         e.target.closest("div").classList.contains("left")
//     ) {
//         const img = e.target;
//         _toggleCheckboxHover(img, false);
//     };
// };

// const _emitMouseoutEvents = (e) => {
//     if (
//         e.target.classList.contains("left") ||
//         e.target.nodeName === "LI"
//     ) {
//         const img = e.target.querySelector("img");
//         _toggleCheckboxHover(img, true);
//     };
// };

const _toggleCheckbox = (checkboxImg) => {
    const isChecked = checkboxImg.dataset.isChecked;
    const newImg = isChecked === "true" ? image.createUncheckedIcon() : image.createCheckedIcon();
    
    const parent = checkboxImg.parentElement
    parent.replaceChild(newImg, checkboxImg);
};

const _toggleStrikethrough = (para) => {
    const isStrikethrough = para.childElementCount > 0 ? true : false;
    if (isStrikethrough) {
        const newText = para.firstElementChild.textContent;
        para.firstElementChild.remove();
        para.textContent = newText;
    } else {
        const strikeElement = document.createElement("s");
        strikeElement.textContent = para.textContent;
        para.textContent = "";
        para.appendChild(strikeElement);
    };
};

const _toggleOpacity = (task) => task.classList.toggle("checked");

const _expandTaskDetails = (btn) => {

};

const _emitClickEvents = (e) => {
    if (
        e.target.nodeName === "IMG" &&
        e.target.closest("div").classList.contains("left")
    ) {
        const checkboxImg = e.target;
        const para = checkboxImg.parentElement.nextElementSibling;
        const task = para.closest("li");
        _toggleCheckbox(checkboxImg);
        _toggleStrikethrough(para);
        _toggleOpacity(task);
    };
};

const _events = {
    // mouseover: _emitMouseoverEvents,
    // mouseout: _emitMouseoutEvents,
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (eventType === event) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};