"Use strict";

const portfolio = document.getElementById('portfolio');
const url = 'http://studenter.miun.se/~maed1801/dt173g/projekt-REST/cv.php/api/portfolio';

let Userid = getCookie('userid');
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
// Fetch portfolio
fetch(url)
    .then(resp => resp.json())
    .then(json => {
        if (json.message) {
            portfolio.innerHTML += '<p class="msg-json">' + json.message + '</p>';
        } else {
            json.forEach(output => {
                if (output.UserID === Userid) {
                    portfolio.innerHTML += `
                    <div class="adds">
                        <div id="add-div-${output.Pid}">
                            <div class="add-div">
                            <p><span>Title:</span> ${output.Ptitle}</p>
                            <p><span>URL:</span> ${output.Purl}</p>
                            <p><span>Beskrivning:</span> ${output.Pdesc}</p>
                            <p><span>Skapad:</span> ${output.Pcreated}</p>
                            <a onclick="deletePortfolio(${output.Pid})" class="btn error">Radera</a>
                            <a onclick="changePortfolio(${output.Pid})" class="btn change">Ändra</a>
                            </div>
                        </div>
                    </div>
                `;
                } else {
                    portfolio.innerHTML += '';
                }
            });
            if(portfolio.innerHTML == '') {
                portfolio.innerHTML += '<p class="msg-json">No portfolio found</p>';
            }
        }
    });

document.getElementById('addPost').addEventListener('click', addPortfolio);

// Add Portfolio
function addPortfolio() {
    let ptitle = document.forms['portfolio-form']['ptitle'].value;
    let purl = document.forms['portfolio-form']['purl'].value;
    let pdesc = document.forms['portfolio-form']['pdesc'].value;
    let pcreated = document.forms['portfolio-form']['pcreated'].value;

    if (ptitle != '' && purl != '' && pdesc != '' && pcreated != '') {
        let json = {
            "Ptitle": ptitle,
            "Purl": purl,
            "Pdesc": pdesc,
            "Pcreated": pcreated,
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
                    document.forms['portfolio-form'].reset();
                }
            })
    } else {
        location.reload();
    }
}

// Delete Portfolio
function deletePortfolio(id) {
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

// Change Portfolio
function changePortfolio(id) {
    fetch(url + '?id=' + id)
        .then(resp => resp.json())
        .then(json => {
            if (json.message) {
                portfolio.innerHTML += '<p class="msg-json">' + json.message + '</p>';
            } else {
                let divAddID = document.getElementById('add-div-' + id);
                json.forEach(output => {
                    divAddID.innerHTML = `
                        <div class="change-div">
                            <form class="form" name="change-form">
                                <p><span>Titel:</span> <input type="text" placeholder="Titel" name="ptitle" value="${output.Ptitle}"></p>
                                <p><span>URL:</span> <input type="text" placeholder="URL" name="purl" value="${output.Purl}"></p>
                                <p><span>Beskrivning:</span> <input type="text" placeholder="Beskrivning" name="pdesc" value="${output.Pdesc}"></p>
                                <p><span>Skapad:</span> <input type="date" placeholder="Skapad" name="pcreated" value="${output.Pcreated}"></p>
                                <a onclick="savePortfolio(${output.Pid})" class="btn success">Spara</a>
                                <a onclick="exit()" class="btn error">Avbryt</a>
                            </form>
                        </div>
                `;
                });
            }
        });
}

// Save Portfolio from changes
function savePortfolio(id) {
    let ptitle = document.forms['change-form']['ptitle'].value;
    let purl = document.forms['change-form']['purl'].value;
    let pdesc = document.forms['change-form']['pdesc'].value;
    let pcreated = document.forms['change-form']['pcreated'].value;

    if (ptitle != '' && purl != '' && pdesc != '' && pcreated != '') {
        let json = {
            "Ptitle": ptitle,
            "Purl": purl,
            "Pdesc": pdesc,
            "Pcreated": pcreated,
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
                    document.forms['portfolio-form'].reset();
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