import * as addProjectModal from "./events/add-project-modal-events";
import * as addTaskModal from "./events/add-task-modal-events";
import * as deleteProjectModal from "./events/delete-project-events";
import * as deleteTaskModal from "./events/delete-task-modal-events";
import * as editProjectModal from "./events/edit-project-events";
import * as editTaskModal from "./events/edit-task-modal-events";
import * as filter from "./events/filters-events";
import * as project from "./events/project-events";
import * as sidebar from "./events/sidebar-events";
import * as task from "./events/task-events";
import * as taskDetails from "./events/task-details-events";

const emitEvents = () => {
    const addProjectModalElement = document.querySelector(".add-project.modal");
    addProjectModalElement.addEventListener("click", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusin", e => addProjectModal.emitEvents(e));
    addProjectModalElement.addEventListener("focusout", e => addProjectModal.emitEvents(e));

    const addTaskModalElement = document.querySelector(".add-task.modal");
    addTaskModalElement.addEventListener("click", e => addTaskModal.emitEvents(e));

    const deleteTaskModalElement = document.querySelector(".delete-task.modal");
    deleteTaskModalElement.addEventListener("click", e => deleteTaskModal.emitEvents(e));

    const editTaskModalElement = document.querySelector(".edit-task.modal");
    editTaskModalElement.addEventListener("click", e => editTaskModal.emitEvents(e));

    const editProjectModalElement = document.querySelector(".edit-project.modal");
    editProjectModalElement.addEventListener("click", e => editProjectModal.emitEvents(e));
    editProjectModalElement.addEventListener("focusin", e => editProjectModal.emitEvents(e));
    editProjectModalElement.addEventListener("focusout", e => editProjectModal.emitEvents(e));

    const deleteProjectModalElement = document.querySelector(".delete-project.modal");
    deleteProjectModalElement.addEventListener("click", e => deleteProjectModal.emitEvents(e));

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
            e.target.closest("div") &&
            e.target.closest("div").classList.contains("task-options-wrapper")
        ) {
            taskDetails.emitEvents(e);
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