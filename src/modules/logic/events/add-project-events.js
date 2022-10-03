import * as modal from "../../dom/modals";

const _emitButtons = (e) => {
    const dialog = e.target.closest("dialog");
    const btn = e.target.closest("button");

    if (btn === null) {
        return;
    };

    if (btn.classList.contains("cancel-btn")) {
        modal.cancel(dialog);
    };

    if (btn.classList.contains("confirm-btn")) {
        const inputs = dialog.querySelectorAll("input");
        for (const input of inputs) {
            if (modal.isValid(input)) {
                modal.submit(dialog);
            } else {
                e.preventDefault();
                modal.displayInvalid(input);
            };
        };
    };
};

const _emitInputs = (e) => {
    const form = e.target.closest("form");

    if (form === null) return;

    const inputs = form.querySelectorAll("input");
    for (const input of inputs) {
        const borderColor = input.style.borderColor;
        
        input.addEventListener("focusin", () => {
            if (borderColor === "transparent") {
                input.style.borderColor = "var(--color-text-1)";
            };
        });
    
        input.addEventListener("focusout", () => {
            if (borderColor === "var(--color-text-1)") {
                input.style.borderColor = "transparent";
            };
        });
    };
};

const emitEvents = (e) => {
    _emitButtons(e);
    _emitInputs(e);
    
};

export {
    emitEvents,
};