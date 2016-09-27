(function () {
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso); //I don't know if this is right.
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();

//adding something to make a commit
