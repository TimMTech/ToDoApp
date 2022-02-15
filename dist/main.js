/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/storage.js":
/*!********************************!*\
  !*** ./src/Modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Storage": () => (/* binding */ Storage)
/* harmony export */ });




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
}


/***/ }),

/***/ "./src/Modules/ui.js":
/*!***************************!*\
  !*** ./src/Modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/Modules/storage.js */ "./src/Modules/storage.js");




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
        const projects = _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjects();

        projects.forEach((project) => {
            UI.updateProjectList(project)
        })
    }
    static displayTasks() {
        const tasks = _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getTasks();

        tasks.forEach((task) => {
            UI.updateTaskList(task)
        })
    }

    static displayProjectTasks(projectName) {
        const projectsTasks = _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.getProjectTasks(projectName);

        projectsTasks.forEach((project) => {
            UI.updateProjectTaskList(project)
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
                _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.setProject(storedValue.value)

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
                _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.setTask(storedTaskValue.value)

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
                _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.setProjectTask(projectName.innerHTML, storedProjectTaskValue.value);
                
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

            _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.removeProject(project)
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
            <input type="date"></input>
        `


        taskList.appendChild(taskDiv);

        taskDiv.firstElementChild.addEventListener('click', (e) => {
            console.log('clicked')
        })
        taskDiv.lastElementChild.addEventListener('click', (e) => {

            _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.removeTask(task)
            UI.deleteTask(e.target);
        })
    }
    static deleteTask(element) {
        if (element.classList.contains('delete-task-item')) {
            element.parentElement.remove()
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
        `


        projectTaskList.appendChild(projectTaskDiv);

        projectTaskDiv.firstElementChild.addEventListener('click', (e) => {
            console.log('clicked');
        })

        projectTaskDiv.lastElementChild.addEventListener('click', (e) => {
            
            _src_Modules_storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.removeProjectTask(projectTitle, projectTask)
            UI.deleteProjectTask(e.target);
        })
    }
    static deleteProjectTask(element) {
        if (element.classList.contains('delete-project-task-item')) {
            element.parentElement.remove()
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



    



    /////////////////////Project Task UI and Form//////////////




}   

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/style.css */ "./src/style.css");
/* harmony import */ var _src_Modules_ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/Modules/ui.js */ "./src/Modules/ui.js");




document.addEventListener('DOMContentLoaded', _src_Modules_ui_js__WEBPACK_IMPORTED_MODULE_1__.UI.loadHomepage())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUEsWUFBWSx1RUFBa0I7QUFDOUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25EO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxZQUFZLDhFQUF5QjtBQUNyQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7Ozs7QUFJQTs7Ozs7QUFLQTs7Ozs7O1VDNVZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVCO0FBQ2dCOzs7QUFHdkMsOENBQThDLCtEQUFlLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvYXBwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL3RvZG9hcHAvLi9zcmMvTW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9hcHAvLi9zcmMvTW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2FwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgeyBTdG9yYWdlIH1cblxuXG5cbmNsYXNzIFN0b3JhZ2Uge1xuXG4gICAgLy8vLy8vLy8vLy8vUHJvamVjdCBTdG9yYWdlLy8vLy8vLy8vL1xuXG4gICAgc3RhdGljIHNldFByb2plY3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdHMoKTtcbiAgICAgICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3QtbmFtZScsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSlcbiAgICB9XG4gICAgc3RhdGljIGdldFByb2plY3RzKCkge1xuICAgICAgICBsZXQgcHJvamVjdDtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0LW5hbWUnKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvamVjdCA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvamVjdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3QtbmFtZScpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9qZWN0IFxuICAgIH1cbiAgICBzdGF0aWMgcmVtb3ZlUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gU3RvcmFnZS5nZXRQcm9qZWN0cygpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFByb2plY3RMaXN0ID0gcHJvamVjdExpc3QuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gcHJvamVjdClcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3QtbmFtZScsIEpTT04uc3RyaW5naWZ5KGZpbHRlcmVkUHJvamVjdExpc3QpKVxuICAgIH1cblxuICAgIC8vLy8vLy8vL1Rhc2tzIFN0b3JhZ2UvLy8vLy8vL1xuXG4gICAgc3RhdGljIHNldFRhc2sodGFzaykge1xuICAgICAgICBjb25zdCB0YXNrTGlzdCA9IFN0b3JhZ2UuZ2V0VGFza3MoKTtcbiAgICAgICAgdGFza0xpc3QucHVzaCh0YXNrKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2stbmFtZScsIEpTT04uc3RyaW5naWZ5KHRhc2tMaXN0KSlcblxuICAgIH1cbiAgICBzdGF0aWMgZ2V0VGFza3MoKSB7XG4gICAgICAgIGxldCB0YXNrO1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2stbmFtZScpID09PSBudWxsKSB7XG4gICAgICAgICAgICB0YXNrID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFzay1uYW1lJykpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuICAgIHN0YXRpYyByZW1vdmVUYXNrKHRhc2spIHtcbiAgICAgICAgY29uc3QgdGFza0xpc3QgPSBTdG9yYWdlLmdldFRhc2tzKCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVGFza0xpc3QgPSB0YXNrTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSB0YXNrKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2stbmFtZScsIEpTT04uc3RyaW5naWZ5KGZpbHRlcmVkVGFza0xpc3QpKVxuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy9Qcm9qZWN0IFRhc2tzIFN0b3JhZ2UvLy8vLy8vL1xuXG4gICAgc3RhdGljIHNldFByb2plY3RUYXNrKHByb2plY3ROYW1lLCBwcm9qZWN0VGFzaykge1xuICAgICAgICAvLy9maXggcHJvamVjdCB0YXNrIHN0b3JhZ2UgZnVuY3Rpb25cbiAgICAgICAgY29uc3QgcHJvamVjdE9iamVjdCA9IFN0b3JhZ2UuZ2V0UHJvamVjdFRhc2tzKHByb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdE9iamVjdC5wdXNoKHByb2plY3RUYXNrKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocHJvamVjdE5hbWUsIEpTT04uc3RyaW5naWZ5KHByb2plY3RPYmplY3QpKVxuICAgICAgICBcbiAgICB9XG4gICAgc3RhdGljIGdldFByb2plY3RUYXNrcyhwcm9qZWN0TmFtZSkge1xuICAgICAgICBsZXQgcHJvamVjdFRhc2s7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9qZWN0TmFtZSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHByb2plY3RUYXNrID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9qZWN0VGFzayA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocHJvamVjdE5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvamVjdFRhc2s7XG4gICAgfVxuICAgIHN0YXRpYyByZW1vdmVQcm9qZWN0VGFzayhwcm9qZWN0TmFtZSwgcHJvamVjdFRhc2spIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRhc2tMaXN0ID0gU3RvcmFnZS5nZXRQcm9qZWN0VGFza3MocHJvamVjdE5hbWUpO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFByb2plY3RUYXNrTGlzdCA9IHByb2plY3RUYXNrTGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBwcm9qZWN0VGFzayk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHByb2plY3ROYW1lLCBKU09OLnN0cmluZ2lmeShmaWx0ZXJlZFByb2plY3RUYXNrTGlzdCkpXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy9zcmMvTW9kdWxlcy9zdG9yYWdlLmpzJ1xuXG5leHBvcnQgeyBVSSB9XG5cbmNsYXNzIFVJIHtcblxuICAgICAgICAgICAgICAgIC8vT24gUmVmcmVzaCBVSS8vXG4gICAgc3RhdGljIGxvYWRIb21lcGFnZSgpIHtcbiAgICAgICAgVUkubGVmdFVwcGVyUGFuZWxCdXR0b25zKClcbiAgICAgICAgVUkubGVmdExvd2VyUGFuZWxCdXR0b25zKClcbiAgICAgICAgVUkub3BlbkluYm94VGFza3MoKVxuICAgICAgICBVSS5kaXNwbGF5UHJvamVjdHMoKVxuICAgICAgICBVSS5kaXNwbGF5VGFza3MoKVxuXG4gICAgICAgICAgICAgICAgLy9Mb2NhbCBTdG9yYWdlIERpc3BsYXkvL1xuICAgIH1cbiAgICBzdGF0aWMgZGlzcGxheVByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IFN0b3JhZ2UuZ2V0UHJvamVjdHMoKTtcblxuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBVSS51cGRhdGVQcm9qZWN0TGlzdChwcm9qZWN0KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBzdGF0aWMgZGlzcGxheVRhc2tzKCkge1xuICAgICAgICBjb25zdCB0YXNrcyA9IFN0b3JhZ2UuZ2V0VGFza3MoKTtcblxuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICBVSS51cGRhdGVUYXNrTGlzdCh0YXNrKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwbGF5UHJvamVjdFRhc2tzKHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RzVGFza3MgPSBTdG9yYWdlLmdldFByb2plY3RUYXNrcyhwcm9qZWN0TmFtZSk7XG5cbiAgICAgICAgcHJvamVjdHNUYXNrcy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBVSS51cGRhdGVQcm9qZWN0VGFza0xpc3QocHJvamVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vRHluYW1pYyBQcm9qZWN0IFJpZ2h0IFBhbmVsLy9cbiAgICBzdGF0aWMgc2V0UHJvamVjdFJpZ2h0UGFuZWwocHJvamVjdCkge1xuICAgICAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXBhbmVsJyk7XG4gICAgICAgIHJpZ2h0UGFuZWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGgxIGNsYXNzPVwib3BlbmVkLXByb2plY3QtdGl0bGVcIj4ke3Byb2plY3QuaW5uZXJIVE1MfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1hZGQtdGFzay1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicHJvamVjdC10YXNrLWxpc3RcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkLXByb2plY3QtdGFzay1pbmJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBsdXMtc2lnblwiPis8L2k+XG4gICAgICAgICAgICAgICAgICAgIEFkZCBUYXNrXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInByb2plY3QtdGFzay1mb3JtLWNvbnRhaW5lclwiIGhpZGRlbj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwicHJvamVjdC10YXNrLWlucHV0LXZhbHVlXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cInByb2plY3QtdGFzay1idXR0b24tY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiYWRkLXByb2plY3QtdGFzay1idXR0b25cIj5BZGQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJleGl0LXByb2plY3QtdGFzay1idXR0b25cIj5FeGl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LXRhc2staW5ib3gnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLnByb2plY3RUYXNrRm9ybSlcblxuXG4gICAgICAgIFVJLmRpc3BsYXlQcm9qZWN0VGFza3MocHJvamVjdC5pbm5lckhUTUwpXG4gICAgfVxuXG5cblxuXG4gICAgICAgICAgICAgICAgLy9EeW5hbWljIEluYm94IFJpZ2h0IFBhbmVsLy9cbiAgICBzdGF0aWMgb3BlbkluYm94VGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtcGFuZWwnKTtcbiAgICAgICAgcmlnaHRQYW5lbC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJvcHRpb24tdGl0bGVcIj5JbmJveDwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5ib3gtYWRkLXRhc2stY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRhc2stbGlzdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtdGFzay1pbmJveFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBsdXMtc2lnblwiPis8L2k+XG4gICAgICAgICAgICAgICAgICAgIEFkZCBUYXNrXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInRhc2stZm9ybS1jb250YWluZXJcIiBoaWRkZW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInRhc2staW5wdXQtdmFsdWVcIj48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwidGFzay1mb3JtLWJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJhZGQtdGFzay1idXR0b25cIj5BZGQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJleGl0LXRhc2stYnV0dG9uXCI+RXhpdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgIGBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWluYm94JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS50YXNrRm9ybSlcblxuICAgIH1cblxuXG4gICAgICAgICAgICAgICAgLy9EeW5hbWljIFRvZGF5IFJpZ2h0IFBhbmVsXG4gICAgc3RhdGljIG9wZW5Ub2RheVRhc2tzKCkge1xuICAgICAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXBhbmVsJyk7XG4gICAgICAgIHJpZ2h0UGFuZWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGgxIGNsYXNzPVwib3B0aW9uLXRpdGxlXCI+VG9kYXk8L2gxPlxuICAgICAgIGBcbiAgICB9XG5cblxuICAgICAgICAgICAgICAgIC8vRHluYW1pYyBXZWVrIFJpZ2h0IFBhbmVsXG4gICAgc3RhdGljIG9wZW5UaGlzV2Vla1Rhc2tzKCkge1xuICAgICAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXBhbmVsJyk7XG4gICAgICAgIHJpZ2h0UGFuZWwuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGgxIGNsYXNzPVwib3B0aW9uLXRpdGxlXCI+VGhpcyBXZWVrPC9oMT5cbiAgICAgICBgXG4gICAgfVxuXG5cbiAgICAgICAgICAgIC8vRHluYW1pYyBGb3Jtcy8ve1Byb2plY3RzLCBJbmJveCBhbmQgUHJvamVjdFRhc2tzfS8vXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUHJvamVjdCBGb3JtLy9cbiAgICBzdGF0aWMgcHJvamVjdEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgZXhpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdC1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBsZXQgc3RvcmVkVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXQtdmFsdWUnKVxuXG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcblxuICAgICAgICBhZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0b3JlZFZhbHVlLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgU3RvcmFnZS5zZXRQcm9qZWN0KHN0b3JlZFZhbHVlLnZhbHVlKVxuXG4gICAgICAgICAgICAgICAgVUkudXBkYXRlUHJvamVjdExpc3Qoc3RvcmVkVmFsdWUudmFsdWUpXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgICAgICAgICAgc3RvcmVkVmFsdWUudmFsdWUgPSAnJ1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZXhpdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgICAgc3RvcmVkVmFsdWUudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pXG4gICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9JbmJveCBUYXNrIEZvcm0vL1xuICAgIHN0YXRpYyB0YXNrRm9ybSgpIHtcbiAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBhZGRUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBleGl0VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0LXRhc2stYnV0dG9uJyk7XG4gICAgICAgIGxldCBzdG9yZWRUYXNrVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1pbnB1dC12YWx1ZScpXG5cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2staW5ib3gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIHRhc2tGb3JtLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcblxuICAgICAgICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHN0b3JlZFRhc2tWYWx1ZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2Uuc2V0VGFzayhzdG9yZWRUYXNrVmFsdWUudmFsdWUpXG5cbiAgICAgICAgICAgICAgICBVSS51cGRhdGVUYXNrTGlzdChzdG9yZWRUYXNrVmFsdWUudmFsdWUpXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2staW5ib3gnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgICAgICAgICAgc3RvcmVkVGFza1ZhbHVlLnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZXhpdFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2staW5ib3gnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgICAgICBzdG9yZWRUYXNrVmFsdWUudmFsdWUgPSAnJ1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH0pXG4gICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9Qcm9qZWN0IFRhc2sgRm9ybS8vXG4gICAgc3RhdGljIHByb2plY3RUYXNrRm9ybSgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3BlbmVkLXByb2plY3QtdGl0bGUnKVxuICAgICAgICBjb25zdCBwcm9qZWN0VGFza0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10YXNrLWZvcm0tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1wcm9qZWN0LXRhc2stYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGV4aXRQcm9qZWN0VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0LXByb2plY3QtdGFzay1idXR0b24nKTtcbiAgICAgICAgbGV0IHN0b3JlZFByb2plY3RUYXNrVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10YXNrLWlucHV0LXZhbHVlJyk7XG5cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtdGFzay1pbmJveCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHByb2plY3RUYXNrRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG5cbiAgICAgICAgYWRkUHJvamVjdFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RvcmVkUHJvamVjdFRhc2tWYWx1ZS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2Uuc2V0UHJvamVjdFRhc2socHJvamVjdE5hbWUuaW5uZXJIVE1MLCBzdG9yZWRQcm9qZWN0VGFza1ZhbHVlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBVSS51cGRhdGVQcm9qZWN0VGFza0xpc3Qoc3RvcmVkUHJvamVjdFRhc2tWYWx1ZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtdGFzay1pbmJveCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICAgICAgc3RvcmVkUHJvamVjdFRhc2tWYWx1ZS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRhc2stZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBleGl0UHJvamVjdFRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtdGFzay1pbmJveCcpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICBzdG9yZWRQcm9qZWN0VGFza1ZhbHVlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10YXNrLWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgICAgICAgICAvL1VwZGF0aW5nICYgRGVsZXRpbmcgRm9ybSBJbnB1dHMgVG8gTGlzdC8vXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUHJvamVjdCBMaXN0Ly8gICBcbiAgICBzdGF0aWMgdXBkYXRlUHJvamVjdExpc3QocHJvamVjdCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtLWNvbnRhaW5lcicpXG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgcHJvamVjdERpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJwcm9qZWN0LWl0ZW1cIj4ke3Byb2plY3R9PC9saT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtaXRlbVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgIGBcblxuXG4gICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cbiAgICAgICBcbiAgICAgICAgcHJvamVjdERpdi5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBVSS5zZXRQcm9qZWN0UmlnaHRQYW5lbChlLnRhcmdldCk7XG4gICAgICAgIH0pXG4gICAgICAgIHByb2plY3REaXYubGFzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cbiAgICAgICAgICAgIFN0b3JhZ2UucmVtb3ZlUHJvamVjdChwcm9qZWN0KVxuICAgICAgICAgICAgVUkuZGVsZXRlUHJvamVjdChlLnRhcmdldCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVQcm9qZWN0KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxldGUtaXRlbScpKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0LXBhbmVsJylcbiAgICAgICAgICAgICAgICAuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgICAgICAuaW5uZXJIVE1MICE9PSBlbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuXG4gICAgICAgICAgICAgICAgVUkub3BlbkluYm94VGFza3MoKSB8fCBVSS5kaXNwbGF5VGFza3MoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9JbmJveCBUYXNrIExpc3QvL1xuICAgIHN0YXRpYyB1cGRhdGVUYXNrTGlzdCh0YXNrKSB7XG4gICAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbGlzdCcpO1xuICAgICAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtLWNvbnRhaW5lcicpXG5cblxuICAgICAgICB0YXNrRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInByb2plY3QtaXRlbVwiPiR7dGFza308L2xpPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS10YXNrLWl0ZW1cIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiPjwvaW5wdXQ+XG4gICAgICAgIGBcblxuXG4gICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuXG4gICAgICAgIHRhc2tEaXYuZmlyc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKVxuICAgICAgICB9KVxuICAgICAgICB0YXNrRGl2Lmxhc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICBTdG9yYWdlLnJlbW92ZVRhc2sodGFzaylcbiAgICAgICAgICAgIFVJLmRlbGV0ZVRhc2soZS50YXJnZXQpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlVGFzayhlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2staXRlbScpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUHJvamVjdCBUYXNrIExpc3QvL1xuICAgIHN0YXRpYyB1cGRhdGVQcm9qZWN0VGFza0xpc3QocHJvamVjdFRhc2spIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRhc2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtdGFzay1saXN0Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RUYXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcGVuZWQtcHJvamVjdC10aXRsZScpLmlubmVySFRNTDtcbiAgICAgICAgcHJvamVjdFRhc2tEaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC10YXNrLWl0ZW0tY29udGFpbmVyJylcblxuXG4gICAgICAgIHByb2plY3RUYXNrRGl2LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInByb2plY3QtaXRlbVwiPiR7cHJvamVjdFRhc2t9PC9saT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtcHJvamVjdC10YXNrLWl0ZW1cIj48L2J1dHRvbj5cbiAgICAgICAgYFxuXG5cbiAgICAgICAgcHJvamVjdFRhc2tMaXN0LmFwcGVuZENoaWxkKHByb2plY3RUYXNrRGl2KTtcblxuICAgICAgICBwcm9qZWN0VGFza0Rpdi5maXJzdEVsZW1lbnRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHByb2plY3RUYXNrRGl2Lmxhc3RFbGVtZW50Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBTdG9yYWdlLnJlbW92ZVByb2plY3RUYXNrKHByb2plY3RUaXRsZSwgcHJvamVjdFRhc2spXG4gICAgICAgICAgICBVSS5kZWxldGVQcm9qZWN0VGFzayhlLnRhcmdldCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVQcm9qZWN0VGFzayhlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QtdGFzay1pdGVtJykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAvL0xlZnQgUGFuZWwgQnV0dG9uIEluaXRpYWxpemF0aW9uLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0xlZnQtVXBwZXIvL1xuICAgIHN0YXRpYyBsZWZ0VXBwZXJQYW5lbEJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IGluYm94QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluYm94LWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RheS1idXR0b24nKTtcbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhpcy13ZWVrLWJ1dHRvbicpO1xuICAgICAgICBpbmJveEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlnaHQtcGFuZWwnKS5pbm5lckhUTUwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgVUkub3BlbkluYm94VGFza3MoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBVSS5vcGVuSW5ib3hUYXNrcygpXG4gICAgICAgICAgICAgICAgVUkuZGlzcGxheVRhc2tzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuVG9kYXlUYXNrcylcbiAgICAgICAgdGhpc1dlZWtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSS5vcGVuVGhpc1dlZWtUYXNrcylcbiAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0xlZnQtTG93ZXIvL1xuICAgIHN0YXRpYyBsZWZ0TG93ZXJQYW5lbEJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXByb2plY3QnKTtcbiAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJLnByb2plY3RGb3JtKTtcbiAgICB9XG5cblxuXG4gICAgXG5cblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vUHJvamVjdCBUYXNrIFVJIGFuZCBGb3JtLy8vLy8vLy8vLy8vLy9cblxuXG5cblxufSAgICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcvc3JjL3N0eWxlLmNzcydcbmltcG9ydCB7IFVJIH0gZnJvbSAnL3NyYy9Nb2R1bGVzL3VpLmpzJ1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBVSS5sb2FkSG9tZXBhZ2UoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=