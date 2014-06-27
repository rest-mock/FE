'use strict';

angular.module('Directives').directive('servicesList', function ($location) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/views/services-list.html',
        link: function(){

        },
        controller: function($rootScope, $scope, $route, ServicesResource){
            var activeService = {};
            $scope.servicesListOrder = 'name';

            $scope.changeActiveService = function(service){
                activeService.active = false;
                $scope.createScenarioActive = false;

                service.active = true;
                activeService = service;

                $location.path('service/'+service.id);
            };

            $scope.goCreateService = function(){
                activeService.active = false;
                $scope.createScenarioActive = true;

                $location.path('create-service');
            };

            ServicesResource.query(function(response){
                if( $route.current.params.serviceId ){
                    activeService = _.findWhere(response, {id: $route.current.params.serviceId});
                    activeService.active = true;
                }else{
                    $scope.createScenarioActive = true;
                }

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