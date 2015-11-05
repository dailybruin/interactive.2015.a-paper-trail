ca_v_ga = function(id) {
  var tablearea = document.getElementById(id);

  var table = document.createElement('table');
  
  $.getJSON("../../data/ca_v_ga.json", function(success) {
      var data = success;
      
      for (var prop in data[0]) {
          var tr = document.createElement('tr');
          
          data.forEach(function(d, i){
            if (prop == "state") {
              var th = document.createElement('th');
              th.appendChild(document.createTextNode(d[prop]));
              tr.appendChild(th);
              tr.appendChild(document.createElement('th'));
            }
            
            if (prop != "state") {
              var details = document.createElement('td');
              details.className = "details";
              details.appendChild(document.createTextNode(d[prop]["details"]));
              var info = document.createElement('i');
              info.className = "fa fa-file-text-o";
              var infoA = document.createElement('a');
              infoA.href = "http://google.com";
              infoA.appendChild(info);
              details.appendChild(infoA);
              tr.appendChild(details);
              
              var check = document.createElement('td');
              check.className = "check";
              var checkIcon = "";
              switch(d[prop]["check"]) {
                case 1:
                  checkIcon = "fa-check-circle";
                  break;
                case 2:
                  checkIcon = "fa-minus-circle";
                  break;
                case 3:
                  checkIcon = "fa-times-circle";
                  break;
              }
              var iElement = document.createElement('i');
              iElement.className = "fa " + checkIcon;
              check.appendChild(iElement);
              tr.appendChild(check);
            }
          });
          
          table.appendChild(tr);
      }
  })
  
  tablearea.appendChild(table);
}
