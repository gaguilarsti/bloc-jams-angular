(function() {
    function SongPlayer() {
        var songPlayer = {};
        
        SongPlayer.play = function(song) {
            var currentBuzzObject = new buzz.sound(sound.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.play();
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer')
})