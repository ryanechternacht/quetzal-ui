'use strict';

// Declare app level module which depends on views, and components
angular.module('quetzal-ui', [
  'ngRoute',
  'step1',
  'step2',
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/predict/step1', {
        templateUrl: 'predict/step1/step1.html',
        controller: 'Step1Ctrl'
    })
	.when('/predict/step2', {
    	templateUrl: 'predict/step2/step2.html',
    	controller: 'Step2Ctrl'
	})
	.when('/predict/step3', {
    	templateUrl: 'predict/step3/step3.html',
    	controller: 'Step3Ctrl'
	})
	.when('/predict/step4', {
    	templateUrl: 'predict/step4/step4.html',
    	controller: 'Step4Ctrl'
	})
	.when('/predict/step5', {
    	templateUrl: 'predict/step5/step5.html',
    	controller: 'Step5Ctrl'
	})
  	.otherwise({redirectTo: '/predict/step1'});
}]);
