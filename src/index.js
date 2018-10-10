var mymap;
var lyrOSM;
var OSM;
var listMaker = []
var gid = 0
var dataChartGenderVote1 = []
var dataChartGenderVote2 = []

$(document).ready(function () {
    // Radialize the colors
    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
    });

    // Build the chart
    var chart1 = new Highcharts.chart({
        chart: {
            renderTo: 'chartGengerVote1',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Biểu đồ thống kê giới tính'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Tỷ lệ',
            data: dataChartGenderVote1
        }]
    });

    var chart2 = new Highcharts.chart('chartGengerVote2', {
        chart: {
            renderTo: 'chartGengerVote2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Biểu đồ thống kê giới tính'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Tỷ lệ',
            data: dataChartGenderVote2
        }]
    });
   
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
            // console.log(data.data)
            $.map(data.data,function(v,i){
                $("#slCitySignUp").append(
                    $("<option>" , {value: data.data[i].gid, text: data.data[i].ten.slice(data.data[i].ten.indexOf("Tỉnh") == 0 ? 4 : 9)})
                )
            })
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
                localStorage.setItem('user', JSON.stringify(data.data))
                if(data.data.vote == 1)
                {
                    $('#imgCuong').css('filter','brightness(20%)')
                    $('#imgThang').css('filter','brightness(100%)')
                }
                else 
                {
                    $('#imgThang').css('filter','brightness(20%)')
                    $('#imgCuong').css('filter','brightness(100%)')
                }

                $('#h5Username').text("Tài khoản: " + data.data.username)
                $('#h5Province').text("Tỉnh/Thành phố: " + data.data.ten)

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
                            gid = data.data.gid
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
                                        <img src="images/vote2.png" width="50px" height="50px" alt="">
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

    $("#btnThongKe").click(function() {
        dataChartGenderVote1 = []
        dataChartGenderVote2 = []
        if(gid == 0)
        {
            chartGenderAll((data) => {
                if(data.success)
                {
                    dataChartGenderVote1.push({ name: 'Nam', y: (parseInt(data.data.namvote1) / (parseInt(data.data.namvote1) + parseInt(data.data.nuvote1)) * 100)})
                    dataChartGenderVote1.push({ name: 'Nữ', y: (parseInt(data.data.nuvote1) / (parseInt(data.data.namvote1) + parseInt(data.data.nuvote1)) * 100)})
                    dataChartGenderVote2.push({ name: 'Nam', y: (parseInt(data.data.namvote2) / (parseInt(data.data.namvote2) + parseInt(data.data.nuvote2)) * 100)})
                    dataChartGenderVote2.push({ name: 'Nữ', y: (parseInt(data.data.nuvote2) / (parseInt(data.data.namvote2) + parseInt(data.data.nuvote2)) * 100)})

                    console.log(dataChartGenderVote2)
                    chart1.series[0].setData(dataChartGenderVote1);
                    chart2.series[0].setData(dataChartGenderVote2);
                }
            })
        }
        else
        {
            chartGenderProvince(gid, (data) => {
                if(data.success)
                {
                    dataChartGenderVote1.push({ name: 'Nam', y: (parseInt(data.data.namvote1) / (parseInt(data.data.namvote1) + parseInt(data.data.nuvote1)) * 100)})
                    dataChartGenderVote1.push({ name: 'Nữ', y: (parseInt(data.data.nuvote1) / (parseInt(data.data.namvote1) + parseInt(data.data.nuvote1)) * 100)})
                    dataChartGenderVote2.push({ name: 'Nam', y: (parseInt(data.data.namvote2) / (parseInt(data.data.namvote2) + parseInt(data.data.nuvote2)) * 100)})
                    dataChartGenderVote2.push({ name: 'Nữ', y: (parseInt(data.data.nuvote2) / (parseInt(data.data.namvote2) + parseInt(data.data.nuvote2)) * 100)})

                    chart1.series[0].setData(dataChartGenderVote1);
                    chart2.series[0].setData(dataChartGenderVote2);
                }
            })
        }

        $('#modalChart').modal('show')
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
        gid = 0

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

function voteFunc(votef) {
    let user = JSON.parse(localStorage.getItem('user'))
    vote(user.username, votef, (res) => {
        console.log(res)
        if(res.success)
        {
            if(votef == 1)
            {
                $('#imgCuong').css('filter','brightness(20%)')
                $('#imgThang').css('filter','brightness(100%)')
                alert("Vote cho Thắng thành công!")
            }
            else 
            {
                $('#imgThang').css('filter','brightness(20%)')
                $('#imgCuong').css('filter','brightness(100%)')
                alert("Vote cho Cường thành công!")
            }
        }
        else
            console.log(res.error)
    })
}