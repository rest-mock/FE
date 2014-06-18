'use strict';

angular.module('CreateService').controller('CreateServiceCtrl', function ($scope, $timeout, $routeParams, $location, $http, PathManagerFactory) {
    $scope.service = {
        pathVariables: []
    };

    var pathManagerInstance = PathManagerFactory.createInstance(function(){
        return $scope.service.path;
    });

    // $scope.$watch('service.pathVariables', function(){
    //     console.log('%cWHAT PATH VAR','background: orange;');
    //     console.log($scope.service.pathVariables);
    // }, true);

    $scope.handlePathChange = function(){
        if( !$scope.service.path ){
            $scope.service.pathVariables = [];
            $scope.variablesInPath = false;
            $scope.service.mode = '';

            return;
        }
        
        $timeout(function(){
            $scope.variablesInPath = pathManagerInstance.hasVariables();
            $scope.service.mode = $scope.variablesInPath ? 'dynamic' : '';

            if( !pathManagerInstance.hasVariables() ){ return; }

            var newVariables = pathManagerInstance.getVariables();
            $scope.service.pathVariables = _.map(newVariables, function(variable, index){
                if( $scope.service.pathVariables.length === 0 ){
                    return variable;
                }

                if( !$scope.service.pathVariables[index] ){
                    return variable;
                }

                if( variable.raw !== $scope.service.pathVariables[index].raw ){
                    return variable;
                }

                return $scope.service.pathVariables[index];
            });
        }, 0);
    };

    $scope.saveService = function(){
        if( !$scope.service.name || !$scope.service.path || !$scope.service.mode ){
            window.alert('Complete all fields');
            return;
        }

        $http({
            method: 'POST',
            url: 'http://localhost:3000/services',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                path: $scope.service.path,
                name: $scope.service.name,
                mode: $scope.service.mode,
                params: $scope.service.pathVariables
            }
        }).
        success(function(response){
            $scope.service = {};

            $location.path('/service/'+response.id);
        });
    };

    $scope.$watch('service.path', $scope.handlePathChange);
});