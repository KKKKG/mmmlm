const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, false);
var appid = atob(document.getElementById('mydata').getAttribute('appdata'));
//var from = urlParams.get('from');
//document.getElementById(from).classList.add("active");

function urlExists(url, callback) {
    fetch(url, {
            mode: 'no-cors'
        })
        .then(function(status) {
            callback(status.ok)
        });
}
fetch('https://coronux.github.io/zeusdata/apps.json?1111')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

Math.random();

function appendData(data) {
    var mainContainer = document.getElementById("appData");
    let desc = data.find(el => el.title === appid);
    document.getElementById('description').innerHTML = (desc["description"]);
    let aut = data.find(el => el.title === appid);
    document.getElementById('author').innerHTML = (desc["developer"]);
    let url = data.find(el => el.title === appid);
    dataurl = (url["link"]);
    let cat = data.find(el => el.title === appid);
    category = (cat["category"]);
    document.getElementById('category').innerHTML = (desc["category"]);
    let icon = data.find(el => el.title === appid);
    document.getElementById("appicon").src = (((icon["icon"]) == "N/A") ? "https://paradise.getzeus.app/icons/" + appid + "/icon.png" : (icon["icon"]));

    var secContainer = document.getElementById("similar");
    let counter = 0;
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
        if (data[i].category === category) {
            counter += 1;
            if (data[i].title != appid && counter < 8) {
                var div = document.createElement("div");
                div.classList.add("column");
                div.innerHTML = ' <a id="downloadBtn" href="view.html?app=' + encodeURIComponent(data[i].title) + '&web=' + ((data[i].link == "N/A") ? "no" : "yes") + '&from=' + urlParams.get('from') + '"> <div class="item"> <img class="media" onError="this.onerror=null;this.src=\'assets/img/256x256.png\';" src="' + (data[i].icon == 'N/A' ? `https://paradise.getzeus.app/icons/${data[i].title}/icon.png` : data[i].icon) + '"> <span class="item_name">' + data[i].title.replace(/\_/g, ' ') + '</span><span class="item_author">' + data[i].developer + '</span><span class="download"><i class="fa-solid fa-arrow-down"></i></span></div></a>';
                secContainer.appendChild(div);
            }
        }
    }
}
document.getElementById("appname").innerHTML = urlParams.get('app').replace(/\_/g, ' ');

function installapp() {
    url = atob(document.getElementById('mydata').getAttribute('link'));
    if (atob(document.getElementById('mydata').getAttribute('webdata')) == "no") {
        document.getElementById("installapp").innerHTML = "Requesting app: " + appid;
        server = "paradise.getzeus.app";
        path = "install.php";
        id = "?app=" + appid;
        var x = document.getElementById("simpleToast");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 3000);
        manifest = "itms-services://?action=download-manifest&url=";
        window.location.replace(manifest + "https://" + encodeURIComponent(server) + "/" + encodeURIComponent(path) + encodeURIComponent(id));
    } else {
        document.getElementById("installapp").innerHTML = "Requesting webapp: " + appid;
        var x = document.getElementById("simpleToast");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 3000);
        window.location.replace(atob(document.getElementById('mydata').getAttribute('datalink')));
    }
}
