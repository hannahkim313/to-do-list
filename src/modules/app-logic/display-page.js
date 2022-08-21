const displayPage = (section) => {
    const pages = document.querySelectorAll("body > main");
    for (const page of pages) {
        if (page.id === `${section.getAttribute("class")}-page`) page.style.display = "grid";
        else page.style.display = "none";
    };
};

export {
    displayPage,
};