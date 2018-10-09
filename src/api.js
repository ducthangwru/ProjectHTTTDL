//File này là viết hàm ajax gọi api đã thiết lập

// Hàm lấy file GeoJSON
function getGeoJSON(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/geojson",
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin địa lý khi gửi tọa độ lên
function checkPoint(lat, lng, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/checkpoint?lat=${lat}&lng=${lng}`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin bầu cử toàn quốc
function checkAll(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/checkAll`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

//Hàm lấy thông tin địa lý theo id tỉnh
function checkProvince(id, check) {
    return new Promise((resolve, reject) => {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": `/checkprovince?id=${id}`,
            "method": "GET"
        }
    
        $.ajax(settings).done((result) => {
            if(check) {
                if((result.data.vote1 / (result.data.vote1 + result.data.vote2)) > 0.5)
                    resolve({color: "#ff0000"})
                else
                    resolve({color: "#00ff00"})
            } else {
                resolve(result)
            }
        }).fail((err) => {
            reject({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
        });
    })
}

function login(username, password, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/login",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
          "username": username,
          "password": password
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function getProvinces(callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/getProvinces",
        "method": "GET"
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}

function signup(username , password , province, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "/signup",
        "method": "POST",
        "data": {
          "username": username,
          "password": password,
          "province": province
        }
    }

    $.ajax(settings)
    .done((result) => {
        callback(result)
    }).fail((err) => {
        callback({success : false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
}


