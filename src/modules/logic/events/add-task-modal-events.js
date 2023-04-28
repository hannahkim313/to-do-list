import * as element from "../../dom/html-elements";
import * as image from "../../dom/image-elements";
import * as method from "../../helper-functions";

const _addFormTitle = (e) => {
    const projectName = method.capitalize(method.undoKebabCase(e.target.closest("article").dataset.projectName));
    const title = element.createPara(`Add task to ${projectName}`);
    const titleAttributes = {
        class: "form-title",
    };
    method.setAttributesOf(title, titleAttributes);

    const form = document.querySelector(".add-task.modal form");

    if (form.firstElementChild.classList.contains("form-title")) {
        form.firstElementChild.remove();
    };

    form.insertBefore(title, form.firstElementChild);
};

const _displayAddTaskModal = () => document.querySelector(".add-task.modal").showModal();

const _changeBtnValue = (btn) => {
    btn.lastElementChild.remove();
    
    const priority = btn.firstElementChild.textContent;

    if (priority === "Low") {
        const priorityLogo = image.createMediumPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "Medium";
    };

    if (priority === "Medium") {
        const priorityLogo = image.createHighPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "High";
    };

    if (priority === "High") {
        const priorityLogo = image.createLowPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "Low";
    };
};

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("add-task-btn")
    ) {
        _addFormTitle(e);
        _displayAddTaskModal();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-priority-btn")
    ) {
        _changeBtnValue(e.target.closest("button"));
    };
};

const _emitFocusInEvents = (e) => {
    
};

const _emitFocusOutEvents = (e) => {

};

const _events = {
    click: _emitClickEvents,
    focusin: _emitFocusInEvents,
    focusout: _emitFocusOutEvents,
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