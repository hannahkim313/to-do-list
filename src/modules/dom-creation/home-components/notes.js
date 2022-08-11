import { appendChildren } from "../../helper-functions/append-children";
import { setAttributesOf } from "../../helper-functions/set-attributes-of";
import { Heading } from "../elements/heading";
import { Article } from "../elements/article";

const _createTextArea = () => {
    const textArea = document.createElement("textarea");
    const attributes = {
        name: "user-notes",
        id: "user-notes",
        cols: "30",
        rows: "10"
    };
    setAttributesOf(textArea, attributes);
    return textArea;
};

const createNotesSection = () => {
    const attributes = {
        class: "notes"
    };
    const notesElements = [
        Heading("3", "Notes").getHeading(),
        _createTextArea()
    ];
    const notes = Article(attributes).getArticle();
    appendChildren(notes, notesElements);
    return notes;
};

export {
    createNotesSection,
};