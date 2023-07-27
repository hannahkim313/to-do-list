import * as addTaskModal from "./add-task-modal-events";
import * as deleteProject from "./delete-project-events";
import * as editProject from "./edit-project-events";
import * as projectFilter from "./project-filter-events";

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        (
            e.target.closest("button").classList.contains("dropdown") ||
            e.target.closest("button").classList.contains("sort-by-filter")
        )
    ) {
        projectFilter.emitEvents(e);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("add-task-btn")
    ) {
        addTaskModal.emitEvents(e);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("edit-project-btn")
    ) {
        editProject.emitEvents(e);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("delete-project-btn")
    ) {
        deleteProject.emitEvents(e);
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