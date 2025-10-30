document.querySelector("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const message = document.getElementById("message");
  if (res.ok) {
    message.textContent = "✅ Registration successful!";
    message.style.color = "green";
    e.target.reset();
  } else {
    const errorText = await res.text();
    message.textContent = errorText;
    message.style.color = "red";
  }
});
