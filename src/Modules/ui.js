import { Storage } from '/src/Modules/storage.js'
import { format, compareASC } from 'date-fns'
import _, { set } from 'lodash'
import { da } from 'date-fns/locale'

export { UI }

class UI {

                //On Refresh UI//
    static loadHomepage() {
        UI.leftUpperPanelButtons()
        UI.leftLowerPanelButtons()
        UI.openInboxTasks()
        UI.displayProjects()
        UI.displayTasks()
        
        
        
                //Local Storage Display//
    }
    static displayProjects() {
        const projects = Storage.getProjects();

        projects.forEach((project) => {
            UI.updateProjectList(project)      
        })
    }
    static displayTasks() {
        const tasks = Storage.getTasks();
        
        tasks.forEach((task) => {  
            UI.updateTaskList(task)
            UI.updateDates(Storage.getDateTask(task))
        })
    }

    static displayProjectTasks(projectName) {
        const projectsTasks = Storage.getProjectTasks(projectName);

        projectsTasks.forEach((project) => {
            UI.updateProjectTaskList(project)
            UI.updateProjectDates(Storage.getDateProjectTask(project))
        })
        
    }



  
                  //Dynamic Project Right Panel//
    static setProjectRightPanel(project) {
        
        const rightPanel = document.getElementById('right-panel');
        rightPanel.innerHTML = `
            <h1 class="opened-project-title">${project.innerHTML}</h1>
            <div class="project-add-task-container">
                <div id="project-task-list"></div>
                <button class="add-project-task-inbox">
                    <i class="plus-sign">+</i>
                    Add Task
                </button>
                <div id="project-task-form-container" hidden>
                    <input id="project-task-input-value"></input>
                    <div id="project-task-button-container">
                        <button id="add-project-task-button">Add</button>
                        <button id="exit-project-task-button">Exit</button>
                    </div>
                </div>
            </div>
        `
        document.querySelector('.add-project-task-inbox').addEventListener('click', UI.projectTaskForm)
        UI.displayProjectTasks(project.innerHTML)
    }

                //Dynamic Inbox Right Panel//
    static openInboxTasks() {
        const rightPanel = document.getElementById('right-panel');
        rightPanel.innerHTML = `
            <h1 class="option-title">Inbox</h1>
            <div class="inbox-add-task-container">
                <div id="task-list"></div>
                <button class="add-task-inbox">
                    <i class="plus-sign">+</i>
                    Add Task
                </button>
                <div id="task-form-container" hidden>
                    <input id="task-input-value"></input>
                    <div id="task-form-button-container">
                        <button id="add-task-button">Add</button>
                        <button id="exit-task-button">Exit</button>
                    </div>
                </div>
            </div>
       `
        document.querySelector('.add-task-inbox').addEventListener('click', UI.taskForm)
    }

                //Dynamic Today Right Panel
    static openTodayTasks() {
        const rightPanel = document.getElementById('right-panel');
        rightPanel.innerHTML = `
            <h1 class="option-title">Today</h1>
       `
    }

                //Dynamic Week Right Panel
    static openThisWeekTasks() {
        const rightPanel = document.getElementById('right-panel');
        rightPanel.innerHTML = `
            <h1 class="option-title">This Week</h1>
       `
    }


            //Dynamic Forms//{Projects, Inbox and ProjectTasks}//
                        
