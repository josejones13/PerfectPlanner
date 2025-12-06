const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const username = form.username.value;
  const password = form.password.value;

  if (password.length < 6) {
    e.preventDefault();
    alert("Password must be at least 6 characters.");
  }
});
//added this section for extra validation, but may remove as not neccesary