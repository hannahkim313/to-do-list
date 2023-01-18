import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";

const _toggleCheckbox = (checkboxImg) => {
    const isChecked = checkboxImg.dataset.isChecked;
    const newImg = isChecked === "true" ? image.createUncheckedIcon() : image.createCheckedIcon();
    const parent = checkboxImg.parentElement;
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

const _toggleVisuals = (task) => {
    _toggleCheckbox(task.querySelector(".left img"));
    _toggleStrikethrough(task.querySelector(".left p"));
    _toggleOpacity(task);
};

const _toggleTask = (checkboxImg) => {
    const isChecked = checkboxImg.dataset.isChecked === "true" ? true : false;
    const paraEl = checkboxImg.parentElement.nextElementSibling;
    const taskTitle = isChecked ? paraEl.firstElementChild.textContent : paraEl.textContent;
    const taskProject = method.toKebabCase(checkboxImg.closest(".project").firstElementChild.textContent.toLowerCase());

    library.updateStatus(taskTitle);

    const sections = document.querySelectorAll(`[data-project-name="${taskProject}"]`);
    for (const section of sections) {
        const tasks = isChecked ? section.querySelectorAll(".task.checked") : section.querySelectorAll(".task");
        for (const task of tasks) {
            if (
                task.querySelector(".left p s") && task.querySelector(".left p s").textContent === taskTitle ||
                task.querySelector(".left p") && task.querySelector(".left p ").textContent === taskTitle
            ) {
                _toggleVisuals(task);
            };
        };
    };
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