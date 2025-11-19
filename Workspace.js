const workers = [];
const newWorker = {};
// get buttons
const addNewWorker = document.getElementById("AddNewWorker");
const closeForm = document.getElementById("close");
const addExperience = document.getElementById("Add_experience");
const valider = document.getElementById("valider");
const view = document.getElementById("view");
// get other elements
const container_unssigned_workers = document.getElementById(
  "container-unssigned-workers"
);
const container_experiences = document.getElementById("experience-container");
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
const inputCompany = document.getElementById("company");
const inputRoleExp = document.getElementById("exp-role");
const inputFrom = document.getElementById("from");
const inputTo = document.getElementById("to");

function AfficherViews() {}

function getNewWorker()
{
  const img = inputUrl.value;
  const name = inputName.value;
  const role = inputRole.value;
  const email = inputEmail.value;
  const phone = inputPhone.value;
  const company = inputCompany.value;
  const exp_role = inputRoleExp.value;
  const from = inputFrom.value;
  const to = inputTo.value;
    newWorker = {
    img,
    name,
    role,
    email,
    phone,
    company,
    exp_role,
    from,
    to,
  };
}

function createUnssigned(img, name, role) {
  const div_unssigned = document.createElement("div");
  container_unssigned_workers.innerHTML += ` <div class="unssigned-article">
            <article class="article">
              <div class="img-nom-role">
                <img id="img" src="${img}" alt="Img" />
                <div>
                  <p>${name}</p>
                  <span>${role}</span>
                </div>
              </div>
              <button id="view">view</button>
            </article>
          </div> `;
  // container_unssigned_workers.append(div_unssigned);
}

function createAssigned(room) {
  const div_assigned = document.createElement("div");
  room.innerHTML += `<div class="assigned-article">
                <article class="article">
                  <img src="img/test.png" alt="Img" />
                  <div>
                    <p>nom</p>
                    <span>role</span>
                  </div>
                </article>
                <button>X</button>
              </div>`;
}

function createExperience() {
  container_experiences.innerHTML += `
    <div class="modal">
      <label>Company</label>
      <input id="company" type="text"  />
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
}

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
  getNewWorker();
  workers.push(newWorker);
  if (name !== "" && img !== "" && role !== "") {
    createUnssigned(img, name, role);
  }
  form.style.display = "none";
});

view.addEventListener("click", () => {
  AfficherViews();
});
