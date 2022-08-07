const Img = ({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    const get = () => img;
    return { get, };
};

export {
    Img,
};