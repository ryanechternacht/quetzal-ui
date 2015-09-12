'use strict';

angular.module('step1', ['ngResource'])
.factory('Step1Srv', ['$resource', function($resource) {
	return $resource('data/:dataset.json', {}, {
		get: {method:'GET'}
	});
}])
.controller('Step1Ctrl', ['$scope', 'Step1Srv', function($scope, Step1Srv) {
    
    $scope.setActiveColumn = function(name) { 
        for(var c = 0; c < $scope.dataset.columns.length; c++) { 
            var col = $scope.dataset.columns[c];
            if(col.name == name) { 
                col.active = true;
                $scope.activeColumn = col;
            }
            else {
                col.active = false;
            }
        }
    };

	$scope.dataset = Step1Srv.get({dataset:'data'}, function (data) {
        $scope.setActiveColumn($scope.dataset.columns[0].name);
    });
}]);