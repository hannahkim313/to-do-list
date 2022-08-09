import { appendChildren } from "../../helper-functions/append-children";
import { Img } from "../elements/img";
import { Para } from "../elements/para";
import { Button } from "../elements/button";

const _createIcon = (attributes) => Img(attributes).getImg();

const _createName = (text) => Para(text).getPara();

const _createSectionBtn = () => {
    const attributes = {
        type: "button",
    };
    const btn = Button(attributes).getBtn();
    return btn;
};

const SidebarSection = (sectionInfo) => {
    const icon = _createIcon(sectionInfo.imgAttributes);
    const sectionName = _createName(sectionInfo.paraText.text);
    const sectionBtn = _createSectionBtn();
    appendChildren(sectionBtn, icon, sectionName);
    const section = document.createElement("li");
    appendChildren(section, sectionBtn);
    const getSection = () => section;
    return { getSection };
};

export {
    SidebarSection,
};