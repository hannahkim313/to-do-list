import * as addTaskModal from "./add-task-modal-events";
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
        e.target.closest("button").classList.contains("more-options-btn")
    ) {
        //_displayMoreOptions();
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