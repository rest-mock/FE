'use strict';

angular.module('Directives').directive('servicesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/services-list.html',
        link: function(){

        },
        controller: function($http, $rootScope, $scope){
            $http({
                method: 'GET',
                url: 'http://localhost:3000/services'
            })
            .success(function(response){
                $scope.services = response.services;
            })
            .error(function(response){
                console.log('error', response);
            });
        }
    };
});