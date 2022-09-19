const toggleCollapsible = (collapsible) => {
    collapsible.classList.toggle("expanded");
    const content = collapsible.nextElementSibling;
    if (window.getComputedStyle(content).getPropertyValue("max-height") === "0px") {
        content.style.maxHeight = "100%";
        content.style.opacity = "1";
        content.style.marginTop = "0";
    } else {
        content.style.maxHeight = "0";
        content.style.opacity = "0";
        content.style.marginTop = "-8px";
    };
};

export {
    toggleCollapsible,
};