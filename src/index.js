import { appendChildren } from "./modules/dom-creation/helper-functions";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import { createHomePage } from "./modules/dom-creation/home-page";
import { createTodayPage } from "./modules/dom-creation/today-page";
import { createFooter } from "./modules/dom-creation/footer";
import "./css/style.css";
import "./css/reset.css";

const bodyElements = [
    createHeader(),
    createSidebar(),
    // createHomePage(),
    createTodayPage(),
    createFooter()
];

const body = document.querySelector("body");
appendChildren(body, bodyElements);