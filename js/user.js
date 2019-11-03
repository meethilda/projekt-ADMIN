"Use strict";

let name;
const profile = document.getElementById('profile');

let Userid = getCookie('userid');
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

const url = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/users';

// Fetch Users
fetch(url + '?id=' + Userid)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(output => {
            // For key to value of array
            for (let [key, value] of Object.entries(output)) {
                // If value = null, set empty value
                if (value == null) {
                    value = '';
                }
                // Variables
                let firstname = output['UfirstName'];
                let lastname = output['UlastName'];
                let email = output['Uemail'];
                let desc = output['Udesc'];
                let facebook = output['facebook'];
                let instagram = output['instagram'];
                let linkedin = output['linkedin'];

                // Check for possible null values
                if (desc == null) desc = '';
                if (facebook == null) facebook = '';
                if (instagram == null) instagram = '';
                if (linkedin == null) linkedin = '';

                // Output
                profile.innerHTML = `
                        <p><b>Förnamn:</b> ${firstname}</p>
                        <p><b>Efternamn:</b> ${lastname}</p>
                        <p><b>Email:</b> ${email}</p>
                        <p><b>Beskrivning:</b> ${desc}</p>
                        <p><b>Facebook:</b> ${facebook}</p>
                        <p><b>Instagram:</b> ${instagram}</p>
                        <p><b>Linkedin:</b> ${linkedin}</p>
                        <a onclick="changeUser(${output.Uid})" class="btn change">Ändra</a>
                    `;
            }
        });
    });

// Change User
function changeUser(id) {
    fetch(url + '?id=' + id)
        .then(resp => resp.json())
        .then(json => {
            if (json.message) {
                profile.innerHTML += '<p class="msg-json">' + json.message + '</p>';
            } else {
                json.forEach(output => {
                    profile.innerHTML = `
                        <div class="change-div">
                        <form class="form" name="change-form">
                        <p><span>Förnamn:</span> <input type="text" placeholder="Förnamn" name="ufirstname" value="${output.UfirstName}"></p>
                        <p><span>Efternamn:</span> <input type="text" placeholder="Efternamn" name="ulastname" value="${output.UlastName}"></p>
                        <p><span>Email:</span> <input type="text" placeholder="Email" name="uemail" value="${output.Uemail}"></p>
                        <p><span>Beskrivning:</span> <input type="text" placeholder="Beskrivning" name="udesc" value="${output.Udesc}"></p>
                        <p><span>Facebook:</span> <input type="text" placeholder="Facebook" name="facebook" value="${output.facebook}"></p>
                        <p><span>Instagram:</span> <input type="text" placeholder="Instagram" name="instagram" value="${output.instagram}"></p>
                        <p><span>Linkedin:</span> <input type="text" placeholder="Linkedin" name="linkedin" value="${output.linkedin}"></p>
                        <a onclick="saveUser(${output.Uid})" class="btn success">Spara</a>
                        <a onclick="exit()" class="btn error">Avbryt</a>
                        </form>
                        </div>
                `;
                });
            }
        });
}

// Save User from changes
function saveUser(id) {
    if (confirm('Vill du spara? Du kommer att loggas ut för att logga in igen.')) {
        let first = document.forms['change-form']['ufirstname'].value;
        let last = document.forms['change-form']['ulastname'].value;
        let email = document.forms['change-form']['uemail'].value;
        let desc = document.forms['change-form']['udesc'].value;
        let facebook = document.forms['change-form']['facebook'].value;
        let instagram = document.forms['change-form']['instagram'].value;
        let linkedin = document.forms['change-form']['linkedin'].value;

        if (first != '' && last != '' && email != '') {
            let json = {
                "UfirstName": first,
                "UlastName": last,
                "Uemail": email,
                "Udesc": desc,
                "facebook": facebook,
                "instagram": instagram,
                "linkedin": linkedin
            }

            fetch(url + '?id=' + id, {
                method: 'PUT',
                body: JSON.stringify(json)
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data) {
                        window.location.href = 'delete.php';
                    }
                })
        } else {
            location.reload();
        }
    } else {
        location.reload();
    }
}

// Abort changes
function exit() {
    if (confirm('Vill du avbryta?')) {
        location.reload();
    }
}