var sharifRsvp = angular.module('sharifRsvp', []);

function mainController($scope, $http) {
    $scope.formData = {};
    // when landing on the page, get all rsvps and show them
    $http.get('/api/rsvps')
        .success(function(data) {
            $scope.rsvps = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createRsvp = function() {
        $http.post('/api/rsvps', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.rsvps = data;
                $scope.successTextAlert = "Thank you!";
                $scope.showSuccessAlert = true;
            })
            .error(function(data) {
              $scope.warningTextAlert = "Ooooops!";
              $scope.showWarningAlert = true;
            });
    };

    // delete a rsvp after checking it
    $scope.deleteRsvp = function(id) {
        $http.delete('/api/rsvps/' + id)
            .success(function(data) {
                $scope.rsvps = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.getTotals = function(){
      var totals = {};
      totals.all = totals.friday = totals.saturday = 0;
      for(var i = 0; i < $scope.rsvps.length; i++){
        var res = $scope.rsvps[i];
        if (res.attending == "true") {
          totals.all += res.number;
        }
        if (res.attending == "true" && res.friday === "x") {
          totals.friday += res.number;
        }
        if (res.attending == "true" && res.saturday === "x") {
          totals.saturday += res.number;
        }
      }
      return totals;
    };

    // $scope.getFriday = function(){
    //   var total = 0;
    //   for(var i = 0; i < $scope.rsvps.length; i++){
    //     var res = $scope.rsvps[i];
    //
    //   }
    //   return total;
    // };
    //
    // $scope.getSaturday = function(){
    //   var total = 0;
    //   for(var i = 0; i < $scope.rsvps.length; i++){
    //     var res = $scope.rsvps[i];
    //
    //   }
    //   return total;
    // };

}
