// TODO: read about stateProvider, urlRouterProvider
angular.module('scrutiny', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/home.html',
      controller: 'ResultController'
    })

  // $urlRouterProvider.otherwise('home');
})
.controller('MainController', ['$scope', 'sidebarForm',
  function($scope, sidebarForm) {

  }])
.factory('sidebarForm', [function() {

}])