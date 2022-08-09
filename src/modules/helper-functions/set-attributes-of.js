const setAttributesOf = (el, attributes) => {
    for (const [key, value] of Object.entries(attributes)) {
        const attribute = key;
        el.setAttribute(attribute, value);
    };
};

export {
    setAttributesOf,
};