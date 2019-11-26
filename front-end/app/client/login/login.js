'use strict';

angular.module('myApp').controller('LoginCtrl', function($scope, $http, $location, $rootScope) {

  $scope.loginSuccess = '';
  $scope.loginError = '';
  $scope.loginSubmit = function(form){
    var data = {
      'username': form.$$controls[0].$viewValue,
      'password': form.$$controls[1].$viewValue
    };
    $http.post(baseUrl + 'login', data).then(function(response) {
      $scope.loginSuccess = '';
      $scope.loginError = '';
      if(response.status === 200){
        $scope.loginSuccess = 'User login successfully';
        sessionStorage.userLogin = angular.toJson({login: 'true'});
        sessionStorage.userService = angular.toJson(response.data);

        if (response.data.data.role === 'admin'){
          sessionStorage.isUserRole = true;
          $rootScope.isAdmin = true;
        }else{
          $rootScope.isAdmin = false;
          sessionStorage.isUserRole = false;
        }
        
        $rootScope.loginUserFlag = false;
        $location.path("/home");
      }else{
        sessionStorage.userLogin = angular.toJson();
        sessionStorage.userService = angular.toJson();
        $scope.loginError = 'Please enter valid username and password';
        $rootScope.loginUserFlag = true;
      }
    });
  }
});