(function(window){

    _init();

    function _init() {
        _setHash();
        _setEvent();
        _request(_callback());
    }

    function _callback() {
        return {
            success: function (req) {
                console.log('success', req);
            },
            error: function (req, e) {
                console.log('error', req, e);
            }
        }
    }

    function _request(callback) {
        var req = new XMLHttpRequest();
        req.open('POST', 'http://192.168.0.14:8181/util/index.html', true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.onreadystatechange = function (e) {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback.success(req.responseText);
                } else {
                    callback.error(req, e);
                }
            }
        }
        req.send(_getHash().slice(1));
    }

    function _setEvent() {
        window.onhashchage = _setHash();
    }

    function _setHash(oData) {
        var hashMap = {
            default: {
                categoryName: '슈퍼마트',
                uvCatCode: 'SM',
                hasSuperMartResult: false
            }
        };

        if (!oData) {
            location.hash = _encodeHash(hashMap.default);
        }
    }

    function _getHash() {
        return window.decodeURIComponent(location.hash);
    }

    function _getHashToMap() {
        var hashString = _getHash(),
            hashArray = hashString.slice(1).split('&'),
            hashMap = {},
            temp;

        for (var i = 0, len = hashArray.length; i < len; i++) {
            temp = hashArray[i].split('=');
            hashMap[temp[0]] = temp[1];
        }

        return hashMap;
    }

    function _encodeHash(obj) {
        var hash = {
            mark: '#',
            data: []
        };

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                hash.data.push(key + '=' + window.encodeURIComponent(obj[key]));
            }
        }

        return hash.mark.concat(hash.data.join('&'));
    }

    window.getHash = _getHash;
    window.getHashToMap = _getHashToMap;

})(window);
