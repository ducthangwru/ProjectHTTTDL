var mymap;
var lyrOSM;
var OSM;
var listMaker = []

$(document).ready(function () {
    $("#btnLogin").click(function() {
        login($("#ipUsername").val(), $("#ipPassword").val(), (err, data) => {
            if(err)
                console.log(err)
            else if(typeof data.data == 'undefined')
            {
                console.log("Thatbai")
            }
            else
                console.log("thanh cong")
        })
    })
    //Tao va add Map from JSON
    mymap = L.map('map123',{center:[16.0472484, 108.1716864],zoom:5,zoomControl: false});
    L.control.pan().addTo(mymap);
    L.control.zoom().addTo(mymap);
    getGeoJSON((data) => {
        lyrOSM = L.geoJson(data);
        OSM = L.tileLayer.provider('Stamen.Watercolor');
        // mymap.addLayer(OSM);
        // mymap.addLayer(lyrOSM); 
        L.layerGroup([lyrOSM]).addTo(mymap);
    })

    resetAll();

    $("#btnToanQuoc").click(function() {
        resetAll();
    })
    
    //Xu ly su kien Click tren Map
    mymap.on('click',function(e){
        checkPoint(e.latlng.lat, e.latlng.lng, (data) => {
            if(data.data)
            {
                let index = containsObject(data.data.gid, listMaker)
                let vote = data.data.vote1 + data.data.vote2
                let percentVote1 = (data.data.vote1 / vote) * 100
                let percentVote2 = (data.data.vote2 / vote) * 100

                $("#province").text(data.data.ten)
                $("#strong1").text(numeral(percentVote1).format('0,0.00') + "%")
                $("#strong2").text(numeral(percentVote2).format('0,0.00') + "%")
                $("#progress1").css("width", `${percentVote1}%`);
                $("#progress2").css("width", `${percentVote2}%`);
                $("#danso").text(numeral(data.data.danso).format('0,0') + " người")
                $("#vote1").text(numeral(data.data.vote1).format('0,0') + " người")
                $("#vote2").text(numeral(data.data.vote2).format('0,0') + " người")
                $("#chuavote").text(numeral(data.data.danso - data.data.vote1 - data.data.vote2).format(0.0) + " người")

                let html = `<div class="row" style="text-align: center; margin-bottom:5%;"><b>${data.data.ten}</b></div>

                    <div class="row" style="text-align: center;">
                        <div class="col-md-6">
                            <img src="images/vote1.jpg" width="50px" height="50px" alt="">
                            <label>Mr. Nguyễn Đức Thắng</label>
                        </div>
                        <div class="col-md-6">
                            <img src="images/vote1.jpg" width="50px" height="50px" alt="">
                            <label>Mr. Đinh Việt Cường</label>
                        </div>
                    </div>

                    <div class="row" style="padding: 5%">
                        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" style="width:${percentVote1}%">
                                <strong id="strongProgress1" style="color: black;">${numeral(percentVote1).format('0,0.00')} %</strong>
                        </div>

                        <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style="width:${percentVote2}%">
                            <strong id="strongProgress2" style="color: black;">${numeral(percentVote2).format('0,0.00')} %</strong>
                        </div>
                    </div>

                    <div class="row" style="padding: 5%">
                    <div>Dân số: <b>${numeral(data.data.danso).format('0,0')} người</b></div>
                    </div>

                    <div class="row" style="padding-left: 5%">
                    <div>Số vote 1: <b>${numeral(data.data.vote1).format('0,0')} người</b></div>
                    </div>

                    <div class="row" style="padding-left: 5%">
                    <div>Số vote 2: <b>${numeral(data.data.vote2).format('0,0')} người</b></div>
                    </div>

                    <div class="row" style="padding-left: 5%">
                    <div>Chưa vote: <b>${numeral(data.data.danso - data.data.vote1 - data.data.vote2).format(0.0)} người</b></div>
                    </div>
                    `
                if(index != -1)
                {
                    mymap.removeLayer(listMaker[index].maker);
                    listMaker.splice(index, 1);
                    listMaker.push({gid : data.data.gid, maker : new L.marker(e.latlng).addTo(mymap).bindPopup(html).openPopup()})
                }
                else
                {
                    listMaker.push({gid : data.data.gid, maker : new L.marker(e.latlng).addTo(mymap).bindPopup(html).openPopup()})
                }
            }
        })
    });

    //Xu ly su kien Chuot phai tren Map
    mymap.on('contextmenu',function(e){
        
    });

    function containsObject(gid, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].gid === gid) {
                return i;
            }
        }
    
        return -1;
    }

    function resetAll() {
        checkAll((data) => {
            if(data.success)
            {
                let vote = parseInt(data.data.vote1) + parseInt(data.data.vote2)
                let percentVote1 = (parseInt(data.data.vote1) / vote) * 100
                let percentVote2 = (parseInt(data.data.vote2) / vote) * 100
    
                $("#province").text("Toàn quốc")
                $("#strong1").text(numeral(percentVote1).format('0,0.00') + "%")
                $("#strong2").text(numeral(percentVote2).format('0,0.00') + "%")
                $("#progress1").css("width", `${percentVote1}%`);
                $("#progress2").css("width", `${percentVote2}%`);
                $("#danso").text(numeral(data.data.danso).format('0,0') + " người")
                $("#vote1").text(numeral(data.data.vote1).format('0,0') + " người")
                $("#vote2").text(numeral(data.data.vote2).format('0,0') + " người")
                $("#chuavote").text(numeral(data.data.danso - data.data.vote1 - data.data.vote2).format(0.0) + " người")
            }
        })
    }
});