import * as resetProgramModal from "./reset-program-modal-events";

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("reset")
    ) {
        resetProgramModal.emitEvents(e);
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