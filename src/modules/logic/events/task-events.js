import * as homePage from "../../dom/home-page";
import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as sidebar from "../../dom/sidebar";
import * as taskDetails from "../../dom/task-details";

const _updateTaskCount = (projectName) => {
    const currentAlerts = document.querySelector(`[data-page-name="${projectName}"] .alerts`);
    const newAlerts = sidebar.createAlerts(projectName);
    currentAlerts.after(newAlerts);
    currentAlerts.remove();

    homePage.updateOverviewTasks();
};

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

const _toggleTask = (data) => {
    const sections = document.querySelectorAll(`[data-project-name="${data.project}"]`);
    for (const section of sections) {
        const tasks = data.isChecked ? section.querySelectorAll(".task.checked") : section.querySelectorAll(".task");
        for (const task of tasks) {
            if (
                task.querySelector(".left p s") && task.querySelector(".left p s").textContent === data.title ||
                task.querySelector(".left p") && task.querySelector(".left p ").textContent === data.title
            ) {
                _toggleVisuals(task);
            };
        };
    };
};

const _toggleTaskDetails = (btn) => {
    const task = btn.closest("li");
    task.classList.toggle("expanded");

    if (
        task.nextElementSibling &&
        task.nextElementSibling.classList.contains("task-details")
    ) {
        task.nextElementSibling.addEventListener("animationend", () => task.nextElementSibling.remove());
    } else {
        const taskDetailsElement = taskDetails.create(task);
        task.insertAdjacentElement("afterend", taskDetailsElement);
    };
    
    task.nextElementSibling.classList.toggle("expanded");
};

const _emitClickEvents = (e) => {
    if (
        e.target.nodeName === "IMG" &&
        e.target.closest("div").classList.contains("left")
    ) {
        const checkboxImg = e.target;
        const isChecked = checkboxImg.dataset.isChecked === "true" ? true : false;
        const paraEl = checkboxImg.parentElement.nextElementSibling;
        const taskTitle = isChecked ? paraEl.firstElementChild.textContent : paraEl.textContent;
        const taskProject = method.toKebabCase(checkboxImg.closest(".project").firstElementChild.textContent.toLowerCase());
        const data = {
            isChecked: isChecked,
            title: taskTitle,
            project: taskProject,
        };
        
        library.updateCheckedStatus(taskTitle);
        _updateTaskCount(taskProject);
        _toggleTask(data);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("expand-task")
    ) {
        _toggleTaskDetails(e.target.closest("button"));
    };
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