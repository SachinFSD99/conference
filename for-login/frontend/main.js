document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const conform_password = document.getElementById("conform_password").value;

  const obj = { name, email, password };
  console.log(obj);
  fetch("http://localhost:3500/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      alert(res.msg);
      window.location.href = "login.html";
    })
    .catch((err) => console.log(err));
});
