import * as method from "./modules/dom-creation/helper-functions";
import * as pageFunc from "./modules/app-logic/page-logic";
import * as featuresFunc from "./modules/app-logic/features-logic";
import * as modalFunc from "./modules/app-logic/modal-logic";
import * as header from "./modules/dom-creation/elements/header";
import * as sidebar from "./modules/dom-creation/elements/sidebar";
import * as home from "./modules/dom-creation/elements/home-page";
import * as today from "./modules/dom-creation/elements/today-page";
import * as upcoming from "./modules/dom-creation/elements/upcoming-page";
import * as footer from "./modules/dom-creation/elements/footer";
import * as modals from "./modules/dom-creation/elements/modals";
import "./css/style.css";
import "./css/reset.css";

const body = document.querySelector("body");
const elements = [
    header.createHeader(),
    sidebar.createSidebar(),
    home.createHomePage(),
    today.createTodayPage(),
    upcoming.createUpcomingPage(),
    footer.createFooter(),
    modals.createAddProjectModal(),
];
method.appendChildren(body, elements);

const sidebarSections = document.querySelector(".sidebar-sections");
sidebarSections.addEventListener("click", e => {
    const section = e.target.closest("button");
    if (section.classList.contains("collapsible")) featuresFunc.toggleCollapsible(section);
    else if (!section.classList.contains("no-projects-created")) pageFunc.display(section);
});

const addProjectBtn = document.querySelector(".add-project-btn");
addProjectBtn.addEventListener("click", () => modalFunc.display("add project"));

const addProjectModal = document.querySelector(".add-project.modal");
addProjectModal.addEventListener("click", e => {
    const modalElement = e.currentTarget;
    const btn = e.target.closest("button");

    if (btn === null) return;

    if (btn.classList.contains("cancel-btn")) modalFunc.cancel(modalElement);

    if (btn.classList.contains("confirm-btn")) {
        const input = modalElement.querySelector("input");
        if (!modalFunc.isValid(input)) {
            e.preventDefault();
            modalFunc.displayInvalid(input);
        } else modalFunc.submit(modalElement);
    };
});

const inputs = document.querySelectorAll("form input");
for (const input of inputs) {
    const borderColor = input.style.borderColor;
    
    input.addEventListener("focusin", () => {
        if (borderColor === "transparent") borderColor = "var(--color-text-1)";
    });

    input.addEventListener("focusout", () => {
        if (borderColor === "var(--color-text-1)") borderColor = "transparent";
    });
};