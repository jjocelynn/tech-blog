let id;

const clickBlog = async (event) => {
  event.preventDefault();
  id = event.currentTarget.id;
  console.log(id);

  document.querySelector(
    `.newComment${id}`
  ).innerHTML = ` <p class="px-3">New comment:</p>
    <form class="mt-0" id="content">
      <textarea id="comment${id}"></textarea>
      <button id= "submit${id}" type="submit">Submit</button>
    </form>`;

  document
    .querySelector(`#submit${id}`)
    .addEventListener("click", async (event) => {
      event.preventDefault();

      const comment = document.querySelector(`#comment${id}`).value.trim();
      if (comment) {
        const response = await fetch("/comment", {
          method: "POST",
          body: JSON.stringify({ id, comment }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          console.log("herllo " + response)
          document.location.replace("/");
        } else {
          console.log("not kay "+ response)
          document.location.replace("/login");
          alert(response.statusText);
          alert("You must login to make a comment")
        }
      }else {
        console.log("something else went wrong")
        alert("comment is empty")
      }
    });
};

document.querySelectorAll(".blogPost").forEach((post) => {
  post.addEventListener("click", clickBlog);
});
