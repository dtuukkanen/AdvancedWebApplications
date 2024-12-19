const initializeRegister = () => {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
      fetchData(event);
    });
};

const fetchData = async (event) => {
  event.preventDefault();

  const formData = {
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      window.location.href = "/login.html";
    }
  } catch (error) {
    console.error(`Error while trying to register: ${error}`);
  }
};

initializeRegister();
