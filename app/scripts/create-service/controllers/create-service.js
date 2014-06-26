'use strict';

angular.module('CreateService').controller('CreateServiceCtrl', function ($scope, $timeout, $routeParams, $location, ServicesResource, PathManagerFactory) {
    $scope.service = {
        pathParams: []
    };

    var pathManagerInstance = PathManagerFactory.createInstance(function(){
        return $scope.service.path;
    });

    $scope.handlePathChange = function(){
        if( !$scope.service.path ){
            $scope.service.pathParams = [];
            $scope.paramsInPath = false;
            $scope.service.mode = '';

            return;
        }
        
        $timeout(function(){
            $scope.paramsInPath = pathManagerInstance.hasParams();
            $scope.service.mode = $scope.paramsInPath ? 'dynamic' : '';

            if( !pathManagerInstance.hasParams() ){ return; }

            var newParams = pathManagerInstance.getParams();
            $scope.service.pathParams = _.map(newParams, function(variable, index){
                if( $scope.service.pathParams.length === 0 ){
                    return variable;
                }

                if( !$scope.service.pathParams[index] ){
                    return variable;
                }

                if( variable.raw !== $scope.service.pathParams[index].raw ){
                    return variable;
                }

                return $scope.service.pathParams[index];
            });
        }, 0);
    };

    $scope.saveService = function(){
        if( !$scope.service.name || !$scope.service.path || !$scope.service.mode ){
            return;
        }

        ServicesResource.save({
            path: $scope.service.path,
            name: $scope.service.name,
            mode: $scope.service.mode,
            params: $scope.service.pathParams
        }, function(response){
            $scope.service = {};

            $location.path('/service/'+response.id);
        }, function(response){
            console.log('error', response);
        });
    };

    $scope.$watch('service.path', $scope.handlePathChange);
});