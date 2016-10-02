(function () {
    function SongPlayer() {
        var SongPlayer = {};
        
        var currentSong = null;
        
        /* 
        @desc Buzz object audio file
        @type {Object}
        */
        
        var currentBuzzOjbect = null;
        
        
        /*
        var playSong = function() {
            currentBuzzOjbect.play();
            song.playing = true;
        };
        
        */
        
        /**
        @function setSong
        @desc Stops currently playing song and loads new audio file as current
        @param {Object} song
        **/
        
        var setSong = function (song) {
            if (currentBuzzOjbect) {
                currentBuzzOjbect.stop();
                currentSong.playing = null;
            }
            
            currentBuzzOjbect = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        SongPlayer.play = function (song) {
            if (currentSong !== song) {
                setSong(song);
                currentBuzzOjbect.play();
                song.playing = true;
                
            } else if (currentSong === song) {
                if (currentBuzzOjbect.isPaused()) {
                    currentBuzzOjbect.play();
                }
            }
        };
        
        SongPlayer.pause = function (song) {
            currentBuzzOjbect.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
    
    
})();