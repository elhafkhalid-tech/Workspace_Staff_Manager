// array global
const workers = getData();
let selectedRoom = null;
// get other elements
const container_unssigned_workers = document.getElementById(
  "container-unssigned-workers"
);
const all_workers = document.getElementById("all-workers");
const conference = document.getElementById("conference");
const reception = document.getElementById("reception");
const service = document.getElementById("service");
const security = document.getElementById("security");
const staff = document.getElementById("staff");
const vault = document.getElementById("vault");
const form = document.getElementById("container-form");
const photoUrl = document.getElementById("url-img");
const imgAddWorker = document.getElementById("img-add-worker");

const inputUrl = document.getElementById("url");
let img_url = document.getElementById("img-url");

setAsideFull();

addListenerToBtnsRooms();

function getData() {
  let workerData = localStorage.getItem("myLocal");
  return workerData ? JSON.parse(workerData) : [];
}

function setAsideFull() {
  workers.forEach((worker, index) => {
    createUnssigned(worker, index);
    const view = document.getElementById(index);
    view.addEventListener('click',()=>{
       afficherView(worker);
    })
  });
}

// Show worker details
function afficherView(worker) {
  const container_details = document.getElementById("view-details");
  container_details.innerHTML = `
    <div id="buttonView" class = "buttonView">
      <button>X</button>
    </div>
    <div class="worker-modal">
      <img src="${worker.img}" class="worker-img">
      <div class="worker-info">
        <h2>${worker.name}</h2>
        <p><b>Role : </b>${worker.role}</p>
        <p><b>Email : </b>${worker.email}</p>
        <p><b>Phone : </b>${worker.phone}</p>
      </div>
    </div>
    <div id="exp-worker" ">
       
    </div>
  `;
  // console.log(worker.experiences);
  worker.experiences.forEach((ex) => {
    const exp_worker = document.getElementById("exp-worker");
    const div_each_experience = document.createElement("div");
    div_each_experience.classList = "exp-worker";
    div_each_experience.innerHTML += ` 
          <p> <b>company : </b> ${ex.company} </p> 
          <p> <b>role :</b> ${ex.role_exp} </p> 
          <p> <b>from : </b> ${ex.from} </p> 
          <p> <b>to : </b> : ${ex.to} </p>  
    `;
    exp_worker.append(div_each_experience);
  });

  container_details.style.display = "block";
  const buttonView = document.getElementById("buttonView");
  buttonView.addEventListener("click", () => {
    container_details.style.display = "none";
  });
}

// Create unassigned worker
function createUnssigned(worker, index) {
  const div = document.createElement("div");
  div.className = "unssigned-article";
  div.innerHTML = `
    <article class="article" >
      <div class="img-nom-role">
        <img id="img" src="${worker.img}" alt="Img" />
        <div>
          <p style="font-size: 14px;">${worker.name}</p>
          <span style="font-size: 12px;">${worker.role}</span>
        </div>
      </div>
      <button class="view-btn" id="${index}">view</button> 
    </article>
  `;
  container_unssigned_workers.append(div);
}

// Create experience
function createExperience() {
  const div = document.createElement("div");
  div.className = "experience-form";
  div.innerHTML = ` 
    <div class = "close_experience"> 
      <button>X</button>
    </div>
    <div class="modal">
      <label>Company</label>
      <input id="company" type="text" />
    </div>
    <div class="modal">
      <label>Role</label>
      <input id="exp-role" type="text" />
    </div>
    <div class="modal">
      <label>From</label>
      <input id="from" type="date" />
    </div>
    <div class="modal">
      <label>To</label>
      <input id="to" type="date" />
    </div>
    </br>
  `;
  document.getElementById("container-experience").append(div);
  const btnClose = div.querySelector(".close_experience button");
  btnClose.addEventListener("click", () => {
    div.remove();
  });
}

