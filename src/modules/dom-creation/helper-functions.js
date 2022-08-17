const appendChildren = (parent, children) => {
    for (const child of children) {
        parent.appendChild(child);
    };
};

const setAttributesOf = (el, attributes) => {
    for (const [key, value] of Object.entries(attributes)) {
        const attribute = key;
        el.setAttribute(attribute, value);
    };
};

export {
    appendChildren,
    setAttributesOf
};