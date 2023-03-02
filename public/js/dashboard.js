// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector("#project-name").value.trim();
//   const needed_funding = document
//     .querySelector("#project-funding")
//     .value.trim();
//   const description = document.querySelector("#project-desc").value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: "POST",
//       body: JSON.stringify({ name, needed_funding, description }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to create project");
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/projects/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete project");
//     }
//   }
// };

const editButtonHandler = async (blogId) => {
  console.log(blogId);
  const response = await fetch(`api/dashboard/${blogId}`, {
    method: "GET",
  });
  if (response.ok) {
    document.location.replace("/updatePost");
  } else {
    alert("Failed retrieve blog");
  }
};

// document
//   .querySelector(".new-project-form")
//   .addEventListener("submit", newFormHandler);

// document
//   .querySelector(".project-list")
//   .addEventListener("click", delButtonHandler);

document.querySelectorAll(".blogHistory").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const blogId = event.target.id;
    editButtonHandler(blogId);
  });
});
