import * as addProjectModal from "./events/add-project-modal-events";
import * as filter from "./events/filters-events";
import * as sidebar from "./events/sidebar-events";

const emitEvents = () => {
    const sidebarElement = document.querySelector(".sidebar");
    sidebarElement.addEventListener("click", e => sidebar.emitEvents(e));

    const addProjectModalElement = document.querySelector(".add-project.modal");
    addProjectModalElement.addEventListener("click", e => addProjectModal.emitEvents(e));

    const filters = document.querySelectorAll(".filters");
    for (const filtersElement of filters) {
        filtersElement.addEventListener("click", e => filter.emitEvents(e));
    };
};

export {
    emitEvents,
};