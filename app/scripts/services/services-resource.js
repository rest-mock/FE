'use strict';

angular.module('Services').factory('ServicesResource', function ($resource, CONFIG) {
    return $resource( CONFIG.RESOURCES.SERVICES.END_POINT );
});