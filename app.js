// <---------- Storage Controller ---------->
const StorageCtrl = (() => {
	console.log("StorageCtrl");
})();
// <---------- Storage Controller ---------->

// <---------- Data Controller ---------->
const DataCtrl = (() => {
	//   Data Constructor
	const Data = function (id, taskname, duedate, taskdetails) {
		this.id = id;
		this.taskname = taskname;
		this.duedate = duedate;
		this.taskdetails = taskdetails;
	};

	//   Data Structure
	const Datastructure = {
		tasklist: [
			// {
			//   id: 0,
			//   taskname: "UI Design For HSC",
			//   duedate: "02/19/2020",
			//   taskdetails:
			//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos.",
			// },
			// {
			//   id: 1,
			//   taskname: "Honest Greens Homepage Development",
			//   duedate: "02/18/2020",
			//   taskdetails:
			//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos.",
			// },
			// {
			//   id: 2,
			//   taskname: "Honest Greens Aboutpage Development",
			//   duedate: "02/20/2020",
			//   taskdetails:
			//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos.",
			// },
		],
		currentTask: null,
		totalTasks: 0,
		totalCompletedTasks: 0,
		totalOverDueTask: 0,
		deletedTasks: 0,
	};

	//   Return Convert Private Data Into The Public Mode
	return {
		//Get Task Items
		getTaskItems: () => {
			return Datastructure.tasklist;
		},
		// Add New Task Data
		addingNewTask: (taskname, duedate, taskdetails) => {
			let NewID;
			if (Datastructure.tasklist.length > 0) {
				NewID =
					Datastructure.tasklist[Datastructure.tasklist.length - 1].id + 1;
			} else {
				NewID = 0;
			}

			//   Creating a New Task
			newTask = new Data(NewID, taskname, duedate, taskdetails);

			//   Add New Task Into The Item Array
			Datastructure.tasklist.push(newTask);

			return newTask;
		},
		// Get Task By ID
		getTaskByID: (progressTaskID) => {
			let taskfound = null;
			Datastructure.tasklist.forEach((task) => {
				if (task.id === progressTaskID) {
					taskfound = task;
				}
			});
			return taskfound;
		},
		//Get Total Task Count
		//Update Task
		updateTask: (taskname, duedate, taskdetails) => {
			let taskfound = null;

			Datastructure.tasklist.forEach((task) => {
				if (task.id === Datastructure.currentTask.id) {
					task.taskname = taskname;
					task.duedate = duedate;
					task.taskdetails = taskdetails;
					taskfound = task;
				}
			});

			return taskfound;
		},
		getTotalTaskCount: () => {
			let ttotal = 0;

			Datastructure.tasklist.forEach((task) => {
				ttotal += 1;
			});

			Data.totalTasks = ttotal;

			return Data.totalTasks;
		},
		//Set Current Task
		setCurrentTask: (task) => {
			Datastructure.currentTask = task;
		},
		//Get Current Task
		getCurrentTask: () => {
			return Datastructure.currentTask;
			// console.log(Datastructure.currentTask);
		},
		logData: () => {
			return Datastructure;
		},
	};
})();
// <---------- Data Controller ---------->

