'use strict';

angular.module('Directives').directive('servicesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/services-list.html',
        link: function(){

        },
        controller: function($rootScope, $scope, ServicesResource){
            $scope.servicesListOrder = 'name';

            ServicesResource.query(function(response){
                $scope.services = response;
            }, function(response){
                console.log('error', response);
            });

            $rootScope.$on('serviceAdded', function(e, params){
                $scope.services.push(params.service);
            });
        }
    };
});