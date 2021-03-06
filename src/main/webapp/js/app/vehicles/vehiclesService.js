'use strict';

angular.module('cpFacturasApp').factory('vehiclesService', ['$resource', '$http', 'myConfig', function($resource, $http, myConfig) {
	
	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/vehicles/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });
    
    mixing.autocomplete = function (text) {
    	return $http.get(myConfig.apiUrl + '/vehicles/search', {params: {"searchText": text}});
    }
    
    return mixing;

}]);

angular.module('cpFacturasApp').factory('vehicleBrandsService', ['$resource', 'myConfig', function($resource, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/vehicles/brands/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });
    
    return mixing;

}]);

angular.module('cpFacturasApp').factory('vehicleModelsService', ['$resource', 'myConfig', function($resource, myConfig) {

	var mixing = {};
	
    mixing.resource = $resource(myConfig.apiUrl + '/vehicles/models/:id', {id: '@id'}, {
        search : {method: 'GET'},
        update: {method: 'PUT'},
        remove: {method: 'DELETE'}
    });
    
    return mixing;

}]);