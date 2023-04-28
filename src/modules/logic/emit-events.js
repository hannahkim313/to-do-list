import * as addProjectModal from "./events/add-project-modal-events";
import * as addTaskModal from "./events/add-task-modal-events";
import * as filter from "./events/filters-events";
import * as project from "./events/project-events";
import * as sidebar from "./events/sidebar-events";
import * as task from "./events/task-events";

const emitEvents = () => {
    const addProjectModalElement = document.querySelector(".add-project.modal");
    addProjectModalElement.addEventListener("click", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusin", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusout", e => addProjectModal.emitEvents(e));

    const addTaskModalElement = document.querySelector(".add-task.modal");
    addTaskModalElement.addEventListener("click", e => addTaskModal.emitEvents(e));
    addTaskModalElement.addEventListener("focusin", e => addTaskModal.emitEvents(e));
    addTaskModalElement.addEventListener("focusout", e => addTaskModal.emitEvents(e));

    const body = document.querySelector("body");
    body.addEventListener("click", e => {
        if (
            e.target.closest("nav") &&
            e.target.closest("nav").classList.contains("sidebar")
        ) {
            sidebar.emitEvents(e);
        };

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

        if (
            e.target.closest("article") &&
            e.target.closest("article").classList.contains("project")
        ) {
            project.emitEvents(e);
        };
    });
};

export {
    emitEvents,
};