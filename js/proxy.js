(function(window){
    // hashbang.js, models.js에 구현된 아이들을 가져온다.
    // detail 파라미터의 호출은 proxy.js에서 대리한다.
    // proxy 패턴!

    var stateSuperMart = {
        categoryName: '슈퍼마트',
        uvCatCode: 'SM',
        hasSuperMartResult: false
    };

    function init() {
        var hash = window.getHashToMap();

        if (!hash.hasSuperMartResult && hash.uvCatCode === 'SM') {
            stateSuperMart.categoryName = '전체';
            stateSuperMart.uvCatCode = '';
        }
    }




})(window);
