'use strict';

angular.module('Directives').directive('validatePath', function ($timeout) {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function(scope, elem, attrs, ctrl){
            if( !ctrl ){ return; }

            elem.on('keyup', function(event){
                $timeout(function(){
                    var value = ctrl.$viewValue;
                    var validPath = true;

                    if( !value ){ return; }

                    /**
                     *  We will perform this validations in order to determine whether a path is correct or not:
                     *  1. It doesn't have spaces
                     *  2. It doesn't have unwanted characters
                     *  3. It doesn't end with a colon (:)
                     *  4. The colons (:) are always right after a slash (/)
                     *  5. There aren't two or more slashes (/) next to each other
                     *  6. The colons (:) are followed by at least one allowed character except an slash (/)
                     */

                    // (1)
                    if( value.match(/\s/) ){ validPath = false; }

                    // (2)
                    if( validPath && value.match(/[^\w:-_\.\#\/+]/) ){ validPath = false; }

                    // (3)
                    if( validPath && value.match(/\:$/) ){ validPath = false; }

                    // (4)
                    // if( validPath ){}

                    ctrl.$setValidity('path', validPath);
                }, 0);
            });
        }
    };
});