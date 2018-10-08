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
function checkProvince(id, callback) {
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": `/checkprovince?id=${id}`,
        "method": "GET"
    }

    $.ajax(settings).done((result) => {
        callback(result)
    }).fail((err) => {
        callback({ success: false, error: "Lỗi kết nối Internet.Vui lòng thử lại" });
    });
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
