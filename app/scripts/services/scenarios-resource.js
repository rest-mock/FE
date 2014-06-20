'use strict';

angular.module('Services').factory('ScenariosResource', function ($resource, CONFIG) {
    return $resource( CONFIG.RESOURCES.SCENARIOS.END_POINT, CONFIG.RESOURCES.SCENARIOS.PARAMS);
});