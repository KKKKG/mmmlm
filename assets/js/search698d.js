document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
    }, false);
 
 document.getElementById("value").addEventListener("keyup", filterSearch);
 function filterSearch(){
    var value,name,profile,i;
    value = document.getElementById('value').value.toUpperCase();
 profile = document.getElementsByClassName('item');
   for(i=0;profile.length;i++){
     name = profile[i].getElementsByClassName('item_name');
     if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
       profile[i].style.display ="block";
     }else{
       profile[i].style.display = "none";
     }
   }  
 }
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
 
     if (! rowContainsFilter) {
       rows[i].style.display = "none";
     } else {
       rows[i].style.display = "";
     }
   }
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
             var mainContainer = document.getElementById("appData");
             for (var i = 0; i < data.length; i++) {
                 var div = document.createElement("div");
                 div.classList.add("column");
                 div.innerHTML = ' <a href="view.html?app='+ encodeURIComponent(data[i].title) +'&web='+ ((data[i].link == "N/A") ? "no" : "yes") +'&from=search"> <div class="item"> <img class="media" onError="this.onerror=null;this.src=\'assets/img/256x256.png\';" src="'+ (data[i].icon == 'N/A'? `https://paradise.getzeus.app/icons/${data[i].title}/icon.png`:data[i].icon) +'"> <span class="item_name">'+  data[i].title.replace(/\_/g, ' ') +'</span><span class="item_author">'+  data[i].developer +'</span><span class="download"><i class="fa-solid fa-arrow-down"></i></span></div></a>';
                 mainContainer.appendChild(div);
             }
         }