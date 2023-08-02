import * as element from "../dom/html-elements";
import * as image from "../dom/image-elements";
import * as method from "../helper-functions";
import * as page from "../dom/page";

const _createGeneral = () => {
    const createHeading = () => element.createHeading("3", "General");

    const createResetOption = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        method.setAttributesOf(btn, btnAttributes);

        const elements = [
            image.createResetIcon(),
            element.createPara("Reset program"),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };

    const createSettingsWrapper = () => {
        const wrapperAttributes = {
            class: "settings-wrapper",
        };
        const settingsWrapper = element.createDiv(wrapperAttributes);

        const elements = [
            createResetOption(),
        ];
        method.appendChildren(settingsWrapper, elements);

        return settingsWrapper;
    };

    const wrapperAttributes = {
        class: "general-wrapper",
    };
    const generalWrapper = element.createArticle(wrapperAttributes);
    method.setAttributesOf(generalWrapper, wrapperAttributes);

    const elements = [
        createHeading(),
        createSettingsWrapper(),
    ];
    method.appendChildren(generalWrapper, elements);

    return generalWrapper;
};

const _createContentWrapper = () => {
    const wrapperAttributes = {
        class: "content-wrapper",
    };
    const contentWrapper = element.createDiv(wrapperAttributes);

    const elements = [
        _createGeneral(),
    ];
    method.appendChildren(contentWrapper, elements);

    return contentWrapper;
}

const create = () => {
    const elements = [
        element.createHeading("2", "Settings"),
        _createContentWrapper(),
    ];
    const settingsPage = page.create("settings", elements);
    settingsPage.style.display = "none";

    return settingsPage;
};

export {
    create,
};