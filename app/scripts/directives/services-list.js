'use strict';

angular.module('Directives').directive('servicesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/services-list.html',
        link: function(){

        },
        controller: function($rootScope, $scope, ServicesResource){
            ServicesResource.query(function(response){
                $scope.services = response;
            }, function(response){
                console.log('error', response);
            });
        }
    };
});