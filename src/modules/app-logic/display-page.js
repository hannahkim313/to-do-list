const displayPage = (sidebarSection) => {
    const pageName = sidebarSection.getAttribute("class");
    const pages = document.querySelectorAll("body > main");
    for (const page of pages) {
        if (page.classList.contains(pageName)) page.style.display = "grid";
        else page.style.display = "none";
    };
};

export {
    displayPage,
};