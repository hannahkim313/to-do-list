import { appendChildren } from "./modules/helper-functions/append-children";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import { createFooter } from "./modules/dom-creation/footer";
import "./css/style.css";
import "./css/reset.css";

const header = createHeader();
const sidebar = createSidebar();
const footer = createFooter();

const body = document.querySelector("body");
appendChildren(
    body,
    header,
    sidebar,
    footer
);