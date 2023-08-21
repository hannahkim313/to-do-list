import * as storage from "../functions/storage-functions";

const _emitChangeEvents = (e) => {
    if (e.target.closest("textarea")) {
        storage.addNotes();
    };
};

const _events = {
    change: _emitChangeEvents,
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