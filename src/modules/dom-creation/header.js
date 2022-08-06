import logoImg from "../../img/logo.svg";

const createHeader = () => {
    const logo = document.createElement("img");
    logo.setAttribute("class", "logo");
    logo.src = logoImg;
    logo.alt = "Bulleted list icon";

    const heading = document.createElement("h1");
    heading.textContent = "To-Do Manager";

    const header = document.createElement("header");
    header.append(logo, heading);

    return header;
};

export {
    createHeader,
}