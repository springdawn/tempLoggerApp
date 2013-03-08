const serial = chrome.serial;
const device = "/dev/tty.usbmodemfd121";
var conId = -1;
var readStr = "";
var greeting = null;

//  webkitRequestFileSystem(TEMPORARY, 1024*1024, function(fs){
//      fs.root.getFile("mytxt.txt",{create:true},function(fe){
//          console.log("success");
//      }, errhandle)
//  }, errhandle);

var con = function() {
    serial.read(conId, 1, function(readInfo) {
        if(readInfo.bytesRead>0) {
            var arr = new Int8Array(readInfo.data);
            if(arr[0]===10) {
                data2display(readStr);
                readStr="";
            } else {
                readStr += String.fromCharCode(arr[0]);
                con();
            }
        }else {
            data2display(readStr);
            readStr = "";
        }
    });
}

var errhandle = function(e) {
    console.log(e);
}

var data2display = function(readData) {
    console.log("read:",readStr);
    readStr = readStr.substring(0, readStr.length-2);
    var now = new Date();
    var timestamp = now.getFullYear()+"/"+addZero(now.getMonth()+1)+"/"+addZero(now.getDate())+" "+addZero(now.getHours())+":"+addZero(now.getMinutes())+":"+addZero(now.getSeconds());
    document.querySelector("div").innerHTML += timestamp+"    "+readStr+"℃<br>";
    scr();
}

var stringToArrayBuffer = function(str, callback) {
  var blob = new Blob([str]);
  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result);
  }
  f.readAsArrayBuffer(blob);
}
var arrayBufferToString = function(buf, callback) {
  var blob = new Blob([buf]);
  var f = new FileReader();
  f.onload = function(e) {
    callback(e.target.result)
  }
  f.readAsText(blob);
}

var readData = function() {
    serial.write(conId, greeting, function(write){
        con();
    });
}

var addZero = function(val) {
    if(val<10) {
        val = "0"+val.toString();
    } else {
        val = val.toString();
    }
    return val;
}

stringToArrayBuffer("hi",function(data) {
    greeting = data;
});

serial.getPorts(function(ports) {
    ports.forEach(function(port) {
        if(port===device) {
            serial.open(port, function(openInfo) {
                conId = openInfo.connectionId;
                setInterval(readData, 2000);
            });
            return;
        }
    });
});

chrome.runtime.onSuspend.addListener(function() {
    serial.close(conId, function(){});
});
