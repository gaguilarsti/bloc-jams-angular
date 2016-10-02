(function () {
    function SongPlayer() {
        
        /* 
        @desc the SongPlayer object declration.  We declare the object and then write action methods to it below.
        @type {Object}
        */
        var SongPlayer = {};
        
        
        /* 
        @desc the song that is currently selected by the user
        @type {Object}
        */
        var currentSong = null;
        
        /* 
        @desc Buzz object audio file
        @type {Object}
        */
        
        var currentBuzzOjbect = null;
        
        /**
        @function playSong
        @desc plays a song when the play button is selected and sets the playing status to true
        @param nothing
        **/
        
        var playSong = function (song) {
            currentBuzzOjbect.play();
            song.playing = true;
        };
        
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
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzOjbect.isPaused()) {
                    playSong(song);
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