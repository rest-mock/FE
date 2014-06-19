'use strict';

angular.module('Services').factory('PathManagerFactory', function () {
    var createInstance = function(path){
        return new PathManagerInstance(path);
    };

    function PathManagerInstance(pathGetter){
        this.path = pathGetter;

        this.hasParams = function(){
            var path = this.path();

            return path.match(/\/:\w/);
        };

        this.getParams = function(){
            var path = this.path();
            var params = [];

            var segments = path.split('/');
            _.each(segments, function(segment){
                if( segment.charAt(0) === ':' ){
                    params.push({
                        raw: segment,
                        key: segment.slice(1)
                    });
                }
            });

            return params;
        };
    }

    return {
        createInstance: createInstance
    };
});