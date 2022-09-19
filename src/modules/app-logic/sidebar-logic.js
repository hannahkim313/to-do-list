import * as sidebar from "../dom-creation/elements/sidebar";

const addSubsection = (item, section) => {
    const content = document.querySelector(`.${section} + .content`);
    const firstItem = content.querySelector("li");
    if (firstItem.firstElementChild.dataset.name === "empty") firstItem.remove();
    const contentSection = sidebar.createCollapsibleContent(item);
    content.appendChild(contentSection);
};

export {
    addSubsection,
};