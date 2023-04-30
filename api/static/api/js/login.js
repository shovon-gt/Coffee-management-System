const form = document.getElementById("login-form");
form.addEventListener("submit", validateLogin);

function validateLogin(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = { username, password};
    const baseUrl = 'http://172.16.50.62:8000'

    fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: { "X-CSRFToken": '{{csrf_token}}',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response=> response.json())
    .then(data => {
        if(data.message == "Welcome as admin." && data.data.role == "admin" ){
            window.location.href = `${baseUrl}/admin_homepage/`;
        }
        else if(data.message == "Welcome as user." && data.data.role == "user"){
            let id = localStorage.setItem("id", data.data.id);
            window.location.href = `${baseUrl}/user_homepage/`;
            console.log("Hello world")
        }
        else{
            alert("Wrong username or password.");
        }
    })
}