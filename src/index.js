import { appendChildren } from "./modules/dom-creation/general-components/helper-functions";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import { createHomePage } from "./modules/dom-creation/home-page";
import { createTodayPage } from "./modules/dom-creation/today-page";
import { createUpcomingPage } from "./modules/dom-creation/upcoming-page";
import { createProjectsPage } from "./modules/dom-creation/project-page";
import { createFooter } from "./modules/dom-creation/footer";
import { displayPage } from "./modules/app-logic/display-page";
import { toggleCollapsible } from "./modules/app-logic/toggle-collapsible";
import "./css/style.css";
import "./css/reset.css";

const body = document.querySelector("body");
const elements = [
    createHeader(),
    createSidebar(),
    createHomePage(),
    createTodayPage(),
    createUpcomingPage(),
    createProjectsPage("errands"),
    createProjectsPage("road trip"),
    createProjectsPage("work"),
    createFooter(),
];
appendChildren(body, elements);

const sidebarSections = document.querySelector(".sidebar-sections");
sidebarSections.addEventListener("click", e => {
    const section = e.target.closest("button");
    if (section.classList.contains("collapsible")) toggleCollapsible(section);
    else displayPage(section);
});