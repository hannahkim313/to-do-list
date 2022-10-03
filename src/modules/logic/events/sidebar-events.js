import * as modal from "../../dom/modals";
import * as page from "../../dom/page";
import * as sidebar from "../../dom/sidebar";

const _emitSection = (section) => {
    if (section.classList.contains("collapsible")) {
        sidebar.toggleCollapsible(section);
    } else if (!section.classList.contains("no-projects-created")) {
        page.display(section);
    };
};

const _emitAddProjectBtn = () => modal.display("add project");

const emitEvents = (e) => {
    const btn = e.target.closest("button");

    if (btn === null) return;

    if (btn.classList.contains("add-project-btn")) {
        _emitAddProjectBtn();
    } else {
        _emitSection(btn);
    };
};

export {
    emitEvents,
};