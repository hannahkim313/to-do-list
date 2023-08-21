import * as defaultContent from "../../dom/default-content";
import * as page from "../../dom/page";
import * as storage from "../functions/storage-functions";

const _createEmptyMessages = () => {
    const projectMenus = document.querySelectorAll(".page .projects");
    for (const menu of projectMenus) {
        const message = page.createEmptyMessage("There are no upcoming tasks.", false);
        menu.appendChild(message);
    };
};

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("yes-btn")
    ) {
        defaultContent.create();
        storage.populate();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("no-btn")
    ) {
        _createEmptyMessages();
        storage.populate();

        const modal = document.querySelector(".default-content.modal");
        modal.close();
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