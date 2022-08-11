import { appendChildren } from "../helper-functions/append-children";
import { createSections } from "./sidebar-components/sections";
import { createMenu } from "./sidebar-components/menu";
import { createAddProjectBtn } from "./sidebar-components/add-project-btn";

const _createNav = () => {
    const nav = document.createElement("nav");
    nav.setAttribute("class", "sidebar");
    return nav;
};

const createSidebar = () => {
    const sections = createSections();
    const sidebarElements = [
        createMenu(sections),
        createAddProjectBtn(),
    ];
    const sidebar = _createNav();
    appendChildren(sidebar, sidebarElements);
    return sidebar;
};

export {
    createSidebar,
};