export const showError = (input, message) => {
  let elem = input.parentElement.querySelector(".error");
  elem.innerText = message;
};
export const addJob = (
  title,
  company,
  location,
  status,
  date,
  salary,
  notes = "",
) => {
  console.log(title, company, location, status, date, salary, notes);
  if (!title || !company || !location || !status || !date || !salary) {
    return console.log("All fields are required");
  }

  let id = Math.random().toString().split(".")[1];

  let allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let newJob = {
    id,
    title,
    company,
    location,
    status,
    date,
    salary,
    notes,
  };

  allJobs.push(newJob);
  localStorage.setItem("jobs", JSON.stringify(allJobs));
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

export const fetchJobs = (searchTerm, statusTerm, sortTerm) => {
  let allJobs = JSON.parse(localStorage.getItem("jobs")) || [];

  if (searchTerm) {
    allJobs = allJobs.filter((j) =>
      j.title.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
  }

  if (statusTerm) {
    allJobs = allJobs.filter((j) => j.status === statusTerm);
  }

  if (sortTerm === "newest") {
    allJobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sortTerm === "oldest") {
    allJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return allJobs;
};

export const deleteJob = (id) => {
  let allJobs = fetchJobs();
  let updatedJobs = allJobs.filter((j) => j.id != id);
  localStorage.setItem("jobs", JSON.stringify(updatedJobs));

  setTimeout(() => {
    window.location.reload();
  }, 500);
};
