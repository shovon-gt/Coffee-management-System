const modal = document.getElementById("modal");
const modalDelete = document.getElementById("modalDelete");
const paginationContainer = document.getElementById("pagination");
var myToastEl = document.getElementById('myToast')
var myToast = bootstrap.Toast.getInstance(myToastEl) // Returns a Bootstrap toast instance
// api url
const state = {
  data: [],
  pageNumber: 1,
  pageSize: 10,
  numberOfPages: 1,
};

const renderPagination = (pages) => {
    const pagesArray = [];
    for(let i = 0; i < pages; i++) {
        const item = `
        <li class="page-item" onclick="onPaginate(${i+1})">
            <span class="page-link"  tabindex="-1">${i+1}</span>
        </li>
        `
        pagesArray.push(item);
    }
    paginationContainer.innerHTML = pagesArray.join("");
}
const renderTable = (data) => {
  let tab = `<tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Team</th>
        <th>Balance</th>
        <th>Staff Status</th>
        <th>Action</th>
    </tr>`;

  // Loop to access all rows
  for (let r of data) {
    if (r.team == null) {
      r.team = "N/A";
    }
    if (r.is_staff == true) {
      r.is_staff = "Admin";
    } else {
      r.is_staff = "User";
    }
    tab += `<tr>
<td>${r.id} </td>
<td>${r.username}</td>
<td>${r.email}</td>
<td>${r.team}</td>	
<td>${r.balance}</td>	
<td>${r.is_staff}</td>
<td><button class="btn btn-warning editButton" onclick="handleEdit(${r.id})">Edit</button>
<button class="btn btn-danger " onclick="handleRemoveValue(${r.id})">-15</button>
<button class="btn btn-primary" onclick="handleDeleteModal(${r.id})">Delete</button></td>	
</tr>`;
  }

  // Setting innerHTML as tab variable
  document.getElementById("employees").innerHTML = tab;

  
};

const renderWithPages = (data, pageNumber, pageSize) => {
    const startCount = (pageNumber-1)*pageSize;
    const dataToShow = data.slice(startCount, startCount+pageSize);
    renderTable(dataToShow);
}
const init= (data)=>{
    state.data = data;
    const totalData = data.length;
    const numberOfPages = Math.ceil(totalData/state.pageSize);
    if (numberOfPages < state.pageNumber){
        state.pageNumber = numberOfPages;
    }
    state.numberOfPages = numberOfPages;
    
    renderWithPages(data, state.pageNumber, state.pageSize);
    renderPagination(numberOfPages);
}

const onPaginate = (pageNumber) => {
    state.pageNumber = pageNumber*1;
    renderWithPages(state.data, pageNumber, state.pageSize);
}

// const onChange = (data) => {
//     state.data = data;
//     const totalData = data.length;
//     const numberOfPages = Math.ceil(totalData/state.pageSize);
    
//     state.numberOfPages = numberOfPages;
//     renderWithPages(data, state.pageNumber, state.pageSize);
//     renderPagination(numberOfPages);
// }

// Defining async function
async function getapi() {
  // Storing response
  const response = await fetch("http://172.16.50.62:8000/userlist/");

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data.data.data.reverse());
  if (response) {
    hideloader();
  }
  init(data.data.data);
}
// Calling that async function
getapi();

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}
// Function to define innerHTML for HTML table
// function show(data) {
//   let tab = `<tr>
// 		    <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Team</th>
//             <th>Balance</th>
//             <th>Staff Status</th>
//             <th>Action</th>
// 		</tr>`;

//   // Loop to access all rows
//   for (let r of data.data.data) {
//     if (r.team == null) {
//       r.team = "N/A";
//     }
//     if (r.is_staff == true) {
//       r.is_staff = "Admin";
//     } else {
//       r.is_staff = "User";
//     }
//     tab += `<tr>
// 	<td>${r.id} </td>
// 	<td>${r.username}</td>
// 	<td>${r.email}</td>
// 	<td>${r.team}</td>	
//     <td>${r.balance}</td>	
//     <td>${r.is_staff}</td>
//     <td><button class="btn btn-warning editButton" onclick="handleEdit(${r.id})">Edit</button>
//     <button class="btn btn-danger " onclick="handleRemoveValue(${r.id})">-15</button>
//     <button class="btn btn-primary" onclick="handleDeleteModal(${r.id})">Delete</button></td>	
//     </tr>`;
//   }

//   // Setting innerHTML as tab variable
//   document.getElementById("employees").innerHTML = tab;

//   //pagination

