import * as addProjectModal from "./events/add-project-events";
import * as sidebar from "./events/sidebar-events";

const emitEvents = () => {
    const sidebarElement = document.querySelector(".sidebar");
    sidebarElement.addEventListener("click", e => sidebar.emitEvents(e));

    const addProjectModalElement = document.querySelector(".add-project.modal");
    addProjectModalElement.addEventListener("click", e => addProjectModal.emitEvents(e));
};

export {
    emitEvents,
};