// Events
document.getElementById("AddNewWorker").addEventListener("click", () => {
  form.style.display = "block";
  inputUrl.value = "";
  img_url.src = "";
});

document.getElementById("close").addEventListener("click", () => {
  form.style.display = "none";
});

document.getElementById("Add_experience").addEventListener("click", () => {
  createExperience();
});

inputUrl.addEventListener("input", () => {
  img_url.src = inputUrl.value;
});

document.getElementById("valider").addEventListener("click", () => {
  const name = document.getElementById("input-name").value;
  const img = img_url.src;
  const role = document.getElementById("select-role").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const id = Math.random();

  let experiences = [];
  const experience_form = document.querySelectorAll(".experience-form");

  experience_form.forEach((ex) => {
    let company = ex.querySelector("#company").value;
    let role_exp = ex.querySelector("#exp-role").value;
    let from = ex.querySelector("#from").value;
    let to = ex.querySelector("#to").value;
    experiences.push({ company, role_exp, from, to });
    ex.remove();
  });

  const worker = { id, img, name, role, email, phone, experiences };

  if (img && name && role && email && phone) {
    workers.push(worker);
    // console.log(workers);
    localStorage.setItem("myLocal", JSON.stringify(workers));
    createUnssigned(worker, workers.length - 1);
  }
  
  const view = document.getElementById(workers.length - 1);
  //console.log(view);

  view.addEventListener("click", () => {
    afficherView(worker);
  });
  document.getElementById("form").reset();
  form.style.display = "none";
});

function fillContainerAllWorkers(workers) {
  document.getElementById("all-workers").innerHTML = ` <div class="btn-workers">
        <button id="btn-workers">X</button>
    </div> `;
  //functionFiltrage
  workers.forEach((worker) => {
    const div = document.createElement("div");
    div.className = "unssigned-article";
    div.innerHTML = `
    <article class="article">
      <div class="img-nom-role">
        <img id="img" src="${worker.img}" alt="Img" />
        <div>
          <p style="font-size: 14px;">${worker.name}</p>
          <span style="font-size: 12px;">${worker.role}</span>
        </div>
      </div>
      <button class="move-btn">move</button>
    </article>
  `;
    document.getElementById("all-workers").appendChild(div);
    
    const moveBtn = div.querySelector(".move-btn");
    moveBtn.addEventListener("click", () => {
      if (isAssigned(worker.role, selectedRoom)) {
        afectAssigned(worker, selectedRoom);
      } else {
        alert("this worker can not be assignd in this room");
      }
    });
  });
  document.getElementById("btn-workers").addEventListener("click", () => {
    document.getElementById("all-workers").style.display = "none";
  });
}

function addListenerToBtnsRooms() {
  const btnsRooms = document.querySelectorAll(".header-assigned button");
  btnsRooms.forEach((btn) => {
    btn.addEventListener("click", () => {
      all_workers.style.display = "block";
      selectedRoom = btn.parentElement.nextElementSibling.id;
      //console.log(selectedRoom);
      //console.log(workers);
      fillContainerAllWorkers(workers);
    });
  });
}

function isAssigned(role, room) {
  switch (room) {
    case "reception":
      return role === "Receptionist" || role === "Manager" || role === "Cleaning";
    case "servers":
      return role === "It" || role === "Manager" || role === "Cleaning";
    case "security":
      return role === "Security" || role === "Manager" || role === "Cleaning";
    case "vault":
      return role !== "Cleaning";
    default:
      return role === "Manager" || role === "Cleaning";
  }
}

function afectAssigned(worker, selectedRoom) {
  const room = document.getElementById(selectedRoom);

  const div = document.createElement("div");
  div.className = "assigned-article";

  div.innerHTML = `
    <article class="article">
      <img src="${worker.img}" alt="Img" />
      <div>
        <p>${worker.name}</p>
        <span>${worker.role}</span>
      </div>
    </article>
    <button class="remove-btn">X</button>
  `;

  room.appendChild(div);
}
