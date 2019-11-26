'use strict';

angular.module('myApp').controller('RegisterCtrl', function($scope, $http, $location, $rootScope) {
  
  $scope.loginSuccess = '';
  $scope.loginError = '';

  // var baseUrl = 'http://192.168.1.38:3000/';
  
  $scope.registerSubmit = function(form){    
  
    var data = {
      'name': form.$$controls[0].$viewValue,
      'password': form.$$controls[1].$viewValue
    };
  
    $http.post(baseUrl + 'users', data).then(function(response) {
      $scope.loginSuccess = '';
      $scope.loginError = '';
      if(response.status === 200){
        $scope.loginSuccess = 'User registration successfully';
        sessionStorage.userLogin = angular.toJson({login: 'true'});
        sessionStorage.userService = angular.toJson(response.data);
        $rootScope.loginUserFlag = false;
        if (response.data.data.role === 'admin'){
          sessionStorage.isUserRole = true;
          $rootScope.isAdmin = true;
        }else{
          $rootScope.isAdmin = false;
          sessionStorage.isUserRole = false;
        }        
        $location.path("/home");
      }else{
        sessionStorage.userLogin = angular.toJson();
        sessionStorage.userService = angular.toJson();
        $rootScope.loginUserFlag = true;
        $scope.loginError = 'Please try again later';
      }
    });

  }
});