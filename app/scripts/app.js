'use strict';

(function() {
  //My instagram client_id 
   var client_id = '11d22d9ad8e24f1ab405cfb1beb3f66e';

  //My instagram user_iD
  var user_id = '578493356';

  //https://www.instagram.com/oauth/authorize/?client_id=11d22d9ad8e24f1ab405cfb1beb3f66e&redirect_uri=https://ide.c9.io/labassedone/foryousis&response_type=token
   var access_token = '578493356.11d22d9.fd77ef6b2f5641959b83e4fd6eafc476';

  var app = angular.module('foryousis', []);

  app.factory('InstagramAPI', ['$http', function($http) {
    return {
      fetchPhotos : function(callback) {
        var endpoint = 'https://api.instagram.com/v1/users/';
        endpoint += user_id;
        endpoint += '/media/recent/?';
        endpoint += '?count=99';
        endpoint += '&callback=JSON_CALLBACK';
        endpoint += '&access_token=' + access_token;
        
        $http.jsonp(endpoint)
        .success(function(response) {
          callback(response.data);
        })
      }
    }
  }]);

//display images, limit to 9 photos
  app.controller('ShowImages', function($scope, InstagramAPI) {
    $scope.layout = 'grid';
    $scope.data = {};
    $scope.pics = [];

    InstagramAPI.fetchPhotos(function(data) {
      $scope.pics = data;
      $scope.quantity = 9;
    });
  });

})();
