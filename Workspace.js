
const workers = getData();
let selectedRoom = null;

const container_unssigned_workers = document.getElementById(
  "container-unssigned-workers"
);
const all_workers = document.getElementById("all-workers");
const form = document.getElementById("container-form");
const inputUrl = document.getElementById("url");
let img_url = document.getElementById("img-url");

setAsideFull();

addListenerToBtnsRooms();

printAffect(workers);

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

  //console.log(container_details);
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
  const img = inputUrl.value;
  const role = document.getElementById("select-role").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  let experiences = [];
  const experiences_form = document.querySelectorAll(".experience-form");

  experiences_form.forEach((ex) => {
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
  };

  if (img && name && role && email && phone) {
    // console.log(workers);
    createUnssigned(worker);
    workers.push(worker);
    localStorage.setItem("myLocal", JSON.stringify(workers));
  }

  const currentWorker = document.getElementById(worker.id);
  currentWorker.querySelector(".view-btn").addEventListener("click", () => {
    afficherView(worker);
  });

  document.getElementById("form").reset();
  form.style.display = "none";
});

function fillContainerAllWorkers(workers, selectedRoom, btn) {
  document.getElementById("all-workers").innerHTML = ` <div class="btn-workers">
        <button id="close-all-workers">X</button>
    </div> `;

  let filtered = workers.filter(
    (worker) => !worker.location && checkWorker(worker.role, selectedRoom)
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
    const room = document.getElementById(selectedRoom);
    moveBtn.addEventListener("click", () => {
      if (checkWorker(worker.role, selectedRoom) ) {
        if (
          room.childNodes.length < 3 ||
          (selectedRoom === "conference" && room.childNodes.length < 4)
        ) {
          afectWorker(worker, selectedRoom);
          div.remove();
          document.getElementById(`${worker.id}`).remove();
          worker.location = selectedRoom;
          localStorage.setItem("myLocal", JSON.stringify(workers));
        } else alert("Room is full");
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
      fillContainerAllWorkers(workers, selectedRoom, btn);
    });
  });
}

function checkWorker(role, selectedRoom) {
  switch (selectedRoom) {
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
      return true;
  }
}

function afectWorker(worker, selectedRoom) {
  worker.location = selectedRoom;
  printAffect(workers);
}

function printAffect(workers) {
  const rooms = document.querySelectorAll(".container-w");
  rooms.forEach((room) => {
    //room.children[1].innerHTML = "";
    let filtered = workers.filter(
      (worker) => worker.location == room.children[1].id
    );
    filtered.forEach((worker) => {
      let div = document.createElement("div");
      div.className = "assigned-article ";
      div.innerHTML = `
    <article class="article img-nom-role">
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

// function printAffect(workers) {
//   const rooms = document.querySelectorAll(".container-w");
//   rooms.forEach((room) => {
//     let filtered = workers.filter((worker) => {
//       worker.location === room.children[1].id;
//     });
//     filtered.forEach((worker) => {
//       let div = createElement("div");
//       div.className = "unssigned-article";
//       div.innerHTML = `
//     <article class="article" >
//       <div class="img-nom-role">
//         <img id="img" src="${worker.img}" alt="Img" />
//         <div>
//           <p style="font-size: 14px;">${worker.name}</p>
//           <span style="font-size: 12px;">${worker.role}</span>
//         </div>
//       </div>
//       <button id="${worker.id}" class="return-to-aside">X</button> 
//     </article>
//   `;
//     room.children[1].appendChild(div);
//     const btnToAside = div.querySelector('.return-to-aside');
//     btnToAside.addEventListener(('click'),()=>{
//       div.remove();
//       let foundIndex = workers.findIndex((worker)=>{
//         worker.id = btnToAside.id;
//       })
//       workers[foundIndex].location = null;
//       localStorage.setItem('myLocal',JSON.stringify(workers));
//       setAsideFull();
//     })
//     });
//   });
// }

// function checkExist(role, selectedRoom) {
//   let bool = true;
//   const room = document.getElementById(selectedRoom);
//   room.childNodes.forEach((child) => {
//     let myRole = child.children[0].children[1].children[1].textContent;
//     if (role == myRole) {
//       bool = false;
//       return bool;
//     }
//   });
//   return bool;
// }
