"use strict";

window.onload = function() {
   if(window.location.href.includes("delete.php")) {
       delete_cookie('login');
       delete_cookie('PHPSESSID');
       delete_cookie('userid');
       location.href = '../index.php'
   }
}

document.getElementById('login-btn').addEventListener('click', checkLogin);
const login = document.getElementById('login');

function checkLogin() {
    // Login form
    let formUser = document.getElementById('username').value;
    let formPass = document.getElementById('userpass').value;
    if (formUser != '' && formPass != '') {
        let url = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/users/login';
        let json = { "Uemail": formUser, "Upassword": formPass };

        // Fetch Users
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json)
        })
            .then(resp => resp.json())
            .then(json => {
                if (json.message) {
                    login.innerHTML += `
                        <p class="msg-json">${json.message}</p>
                    `;
                    document.forms['login-form'].reset();
                } else {
                    json.forEach(output => {
                        let user = JSON.stringify(output);
                        set_cookie("login", user);
                        location.href = 'admin/index.php';
                    })
                }
            });
    }
}

// Function to create the cookie 
function set_cookie(name, value) {
    document.cookie = name + '=' + value + '; Path=/;';
}

function delete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}