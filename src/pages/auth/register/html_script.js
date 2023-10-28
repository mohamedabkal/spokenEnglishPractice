export default `
<!DOCTYPE html>
<html lang="en">
  <head>
    <base target="_top" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Quick Start - Leaflet</title>

    <link
      rel="shortcut icon"
      type="image/x-icon"
      href="docs/images/favicon.ico"
    />

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>

    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        background-color: 'red';
      }
      #map {
        background-color: 'blue';
      }
      .leaflet-container {
        height: 100vh;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map" style="width: 100%; height: 100%"></div>
    <script>
      window.circle = null;
      window.marker = null;
      window.map = L.map("map");
      const tiles = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 24,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      const set_current_location = (loc) => {
        window.map.eachLayer(function (layer) {
          if (layer instanceof L.Circle || layer instanceof L.Marker) {
            map.removeLayer(layer)
          }
        });

        window.map.setView(loc, 13);
        window.marker = L.marker(loc).addTo(window.map)
        /*
        window.circle = L.circle(loc, {
            color: '#ff003388',
            fillColor: '#f03',
            fillOpacity: 0.2,
            radius: 2000
        }).addTo(map);
        
        
        window.circle.on('click', (event) => {
          window.marker.setLatLng([event.latlng.lat, event.latlng.lng])
          window.ReactNativeWebView.postMessage('{"message": "OnCircle", "location": ['+ event.latlng.lat +", "+event.latlng.lng+ ']}');
        })
        */
      }
      window.ReactNativeWebView.postMessage('{"message": "Initialized"}');
    </script>
  </body>
</html>

`;
