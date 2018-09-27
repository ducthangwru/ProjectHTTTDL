var mymap;
var lyrOSM;
$(document).ready(function () {
    //Tao va add Map from JSON
    mymap = L.map('map123',{center:[16.0472484, 108.1716864],zoom:5,crs: L.CRS.EPSG4326});
    getGeoJSON((data) => {
        lyrOSM = L.geoJson(data);
        mymap.addLayer(lyrOSM); 
    })
    

    //Xu ly su kien Click tren Map
    // mymap.on('click',function(e){
    //     console.log(e.latlng)
    //     alert(e.latlng.toString());
    // });

    //Xu ly su kien Chuot phai tren Map
    mymap.on('contextmenu',function(e){
        checkPoint(e.latlng.lat, e.latlng.lng, (data) => {
            if(data.data.name)
            {
                L.marker(e.latlng).addTo(mymap).bindPopup(data.data.name).openPopup();
                L.circle(e.latlng, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 200
                }).addTo(mymap);
            }
        })
    });
});