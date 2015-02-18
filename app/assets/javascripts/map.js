var map;
function initialize() {
  var mapOptions, infoWindowContent, $form;
  mapOptions = { zoom: 12 };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    var successPos = function(position) {
      var pos, infowindow, lat, lng, infoObj;

      infoObj = {
                  //map: map,
                  //position: pos,
                  //content: 'Location found using HTML5.'
                }

      lat = position.coords.latitude,
      lng = position.coords.longitude;

      pos = new google.maps.LatLng(lat, lng);

      infowindow = new google.maps.InfoWindow(infoObj);

      map.setCenter(pos);
    };

    var failPos = function() {
      handleNoGeolocation(true);
    };

    navigator.geolocation.getCurrentPosition(successPos, failPos);
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  var formGrp = "<div class='form-group'></div>";
  var $textField = $(formGrp).
                      append("<textarea class='form-control' id='marker-text'>");
  var $inputField = $(formGrp).
                      append("<input type='text' class='form-control'/>")
  var $submitBtn = $(formGrp).
                      append("<button class='btn btn-primary'>Save</button>")                    

  $form = $("<form id='marker-form'>").
            append($inputField.find('input').attr("placeholder", "Your Title")).
            append($textField.find('textarea').attr("placeholder", "Your Story...")).
            append($submitBtn);


  infoWindowContent =   $("<div class='form-con'>").
                          append($form).
                          prepend("<h3>What's Your Story Here?</h3>");

  infowindow = new google.maps.InfoWindow({
                                      content: $(infoWindowContent)[0]
                                    });

  $form.on("submit", function (ev){
    ev.preventDefault();
    var marker = $(this).data("marker");

      $.post("/markers.json", { 
                                marker: {
                                          info: {
                                            position: {
                                              D: marker.position.D,
                                              k: marker.position.k
                                            },
                                            title: $form.find('input').val(),
                                            story: $form.find('textarea').val()
                                          }
                                        } 
                              }).
      done(function (data) {
        console.log(data);
        $form[0].reset();
        $form.data("marker", null);
        infowindow.close(map, marker);
      });

  });

  $.get("/markers.json").
    done(function (markers) {
      console.log(markers)
      var prevWindow, prevMarker;
      markers.forEach(function (markerData) {
        var marker, myLatlng, lat, lng;

        if (markerData.info && markerData.info.position) {
          position = markerData.info.position;

          var contentStr = [  "<h3>" + markerData.info.title + "</h3>",
                              "<div>" + markerData.info.story  + "</div>"
                            ].join("")
          var infowindow = new google.maps.InfoWindow({
                                        content: contentStr
                                      });
          myLatlng = new google.maps.LatLng(position.k, position.D);
          marker = new google.maps.Marker({
                                              position: myLatlng, 
                                              map: map
                                            });


          google.maps.event.addListener(marker, 'click', function() {
            console.log("CLICKING");
            //console.log("RESETing", $form[0].reset())
            if (prevWindow) {
              prevWindow.close(map, prevMarker);
            }
            infowindow.open(map, marker);
            prevMarker = marker;
            prevWindow = infowindow;
          });
        }
      })


    });

  $('#marker').click(function(lat,lng){

    var placed = false, prevInfoWindow;

    google.maps.event.addListener(map, "click", function(event) {
      var marker, myLatlng, lat, lng;

      lat = event.latLng.lat();
      lng = event.latLng.lng();

      console.log("PLACED:", placed);
      if (placed) {
        return undefined;
      }

      myLatlng = new google.maps.LatLng(lat, lng);
      marker = new google.maps.Marker({
                                          position: myLatlng, 
                                          map: map,
                                          draggable: true
                                        });
      placed = !(placed);


      google.maps.event.addListener(marker, 'click', function() {
        console.log("CLICKING");
        //console.log("RESETing", $form[0].reset())
        infowindow.open(map, marker);
        $form.data("marker", marker);
      });

    });


  })
}
function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
};

google.maps.event.addDomListener(window, 'load', initialize);




