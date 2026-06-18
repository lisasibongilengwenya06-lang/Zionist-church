/*
 * map.js
 * Initialises the Leaflet interactive map on the Directory page.
 *
 * Leaflet is loaded via CDN in Directory.html — no install needed.
 *
 * How it works:
 *   1. L.map() creates the map inside the #church-map div.
 *   2. L.tileLayer() loads the map tiles (the visual background).
 *   3. Each church location is stored in an array of objects.
 *   4. We loop through the array and create a marker + popup for each.
 *   5. L.featureGroup() groups all markers so we can auto-fit the map
 *      to show all markers without manually setting zoom and centre.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ── 1. Initialise the map ────────────────────────────────────────────────
    // L.map('church-map') targets the div with id="church-map"
    // We set a temporary centre — fitBounds() below will override it
    var map = L.map('church-map').setView([-28.0, 26.0], 5);

    // ── 2. Load map tiles from OpenStreetMap (free, no API key needed) ───────
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // ── 3. Define all church locations ───────────────────────────────────────
    // Each object has: name, coords [lat, lng], description, colour
    var churches = [
        {
            name: 'ZCC Headquarters – Moria',
            coords: [-24.0833, 29.6333],
            description: 'Zion Christian Church headquarters in Moria, Limpopo. The largest African Independent Church in southern Africa.',
            colour: 'green'
        },
        {
            name: 'Shembe / AmaNazaretha – eThekwini',
            coords: [-29.8587, 31.0218],
            description: 'Nazareth Baptist Church founded by Isaiah Shembe in 1910/1911. Blends Christianity with Zulu traditions.',
            colour: 'blue'
        },
        {
            name: 'AmaZion – Diepsloot, Gauteng',
            coords: [-25.9108, 28.0107],
            description: 'Various Zion church congregations in Diepsloot including AmaZion weGalile and Jerusalem Church of Zion.',
            colour: 'orange'
        },
        {
            name: 'Methodist – Port Elizabeth, Eastern Cape',
            coords: [-33.9608, 25.6022],
            description: 'Methodist Church of Southern Africa congregation in Port Elizabeth (Gqeberha), Eastern Cape.',
            colour: 'red'
        },
        {
            name: 'Methodist – Francistown, Botswana',
            coords: [-21.1667, 27.5000],
            description: 'Methodist Church congregation in Francistown, Botswana\'s second largest city.',
            colour: 'red'
        },
        {
            name: 'Methodist – Bulawayo, Zimbabwe',
            coords: [-20.1325, 28.5833],
            description: 'Methodist Church congregation in Bulawayo, Zimbabwe\'s second largest city.',
            colour: 'red'
        }
    ];

    // ── 4. Create custom coloured icons ─────────────────────────────────────
    // Leaflet's default marker is blue. We use different colours per denomination
    // by referencing pre-made marker icons from a public CDN.
    function getIcon(colour) {
        return L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + colour + '.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize:   [25, 41],   // width, height in pixels
            iconAnchor: [12, 41],   // point of the icon that corresponds to marker position
            popupAnchor:[1, -34],   // point from which the popup opens relative to iconAnchor
            shadowSize: [41, 41]
        });
    }

    // ── 5. Add markers and popups ────────────────────────────────────────────
    // We collect all markers into an array so we can fit the map to them
    var markers = [];

    churches.forEach(function (church) {
        var marker = L.marker(church.coords, { icon: getIcon(church.colour) })
            .addTo(map)
            .bindPopup(
                '<strong>' + church.name + '</strong><br>' + church.description,
                { maxWidth: 250 }
            );

        markers.push(marker);
    });

    // ── 6. Auto-fit the map to show all markers ──────────────────────────────
    // L.featureGroup() groups the markers so we can get their combined bounds
    var group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.15)); // .pad(0.15) adds 15% padding around edges

    // ── 7. Highlight the matching map marker when a branch card is clicked ───
    // Each .branch-card has a data-church index that matches the churches array
    document.querySelectorAll('.branch-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var index = parseInt(card.getAttribute('data-church'));
            if (!isNaN(index) && markers[index]) {
                // Pan and zoom the map to that marker
                map.setView(churches[index].coords, 10, { animate: true });
                // Open its popup
                markers[index].openPopup();
            }
        });
    });

});
