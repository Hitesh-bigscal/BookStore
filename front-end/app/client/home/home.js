'use strict';

angular.module('myApp').controller('HomeCtrl', function($scope, $http) {
    
    $scope.reviewData = {};
    $scope.generesData = {};
    $scope.selectGeneresClass = 0;
    $scope.selectGeneresBook = {};
    $scope.userId = 0;
    $scope.bookId = 0;

    $http.get(baseUrl + 'genres').then(function(response) {
        $scope.generesData = response.data.data;
    });
    
    $scope.getGeneresBook = function(id){
        $http.get(baseUrl + 'genres/books/' + id).then(function(response) {
            if(response.status === 200){
                $scope.selectGeneresBook = response.data.data;
            }else{
                $scope.selectGeneresBook = {};
            }
        });
    }

    $scope.selectBook = function(id){
        $scope.userId = JSON.parse(sessionStorage.getItem('userService')).data._id;
        $http.get(baseUrl + 'books/' + id).then(function(response) {
            if(response.status === 200){
                $scope.selectedGeneresBook = response.data.data[0];
                $scope.bookId = response.data.data[0]._id;                
                $http.get(baseUrl + 'review/' + $scope.bookId).then(function(review) {
                    $scope.reviewData = review.data.data;
                });
            }else{
                $scope.selectedGeneresBook = {};
            }
        });
    }

    $scope.reviewSubmit = function(form){        
        var data = {
            'rating': form.$$controls[1].$viewValue,
            'description': form.$$controls[0].$viewValue,
            'userId': $scope.userId,
            'bookId': $scope.bookId
        };        
        form.$$controls[1].$viewValue = '';
        $http.post(baseUrl + 'review', data).then(function(response) {
            $http.get(baseUrl + 'review/' + $scope.bookId).then(function(review) {
                $scope.reviewData = review.data.data;
            });
            document.getElementsByName("reviewForm")[0].reset();
        });
    }
});