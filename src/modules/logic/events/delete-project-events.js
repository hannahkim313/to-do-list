import * as homePage from "../../dom/home-page";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as page from "../../dom/page";
import * as sidebar from "../../dom/sidebar";

const _displayModal = (modal) => modal.showModal();

const _toggleBtnBackgroundColor = (btn) => btn.classList.toggle("active");

const _deleteFromLibrary = (projectName) => library.deleteProject(method.undoKebabCase(projectName));

const _deleteProjectPage = (projectName, pageName) => {
    const page = document.querySelector(`.page[data-page-name="${projectName}"]`);
    page.remove();

    if (pageName !== "today" && pageName !== "upcoming") {
        const pageToDisplay = document.querySelector(".projects.page") ? document.querySelector(".projects.page") : document.querySelector(".home.page");
        pageToDisplay.style.display = "grid";
    };
};

const _deleteProjectMenus = (projectName) => {
    const projectMenus = document.querySelectorAll(`.page .project[data-project-name="${projectName}"]`);
    for (const menu of projectMenus) {
        menu.remove();
    };

    const projects = document.querySelectorAll(".projects");
    for (const project of projects) {
        if (project.childElementCount === 0) {
            const emptyMessage = page.createEmptyMessage("There are no upcoming tasks.", false);
            project.appendChild(emptyMessage);
        };
    };
};

const _cancel = (modal) => modal.close();

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("delete-project-btn")
    ) {
        const modal = document.querySelector(".delete-project.modal");
        _displayModal(modal);

        _toggleBtnBackgroundColor(e.target.closest("button"));
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("confirm-btn")
    ) {
        const projectName = document.querySelector(".active").closest("article").dataset.projectName;
        const pageName = document.querySelector(".active").closest("main").dataset.pageName;

        sidebar.deleteSubsection(projectName);
        _deleteFromLibrary(projectName);
        _deleteProjectMenus(projectName);
        _deleteProjectPage(projectName, pageName);

        homePage.updateOverviewTasks();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("cancel-btn")
    ) {
        const modal = document.querySelector(".delete-project.modal");
        _cancel(modal);

        const btn = document.querySelector(".active");
        _toggleBtnBackgroundColor(btn);
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