import { appendChildren } from "./modules/helper-functions/append-children";
import { createHeader } from "./modules/dom-creation/header";
import { createSidebar } from "./modules/dom-creation/sidebar";
import "./css/style.css";
import "./css/reset.css";

const header = createHeader();
const sidebar = createSidebar();

const body = document.querySelector("body");
appendChildren(
    body,
    header,
    sidebar,
);