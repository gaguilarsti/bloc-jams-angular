(function () {
    function SongPlayer($rootScope, Fixtures) {
        
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
        @function stopSong
        @desc stops a song when the stop button is selected and sets the playing status to null
        @param nothing
        **/
        
        var stopSong = function (song) {
            currentBuzzOjbect.stop();
            song.playing = null;
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
            
            currentBuzzOjbect.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayer.currentTime = currentBuzzOjbect.getTime();
                });
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
        @desc Current playback time in seconds of currently playing song
        @type {number}
        */
        
        SongPlayer.currentTime = null;
        
        /** 
        @desc Volume of the song being played
        @type {number}
        */
        
        SongPlayer.volume = 80;
        
        
        
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
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /** 
        @function next
        @desc sets the song index when the user clicks next button to one value higher and cycles back to 0 when the song index exceeds the index.length.  
        @param {Object} song
        **/
        
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            var lastSongIndex = currentAlbum.songs.length - 1;
            
            if (currentSongIndex > lastSongIndex) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzOjbect) {
                currentBuzzOjbect.setTime(time);
            }
        };
        
        /**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
        
        SongPlayer.volume = function (volume) {
            if (currentSoundFile) {
                currentSoundFile.setVolume(volume);
            }
            
            SongPlayer.volume = volume;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
    
})();