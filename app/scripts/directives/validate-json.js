'use strict';

angular.module('Directives').directive('validateJson', function ($timeout) {
    return {
        restrict: 'A',
        require: '^ngModel',
        link: function(scope, elem, attrs, ctrl){
            if( !ctrl ){ return; }

            elem.on('keyup', function(){
                $timeout(function(){
                    var value = ctrl.$viewValue;
                    var validJSON = true;

                    if( !value ){ return; }

                    try{
                        JSON.parse(value);
                    }catch(e){
                        validJSON = false;
                    }

                    ctrl.$setValidity('json', validJSON);
                }, 0);
            });
        }
    };
});