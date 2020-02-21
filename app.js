// <---------- Storage Controller ---------->
const StorageCtrl = (() => {
  console.log("StorageCtrl");
})();
// <---------- Storage Controller ---------->

// <---------- Data Controller ---------->
const DataCtrl = (() => {
  //   Data Constructor
  const Data = function(id, taskname, duedate, taskdetails) {
    this.id = id;
    this.taskname = taskname;
    this.duedate = duedate;
    this.taskdetails = taskdetails;
  };

  //   Data Structure
  const Datastructure = {
    tasklist: [
      {
        id: 0,
        taskname: "UI Design For HSC",
        duedate: "02/19/2020",
        taskdetails:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos."
      },
      {
        id: 1,
        taskname: "Honest Greens Homepage Development",
        duedate: "02/18/2020",
        taskdetails:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos."
      },
      {
        id: 2,
        taskname: "Honest Greens Aboutpage Development",
        duedate: "02/20/2020",
        taskdetails:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla magnam doloribus maxime, quo culpa commodi minima tempore omnis voluptatibus quos."
      }
    ],
    currentTask: null,
    totalTasks: 0,
    totalCompletedTasks: 0,
    totalOverDueTask: 0,
    deletedTasks: 0
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
    logData: () => {
      return Datastructure;
    }
  };
})();
// <---------- Data Controller ---------->

// <---------- UI Controller ---------->
const UICtrl = (() => {
  //  Selecting Elements From The UI
  const UiSelectors = {
    inprogresstasklist: document.querySelector("#tasklistcontainer"),
    addnewtaskbtn: document.querySelector("#addTaskBtn"),
    updatetaskbtn: document.querySelector("#updateTaskBtn"),
    deletetaskbtn: document.querySelector("#deleteTaskBtn"),
    backbtn: document.querySelector("#backBtn"),
    tasknameinput: document.querySelector("#taskNameInputField"),
    taskduedateinput: document.querySelector("#dueDateInputField"),
    taskdescriptioninput: document.querySelector("#taskDescriptionInputField")
  };

  //   Public Methods
  return {
    // Populate In Porgress Taks List
    populateProgressTaskLsit: taskListsitems => {
      let htmlDom = "";

      taskListsitems.forEach(taskitem => {
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
        taskdetails: UiSelectors.taskdescriptioninput.value
      };
    },
    //Add New Inprogrss Task List To UI
    addProgressTaskList: newTask => {
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
          ><i class="fas fa-pencil-alt"></i
        ></a>
      `;

      UiSelectors.inprogresstasklist.insertAdjacentElement(
        "beforeEnd",
        tasklistuiitem
      );
    },
    // Clear UI Input Fileds
    clearTaskInput: () => {
      UiSelectors.tasknameinput.value = "";
      UiSelectors.taskduedateinput.value = "";
      UiSelectors.taskdescriptioninput.value = "";
    },
    //Get UI Selectors
    getUiSelectors: () => {
      return UiSelectors;
    }
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
  };

  //   Add New Task Submit
  const addNewTaskSubmit = e => {
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

      //Clear Input Fileds For the Form
      UICtrl.clearTaskInput();
    }
  };

  // Public Methods
  return {
    init: () => {
      //   Fetch Tasks From Data Structure
      const taskListsitems = DataCtrl.getTaskItems();

      //   Populate Task In Progress List
      UICtrl.populateProgressTaskLsit(taskListsitems);

      // Load Event Listners
      loadingEvents();
    }
  };
})(StorageCtrl, DataCtrl, UICtrl);
// <---------- AppF Controller ---------->

// Initializing The App
AppCtrl.init();
