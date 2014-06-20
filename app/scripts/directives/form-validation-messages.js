'use strict';

angular.module('Directives').directive('formValidationMessages', function (CONFIG) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/form-validation-messages.html',
        scope: {
            controller: '='
        },
        link: function(){
        },
        controller: function($scope){
            $scope.$watch('controller.showFormValidationMessage', function(showMessage){
                $scope.errors = [];

                if( !showMessage ){return;}

                _.each($scope.controller.$error, function(validity, key){
                    if( !validity ){ return; }
                    
                    $scope.errors.push({
                        message: CONFIG.ERROR_MESSAGES.DEFAULT[key.toUpperCase()]
                    });
                });
            }, true);
        }
    };
});