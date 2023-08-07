const _displayModal = (modal) => modal.showModal();

const _toggleBtnBackgroundColor = (btn) => btn.classList.toggle("active");

const _resetProgram = () => location.reload();

const _cancel = (modal) => modal.close();

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("reset")
    ) {
        const modal = document.querySelector(".reset-program.modal");
        _displayModal(modal);

        _toggleBtnBackgroundColor(e.target.closest("button"));
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("confirm-btn")
    ) {
        _resetProgram();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("cancel-btn")
    ) {
        const modal = document.querySelector(".reset-program.modal");
        _cancel(modal);

        const btn = document.querySelector(".active");
        _toggleBtnBackgroundColor(btn);
    };
};

const _events = {
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};