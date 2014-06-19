'use strict';

angular.module('Services').factory('ScenariosResource', function ($resource) {
    return $resource('http://localhost:3000/services/:serviceId/scenarios', {serviceId: '@serviceId'});
});