// <---------- UI Controller ---------->
const UICtrl = (() => {
	//  Selecting Elements From The UI
	const UiSelectors = {
		inprogresstasklist: document.querySelector("#tasklistcontainerinprogress"),
		inprogresstasklistitems: document.querySelectorAll(
			"#tasklistcontainerinprogress li"
		),
		inprogresstaskerros: document.querySelector("#inprogresstaskerros"),
		addnewtaskbtn: document.querySelector("#addTaskBtn"),
		updatetaskbtn: document.querySelector("#updateTaskBtn"),
		deletetaskbtn: document.querySelector("#deleteTaskBtn"),
		backbtn: document.querySelector("#backBtn"),
		tasknameinput: document.querySelector("#taskNameInputField"),
		taskduedateinput: document.querySelector("#dueDateInputField"),
		taskdescriptioninput: document.querySelector("#taskDescriptionInputField"),
		totaltaskcount: document.getElementById("totaltaskcount"),
		edistaecontainer: document.getElementById("editstatecontainer"),
		addstatecontainer: document.getElementById("addstatecontainer"),
		vieweventmodal: document.querySelector(".modal"),
	};

	//   Public Methods
	return {
		// Populate In Porgress Taks List
		populateProgressTaskLsit: (taskListsitems) => {
			let htmlDom = "";

			taskListsitems.forEach((taskitem) => {
				htmlDom += `
        <li id="taskprogress-${taskitem.id}"
        class="list-group-item list-group-item-light d-flex justify-content-between align-items-center"
      >
        <a href="#" class="taskitemprogress col-1"
          ><i class="fas fa-square"></i
        ></a>
        <div class="text-left col-10">
          <a href="#" class="font-weight-bold text-dark text-decoration-none taskitemname">${taskitem.taskname}</a> | <sapn class="taskitemduedate font-italic">Due On ${taskitem.duedate}</sapn>
        </div>
        <a href="#" class="taskitemedit col-1"
          ><i class="fas fa-pencil-alt"></i
        ></a>
      </li>
        `;
			});

			//Insert Task List Item
			UiSelectors.inprogresstasklist.innerHTML = htmlDom;
		},
		// Get Data Input Form New Task
		getNewTaskInput: () => {
			return {
				taskname: UiSelectors.tasknameinput.value,
				duedate: UiSelectors.taskduedateinput.value,
				taskdetails: UiSelectors.taskdescriptioninput.value,
			};
		},
		//Add New Inprogrss Task List To UI
		addProgressTaskList: (newTask) => {
			//Show The In Progress Task List
			UiSelectors.inprogresstasklist.style.display = "block";
			UiSelectors.inprogresstaskerros.style.display = "none";

			const tasklistuiitem = document.createElement("li");

			tasklistuiitem.classList =
				"list-group-item list-group-item-light d-flex justify-content-between align-items-center";

			tasklistuiitem.id = `taskprogress-${newTask.id}`;

			tasklistuiitem.innerHTML = `
      <a href="#" class="taskitemprogress col-1"
          ><i class="fas fa-square"></i
        ></a>
        <div class="text-left col-10">
          <a href="#" class="font-weight-bold text-dark text-decoration-none taskitemname">${newTask.taskname}</a> | <sapn class="taskitemduedate font-italic">Due On ${newTask.duedate}</sapn>
        </div>
        <a href="#" class="taskitemedit col-1"
          ><i class="taskitemedit fas fa-pencil-alt"></i
        ></a>
      `;

			UiSelectors.inprogresstasklist.insertAdjacentElement(
				"beforeEnd",
				tasklistuiitem
			);
		},
		// Update the Task List
		updateProgressTaskList: (updateTaskDetails) => {
			let inprogressTaskList = document.querySelectorAll(
				"#tasklistcontainerinprogress li"
			);

      inprogressTaskList = Array.from(inprogressTaskList);
      
      inprogressTaskList.forEach((inprogressTask) => {
        
      });
		},
		// Clear UI Input Fileds
		clearTaskInput: () => {
			UiSelectors.tasknameinput.value = "";
			UiSelectors.taskduedateinput.value = "";
			UiSelectors.taskdescriptioninput.value = "";
		},
		//Add Task To Modal
		addTaskToModal: () => {
			UiSelectors.vieweventmodal.style.display = "block";
			UiSelectors.vieweventmodal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title tasknameview">${
							DataCtrl.getCurrentTask().taskname
						}</h5>
            <button type="button" class="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="taskdetailsview text-dark mb-2">${
							DataCtrl.getCurrentTask().taskdetails
						}</div>
            <div class="taskduedateview text-dark font-italic">Due On ${
							DataCtrl.getCurrentTask().duedate
						}</div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-block btn-primary updateTaskButton" id="${
							DataCtrl.getCurrentTask().id
						}">
              <i class="fas fa-edit"></i> Update Task
            </button>
          </div>
        </div>
      </div>
      `;
		},
		//Add Task To Update
		addTaskToUpdate: () => {
			UiSelectors.vieweventmodal.style.display = "none";
			UICtrl.showEditState();

			UiSelectors.tasknameinput.value = DataCtrl.getCurrentTask().taskname;
			UiSelectors.taskduedateinput.value = DataCtrl.getCurrentTask().duedate;
			UiSelectors.taskdescriptioninput.value = DataCtrl.getCurrentTask().taskdetails;
		},
		// No inprogress Tasks
		emptyinporgresstaskslist: () => {
			UiSelectors.inprogresstaskerros.style.display = "block";
			UiSelectors.inprogresstasklist.style.display = "none";
		},
		//Show Total Task Count
		showTotalTaskCount: (totalTaskscount) => {
			UiSelectors.totaltaskcount.textContent = totalTaskscount;
		},
		//Clear Edit State
		clearEditState: () => {
			UICtrl.clearTaskInput();
			UiSelectors.edistaecontainer.style.display = "none";
		},
		// Show Edit State
		showEditState: () => {
			UiSelectors.edistaecontainer.style.display = "block";
			UiSelectors.addstatecontainer.style.display = "none";
		},
		//Clear View Modal State
		clearModalState: () => {
			UiSelectors.vieweventmodal.style.display = "none";
		},
		//Get UI Selectors
		getUiSelectors: () => {
			return UiSelectors;
		},
	};
})();
// <---------- UI Controller ---------->

// <---------- AppF Controller ---------->
const AppCtrl = ((StorageCtrl, DataCtrl, UICtrl) => {
	//   Getting UI Selectors
	const UISelectors = UICtrl.getUiSelectors();

	//Loading Event Listners
	const loadingEvents = () => {
		//Add New Task Event
		UISelectors.addnewtaskbtn.addEventListener("click", addNewTaskSubmit);

		// View Icon Click Event Listner
		UISelectors.inprogresstasklist.addEventListener("click", viewTaskClick);

		//Close View Task Modal
		UISelectors.vieweventmodal.addEventListener("click", closeViewTaskModal);

		// Update Task Click Event Listner
		UISelectors.vieweventmodal.addEventListener("click", updateTaskClick);

		//Update Task Event
		UISelectors.updatetaskbtn.addEventListener("click", taskUpdateSubmit);

		//Disable The Submit on Enter
		document.addEventListener("keypress", (e) => {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});
	};

	//   Add New Task Submit
	const addNewTaskSubmit = (e) => {
		e.preventDefault();

		// Get New Task Input Form The UICtrl
		const newTaskInput = UICtrl.getNewTaskInput();

		// Task Input Form Validation
		if (newTaskInput.taskname == "") {
			UISelectors.tasknameinput.classList.add("is-invalid");
		} else if (newTaskInput.duedate == "") {
			UISelectors.taskduedateinput.classList.add("is-invalid");
			UISelectors.tasknameinput.classList.remove("is-invalid");
			UISelectors.tasknameinput.classList.add("is-valid");
		} else if (newTaskInput.taskdetails == "") {
			UISelectors.taskdescriptioninput.classList.add("is-invalid");
			UISelectors.taskduedateinput.classList.remove("is-invalid");
			UISelectors.taskduedateinput.classList.add("is-valid");
		} else {
			UISelectors.tasknameinput.className.replace("form-control");
			UISelectors.taskduedateinput.className.replace("form-control");
			UISelectors.taskdescriptioninput.className.replace("form-control");

			//   Add New Task
			const newTask = DataCtrl.addingNewTask(
				newTaskInput.taskname,
				newTaskInput.duedate,
				newTaskInput.taskdetails
			);

			//Add Tasks To The UI In Progress Task List
			UICtrl.addProgressTaskList(newTask);

			// Get The Total Task List
			const totalTaskscount = DataCtrl.getTotalTaskCount();

			// Add Total Task Count UI
			UICtrl.showTotalTaskCount(totalTaskscount);

			//Clear Input Fileds For the Form
			UICtrl.clearTaskInput();
		}
	};

	// View Task Click
	const viewTaskClick = (e) => {
		e.preventDefault();
		if (e.target.classList.contains("taskitemedit")) {
			//Get The ID of the task
			const taskListDomID = e.target.parentNode.parentNode.id;

			//Split the Dom id & get the task id
			const taskIDArray = taskListDomID.split("-");
			const progressTaskID = parseInt(taskIDArray[1]);

			const inprogressTasktoView = DataCtrl.getTaskByID(progressTaskID);

			//Set as Current Task
			DataCtrl.setCurrentTask(inprogressTasktoView);

			// Add Task To Modal
			UICtrl.addTaskToModal();
		}
	};

	//Close View Task Modal
	const closeViewTaskModal = (e) => {
		e.preventDefault();

		if (e.target.classList.contains("closeModal")) {
			UICtrl.clearModalState();
		}
	};

	//Update Task Click
	const updateTaskClick = (e) => {
		e.preventDefault();

		if (e.target.classList.contains("updateTaskButton")) {
			const taskID = e.target.id;
			// console.log(taskID);

			const inprogressTaskToUpdate = DataCtrl.getCurrentTask(taskID);

			//Set as Current Task
			DataCtrl.setCurrentTask(inprogressTaskToUpdate);

			UICtrl.addTaskToUpdate();
		}
	};

	// Task Update Submit Click
	const taskUpdateSubmit = (e) => {
		e.preventDefault();

		console.log("Update Item Button Clicked");

		//Get Task Input
		const taskUpdateInput = UICtrl.getNewTaskInput();

		//Update New Task
		const updateTaskDetails = DataCtrl.updateTask(
			taskUpdateInput.taskname,
			taskUpdateInput.duedate,
			taskUpdateInput.taskdetails
		);

		//Updating Updated Task in the UI
		UICtrl.updateProgressTaskList(updateTaskDetails);
	};

	// Public Methods
	return {
		init: () => {
			//Clear Edit State
			UICtrl.clearEditState();
			UICtrl.clearModalState();

			//   Fetch Tasks From Data Structure
			const taskListsitems = DataCtrl.getTaskItems();

			// Check if is there any Tasks
			if (taskListsitems.length === 0) {
				UICtrl.emptyinporgresstaskslist();
			} else {
				//   Populate Task In Progress List
				UICtrl.populateProgressTaskLsit(taskListsitems);
			}

			// Get The Total Task List
			const totalTaskscount = DataCtrl.getTotalTaskCount();

			// Add Total Task Count UI
			UICtrl.showTotalTaskCount(totalTaskscount);

			// Load Event Listners
			loadingEvents();
		},
	};
})(StorageCtrl, DataCtrl, UICtrl);
// <---------- AppF Controller ---------->

// Initializing The App
AppCtrl.init();
