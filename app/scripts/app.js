'use strict';

var _mainModules = [
    'Services'
    ,'Filters'
    ,'Directives'
    ,'ngRoute'
    ,'ngResource'
    ,'ngAnimate'
    ,'ngTouch'
    ,'Service'
    ,'CreateService'
    ,'ui.bootstrap'
    // yo:ngMainModules
];


angular.module('RESTMock', _mainModules )
    .config( function($routeProvider){
        //redirect any invalid hash to /home
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        var routes = [];

        routes.push({
            name: '/service/:serviceId?',
            params: {
                templateUrl: 'scripts/service/views/service.html',
                controller: 'ServiceCtrl',
                resolve: {
                    // We cannot use $routeParams here. As the route has not been resolved yet
                    // that object is not populated yet.
                    currentService: function($route, $q, ServicesResource){
                        var deferred = $q.defer();

                        ServicesResource.get({
                            serviceId: $route.current.params.serviceId
                        }, function(response){
                            deferred.resolve(response);
                        }, function(response){
                            deferred.reject(response);
                        });

                        return deferred.promise;
                    }
                }
            }
        });
        
        routes.push({
            name: '/create-service',
            params: {
                templateUrl: 'scripts/create-service/views/create-service.html',
                controller: 'CreateServiceCtrl'
            }
        });
        
// yo:ngRoutes

        routes.forEach(function(route){
            $routeProvider.when(route.name, route.params);
        });
    });