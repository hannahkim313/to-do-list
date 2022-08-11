const Heading = (num, text) => {
    const heading = document.createElement(`h${num}`);
    heading.textContent = text;
    const getHeading = () => heading;
    return { getHeading };
}

export {
    Heading,
};