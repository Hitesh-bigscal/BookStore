'use strict';

angular.module('myApp').controller('BookCtrl', function($scope, $http) {
    
    $scope.bookData = {};
    $scope.generesData = {};
    $scope.bookId = null;
    $scope.selectBookdData = {};
    
    $http.get(baseUrl + 'books').then(function(book) {
        $scope.bookData = book.data.data;        
    });

    $http.get(baseUrl + 'genres').then(function(generes) {
        $scope.generesData = generes.data.data;
    });

    $scope.deleteBook = function(id){
        $http.delete(baseUrl + 'books/' + id).then(function(book) {
            $http.get(baseUrl + 'books').then(function(books) {
                $scope.bookData = books.data.data;
            });
        });
    }

    $scope.editBook = function(id){
        $scope.bookId = id;
        $http.get(baseUrl + 'books/' + id).then(function(book) {
            $scope.selectBookdData = book.data.data[0];
            $scope.bookName = book.data.data[0].name;
            $scope.bookDesc = book.data.data[0].description;
            $scope.genresId = book.data.data[0].genreId;
        });
    }

    $scope.bookUpdateSubmit = function($form){
        let constTemopData = {
            'name': $form.$$controls[0].$viewValue,
            'description': $form.$$controls[1].$viewValue,
            'genreId': $form.$$controls[2].$viewValue,
        };
        $http.put(baseUrl + 'books/' + $scope.bookId, constTemopData).then(function(bookUpdate) {
            $http.get(baseUrl + 'books').then(function(book) {
                $scope.bookData = book.data.data;
                $('#myModalBook').modal('hide');
            });
        });
    }

    $scope.bookAddSubmit = function(formData){
        let bookData = {
            'name': formData.$$controls[0].$viewValue,
            'description': formData.$$controls[1].$viewValue,
            'genreId': formData.$$controls[2].$viewValue,
        };
        $http.post(baseUrl + 'books', bookData).then(function(genre) {
            $http.get(baseUrl + 'books').then(function(book) {
                $scope.bookData = book.data.data;
                $('#myModalAddBook').modal('hide');               
                $scope.bookNameNew = '';
                $scope.bookDescNew = '';
                $scope.genresIdNew = '';
            });
        });
    }
});