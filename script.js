import { addJob, deleteJob, fetchJobs, showError } from "./functions.js";

const addJobBtn = document.getElementById("add-job-btn");
const modal = document.querySelector(".modal");
const closeModalBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");
const jobForm = document.getElementById("job-form");

addJobBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const jobTitle = document.getElementById("job-title");
  const company = document.getElementById("company");
  const location = document.getElementById("location");
  const status = document.getElementById("status");
  const date = document.getElementById("date");
  const salary = document.getElementById("salary");
  const notes = document.getElementById("notes");

  const feilds = document.querySelectorAll("[required]");

  for (const f of feilds) {
    if (!f.value || f.value.trim() === "") {
      return showError(f, `${f.id} is required`);
    }
  }
  addJob(
    jobTitle.value,
    company.value,
    location.value,
    status.value,
    date.value,
    salary.value,
    notes.value,
  );
});
let allJobs = fetchJobs();
let searchInput = document.getElementById("search");
let searchTerm = "";
searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  searchTerm = e.target.value;
  fetchJobs(searchTerm);
});

console.log(searchTerm);

const applicationsContainer = document.getElementById("applications");
const emptyState = document.querySelector(".empty-state");
if (allJobs.length == 0) {
  emptyState.style.display = "block";
}

if (allJobs.length > 0) {
  allJobs.map((j) => {
    return (applicationsContainer.innerHTML += ` <div class="application-card">
              <div class="company-logo">${j.company.split("")[0]}</div>

              <div class="application-info">
                <h3>${j.title}</h3>

                <p>${j.company}</p>

                <span>
                  <i class="fa-solid fa-location-dot"></i>
                  ${j.location}
                </span>
              </div>

              <div class="application-date">
                <span>Applied</span>
                <strong>${j.date}</strong>
              </div>

              <span class="status ${j.status}"> ${j.status} </span>

              <div class="actions">
                <button class="view-btn">
                  <i class="fa-regular fa-eye"></i>
                </button>

                <button class="edit-btn">
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>

                <button class="delete-btn" >
                  <i class="fa-regular fa-trash-can" id=${j.id}></i>
                </button>
              </div>
            </div>`);
  });
}
const emptyAddBtn = document.querySelector(".empty-add-btn");
emptyAddBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

const deleteBtn = document.querySelector(".delete-btn");

deleteBtn.addEventListener("click", (e) => {
  deleteJob(e.target.id);
});
