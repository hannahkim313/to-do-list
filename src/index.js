import { appendChildren } from "./modules/helper-functions/append-children";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import { createHomePage } from "./modules/dom-creation/home-page";
import { createFooter } from "./modules/dom-creation/footer";
import "./css/style.css";
import "./css/reset.css";

const bodyElements = [
    createHeader(),
    createSidebar(),
    createHomePage(),
    createFooter()
];

const body = document.querySelector("body");
appendChildren(body, bodyElements);