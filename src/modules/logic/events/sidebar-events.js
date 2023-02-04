import * as page from "../../dom/page";

const _displayAddProjectModal = () => document.querySelector(".add-project.modal").showModal();

const _toggleCollapsible = (collapsible) => {
    collapsible.classList.toggle("expanded");
    const subsections = collapsible.nextElementSibling;
    
    if (window.getComputedStyle(subsections).getPropertyValue("max-height") === "0px") {
        subsections.style.maxHeight = "100%";
        subsections.style.opacity = "1";
        subsections.style.marginTop = "0";
    } else {
        subsections.style.maxHeight = "0";
        subsections.style.opacity = "0";
        subsections.style.marginTop = "-8px";
    };
};

const _toggleSection = (section) => {
    if (section.classList.contains("collapsible")) {
        _toggleCollapsible(section);
    } else if (!section.classList.contains("no-projects-created")) {
        page.display(section);
    };
};

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("add-project-btn")
    ) {
        _displayAddProjectModal();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").dataset.pageName
    ) {
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
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};