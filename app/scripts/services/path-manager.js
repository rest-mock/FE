'use strict';

angular.module('Services').factory('PathManagerFactory', function () {
    var createInstance = function(path){
        return new PathManagerInstance(path);
    };

    function PathManagerInstance(pathGetter){
        this.path = pathGetter;

        // this.getPath = function(){
        //     return this.path();
        // };

        this.hasVariables = function(){
            var path = this.path();

            return path.match(/\/:\w/);
        };

        this.getVariables = function(){
            var path = this.path();
            var variables = [];

            var segments = path.split('/');
            _.each(segments, function(segment){
                if( segment.charAt(0) === ':' ){
                    variables.push({
                        raw: segment,
                        key: segment.slice(1)
                    });
                }
            });

            return variables;
        };
    }

    return {
        createInstance: createInstance
    };
});