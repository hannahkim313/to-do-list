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

const capitalize = (str) => {
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    };
    
    return words.join(" ");
};

export {
    appendChildren,
    setAttributesOf,
    capitalize,
};