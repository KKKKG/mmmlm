document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, false);


function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var j;
        var rowContainsFilter = false;
        for (j = 0; j < cells.length; j++) {
            if (cells[j]) {
                if (cells[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    rowContainsFilter = true;
                    continue;
                }
            }
        }

        if (!rowContainsFilter) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
}

fetch('https://coronux.github.io/zeusdata/featured.json')
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
    var mainContainer = document.getElementById("appData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.classList.add("column");
        div.innerHTML = ' <a href="view.html?app=' + encodeURIComponent(data[i].title) + '&web=' + ((data[i].link == "N/A") ? "no" : "yes") + '&from=home"> <div class="item"> <img class="media" onError="this.onerror=null;this.src=\'assets/img/256x256.png\';" src="' + (data[i].icon == 'N/A' ? `https://paradise.getzeus.app/icons/${data[i].title}/icon.png` : data[i].icon) + '"> <span class="item_name">' + data[i].title.replace(/\_/g, ' ') + '</span><span class="item_author">' + data[i].developer + '</span><span class="download"><i class="fa-solid fa-arrow-down"></i></span></div></a>';
        mainContainer.appendChild(div);
    }
}

document.getElementById("status_dismiss").onclick = function() {
    document.getElementById("status").classList.add("hide_status");
    setTimeout(function() {
        document.getElementById("status").outerHTML = "";
    }, 2000);
};


fetch("https://getzeus.app/status.txt?" + Math.random().toString(36).slice(3, 100))
    .then(response => response.text())
    .then((response) => {
        lestatus = response.replace(/\s/g, '');
        if (lestatus == "signed") {
            document.getElementById('signing_status_title').innerHTML = 'Signed <i style="color:#00ff33" class="fa-solid fa-circle-check"></i>';
            document.getElementById('signing_status_desc').innerHTML = 'Every app should work.';
        } else {
            document.getElementById('signing_status_title').innerHTML = 'Revoked <i style="color:#ff5338" class="fa-solid fa-circle-xmark"></i>';
            document.getElementById('signing_status_desc').innerHTML = 'Follow our Twitter';
        }
    })
    .catch(err => console.log(err))