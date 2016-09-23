(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
         });
        
        $stateProvider
            .state('landing', {
                url: '/',
                templateURL: '/templates/landing.html'
        })
            .state('album', {
                url: '/album', 
                templateURL: '/templates/album.html'
        });  
    }
    
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();