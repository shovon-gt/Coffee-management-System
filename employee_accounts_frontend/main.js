console.log("Hello")

// Handle registration form submission
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    // Validate input
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log(username, email, password);
  
    // Send request to server-side API
    fetch("http://127.0.0.1:8000/register_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Registration successful!");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Server error. Please try again later.");
      });
  });
  
  // Handle login form submission
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
  
    // Validate input
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    // Send request to server-side API
    fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful! Token: " + data.token);
          // Store token in local storage for later use
          localStorage.setItem("token", data.token);
        }
      })
      .catch(error => {
        console.error(error);
        alert("Server error. Please try again");
      })
  })