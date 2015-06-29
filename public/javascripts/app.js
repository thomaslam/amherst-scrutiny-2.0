// TODO: read about stateProvider, urlRouterProvider
// angular.module('scrutiny', ['ui.router'])
// .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//   $stateProvider
//     .state('home', {
//       url: '/home',
//       templateUrl: '/home.html',
//       controller: 'MainController'
//     });

//   // $urlRouterProvider.otherwise('home');
// }])
// .controller('MainController', ['$scope', 'sidebarForm',
//   function($scope, sidebarForm) {

//   }])
// .controller('HomeController', ['scope',
//   function($scope) {

//   }])
// .factory('sidebarForm', [function() {

// }])

angular.module('scrutiny', [])
.service('queryresults', [
  '$http', 
  '$location',
  '$window',
  function($http, $location, $window) {
    // var dataToSend = $scope.formData;
    // return {
    //   dataToSend: dataToSend
    // }


    var changelocation = function(url, forceReload) {
      $scope = $scope || angular.element(document).scope();
      if(forceReload || $scope.$$phase) {
        $window.location = url;
      }
      else {
        //only use this if you want to replace the history stack
        //$location.path(url).replace();

        //this this if you want to change the URL and add it to the history stack
        $location.path(url);
          // use .search ?
        $scope.$apply();
      } 
    };

    var query = function(querydata) {
      return $http.post('/api/results', querydata)
        .success(function(data, status) {
          console.log('Success: Form submission');
          console.log(data);
          // $scope.changeLocation('/results', true);
          // $location.path('/results');
          // window.location('#/results');
        })
        .error(function(data, status) {
          console.log('Error: Form submission');
        })
        .then(function(res) {
          console.log('Redirecting...');
          console.log(res.data);
          // res.render('/results');
          // $location.path('/results');
          changeLocation('/results?department=2', true);
        })
    };

    return {
      query: query
    }
  }
])
.controller('MainController', [
  '$scope',
  '$http',
  '$location',
  '$window',
  'queryresults',
  // 'queryresults',
  function($scope, $http, $location, $window, queryresults) {
    $scope.formData = {};
    // $scope.dataToSend = queryresults.dataToSend;

    $scope.dataToSend = function() {
      return {
        department: $scope.formData.department,
        classid: $scope.formData.classid,
        classname: $scope.formData.classname,
        semester: $scope.formData.semester,
        professor: $scope.formData.professor
      }
    }

    $scope.searchResults = function() {
      // GET request to result page with
      // json data matching search query
      // var department = $scope.formData.department;
      // var classid = $scope.formData.classid;
      // var classname = $scope.formData.classname;
      // var semester = $scope.formData.semester;
      // var professor = $scope.formData.professor;

      var querydata = $scope.dataToSend();

      $http.post('/api/results', querydata)
        .success(function(data, status) {
          console.log('Success: Form submission');
          console.log(data);
          // $scope.changeLocation('/results', true);
          // $location.path('/results');
          // window.location('#/results');
        })
        .error(function(data, status) {
          console.log('Error: Form submission');
        })
        .then(function(res) {
          console.log('Redirecting...');
          console.log(res.data);
          // res.render('/results');
          // $location.path('/results');

          // TODO: Pass in all queries 
          var query = res.data[0];
          var department = "department=" + query.department;
          var classname = "classname=" + query.classname;
          var classid = "classid=" + query.classid;
          var professor = "professor=" + query.professor;
          var semester = "semester=" + query.semester;
          var querystr = department + 
                        "&" + classname + 
                        "&" + classid + 
                        "&" + professor + 
                        "&" + semester;
          $scope.changeLocation('/results?' + querystr, true);
        })
    };

    // TODO: HOW DOES THIS MAGIC WORK?????
    $scope.changeLocation = function(url, forceReload) {
      $scope = $scope || angular.element(document).scope();
      if(forceReload || $scope.$$phase) {
        $window.location = url;
      }
      else {
        //only use this if you want to replace the history stack
        //$location.path(url).replace();

        //this this if you want to change the URL and add it to the history stack
        $location.path(url);
          // use .search ?
        $scope.$apply();
      } 
    }
}])
// .factory('sidebarForm', [function($http){
//   var returnResults = function() {

//   };

//   return {
//     results: returnResults
//   }
// }])
