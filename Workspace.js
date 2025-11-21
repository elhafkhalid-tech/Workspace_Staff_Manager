// array global
const workers = getData();

// get buttons
const addNewWorker = document.getElementById("AddNewWorker");
const closeForm = document.getElementById("close");
const addExperience = document.getElementById("Add_experience");
const valider = document.getElementById("valider");

// get other elements
const container_unssigned_workers = document.getElementById(
  "container-unssigned-workers"
);
const all_workers = document.getElementById("all-workers");
const container_experiences = document.getElementById("container-experience");
const conference = document.getElementById("conference");
const reception = document.getElementById("reception");
const service = document.getElementById("service");
const security = document.getElementById("security");
const staff = document.getElementById("staff");
const vault = document.getElementById("vault");
const form = document.getElementById("container-form");
const photoUrl = document.getElementById("url-img");
const imgAddWorker = document.getElementById("img-add-worker");
const img_url = document.getElementById("img-url");

// inputs
const inputUrl = document.getElementById("url");
const inputName = document.getElementById("input-name");
const inputRole = document.getElementById("select-role");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");

setAsideFull();

DisplayAllWorkers();

function getData() {
  let workerData = localStorage.getItem("myLocal");
  return workerData ? JSON.parse(workerData) : [];
}

function setAsideFull() {
  workers.forEach((worker, index) => {
    createUnssigned(worker, index);
    const view = document.getElementById(index);
    view.addEventListener("click", () => {
      afficherView(worker);
    });
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
    <article class="article">
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
  container_unssigned_workers.appendChild(div);
}

// Create assigned worker
function createAssigned(room) {
  const div_assigned = document.createElement("div");
  room.innerHTML += `
    <div class="assigned-article">
      <article class="article">
        <img src="img/test.png" alt="Img" />
        <div>
          <p>nom</p>
          <span>role</span>
        </div>
      </article>
      <button>X</button>
    </div>
  `;
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
  container_experiences.append(div);
  const btnClose = div.querySelector(".close_experience button");
  btnClose.addEventListener("click", () => {
    div.remove();
  });
}

// Events
addNewWorker.addEventListener("click", () => {
  form.style.display = "block";
  inputUrl.value = "";
  img_url.src = "";
});

closeForm.addEventListener("click", () => {
  form.style.display = "none";
});

addExperience.addEventListener("click", () => {
  createExperience();
});

inputUrl.addEventListener("input", () => {
  img_url.src = inputUrl.value;
});

valider.addEventListener("click", () => {
  const name = inputName.value;
  const img = inputUrl.value;
  const role = inputRole.value;
  const email = inputEmail.value;
  const phone = inputPhone.value;
  // const id = Math.random();
  
  let experiences = [];
  const experience_form = document.querySelectorAll(".experience-form");
  
  experience_form.forEach(() => {
    const company = document.getElementById("company").value;
    const role_exp = document.getElementById("exp-role").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    experiences.push({ company, role_exp, from, to });
  });
  
  // let id = unique
  const worker = { id , img, name, role, email, phone, experiences };
  workers.push(worker);
  localStorage.setItem("myLocal", JSON.stringify(workers));
  
  if (img && name && role && email && phone)
    createUnssigned(worker, workers.length - 1);
  
  const view = document.getElementById(workers.length - 1);
  view.addEventListener("click", () => {
    afficherView(worker);
  });
  
  form.style.display = "none";
});

function fillContainerAllWorkers(worker, index) {
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
      <button class="move-btn" id="${index}" onclick = "test('${worker.id}')">move</button>
    </article>
  `;
  document.getElementById("btn-workers").addEventListener("click", () => {
    document.getElementById("all-workers").style.display = "none";
    location.reload();
  });
  document.getElementById("all-workers").appendChild(div);
}

function DisplayAllWorkers() {
  const btnsRooms = document.querySelectorAll(".header-assigned button");
  btnsRooms.forEach((btn) => {
    btn.addEventListener("click", () => {
      all_workers.style.display = "block";
      workers.forEach((worker, index) => {
        fillContainerAllWorkers(worker, index);
      });
    });
    
  });
}

function test(id)
{
   
}

