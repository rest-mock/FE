'use strict';

angular.module('Service').controller('ServiceCtrl', function ($rootScope, $scope, $routeParams, $location, ScenariosResource, currentService) {
    function createNewScenarioObject(){
        return {
            pathParams: angular.copy($scope.service.pathParams)
        };
    }

    $scope.service = {
        id: currentService.id,
        name: currentService.name,
        responses: currentService.responses,
        pathParams: currentService.params
    };

    // If there are only one method with scenarios, display it by default
    if( _.size($scope.service.responses) === 1 ){
        $location.search('method', _.keys($scope.service.responses)[0] );
    }

    $scope.currentMethod = $routeParams.method;
    $scope.newScenario = createNewScenarioObject();

    $scope.changeCurrentMethod = function(method){
        // var newValue = null;
        // if( $location.search().method !== method ){
        //     newValue = method;
        // }
        $location.search('method', method);
    };

    $scope.addScenario = function(){
        var validResponse = true;

        try{
            JSON.parse($scope.newScenario.response);
        }catch(e){
            validResponse = false;
        }

        if( !validResponse ){
            window.alert('Response is not a valid json');
            return;
        }

        ScenariosResource.save({
            serviceId: $scope.service.id
        }, {
            service: $scope.service.id,
            method: $scope.newScenario.method,
            name: $scope.newScenario.name,
            response: $scope.newScenario.response,
            params: $scope.newScenario.pathParams
        }, function(response){
            //update scope with the new sceario so the ui shows it.
            if( !$scope.service.responses[ $scope.newScenario.method ] ){
                $scope.service.responses[ $scope.newScenario.method ] = [];
            }

            $scope.service.responses[ $scope.newScenario.method ].push( _.extend({}, $scope.newScenario, {id: response.id}) );

            if( $routeParams.method !== $scope.newScenario.method ){
                $scope.changeCurrentMethod($scope.newScenario.method);
            }

            $scope.newScenario = createNewScenarioObject();
        }, function(response){
            window.alert('there was an error');
            console.log('error', response);
        });
    };
});