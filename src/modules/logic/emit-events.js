import * as addProjectModal from "./events/add-project-modal-events";
import * as filter from "./events/filters-events";
import * as sidebar from "./events/sidebar-events";
import * as task from "./events/task-events";

const emitEvents = () => {
    const sidebarElement = document.querySelector(".sidebar");
    sidebarElement.addEventListener("click", e => sidebar.emitEvents(e));

    const addProjectModalElement = document.querySelector(".add-project.modal");
    addProjectModalElement.addEventListener("click", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusin", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusout", e => addProjectModal.emitEvents(e));

    const body = document.querySelector("body");
    body.addEventListener("click", e => {
        if (
            e.target.closest("div") &&
            e.target.closest("div").classList.contains("filters")
        ) {
            filter.emitEvents(e);
        };

        if (
            e.target.closest("li") &&
            e.target.closest("li").classList.contains("task")
        ) {
            task.emitEvents(e);
        };
    });
};

export {
    emitEvents,
};