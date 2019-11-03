"Use strict";

const work = document.getElementById('work');
const url = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/work';

let Userid = getCookie('userid');
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
// Fetch work
fetch(url)
    .then(resp => resp.json())
    .then(json => {
        if (json.message) {
            work.innerHTML += '<p class="msg-json">' + json.message + '</p>';
        } else {
            json.forEach(output => {
                if (output.UserID === Userid) {
                    work.innerHTML += `
                    <div class="adds">
                        <div id="add-div-${output.Wid}">
                            <div class="add-div">
                            <p><span>Företag:</span> ${output.Wname}</p>
                            <p><span>Yrke:</span> ${output.Wtitle}</p>
                            <p><span>Beskrivning:</span> ${output.Wdesc}</p>
                            <p><span>Start:</span> ${output.WstartDate}</p>
                            <p><span>Slut:</span> ${output.WendDate}</p>
                            <a onclick="deleteWork(${output.Wid})" class="btn error">Radera</a>
                            <a onclick="changeWork(${output.Wid})" class="btn change">Ändra</a>
                            </div>
                        </div>
                    </div>
                `;
                } else {
                    work.innerHTML += '';
                }
            });
            if(work.innerHTML == '') {
                work.innerHTML += '<p class="msg-json">No work found</p>';
            }
        }
    });

document.getElementById('addWork').addEventListener('click', addWork);

// Add Work
function addWork() {
    let wname = document.forms['work-form']['wname'].value;
    let wtitle = document.forms['work-form']['wtitle'].value;
    let wdesc = document.forms['work-form']['wdesc'].value;
    let wstartdate = document.forms['work-form']['wstartdate'].value;
    let wenddate = document.forms['work-form']['wenddate'].value;

    if (wname != '' && wtitle != '' && wdesc != '' && wstartdate != '' && wenddate != '') {
        let json = {
            "Wname": wname,
            "Wtitle": wtitle,
            "Wdesc": wdesc,
            "WstartDate": wstartdate,
            "WendDate": wenddate,
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
                    document.forms['work-form'].reset();
                }
            })
    } else {
        location.reload();
    }
}

// Delete Work
function deleteWork(id) {
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

// Change Work
function changeWork(id) {
    fetch(url + '?id=' + id)
        .then(resp => resp.json())
        .then(json => {
            if (json.message) {
                work.innerHTML += '<p class="msg-json">' + json.message + '</p>';
            } else {
                let divAddID = document.getElementById('add-div-' + id);
                json.forEach(output => {
                    divAddID.innerHTML = `
                        <div class="change-div">
                            <form class="form" name="change-form">
                                <p><span>Företag:</span> <input type="text" placeholder="Företag" name="wname" value="${output.Wname}"></p>
                                <p><span>Yrke:</span> <input type="text" placeholder="Yrke" name="wtitle" value="${output.Wtitle}"></p>
                                <p><span>Beskrivning:</span> <input type="text" placeholder="Beskrivning" name="wdesc" value="${output.Wdesc}"></p>
                                <p><span>Start:</span> <input type="date" name="wstartdate" value="${output.WstartDate}"></p>
                                <p><span>Slut:</span> <input type="date" name="wenddate" value="${output.WendDate}"></p>
                                <a onclick="saveWork(${output.Wid})" class="btn success">Spara</a>
                                <a onclick="exit()" class="btn error">Avbryt</a>
                            </form>
                        </div>
                `;
                });
            }
        });
}

// Save Work from changes
function saveWork(id) {
    let wname = document.forms['change-form']['wname'].value;
    let wtitle = document.forms['change-form']['wtitle'].value;
    let wdesc = document.forms['change-form']['wdesc'].value;
    let wstartdate = document.forms['change-form']['wstartdate'].value;
    let wenddate = document.forms['change-form']['wenddate'].value;

    if (wname != '' && wtitle != '' && wdesc != '' && wstartdate != '') {
        let json = {
            "Wname": wname,
            "Wtitle": wtitle,
            "Wdesc": wdesc,
            "WstartDate": wstartdate,
            "WendDate": wenddate,
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
                    document.forms['work-form'].reset();
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