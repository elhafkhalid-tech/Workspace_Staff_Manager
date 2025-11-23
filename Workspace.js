// array global
const workers = getData();
let selectedRoom = null;
// get other elements
const container_unssigned_workers = document.getElementById(
  "container-unssigned-workers"
);
const all_workers = document.getElementById("all-workers");
const form = document.getElementById("container-form");
const photoUrl = document.getElementById("url-img");
const imgAddWorker = document.getElementById("img-add-worker");

const inputUrl = document.getElementById("url");
let img_url = document.getElementById("img-url");

setAsideFull();

addListenerToBtnsRooms();

aficherRooms(workers);

// function refrech() {
//   workers.forEach((worker) => {
//     worker.location = false;
//   });
// }

function getData() {
  let workerData = localStorage.getItem("myLocal");
  return workerData ? JSON.parse(workerData) : [];
}

function setAsideFull() {
  let filtered = workers.filter((worker) => !worker.location);
  filtered.forEach((worker) => {
    createUnssigned(worker);
    const view = document.getElementById(`${worker.id}`);
    view.querySelector(".view-btn").addEventListener("click", () => {
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
function createUnssigned(worker) {
  const div = document.createElement("div");
  div.className = "unssigned-article";
  div.id = `${worker.id}`;
  div.innerHTML = `
    <article class="article" >
      <div class="img-nom-role">
        <img id="img" src="${worker.img}" alt="Img" />
        <div>
          <p style="font-size: 14px;">${worker.name}</p>
          <span style="font-size: 12px;">${worker.role}</span>
        </div>
      </div>
      <button class="view-btn">view</button> 
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
  // if (workers.length >= 8) {
  //   document.getElementById("AddNewWorker").style.display = "none";
  //   return;
  // }
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

  const worker = {
    id: Date.now(),
    img,
    name,
    role,
    location: null,
    email,
    phone,
    experiences,
    // location: false,
  };

  if (img && name && role && email && phone) {
    // console.log(workers);
    workers.push(worker);
    createUnssigned(worker);
    localStorage.setItem("myLocal", JSON.stringify(workers));
  }

  const view = document.getElementById(`${worker.id}`);
  //console.log(view);

  view.querySelector(".view-btn").addEventListener("click", () => {
    afficherView(worker);
  });
  document.getElementById("form").reset();
  form.style.display = "none";
});

function fillContainerAllWorkers(workers, room) {
  document.getElementById("all-workers").innerHTML = ` <div class="btn-workers">
        <button id="close-all-workers">X</button>
    </div> `;
  //functionFiltrage
  let filtered = workers.filter(
    (worker) => !worker.location && checkWorker(worker.role, room)
  );
  filtered.forEach((worker) => {
    // if (worker.location) return;
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
      if (checkWorker(worker.role, selectedRoom)) {
        afectWorker(worker, selectedRoom);
        div.remove();
        document.getElementById(`${worker.id}`).remove();
        worker.location = selectedRoom;
        localStorage.setItem("myLocal", JSON.stringify(workers));
      }
    });
  });

  document.getElementById("close-all-workers").addEventListener("click", () => {
    document.getElementById("all-workers").style.display = "none";
  });
}

function addListenerToBtnsRooms() {
  const btnsRooms = document.querySelectorAll(".header-assigned button");
  btnsRooms.forEach((btn) => {
    btn.addEventListener("click", () => {
      all_workers.style.display = "block";
      selectedRoom = btn.parentElement.nextElementSibling.id;
      fillContainerAllWorkers(workers, selectedRoom);
    });
  });
}

function checkWorker(role, room) {
  switch (room) {
    case "reception":
      return (
        role === "Receptionist" || role === "Manager" || role === "Cleaning"
      );
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

function afectWorker(worker, selectedRoom) {
  worker.location = selectedRoom;
  aficherRooms(workers);
}

function aficherRooms(workers) {
  const rooms = document.querySelectorAll(".container-w");
  rooms.forEach((room) => {
    room.children[1].innerHTML = "";
    let filtered = workers.filter(
      (worker) => worker.location == room.children[1].id
    );
    filtered.forEach((worker) => {
      let div = document.createElement("div");
      div.className = "assigned-article";

      div.innerHTML = `
    <article class="article">
      <img src="${worker.img}" alt="Img" />
      <div>
        <p>${worker.name}</p>
        <span>${worker.role}</span>
      </div>
    </article>
    <button id="${worker.id}" class="return-to-unssigned">X</button>
  `;
      room.children[1].appendChild(div);
      const moveWorkerToAside = div.querySelector(".return-to-unssigned");
      moveWorkerToAside.addEventListener("click", () => {
        div.remove();
        let foundindex = workers.findIndex(
          (worker) => worker.id == moveWorkerToAside.id
        );
        workers[foundindex].location = null;
        localStorage.setItem("myLocal", JSON.stringify(workers));
        container_unssigned_workers.innerHTML = "";
        setAsideFull();
      });
    });
  });
}
