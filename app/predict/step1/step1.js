'use strict';

angular.module('step1', ['ngResource'])
.factory('Step1Srv', ['$resource', function($resource) {
	return $resource('data/:dataset.json', {}, {
		query: {method:'GET'}
	});
}])
.controller('Step1Ctrl', ['$scope', 'Step1Srv', function($scope, Step1Srv) {
	$scope.dataset = Step1Srv.get({dataset:'data'});
}]);