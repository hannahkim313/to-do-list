const Para = (text) => {
    const para = document.createElement("p");
    para.textContent = text;
    const getPara = () => para;
    return { getPara };
};

export {
    Para,
};