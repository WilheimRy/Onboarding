﻿
var onboard_app = angular.module("onboard-app", ['ui.bootstrap']);

onboard_app.controller('Customer', function ($scope, $http, $uibModal) {
    $http.get("customer/GetCustomers")
                     .then(function (response) {
                         $scope.customers = response.data;
                     });

    //add
    $scope.openAdd = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceAdd',
            resolve: {

            }
        });

        //to display the results
        modalInstance.result.then(function (customer) {
            debugger;
            $http.post("customer/InsertCustomers", customer)
                     .then(function (response) {
                         $scope.customers = response.data;
                     });
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    }; // end of $scope.open

    //update
    $scope.openUpdate = function (customer) {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceUpdate',
            resolve: {
                customer: function () {
                    return customer;
                }
            }
        });
        //$scope.title = "Update new Customer";


        //to display the results
        modalInstance.result.then(function (customer) {

            if (customer != null) {
                $http.post("customer/UpdateOneCustomer", customer)
                     .then(function (response) {
                         $scope.customers = response.data;
                     });
            } else {
                $http.get("customer/GetCustomers")
                     .then(function (response) {
                         $scope.customers = response.data;
                     });
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    }; // end of $scope.open

    //delete
    $scope.openDelete = function (customer) {
        var modalInstance = $uibModal.open({
            templateUrl: 'deleteModal',
            controller: 'ModalInstanceDelete',
            resolve: {
                customer: function () {
                    return customer;
                }
            }
        });
        //$scope.title = "Update new Customer";


        //to display the results
        modalInstance.result.then(function (customer) {

            if (customer != null) {
                $http.post("customer/DeleteOneCustomer", customer)
                     .then(function (response) {
                         $scope.customers = response.data;
                     });
            } else {
                $http.get("customer/GetCustomers")
                     .then(function (response) {
                         $scope.customers = response.data;
                     });
            }
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });

    }; // end of $scope.open

});

//add
onboard_app.controller('ModalInstanceAdd', function ($uibModalInstance, $scope) {

    $scope.title = "Add a new Customer";
    $scope.ok = function (customer) {
        $uibModalInstance.close(customer);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//update
onboard_app.controller('ModalInstanceUpdate', function ($uibModalInstance, $scope, customer) {
    $scope.customer = customer;
    $scope.title = "Update a new Customer";
    $scope.ok = function (customer) {
        $uibModalInstance.close(customer);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(null);
    };
});

//delete
onboard_app.controller('ModalInstanceDelete', function ($uibModalInstance, $scope, customer) {
    $scope.customer = customer;
    $scope.title = "Delete Customer";
    $scope.ok = function (customer) {
        $uibModalInstance.close(customer);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(null);
    };
});