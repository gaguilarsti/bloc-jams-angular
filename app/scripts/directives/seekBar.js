(function () {
    function seekBar($document) {
        
        /*
        @desc calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occured.
        */
        var calculatePercent = function (seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html', //specifies the URL from which the directive will load a template
            replace: true, //Specifies what the template should replace.  If true, it replaces the directives element.  If false, it replaces the contents of the directive's element.
            restrict: 'E', //Restricts the directive to a specific declaration style: element 'E', attribute 'A', class 'C' and comment 'M'.  
            scope: {
                onChange: '&'
            },
            link: function (scope, element, attributes) {
                //directive logic return
                
                scope.value = 0;
                scope.max = 100;
                
                /*
                @desc Holds the element that matches the directive as a jQuery object so we can call jQuery methods on it. 
                */
                var seekBar = $(element);
                
                attributes.$observe('value', function (newValue) {
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function (newValue) {
                    scope.max = newValue;
                });
                
                
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                scope.fillStyle = function () {
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function () {
                    return {left: percentString()};
                };
                
                /*
                @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar.
                */
                scope.onClickSeekBar = function (event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                /*
                @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of the scope.value as the user drags the seek bar thumb.
                */
                
                scope.trackThumb = function () {
                    $document.bind('mousemove.thumb', function (event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function () {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function () {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();

