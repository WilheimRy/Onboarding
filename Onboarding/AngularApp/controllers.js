
onboard_app.controller('Customer',
    '$scope',
    '$http',
    function (scope, http) {

        $http.get("customer/index")
                 .then(function (response) {
                     $scope.customers = response.data;
                debugger;
            });

    });