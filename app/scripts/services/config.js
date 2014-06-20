'use strict';

angular.module('Services').factory('CONFIG', function () {
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
        },
        ERROR_MESSAGES:{
            DEFAULT:{
                REQUIRED: 'It can\'t be empty.',
                PATH: 'The path format is incorrect.'
            },
            CUSTOM:{}
        }
    };
});