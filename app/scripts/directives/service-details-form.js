'use strict';

angular.module('Directives').directive('serviceDetailsForm', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'scripts/directives/views/service-details-form.html',
        scope: {
            onSaveSuccess: '=',
            service: '@'
        },
        link: function(scope, el, attr){
            attr.$observe('service', function(value) {
                scope.service = JSON.parse(value);
            })
        },
        controller: function($rootScope, $scope, $timeout, PathManagerFactory, ServicesResource){
            var pathManagerInstance = PathManagerFactory.createInstance(function(){
                return $scope.service.path;
            });

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

                    $rootScope.$broadcast('serviceDetailsSaved', {
                        service: response
                    });

                    if( _.isFunction($scope.onSaveSuccess) ){
                        $scope.onSaveSuccess(response);
                    }
                }, function(response){
                    console.log('error', response);
                });
            };

            $scope.handlePathChange = function(){
                if( !$scope.service.path ){
                    $scope.service.pathParams = [];
                    $scope.paramsInPath = false;
                    $scope.service.mode = '';

                    return;
                }
                
                $timeout(function(){
                    $scope.paramsInPath = pathManagerInstance.hasParams();
                    // $scope.service.mode = $scope.paramsInPath ? 'dynamic' : '';

                    if( !pathManagerInstance.hasParams() ){ return; }

                    var newParams = pathManagerInstance.getParams();
                    $scope.service.pathParams = _.map(newParams, function(variable, index){
                        if( !_.isArray($scope.service.pathParams) ){
                            return variable;
                        }

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
            $scope.$watch('service.path', $scope.handlePathChange);
        }
    };
});