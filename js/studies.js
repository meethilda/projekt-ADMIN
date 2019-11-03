"Use strict";

const studies = document.getElementById('studies');
const url = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/studies';

let Userid = getCookie('userid');
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
// Fetch studies
fetch(url)
    .then(resp => resp.json())
    .then(json => {
        /*for (let i = 0; i < json.length; i++) {
            let Uid = json[i].UserID;
            if (Uid === Userid) {*/
        if (json.message) {
            studies.innerHTML += '<p class="msg-json">' + json.message + '</p>';
        } else {
            json.forEach(output => {
                if (output.UserID === Userid) {
                    studies.innerHTML += `
                    <div class="adds">
                        <div id="add-div-${output.Sid}">
                            <div class="add-div">
                            <p><span>Skola/Utbildning:</span> ${output.Sname}</p>
                            <p><span>Stad:</span> ${output.Scity}</p>
                            <p><span>Startdatum:</span> ${output.SstartDate}</p>
                            <p><span>Slutdatum:</span> ${output.SendDate}</p>
                            <a onclick="deleteStudy(${output.Sid})" class="btn error">Radera</a>
                            <a onclick="changeStudy(${output.Sid})" class="btn change">Ändra</a>
                            </div>
                        </div>
                    </div>
                `;
                } else {
                    studies.innerHTML += '';
                }
            });
            if (studies.innerHTML == '') {
                studies.innerHTML += '<p class="msg-json">No studies found</p>';
            }
        }
        /* }
     }*/
    });

document.getElementById('addPost').addEventListener('click', addStudy);

// Add study
function addStudy() {
    let name = document.forms['studies-form']['sname'].value;
    let city = document.forms['studies-form']['scity'].value;
    let start = document.forms['studies-form']['sstartdate'].value;
    let end = document.forms['studies-form']['senddate'].value;

    if (name != '' && city != '' && start != '' && end != '') {
        let json = {
            "Sname": name,
            "Scity": city,
            "SstartDate": start,
            "SendDate": end,
            "UserID": Userid
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(json)
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    location.reload();
                    document.forms['studies-form'].reset();
                }
            })
    } else {
        location.reload();
    }
}

// Delete study
function deleteStudy(id) {
    if (confirm('Vill du radera?')) {
        fetch(url + '?id=' + id, {
            method: 'DELETE'
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    location.reload();
                }
            });
    }
}

// Change study
function changeStudy(id) {
    fetch(url + '?id=' + id)
        .then(resp => resp.json())
        .then(json => {
            if (json.message) {
                studies.innerHTML += '<p class="msg-json">' + json.message + '</p>';
            } else {
                let divAddID = document.getElementById('add-div-' + id);
                json.forEach(output => {
                    divAddID.innerHTML = `
                        <div class="change-div">
                        <form class="form" name="change-form">
                        <p><span>Skola/utbildning:</span> <input type="text" placeholder="Name" name="sname" value="${output.Sname}"></p>
                        <p><span>Stad:</span> <input type="text" placeholder="Stad" name="scity" value="${output.Scity}"></p>
                        <p><span>Startdatum:</span> <input type="date" name="sstartdate" value="${output.SstartDate}"></p>
                        <p><span>Slutdatum:</span> <input type="date" name="senddate" value="${output.SendDate}"></p>
                        <a onclick="saveStudy(${output.Sid})" class="btn success">Spara</a>
                        <a onclick="exit()" class="btn error">Avbryt</a>
                        </form>
                        </div>
                `;
                });
            }
        });
}

// Save study from changes
function saveStudy(id) {
    let name = document.forms['change-form']['sname'].value;
    let city = document.forms['change-form']['scity'].value;
    let start = document.forms['change-form']['sstartdate'].value;
    let end = document.forms['change-form']['senddate'].value;

    if (name != '' && city != '' && start != '' && end != '') {
        let json = {
            "Sname": name,
            "Scity": city,
            "SstartDate": start,
            "SendDate": end,
            "UserID": Userid
        }

        fetch(url + '?id=' + id, {
            method: 'PUT',
            body: JSON.stringify(json)
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data) {
                    location.reload();
                    document.forms['studies-form'].reset();
                }
            })
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