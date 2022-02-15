export { Storage }



class Storage {

    ////////////Project Storage//////////

    static setProject(project) {
        const projectList = Storage.getProjects();
        projectList.push(project);
        localStorage.setItem('project-name', JSON.stringify(projectList))
    }
    static getProjects() {
        let project;
        if (localStorage.getItem('project-name') === null) {
            project = [];
        } else {
            project = JSON.parse(localStorage.getItem('project-name'))
        }
        return project 
    }
    static removeProject(project) {
        const projectList = Storage.getProjects();
        const filteredProjectList = projectList.filter(item => item !== project)
        localStorage.setItem('project-name', JSON.stringify(filteredProjectList))
    }

    

    /////////Tasks Storage////////

    static setTask(task) {
        const taskList = Storage.getTasks();
        taskList.push(task);
        localStorage.setItem('task-name', JSON.stringify(taskList))

    }
    static getTasks() {
        let task;
        if (localStorage.getItem('task-name') === null) {
            task = [];
        } else {
            task = JSON.parse(localStorage.getItem('task-name'))
        }
        return task;
    }
    static removeTask(task) {
        const taskList = Storage.getTasks();
        const filteredTaskList = taskList.filter(item => item !== task);
        localStorage.setItem('task-name', JSON.stringify(filteredTaskList))
    }

    static setDateTask(taskName, date) {
        const taskList = Storage.getTasks();
        taskList.find((task) => {
            if (task === taskName) {
                localStorage.setItem(taskName, JSON.stringify(date))
            }
        })   
    }

    static getDateTask(taskName) {
        let date;
        if (localStorage.getItem(taskName) === null) {
            date = [];
        } else {
            date = JSON.parse(localStorage.getItem(taskName))
        }
        return date;
    }


    /////////////Project Tasks Storage////////

    static setProjectTask(projectName, projectTask) {
        ///fix project task storage function
        const projectObject = Storage.getProjectTasks(projectName);
        projectObject.push(projectTask);
        localStorage.setItem(projectName, JSON.stringify(projectObject))
        
    }
    static getProjectTasks(projectName) {
        let projectTask;
        if (localStorage.getItem(projectName) === null) {
            projectTask = [];
        } else {
            projectTask = JSON.parse(localStorage.getItem(projectName));
        }
        return projectTask;
    }
    static removeProjectTask(projectName, projectTask) {
        const projectTaskList = Storage.getProjectTasks(projectName);
        const filteredProjectTaskList = projectTaskList.filter(item => item !== projectTask);
        localStorage.setItem(projectName, JSON.stringify(filteredProjectTaskList))
    }

    static setDateProjectTask(projectName, projectTask, date) {
        const projectTaskList = Storage.getProjectTasks(projectName);
        projectTaskList.find((task) => {
            if (task === projectTask) {
                localStorage.setItem(projectTask, JSON.stringify(date))   
            }
        })
    }

    static getDateProjectTask(projectTask) {
        let date;
        if (localStorage.getItem(projectTask === null)) {
            date = [];
        } else {
            date = JSON.parse(localStorage.getItem(projectTask))
        }
        return date;
    }
}
