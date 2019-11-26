'use strict';

var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);
var baseUrl = 'http://192.168.1.38:3000/';
myApp.config(function($stateProvider) {  
  var defaultState = {
    name: 'loginDefault',
    url: '',
    templateUrl: 'client/login/login.html',
    controller: 'LoginCtrl'
  }

  var homeState = {
    name: 'home',
    url: '/home',
    templateUrl: 'client/home/home.html',
    controller: 'HomeCtrl'
  }

  var loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'client/login/login.html',
    controller: 'LoginCtrl'
  }

  var registerState = {
    name: 'register',
    url: '/register',
    templateUrl: 'client/register/register.html',
    controller: 'RegisterCtrl'
  }

  var logoutState = {
    name: 'logout',
    url: '/logout',
    controller: 'LogoutCtrl'
  }

  var bookState = {
    name: 'book',
    url: '/book',
    templateUrl: 'client/book/book.html',
    controller: 'BookCtrl'
  }

  var genresState = {
    name: 'genres',
    url: '/genres',
    templateUrl: 'client/genre/genre.html',
    controller: 'GenreCtrl'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
  $stateProvider.state(defaultState);
  $stateProvider.state(registerState);
  $stateProvider.state(logoutState);
  $stateProvider.state(bookState);
  $stateProvider.state(genresState);
});

myApp.run(function($rootScope, $location) {
  var loginFlg = JSON.parse(sessionStorage.getItem('userLogin'));
  if(loginFlg){
    $rootScope.loginUserFlag = false;
    if (sessionStorage.getItem('isUserRole')){
      $rootScope.isAdmin = true;
    }else{
      $rootScope.isAdmin = false;
    }
    $location.path('home');
  }else{
    $rootScope.loginUserFlag = true;
  }
})