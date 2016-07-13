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
            })
            .error(function(data) {
                console.log('Error: ' + data);
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

}
