import { appendChildren } from "../helper-functions/append-children";
import { Para } from "./elements/para";
import { Button } from "./elements/button";
import { SidebarSection } from "./page-components/sidebar-section";
import { createPlusLightIcon } from "./page-components/plus-light-icon";
import homeImg from "../../img/home.svg";
import todayImg from "../../img/today.svg";
import upcomingImg from "../../img/upcoming.svg";
import projectsImg from "../../img/folder.svg";

const _createSections = () => {
    const sectionsInfo = {
        home: {
            imgAttributes: { src: homeImg, alt: "Home icon", },
            paraText: { text: "Home" },
        },
        today: {
            imgAttributes: { src: todayImg, alt: "Single day calendar icon", },
            paraText: { text: "Today" },
        },
        upcoming: {
            imgAttributes: { src: upcomingImg, alt: "Multiple days calendar icon", },
            paraText: { text: "Upcoming" },
        },
        projects: {
            imgAttributes: { src: projectsImg, alt: "Folder icon", },
            paraText: { text: "Projects" },
        },
    };
    const sections = [];
    for (const section of Object.values(sectionsInfo)) {
        sections.push(SidebarSection(section).getSection());
    };
    return sections;
};

const _createMenu = (sections) => {
    const menu = document.createElement("menu");
    menu.setAttribute("class", "sidebar-sections");
    appendChildren(menu, sections);
    return menu;
};

const _createAddProjectBtn = () => {
    const btnElements = [
        createPlusLightIcon(),
        Para("Add project").getPara(),
    ];
    const btnAttributes = {
        type: "button",
    };
    const btn = Button(btnAttributes).getBtn();
    appendChildren(btn, btnElements);
    return btn;
};

const _createNav = () => {
    const nav = document.createElement("nav");
    nav.setAttribute("class", "sidebar");
    return nav;
};

const createSidebar = () => {
    const sections = _createSections();
    const sidebarElements = [
        _createMenu(sections),
        _createAddProjectBtn(),
    ];
    const sidebar = _createNav();
    appendChildren(sidebar, sidebarElements);
    return sidebar;
};

export {
    createSidebar,
};