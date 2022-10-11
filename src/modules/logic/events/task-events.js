import * as image from "../../dom/image-elements";

const _toggleCheckboxHover = (img, isHovered) => {
    const checkedStatus = img.closest("li").classList.contains("checked") ? true : false;

    const createImg = () => {
        if (!isHovered) {
            return checkedStatus ? image.createCheckedHoverIcon() : image.createUncheckedHoverIcon();
        } else {
            return checkedStatus ? image.createCheckedIcon() : image.createUncheckedIcon();
        };
    };

    const btn = img.parentElement;
    const newImg = createImg();
    btn.replaceChild(newImg, img);
};

const _emitMouseoverEvents = (e) => {
    if (
        e.target.nodeName === "IMG" &&
        e.target.closest("div").classList.contains("left")
    ) {
        const img = e.target;
        _toggleCheckboxHover(img, false);
    };
};

const _emitMouseoutEvents = (e) => {
    if (
        e.target.classList.contains("left") ||
        e.target.nodeName === "LI"
    ) {
        const img = e.target.querySelector("img");
        _toggleCheckboxHover(img, true);
    };
};

const _expandTaskDetails = (btn) => {

};

const _emitClickEvents = (e) => {

};

const _events = {
    mouseover: _emitMouseoverEvents,
    mouseout: _emitMouseoutEvents,
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