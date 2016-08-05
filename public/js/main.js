
var app = angular.module('singlePage', [
  'ngRoute'
]);

app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "../partials/about.html", controller: "PageCtrl"})
    .when("/details", {templateUrl: "../partials/details.html", controller: "PageCtrl"})
    .when("/rsvp", {templateUrl: "../partials/rsvp.html", controller: "PageCtrl"})
    .when("/wedding-party", {templateUrl: "../partials/wedding-party.html", controller: "PageCtrl"})
    .otherwise("/404", {templateUrl: "../partials/404.html", controller: "PageCtrl"});
}]);


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  // Activates the Carousel
  // $('.carousel').carousel({
  //   interval: 5000
  // });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  });
});

function HeaderController($scope, $location)
{
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}
