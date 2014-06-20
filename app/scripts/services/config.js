'use strict';

angular.module('Services').factory('CONFIG', function (PathManagerFactory) {
    var HOST = 'http://localhost';
    var PORT = '3000';
    var DOMAIN = HOST + ':' + PORT;

    return {
        RESOURCES: {
            SCENARIOS: {
                END_POINT: DOMAIN + '/services/:serviceId/scenarios',
                PARAMS: {
                    serviceId: '@'
                }
            },
            SERVICES: {
                END_POINT: DOMAIN + '/services',
                PARAMS: {}
            }
        }
    };
});