var mymap;
var lyrOSM;
var OSM;
var listMaker = []

$(document).ready(function () {
    $('#slBirthdaySignUp').html('')
    for (let i = 1930; i <= 2005; i++) {
        $('#slBirthdaySignUp').append(`
            <option value="${i}">${i}</option>
        `)
    }

    $('#slCitySignUp').html('')
    getProvinces((data) => {
        if(data.success)
        {
            for (let i = 0; i < data.data.length; i++) {
                $('#slCitySignUp').append(`
                    <option value="${data.data[i].gid}">${data.data[i].ten}</option>
                `)
            }
        }
    })

    $("#ipPassword , #ipUsername").on("keypress", function(e){
        if (e.which == 13)
            $("#btnLogin").click();
    })

    $("#btnSignup").click(function(){
       $('#modalSignup').modal('show')
    });

    $("#btnSignUpForm").click(function() {
        let username = $('#ipUsernameSignUp').val()
        let password = $('#ipPasswordSignUp').val()
        let province = $('#slCitySignUp').val()
        let gender = $('#slGenderSignUp').val()
        let birthday = $('#slBirthdaySignUp').val()

        if(!username)
            alert('Tài khoản không được để trống!')
        else if(!password)
            alert('Mật khẩu không được để trống!')
        else
        {
            signup(username, password, province, gender, birthday, (data) => {
                if(data.success)
                    alert('Đăng ký thành công!')
                else
                    alert('Đăng ký thất bại!')
            })

            $('#modalSignup').modal('hide')
        }
    })

    $("#btnLogin").click(function() {
        login($("#ipUsername").val(), $("#ipPassword").val(), (data) => {
           if(typeof data.data == 'undefined')
            {
                alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
            }
            else
            {
                $('#divLogin').fadeOut(500);
                $('#divIndex').fadeIn(800);

                mymap = L.map('map123',{center:[16.0472484, 108.1716864],zoom:5,zoomControl: false});
                L.control.pan().addTo(mymap);
                L.control.zoom().addTo(mymap);
                getGeoJSON(async (data) => {
                    for(let i = 0; i < data.features.length; i++) {
                        let color = await checkProvince(data.features[i].properties.OBJECTID, true);
                        data.features[i].color = color;
                    }
                    lyrOSM = L.geoJson(data, {
                        style: function(feature) {
                            return feature.color;
                        }
                    });

                    OSM = L.tileLayer.provider('Stamen.Watercolor');
                    // mymap.addLayer(OSM);
                    // mymap.addLayer(lyrOSM); 
                    L.layerGroup([OSM, lyrOSM]).addTo(mymap);
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
            }
        })
    })

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