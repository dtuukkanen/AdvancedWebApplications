document.getElementById("logout").addEventListener("click", () => {
  logout();
});

// Check if there is token and login the user
const checkToken = async () => {
  const token = localStorage.getItem("token");

  // If there is no token, redirect to the login page
  if (!token) {
    window.location.href = "/login.html";
  }

  // Verify the token
  try {
    const response = await fetch("/api/private", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("message").textContent = data.message;
    } else {
      // If the token is invalid or expired
      localStorage.removeItem("token"); // Remove the token from local storage
      window.location.href = "/login.html"; // Redirect to the login page
    }
  } catch (error) {
    // If there is an error while trying to verify the token
    console.error(`Error while trying to verify token: ${error}`);
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
};

// Logout the user
const logout = () => {
  localStorage.removeItem("token"); // Remove the token from local storage
  window.location.href = "/login.html"; // Redirect to the login page
};

checkToken();
