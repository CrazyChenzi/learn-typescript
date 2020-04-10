var Tools;
(function (Tools) {
    var TIMEOUT = 100;
    var Ftp = /** @class */ (function () {
        function Ftp() {
            setTimeout(function () {
                console.log('Ftp');
            }, TIMEOUT);
        }
        return Ftp;
    }());
    Tools.Ftp = Ftp;
    var Http = /** @class */ (function () {
        function Http() {
            console.log('Http');
        }
        return Http;
    }());
    Tools.Http = Http;
    function parseURL() {
        console.log('parseURL');
    }
    Tools.parseURL = parseURL;
})(Tools || (Tools = {}));
new Tools.Ftp();
Tools.parseURL();
