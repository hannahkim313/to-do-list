import { appendChildren } from "../../helper-functions/append-children";

const createMenu = (sections) => {
    const menu = document.createElement("menu");
    menu.setAttribute("class", "sidebar-sections");
    appendChildren(menu, sections);
    return menu;
};

export {
    createMenu,
};