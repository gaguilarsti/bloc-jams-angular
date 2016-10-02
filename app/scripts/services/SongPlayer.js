(function () {
    function SongPlayer(Fixtures) {
        
        /* 
        @desc the SongPlayer object declration.  We declare the object and then write action methods to it below.
        @type {Object}
        */
        var SongPlayer = {};
        
        /* 
        @desc gets the currentAlbum information
        @type {Object}
        */
        
        var currentAlbum = Fixtures.getAlbum();
        
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
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzOjbect = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /**
        @function getSongIndex
        @desc returns the song index of the song that is in the album.  
        @param {Object} song
        **/
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /* 
        @desc Active song object from list of songs
        @type {Object}
        */
        SongPlayer.currentSong = null;
        
         /**
         @function play
         @desc Play current or new song
         @param {Object} song
         **/
        
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzOjbect.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /** 
        @function pause
        @desc Pause current song
        @param {Object} song
        **/
        
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzOjbect.pause();
            song.playing = false;
        };
        
        /** 
        @function previous
        @desc sets the song index when the user clicks previous button to one value lower and stops at 0 and song playing when song index falls below 0.  
        @param {Object} song
        **/
        
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzOjbect.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
    
    
})();