//   $(document).ready(function () {
//     var totalRows = $("#employees").find("tbody tr:has(td)").length;
//     console.log("Rows=", totalRows);
//     var recordPerPage = 10;
//     var totalPages = Math.ceil(totalRows / recordPerPage);
//     var $pages = $('<div id="pages"></div>');
//     for (i = 0; i < totalPages; i++) {
//       $('<span class="pageNumber">&nbsp;' + (i + 1) + "</span>").appendTo(
//         $pages
//       );
//     }
//     $pages.appendTo("#employees");

//     $(".pageNumber").hover(
//       function () {
//         $(this).addClass("focus");
//       },
//       function () {
//         $(this).removeClass("focus");
//       }
//     );

//     $("table").find("tbody tr:has(td)").hide();
//     var tr = $("table tbody tr:has(td)");
//     for (var i = 0; i <= recordPerPage - 1; i++) {
//       $(tr[i]).show();
//     }
//     $("span").click(function (event) {
//       $("#employees").find("tbody tr:has(td)").hide();
//       var nBegin = ($(this).text() - 1) * recordPerPage;
//       var nEnd = $(this).text() * recordPerPage - 1;
//       for (var i = nBegin; i <= nEnd; i++) {
//         $(tr[i]).show();
//       }
//     });
//   });
// }

// Delete User by clicking delete button.
const handleRemoveUser = async (id) => {
  try {
    const response = await fetch(`http://172.16.50.62:8000/userdelete/${id}/`, {
      method: "DELETE",
    });
    await getapi();
  } catch (err) {
    alert("Error deleting");
  }
};
// const handleEdit = async(id)=>{
// 	console.log('ID', id)
// }
const handleRemoveValue = async (id) => {
  const response = await fetch(`http://172.16.50.62:8000/singleuser/${id}/`);
  const user = await response.json();
  console.log(user);
  try {
    const submitinfo = {
      username: user.username,
      email: user.email,
      team: user.team,
      balance: user.balance
        ? user.balance - 15
        : user.balance == 0
        ? user.balance - 15
        : user.balance - 15,
      is_staff: user.is_staff,
    };
    console.log(submitinfo);

    const response = await fetch(
      `http://172.16.50.62:8000/userupdate/${user.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(submitinfo),
      }
    );
    await getapi();
    myToast.show();
  } catch (e) {
    console.log("Error", e.message);
  }
};

const handleEdit = async (id) => {
  const response = await fetch(`http://172.16.50.62:8000/singleuser/${id}/`);
  const user = await response.json();
  console.log("Satff staus" + user.is_staff);

  if (user.team == null) {
    user.team = "N/A";
  }

  if (user.is_staff == true) {
    user.is_staff = "Admin";
  } else {
    user.is_staff = "User";
  }
  const formData = `  
    <div onclick="onModalClose()" class="backdrop">
    <div onclick="handleModalPress(event)" onpointerdown="handleModalPress(event)" class="my-4 m-4 px-4 py-4 card popup1" >
    <h1 class="mb-4 text-center">Edit User</h1>
        <form id="update UserForm" class="flex" onsubmit="editValue(event)">
            <div class="mb-4 input-item">
                <label for="name" class="form-label">Username</label>
                <input
                    required
                    name="username"
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    class="form-control"
                    value="${user.username}"
                />
            </div>
            <div class="mb-4 input-item">
                <label for="email" class="form-label">Email</label>
                <input
                    required
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    class="form-control"
                    value="${user.email}"
                />
            </div>
            

            <div class="mb-4 dropdown">
            <label for="team"  class="form-label padding">Team</label>
                <div class="dropdown-form">
                    <select [selected]=${user.team} id = "myList" name="team" onchange=favTutorial()" >
                    <option value="SED"> ${user.team} </option>
                    <option value="SED"> SED </option>
                    <option value="BCL"> BCL </option>
                    <option value="HR"> HR </option>
                    <option value="SALES"> SALES </option>
                    </select>
                </div>
                
            </div>
            <div class="mb-4 input-item">
                <label for="address" class="form-label">Balance</label>
                <input
                    required
                    name="balance"
                    type="text"
                    placeholder="Enter Balance"
                    id="address"
                    class="form-control"
                    value="${user.balance}"
                />
            </div>

            

            <div class="mb-4 dropdown">
            <label for="staff" id="staff" class="form-label padding">Staff Status</label>
                <div class="dropdown-form">
                    <select [selected]=${user.is_staff} id = "myList" name="is_staff" onchange=favTutorial()" >
                    <option>${user.is_staff}</option>
                    <option>User</option>
                    <option>Admin</option>
                    </select>
                </div>
                
            </div>


            
    
            <input type="hidden" name="id" value="${user.id}" />
    
            <div class="mt-4 p-4 button-group">
                <button type="submit" class="btn btn-danger btn-lg px-4 mr-4">
                    Submit
                </button>
                <button type="button" class="btn btn-warning btn-lg ml-4 px-4" onclick="onModalClose()"
                >
                    Cancel
                </button>
            </div>
    
        </form>
    </div>
    </div> `;

  modal.innerHTML = formData;
};

const editValue = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newUser = Object.fromEntries(formData.entries());
  console.log("e", newUser);
  console.log(newUser);

  function hasWhiteSpace(username) {
    return username.indexOf(" ") >= 0;
  }
  let spacecheck = hasWhiteSpace(newUser.username);
  if (spacecheck) {
    alert("Your can't use whitespaces in Username");
    return;
  }

  if (newUser.is_staff == "Admin") {
    newUser.is_staff = true;
  } else {
    newUser.is_staff = false;
  }

  const submitinfo = {
    username: newUser.username,
    email: newUser.email,
    team: newUser.team,
    balance: newUser.balance,
    is_staff: newUser.is_staff,
  };
  console.log(submitinfo);
  try {
    const response = await fetch(
      `http://172.16.50.62:8000/userupdate/${newUser.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(submitinfo),newUser
      }
    );
    await getapi();
    modal.innerHTML = "";
  } catch (e) {
    alert("error updating data.");
  }
};

const handleModalPress = (e) => {
  e.stopPropagation();
};

const onModalClose = () => {
  modal.innerHTML = "";
};

const handleAddUser = async () => {
  const formData = `  
    <div onclick="onModalClose()" class="backdrop">
    <div onclick="handleModalPress(event)" onpointerdown="handleModalPress(event)" class="my-4 m-4 px-4 py-4 card popup1" >
    <h1 class="mb-4 text-center">Add User</h1>
        <form id="update UserForm" class="flex" onsubmit="addUser(event)">
            <div class="mb-4 input-item">
                <label for="name" class="form-label"
                    >Username</label
                >
                <input
                    required
                    name="username"
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    class="form-control"
                    
                />
            </div>
            <div class="mb-4 input-item">
                <label for="email" class="form-label">Email</label>
                <input
                    required
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    class="form-control"
                    
                />
            </div>

            <div class="mb-4 input-item">
                <label for="password" class="form-label">Password</label>
                <input
                    required
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    class="form-control"
                    
                />
            </div>
            
    
            <div class="mt-4 p-4 button-group">
                <button type="submit" class="btn btn-danger btn-lg px-4 mr-4">
                    Submit
                </button>
                <button type="button" class="btn btn-warning btn-lg ml-4 px-4" onclick="onModalClose()"
                >
                    Cancel
                </button>
            </div>
    
        </form>
    </div>
    </div> `;

  modal.innerHTML = formData;
};

const addUser = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newUser = Object.fromEntries(formData.entries());
  // console.log(newUser)
  // console.log(newUser.team)
  console.log(newUser.password);
  if (newUser.is_staff == "Admin") {
    newUser.is_staff = true;
  } else {
    newUser.is_staff = false;
  }
  console.log(newUser.is_staff);

  const submitinfo = {
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    team: newUser.team,
    balance: newUser.balance,
    is_staff: newUser.is_staff,
  };
  function hasWhiteSpace(username) {
    return username.indexOf(" ") >= 0;
  }
  let spacecheck = hasWhiteSpace(newUser.username);
  if (spacecheck) {
    alert("Your can't use whitespaces in Username");
    return;
  }
  console.log(submitinfo);
  try {
    const response = await fetch(`http://172.16.50.62:8000/register_user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(submitinfo),
    });
    await getapi();
    modal.innerHTML = "";
  } catch (e) {
    alert("error Adding user.");
  }
};

