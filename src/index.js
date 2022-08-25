import { appendChildren } from "./modules/dom-creation/helper-functions";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import { createHomePage } from "./modules/dom-creation/home-page";
import { createTodayPage } from "./modules/dom-creation/today-page";
import { createUpcomingPage } from "./modules/dom-creation/upcoming-page";
import { createFooter } from "./modules/dom-creation/footer";
import { displayPage } from "./modules/app-logic/display-page";
import "./css/style.css";
import "./css/reset.css";

const bodyElements = [
    createHeader(),
    createSidebar(),
    createHomePage(),
    createTodayPage(),
    createUpcomingPage(),
    createFooter(),
];

const body = document.querySelector("body");
appendChildren(body, bodyElements);

const sidebarSections = document.querySelectorAll(".sidebar-sections > li:not(.projects)");
for (const section of sidebarSections) {
    section.addEventListener("click", () => displayPage(section));
};

// const expandableSections = document.querySelectorAll(".expandable");
// for (const expandable of expandableSections) {
//     expandable.addEventListener("click", () => {
//         create
//     });
// };