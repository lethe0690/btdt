let flightPath;
let client = deepstream('wss://013.deepstreamhub.com?apiKey=45e0578e-c321-40bd-a80a-75862d224740');

function initDp() {
    return new Promise((resolve, reject) => {

        client.login();

        var record = client.record.getRecord('btdt/sync-locations');

        record.whenReady((r) => {
            var record = r.get();
            resolve(r.get());
        })

    });

}

function onChange() {

    var record = client.record.getRecord('btdt/sync-locations');

    record.subscribe((data)=> {
        //when data of this record changes
        //repaint the map
        console.log("data changed");

        flightPath.setPath(data);
    })

}

function initMap() {

    Promise.resolve()
        .then(initDp)
        .then((data)=> {

            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: {lat: 43.6579603, lng: -79.3537867},
                mapTypeId: 'terrain'
            });

            flightPath = new google.maps.Polyline({
                path: data,
                geodesic: true,
                strokeColor: '#4a80f5',
                strokeOpacity: 0.7,
                strokeWeight: 5
            });

            flightPath.setMap(map);
        })
        .then(onChange)
        .catch((err)=> {
            console.log(err);
        })

}
