const createHeading = () => {
    const heading = document.createElement("h1");
    heading.textContent = "To-Do Manager";
    return heading;
};

export {
    createHeading,
};