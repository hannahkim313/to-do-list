import { appendChildren } from "../../helper-functions/append-children";
import { Img } from "../elements/img";
import { Para } from "../elements/para";
import { Button } from "../elements/button";

const _createIcon = (attributes) => Img(attributes).getImg();

const _createName = (text) => Para(text).getPara();

const _createSectionBtn = (sectionInfo) => {
    const attributes = {
        type: "button",
    };
    const sectionBtn = Button(attributes).getBtn();
    const sectionBtnElements = [
        _createIcon(sectionInfo.imgAttributes),
        _createName(sectionInfo.paraText.text),
    ];
    appendChildren(sectionBtn, sectionBtnElements);
    return sectionBtn;
};

const SidebarSection = (sectionInfo) => {
    const sectionElements = [
        _createSectionBtn(sectionInfo),
    ];
    const section = document.createElement("li");
    appendChildren(section, sectionElements);
    const getSection = () => section;
    return { getSection };
};

export {
    SidebarSection,
};