                        //Project Form//
    static projectForm() {
        const form = document.getElementById('form-container');
        const addProject = document.getElementById('add-project-button');
        const exitForm = document.getElementById('exit-project-button');
        let storedValue = document.getElementById('input-value')


        document.getElementById('add-project').style.display = 'none'
        form.style.display = 'flex'

        addProject.addEventListener('click', () => {
            if (storedValue.value === '') {
                return;
            } else {
                Storage.setProject(storedValue.value)

                UI.updateProjectList(storedValue.value)

                document.getElementById('add-project').style.display = 'flex'
                storedValue.value = ''
                document.getElementById('form-container').style.display = 'none'
            }
        })
        exitForm.addEventListener('click', () => {
            document.getElementById('add-project').style.display = 'flex';
            storedValue.value = '';
            document.getElementById('form-container').style.display = 'none';
        })
    }
                        //Inbox Task Form//
    static taskForm() {
        const taskForm = document.getElementById('task-form-container');
        const addTask = document.getElementById('add-task-button');
        const exitTask = document.getElementById('exit-task-button');
        let storedTaskValue = document.getElementById('task-input-value')


        document.querySelector('.add-task-inbox').style.display = 'none'
        taskForm.style.display = 'flex'

        addTask.addEventListener('click', () => {
            if (storedTaskValue.value === '') {
                return;
            } else {
                Storage.setTask(storedTaskValue.value)

                UI.updateTaskList(storedTaskValue.value)

                document.querySelector('.add-task-inbox').style.display = 'flex'
                storedTaskValue.value = ''
                document.getElementById('task-form-container').style.display = 'none'
            }
        })
        exitTask.addEventListener('click', () => {
            document.querySelector('.add-task-inbox').style.display = 'flex'
            storedTaskValue.value = ''
            document.getElementById('task-form-container').style.display = 'none'
        })
    }
                        //Project Task Form//
    static projectTaskForm() {
        const projectName = document.querySelector('.opened-project-title')
        const projectTaskForm = document.getElementById('project-task-form-container');
        const addProjectTask = document.getElementById('add-project-task-button');
        const exitProjectTask = document.getElementById('exit-project-task-button');
        let storedProjectTaskValue = document.getElementById('project-task-input-value');


        document.querySelector('.add-project-task-inbox').style.display = 'none';
        projectTaskForm.style.display = 'flex'

        addProjectTask.addEventListener('click', () => {
            if (storedProjectTaskValue.value === '') {
                return;
            } else {
                Storage.setProjectTask(projectName.innerHTML, storedProjectTaskValue.value);
                
                UI.updateProjectTaskList(storedProjectTaskValue.value);

                document.querySelector('.add-project-task-inbox').style.display = 'flex';
                storedProjectTaskValue.value = '';
                document.getElementById('project-task-form-container').style.display = 'none';
            }
        })
        exitProjectTask.addEventListener('click', () => {
            document.querySelector('.add-project-task-inbox').style.display = 'flex';
            storedProjectTaskValue.value = '';
            document.getElementById('project-task-form-container').style.display = 'none';
        })
    }



            //Updating & Deleting Form Inputs To List//
                        
