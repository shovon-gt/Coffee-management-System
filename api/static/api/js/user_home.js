// api url
// console.log(response);
var id = localStorage.id;
console.log(localStorage.id);
// console.log(id);
const api_url =
	`http://172.16.50.62:8000/singleuser/${id}/`;

// Defining async function
async function getapi(url) {
	
	// Storing response
	const response = await fetch(url);
	
	// Storing data in form of JSON
	var data = await response.json();
	// console.log(data);
	if (response) {
		hideloader();
	}
	show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
    
}
// Function to define innerHTML for HTML table
function show(data) {
	if (data.team==null){
		data.team = "N/A";
		console.log(data);
	}
    console.log('Dta', data.team);
    // alert(data.email)
    document.getElementById("name").innerHTML = data.username;
	document.getElementById("email").innerHTML = data.email;
	document.getElementById("team").innerHTML = `<b>Team Name:</b>` + data.team;
	document.getElementById("id").innerHTML = `<b>#ID: </b>` + data.id;
	document.getElementById("balance").innerHTML = "Balance: " + `<h4 class="balance"> ${data.balance}</h4>` ;

}

const handleLogout = () => {
	window.localStorage.clear();
	window.location.reload(true);
	window.location.replace(`http://192.168.56.1:8000/`);
  };