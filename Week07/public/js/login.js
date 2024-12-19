const initializeLogin = () => {
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    fetchData(event);
  });
};

const fetchData = async (event) => {
  event.preventDefault();

  // Get the values from the form
  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  // Send the data to the server for login
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // If the response is not OK, throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();

      // If the response contains a token, store it in local storage and redirect to the home page
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      }
    }
  } catch (error) {
    console.error(`Error while trying to log in:" ${error}`);
  }
};

initializeLogin();
