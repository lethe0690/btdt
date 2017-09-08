let record;


function initDp() {
    return new Promise((resolve, reject)=> {
        let client = deepstream('wss://013.deepstreamhub.com?apiKey=45e0578e-c321-40bd-a80a-75862d224740');
        client.login();
        record = client.record.getRecord('btdt/sync-locations');

        return resolve(true);

    });
}

function initMap() {

    Promise.resolve()
        .then(initDp)
        .then(()=> {

            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: {lat: 43.6579603, lng: -79.3537867},
                mapTypeId: 'terrain'
            });

            map.addListener('click', (event)=> {

                let newR = {lat: event.latLng.lat(), lng: event.latLng.lng()};

                record.whenReady((r)=> {
                    let oldR = r.get();

                    if (!Object.keys(oldR).length) oldR = [];
                    oldR.push(newR);
                    record.set(oldR);
                });

                new google.maps.Marker({
                    position: event.latLng,
                    map: map,
                    title: 'footprint'
                });


            });
        })

}
