'use strict';

angular.module('Services').factory('ServicesResource', function ($resource) {
    return $resource('http://localhost:3000/services')
});