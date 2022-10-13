import * as image from "../../dom/image-elements";

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

const _toggleTask = (checkboxImg) => {
    const para = checkboxImg.parentElement.nextElementSibling;
    const task = para.closest("li");
    
    _toggleCheckbox(checkboxImg);
    _toggleStrikethrough(para);
    _toggleOpacity(task);
    // Update library
};

const _expandTaskDetails = (btn) => {
    // If chevron button is clicked, open task details
};

const _emitClickEvents = (e) => {
    if (
        e.target.nodeName === "IMG" &&
        e.target.closest("div").classList.contains("left")
    ) {
        const checkboxImg = e.target;
        _toggleTask(checkboxImg);
    };

    // If chevron button is clicked, call _expandTaskDetails()
};

const _events = {
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};