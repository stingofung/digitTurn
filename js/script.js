function include(scriptUrl) {
    document.write('<script type="text/javascript" src="' + scriptUrl + '"></script>');
};

/* Generic function to make an AJAX call */
var fetchData = function (query, dataURL) {
    // Return the $.ajax promise
    return $.ajax({
        type: "POST",
        url: dataURL,
        data: JSON.stringify(query),
        contentType: "application/json; charset=utf-8",
        data: query,
        dataType: "json"
    });
};

/* Return an array of objects according to key, value, or key and value matching */
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            // If key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') {
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
                // Only add if the object is not already in the array
                if (objects.lastIndexOf(obj) == -1) {
                    objects.push(obj);
                }
            }
    }
    return objects;
};

/* Return an array of values that match on a certain key */
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
};

/* Return an array of keys that match on a certain value */
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
};

String.prototype.trim = function (c) {
    return this.trimStart(c).trimEnd(c);
}
String.prototype.trimStart = function (c) {
    if (this.length == 0)
        return this;
    c = c ? c : ' ';
    var i = 0;
    var val = 0;
    for (; this.charAt(i) == c && i < this.length; i++);
    return this.substring(i);
}
String.prototype.trimEnd = function (c) {
    c = c ? c : ' ';
    var i = this.length - 1;
    for (; i >= 0 && this.charAt(i) == c; i--);
    return this.substring(0, i + 1);
}


$(function () {
    $('body').flowtype({
        fontRatio: 70
    });
    displayClock();
    checkDiplay();
    
    $('#queue-list').marquee({
        enable: true,
        direction: 'vertical',
        itemSelecter: 'li',
        delay: 3000,
        speed: 1,
        timing: 1,
        mouse: false
    });
    $('#marquee-content').marquee({
        enable: true,
        direction: 'horizontal',
        itemSelecter: 'li',
        delay: 3000,
        speed: 1,
        timing: 1,
        mouse: false
    });  
});

var videoList = ["v01.mp4", "v02.mp4", "v03.mp4"];
var videoIndex = 0;
var videoIndexRandom = 0;
var videoPlayer = null;
function startVideo() {
    $('.call-customer').css('display', 'none');
    $('.video-content').css('display', 'block');

    videoIndexRandom = Math.round(Math.random() * (videoList.length - 1));
    videoPlayer = document.getElementById('video-player');
    videoPlayer.setAttribute("src", "media/video/" + videoList[videoIndexRandom]);
    videoPlayer.play();
}

function playVideo() {
    //if (videoIndex < videoList.length - 1) {
    //    videoIndex++;
    //}
    //else {
    //    videoIndex = 0;
    //}

    videoIndexRandom = Math.round(Math.random() * (videoList.length - 1));
    videoPlayer.setAttribute("src", "media/video/" + videoList[videoIndexRandom]);
    videoPlayer.play();
}

function checkDiplay() {
    if ($('.call-customer').css('display') != "none") {
        displayCallCustomer();
    }
    else if ($('.video-content').css('display') != "none") {
        startVideo();
    }
};

function displayClock() {
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"]

    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

    setInterval(function () {
        var seconds = new Date().getSeconds();
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
        var minutes = new Date().getMinutes();
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
        var hours = new Date().getHours();
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);
};

function displayCallCustomer() {
    var audio = document.createElement("audio");

    $('.video-content').css('display', 'none');
    $('.call-customer').css('display', 'block');

    if (audio != null && audio.canPlayType && audio.canPlayType("audio/mpeg")) {
        audio.src = "media/audio/bell.mp3";

        audio.addEventListener("canplaythrough", function () {
            audio.play();
        }, false);
    }

    var secondWaiting = 0;
    setInterval(function () {
        secondWaiting += 1;
        if (secondWaiting == 25) {
            startVideo();
        }
    }, 1000);
};