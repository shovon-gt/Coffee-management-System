document.getElementById("register-form").addEventListener("submit", function(event){
    event.preventDefault();
    let username =document.getElementById("username").value;
    let email =document.getElementById("email").value;
    let password =document.getElementById("password1").value;
    let password2 =document.getElementById("password2").value;

    function hasWhiteSpace(username) {
      return username.indexOf(' ') >= 0;
    }
    let spacecheck = hasWhiteSpace(username);
    if (spacecheck) {
      alert("Your can't use whitespaces in Username");
      return;
    }


    if (password != password2 ) {
        alert("Your password didn't match");
        return;
      }
      
      fetch("http://172.16.50.62:8000/register_user/",{
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
        if(data.username[0]== "A user with that username already exists.") {
            alert(data.username[0]);
        }
        else{
            window.location.replace("http://172.16.50.62:8000/")
        }
    })
    .catch(error => {
        console.error(error);
        alert(error);
    });
})