(function () {
    function AlbumCtrl() {
        this.album = angular.copy(albumPicasso); //I don't know if this is right.
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();