const handleLogout = () => {
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace(`http://172.16.50.62:8000/`);
};

const onDeleteUser = async (id) => {
  await handleRemoveUser(id);
  onModalClose();
};

const handleDeleteModal = async (id) => {
  // const response = await fetch(`http://127.0.0.1:8000/singleuser/${id}/`);
  // const user = await response.json();
  // console.log("Satff staus"+user.is_staff)
  // if (user.team == null){
  //     user.team = "N/A";
  // }

  // if (user.is_staff==true){
  //     user.is_staff = "Admin";
  // }
  // else{
  //     user.is_staff = "User"
  // }
  const formData = `  
    <div onclick="onModalClose()" class="backdrop">
    <div onclick="handleModalPress(event)" onpointerdown="handleModalPress(event)" class="my-4 m-4 px-4 py-4 card popup1" >
    <h3 class="mb-4 text-center">Are you want to delete the user?</h3>
    <div class="mt-4 p-4 button-group flex delete-confirm">
    <button type="button" onclick="onDeleteUser(${id})" class="btn btn-danger btn-lg px-4 mr-4">
        YES
    </button>
    <button type="button" class="btn btn-warning btn-lg ml-4 px-4" onclick="onModalClose()"
    >
        NO
    </button>
    </div>
    </div>
    </div> `;

  modal.innerHTML = formData;
};
