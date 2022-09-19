const display = (el) => {
    const elName = el.dataset.name;
    if (elName === "empty") return;
    const pages = document.querySelectorAll("body > main");
    for (const page of pages) {
        const pageName = page.dataset.name;
        if (elName === pageName) page.style.display = "grid";
        else page.style.display = "none";
    };
};

const addToDOM = (page) => {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    body.insertBefore(page, footer);
};

export {
    display,
    addToDOM,
};