const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, false);
var appid = urlParams.get('id');

function urlExists(url, callback) {
    fetch(url, { mode: 'no-cors' })
        .then(function(status) {
            callback(status.ok)
        });
}
fetch('https://coronux.github.io/zeusdata/apps.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

function appendData(data) {

    var secContainer = document.getElementById("category");
    for (var i = 0; i < data.length; i++) {
        if (data[i].category === appid) {
            var div = document.createElement("div");
            div.classList.add("column");
            div.innerHTML = ' <a href="view.html?app=' + encodeURIComponent(data[i].title) + '&web=' + ((data[i].link == "N/A") ? "no" : "yes") + '&from=categories"> <div class="item"> <img class="media" onError="this.onerror=null;this.src=\'assets/img/256x256.png\';" src="' + (data[i].icon == 'N/A' ? `https://paradise.getzeus.app/icons/${data[i].title}/icon.png` : data[i].icon) + '"> <span class="item_name">' + data[i].title.replace(/\_/g, ' ') + '</span><span class="item_author">' + data[i].developer + '</span><span class="download"><i class="fa-solid fa-arrow-down"></i></span></div></a>';
            secContainer.appendChild(div);
        } else {
            console.log("nah");
        }
    }
}
document.getElementById("appname").innerHTML = appid;
document.getElementById("catname").innerHTML = appid;