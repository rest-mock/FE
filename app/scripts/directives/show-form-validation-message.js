'use strict';

/**
 * This directives will check if the input is valid and add a showErrorMessage property to it, so the view can use it to display the error message.
 * This directives takes in consideration if the input is dirty and if it has already visited or not (if it hasn't, it means that the user is entering the value
 * for the first time, so we don't want the message to be showed as she types).
 *
 * @param
 * @returns
 */

angular.module('Directives').directive('input', function($timeout){
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function(scope, elm, attr, ctrl){
            if( !ctrl ){
                return;
            }

            ctrl.showFormValidationMessage = false;

            function checkIfMessageShouldShow(){
                $timeout(function(){
                    ctrl.showFormValidationMessage = ctrl.hasVisited && ctrl.$dirty && ctrl.$invalid;
                }, 0);
            }

            // keyup for text inputs
            // change for radiobuttons/checkboxes
            angular.forEach('keyup change'.split(' '), function(eventName){
                elm.on(eventName, function () {
                    checkIfMessageShouldShow();
                });
            });

            // we need to update the status of the error message when the ctrl.hasVisited value changes (that means, the first time the blur event is fired
            // on this input).
            scope.$watch(function(){
                return ctrl.hasVisited;
            }, function(){
                checkIfMessageShouldShow();
            });

        }
    };
});