                        //Project List//   
    static updateProjectList(project) {
        const list = document.getElementById('project-list');
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item-container')
   

                
        projectDiv.innerHTML = `
            <li class="project-item">${project}</li>
            <button class="delete-item"></button>
        `

        list.appendChild(projectDiv);

        projectDiv.firstElementChild.addEventListener('click', (e) => {
            UI.setProjectRightPanel(e.target);
        })
        projectDiv.lastElementChild.addEventListener('click', (e) => {

            Storage.removeProject(project)
            UI.deleteProject(e.target);
        })
    }
    static deleteProject(element) {
        if (element.classList.contains('delete-item')) {
            if (document.getElementById('right-panel')
                .firstElementChild
                .innerHTML !== element.parentElement.firstElementChild.innerHTML) {
                element.parentElement.remove()
            } else {
                element.parentElement.remove()

                UI.openInboxTasks() || UI.displayTasks()
            }
        }
    }
                        //Inbox Task List//
    static updateTaskList(task) {
        const taskList = document.getElementById('task-list');
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item-container')


        taskDiv.innerHTML = `
            <li class="project-item">${task}</li>
            <button class="delete-task-item"></button>
            <input class="set-date" type="date"></input>
        `


        taskList.appendChild(taskDiv);

        taskDiv.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', (e) => {
            console.log('clicked')
        })
        taskDiv.firstElementChild.nextElementSibling.addEventListener('click', (e) => {

            Storage.removeTask(task)
            UI.deleteTask(e.target);
        })
        UI.taskDateButtons()
        
    }
    static deleteTask(element) {
        if (element.classList.contains('delete-task-item')) {
            element.parentElement.remove()
        }
    }
    static updateDates(date) {
        const setDate = document.querySelector('.set-date')
        const dates = document.createElement('p')
        const taskList = document.getElementById('task-list')
        dates.classList.add('active-dates')
        dates.innerHTML = `${date}`
        setDate.replaceWith(dates)
        
        if (taskList.lastElementChild.lastElementChild.innerHTML === '') {
            dates.replaceWith(setDate)
        }       
    }

    
                        //Project Task List//
    static updateProjectTaskList(projectTask) {
        const projectTaskList = document.getElementById('project-task-list');
        const projectTaskDiv = document.createElement('div');
        const projectTitle = document.querySelector('.opened-project-title').innerHTML;
        projectTaskDiv.classList.add('project-task-item-container')


        projectTaskDiv.innerHTML = `
            <li class="project-item">${projectTask}</li>
            <button class="delete-project-task-item"></button>
            <input class="set-date" type="date"></input>
        `


        projectTaskList.appendChild(projectTaskDiv);

        projectTaskDiv.firstElementChild.nextElementSibling.nextElementSibling.addEventListener('click', (e) => {
            console.log('clicked')
        })

        projectTaskDiv.firstElementChild.nextElementSibling.addEventListener('click', (e) => {
            
            Storage.removeProjectTask(projectTitle, projectTask)
            UI.deleteProjectTask(e.target);
        })
        UI.projectTaskDateButtons()
        
        
    }
    static deleteProjectTask(element) {
        if (element.classList.contains('delete-project-task-item')) {
            element.parentElement.remove()
        }
    }
    static updateProjectDates(date) {
        const setDate = document.querySelector('.set-date')
        const dates = document.createElement('p')
        dates.classList.add('active-dates')
        dates.innerHTML = `${date}`
        setDate.replaceWith(dates)
        if (dates.innerHTML === "null") {
            dates.replaceWith(setDate)
        }
    }

                    //Left Panel Button Initialization//
                            //Left-Upper//
    static leftUpperPanelButtons() {
        const inboxButton = document.querySelector('.inbox-button');
        const todayButton = document.querySelector('.today-button');
        const thisWeekButton = document.querySelector('.this-week-button');
        inboxButton.addEventListener('click', () => {
            if (document.getElementById('right-panel').innerHTML === '') {
                UI.openInboxTasks()
            } else {
                UI.openInboxTasks()
                UI.displayTasks()
            }
        })
        todayButton.addEventListener('click', UI.openTodayTasks)
        thisWeekButton.addEventListener('click', UI.openThisWeekTasks)
    }

                            //Left-Lower//
    static leftLowerPanelButtons() {
        const addProjectButton = document.getElementById('add-project');
        addProjectButton.addEventListener('click', UI.projectForm);
    }

                        
                        //Date Initialization//
    static taskDateButtons() {
        const setDates = document.querySelectorAll('.set-date')
        setDates.forEach((taskItem) => {
            taskItem.addEventListener('change', UI.setTaskDate)
        })
    }

    static projectTaskDateButtons() {
        const setDates = document.querySelectorAll('.set-date')
        setDates.forEach((projectTask) => {
            projectTask.addEventListener('change', UI.setProjectTaskDate)
        })
    }

    static setTaskDate(e) {
        const setDates = document.querySelector('.set-date')
        const setValue = format(new Date(e.target.value), 'MM/dd/yyyy')
        
        Storage.setDateTask(e.target.parentElement.firstElementChild.innerHTML, setValue)
        setDates.replaceWith(setValue)
    }

    static setProjectTaskDate(e) {
        const setDates = document.querySelector('.set-date')
        const setValue = format(new Date(e.target.value), 'MM/dd/yyyy')
        const projectTitle = document.querySelector('.opened-project-title')

        Storage.setDateProjectTask(projectTitle.innerHTML, e.target.parentElement.firstElementChild.innerHTML, setValue)
        setDates.replaceWith(setValue)
    }
}   