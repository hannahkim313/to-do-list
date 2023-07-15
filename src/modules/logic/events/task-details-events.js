import * as deleteTaskModal from "./delete-task-modal-events";
import * as editTaskModal from "./edit-task-modal-events";

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-delete-btn")
    ) {
        deleteTaskModal.emitEvents(e);
    };
    
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-edit-btn")
    ) {
        editTaskModal.emitEvents(e);
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