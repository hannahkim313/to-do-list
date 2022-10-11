import * as modal from "../../dom/modals";
import * as page from "../../dom/page";
import * as sidebar from "../../dom/sidebar";

const _toggleSection = (section) => {
    if (section.classList.contains("collapsible")) {
        sidebar.toggleCollapsible(section);
    } else if (!section.classList.contains("no-projects-created")) {
        page.display(section);
    };
};

const _displayAddProjectModal = () => modal.display("add project");

const _emitClickEvents = (e) => {
    if (e.target.closest("button").classList.contains("add-project-btn")) {
        _displayAddProjectModal();
    };

    if (e.target.closest("button").dataset.pageName) {
        const section = e.target.closest("button");
        _toggleSection(section);
    };
};

const _events = {
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (eventType === event) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};