const Img = () => {
    const img = document.createElement("img");
    const initialize = ({ src, alt }) => {
        img.src = src;
        img.alt = alt;
    };
    const setClass = (name) => img.setAttribute("class", name);
    const get = () => img;
    return { initialize, setClass, get };
};

export {
    Img
};