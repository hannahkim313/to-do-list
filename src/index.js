import { createHeader } from "./modules/dom-creation/header";
import "./css/style.css";
import "./css/reset.css";

const header = createHeader();

const body = document.querySelector("body");
body.append(
    header,
);