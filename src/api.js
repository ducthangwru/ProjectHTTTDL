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
