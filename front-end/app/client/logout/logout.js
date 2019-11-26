'use strict';

angular.module('myApp').controller('LogoutCtrl', function($location, $http, $rootScope) {
    
    $http.get(baseUrl + 'logout').then(function(response) {
        sessionStorage.setItem('userLogin',  angular.toJson({'login': false}));
        sessionStorage.setItem('userService',  angular.toJson({}));
        $rootScope.loginUserFlag = true;
        $location.path('login');
    });
});