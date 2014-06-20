'use strict';

var blurFocusDirective = function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, elm, attr, ctrl) {
            if (!ctrl) {
                return;
            }

            ctrl.hasFocus = false;
            ctrl.hasVisited = false;

            elm.on('focus', function () {
                elm.addClass('has-focus');

                scope.$apply(function () {
                    ctrl.hasFocus = true;
                });
            });

            elm.on('blur', function () {
                elm.removeClass('has-focus');
                elm.addClass('has-visited');

                scope.$apply(function () {
                    ctrl.hasFocus = false;
                    ctrl.hasVisited = true;
                });
            });
            
            // elm.closest('form').on('submit', function () {
            //     elm.addClass('has-visited');

            //     scope.$apply(function () {
            //         ctrl.hasFocus = false;
            //         ctrl.hasVisited = true;
            //     });
            // });

        }
    };
};

angular.module('Directives').directive('input', blurFocusDirective);
angular.module('Directives').directive('select', blurFocusDirective);
