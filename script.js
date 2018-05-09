// frankenscript

mapboxgl.accessToken = 'pk.eyJ1IjoiYmV4aW11cyIsImEiOiJjamc5MG04ZXU5dDhhMnhtczVjeTI5c3kyIn0.m5hg57ASif4CYrkda7Wg_g';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/beximus/cjgldxbjj000h2rr0gdz4rz6f', // stylesheet location
    center: [174.794100, -41.296284], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

    function init() {
      //Find our div containers in the DOM
      var dataContainerOrientation = document.getElementById('dataContainerOrientation');
      var dataContainerMotion = document.getElementById('dataContainerMotion');
 
      //Check for support for DeviceOrientation event
      if(window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
                var alpha = event.alpha;
                var beta = event.beta;
                var gamma = event.gamma;
               
                if(alpha!=null || beta!=null || gamma!=null) 
                  dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
              }, false);
      }
 
      // Check for support for DeviceMotion events
      if(window.DeviceMotionEvent) {
        // console.log('HUI');
      window.addEventListener('devicemotion', function(event) {
                var x = event.accelerationIncludingGravity.x;
                var y = event.accelerationIncludingGravity.y;
                var z = event.accelerationIncludingGravity.z;
                var r = event.rotationRate;
                var html = 'Acceleration:<br />';
                html += 'x: ' + x +'<br />y: ' + y + '<br/>z: ' + z+ '<br />';
                html += 'Rotation rate:<br />';
                if(r!=null) html += 'alpha: ' + r.alpha +'<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
                dataContainerMotion.innerHTML = html;
                // console.log(r.alpha);

                //Create Geolocation if Threshold is hit
                if(r.alpha<-20||r.beta<-20||r.gamma<-20){
                if(r.alpha>130||r.beta>130||r.gamma>130){
                  document.body.style.color = "red";
                  getLocation();
                  // showPosition();
                  // getLocation();
          

                }
                // code addition end

              }
              });
      }
      var youarehere = document.getElementById("location");
      var position;
      function getLocation() {
          // console.log("YAY I'VE BEEN CALLED");
                    if (navigator.geolocation) {
                      // console.log("YAY GEOLOCATION WORKS!");
                        navigator.geolocation.getCurrentPosition(showPosition, (err)=>{
                          console.log(err);
                        });
                      } else { 
                        console.log("GOAL REACHED");
                        youarehere.innerHTML = "Geolocation is not supported by this browser.";
                      }
                    }
      function showPosition(position) {
        console.log(position);
        try {
          youarehere.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        } catch (error){
          console.error(error);
        }
      }
    } 