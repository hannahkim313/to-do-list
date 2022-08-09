import { appendChildren } from "../../helper-functions/append-children";
import { Img } from "../elements/img";
import { Para } from "../elements/p";

const _createIcon = (attributes) => Img(attributes).getImg();

const _createName = (text) => Para(text).getPara();

const SidebarSection = (sectionInfo) => {
    const icon = _createIcon(sectionInfo.imgAttributes);
    const sectionName = _createName(sectionInfo.paraText.text);
    const section = document.createElement("li");
    appendChildren(section, icon, sectionName);
    const getSection = () => section;
    return { getSection };
};

export {
    SidebarSection,
};