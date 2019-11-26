'use strict';

angular.module('myApp').controller('GenreCtrl', function($scope, $http) {
    
    $scope.generesData = {};
    $scope.generesSelectData = {};
    $scope.genersId = null;

    $http.get(baseUrl + 'genres').then(function(generes) {
        $scope.generesData = generes.data.data;    
    });

    $scope.genresEdit = function(id){
        $scope.genersId = id;        
        $http.get(baseUrl + 'genres/' + id).then(function(book) {            
            $scope.generesSelectData = book.data.data[0];
            $scope.genresName = book.data.data[0].name;
        });
    }
    
    $scope.genresUpdateSubmit = function($form){
        let constTemopData = {
            'name': $scope.genresName
        };

        $http.put(baseUrl + 'genres/' + $scope.genersId, constTemopData).then(function(bookUpdate) {
            $http.get(baseUrl + 'genres').then(function(generes) {
                $scope.generesData = generes.data.data;
                $('#myModalBook').modal('hide');
            });
        });
    }

    $scope.genresDelete = function(id){
        $http.delete(baseUrl + 'genres/' + id).then(function(book) {
            $http.get(baseUrl + 'genres').then(function(books) {
                $http.get(baseUrl + 'genres').then(function(generes) {
                    $scope.generesData = generes.data.data;
                });                
            });
        });
    }

    $scope.genresAddSubmit = function(formData){
        let genresData = {
            'name': $scope.genresName
        };
        $http.post(baseUrl + 'genres', genresData).then(function(genre) {
            $http.get(baseUrl + 'genres').then(function(generes) {
                $scope.generesData = generes.data.data;
                $('#myModalAdd').modal('hide');
                $scope.genresName = '';
            });                
        });
    }
});