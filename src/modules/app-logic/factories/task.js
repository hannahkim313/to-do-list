const Task = () => {
    let _title;
    let _description;
    let _dueDate;
    let _priority;
    let _overdue;
    let _checked;
    let _project;
    
    const getTitle = () => _title;
    
    const getDescription = () => _description;
    
    const getDueDate = () => _dueDate;
    
    const getPriority = () => _priority;
    
    const getOverdue = () => _overdue;
    
    const getChecked = () => _checked;
    
    const getProject = () => _project;
    
    const setTitle = (value) => _title = value;

    const setDescription = (value) => _description = value;

    const setDueDate = (value) => _dueDate = value;
    
    const setPriority = (value) => _priority = value;
    
    const setOverdue = (value) => _overdue = value;
    
    const setChecked = (value) => _checked = value;
    
    const setProject = (value) => _project = value;

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getOverdue,
        getChecked,
        getProject,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setOverdue,
        setChecked,
        setProject,
    };
};

export {
    Task,
};