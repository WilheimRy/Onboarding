



onboard_app.controller('Order', function ($scope, $http, $uibModal) {
    // by default, get all data
    $http.get("Order/GetOrders")
        .then(function (response) {
            var orders = response.data.orders;
            for (var i = 0; i < orders.length; i++) {
                var newdate = orders[i].OrderDate.toString().replace("/Date(", "").replace(")/", "");
                orders[i].OrderDate = newdate;
            }
            $scope.orders = orders;
            $scope.customers = response.data.customers;
            $scope.products = response.data.products;
            $scope.alldata = response.data;

        });


    //add an order
    $scope.openAddOneOrder = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceAddOneOrder',
            resolve: {
                data: function () {
                    return $scope.alldata;
                }
            }
        });
        //insert
        modalInstance.result.then(function (order) {
            $http.post("order/InsertOneOrder", order)
            .then(function () {
                //refresh
                $http.get("order/GetOrders").then(function (response) {
                    var orders = response.data.orders;
                    for (var i = 0; i < orders.length; i++) {
                        var newdate = orders[i].OrderDate.toString().replace("/Date(", "").replace(")/", "");
                        orders[i].OrderDate = newdate;
                    }
                    $scope.orders = orders;
                    $scope.customers = response.data.customers;
                    $scope.products = response.data.products;
                    $scope.alldata = response.data;
                });
            });

        }, function () {
        });

    }; // end of $scope.open

    //update an order
    $scope.openUpdateOneOrder = function (order) {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceUpdateOrder',
            resolve: {
                order: function () {
                    return order;
                }
            }
        });

        //to display the results
        modalInstance.result.then(function (order) {

            if (order != null) {
                //read the date from the seleted date(comes from the factory)
                var dtNumber = Number(order.OrderDate);
                var dt = new Date(dtNumber);
                order.OrderDate = dt;
                $http.post("order/UpdateOneOrder", order)
                     .then(function () {
                         $http.get("order/GetOrders")
                            .then(function (response) {
                                var orders = response.data.orders;
                                for (var i = 0; i < orders.length; i++) {
                                    var newdate = orders[i].OrderDate.toString().replace("/Date(", "").replace(")/", "");
                                    orders[i].OrderDate = newdate;
                                }
                                $scope.orders = orders;
                                $scope.customers = response.data.customers;
                                $scope.products = response.data.products;
                                $scope.alldata = response.data;

                            });
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

    //delete an order
    $scope.openDeleteOneOrder = function (order) {

        var modalInstance = $uibModal.open({
            templateUrl: 'deleteModal',
            controller: 'ModalInstanceDeleteOneOrder',
            resolve: {
                order: function () {
                    return order;
                }
            }
        });

        //to display the results
        modalInstance.result.then(function (order) {

            if (order != null) {
                $http.post("order/DeleteOneOrder", order)
                     .then(function () {
                         $http.get("order/GetOrders")
                             .then(function (response) {
                                 var orders = response.data.orders;
                                 for (var i = 0; i < orders.length; i++) {
                                     var newdate = orders[i].OrderDate.toString().replace("/Date(", "").replace(")/", "");
                                     orders[i].OrderDate = newdate;
                                 }
                                 $scope.orders = orders;
                                 $scope.customers = response.data.customers;
                                 $scope.products = response.data.products;
                                 $scope.alldata = response.data;
                             });
                     });
            } else {
                $http.get("order/GetOrders")
                             .then(function (response) {
                                 var orders = response.data.orders;
                                 for (var i = 0; i < orders.length; i++) {
                                     var newdate = orders[i].OrderDate.toString().replace("/Date(", "").replace(")/", "");
                                     orders[i].OrderDate = newdate;
                                 }
                                 $scope.orders = orders;
                                 $scope.customers = response.data.customers;
                                 $scope.products = response.data.products;
                                 $scope.alldata = response.data;
                             });
            }
        }, function () { });

    }; // end of $scope.open


});

//add
onboard_app.controller('ModalInstanceAddOneOrder', function ($uibModalInstance, $http, $scope, data, orderDateFactory) {

    var allData = data;
    //bind customers and products dropdown
    $http.get("order/GetOrders")
    .then(function (response) {
        $scope.customers = response.data.customers;
        $scope.products = response.data.products;
    });

    //update price based on product
    $scope.updatePrice = function (productName) {

        var sendProductName = { productName: productName };
        $http.post("order/GetProductPriceByProductName", sendProductName)
        .then(function (response) {

            $scope.order.Price = response.data;
        });
    }

    $scope.title = "Add a new Order";

    $scope.ok = function (order) {
        //pass the date from the factory to the order
        order.OrderDate = orderDateFactory.date;
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

//update
onboard_app.controller('ModalInstanceUpdateOrder', function ($uibModalInstance, $http, $scope, order, orderDateFactory) {

    $scope.title = "Update an order";

    //pass OrderId to view
    $scope.order = order;

    //pass the date in the order to datepicker for display
    $scope.dt = order.OrderDate;


    //bind customers and products dropdown
    $http.get("order/GetOrders")
    .then(function (response) {
        $scope.customers = response.data.customers;
        $scope.products = response.data.products;
    });

    //update price based on product
    $scope.updatePrice = function (productName) {
        var sendProductName = { productName: productName };
        $http.post("order/GetProductPriceByProductName", sendProductName)
        .then(function (response) {
            $scope.order.Price = response.data;
        });
    }

    //pass the date from the factory to the order
    $scope.ok = function (order) {
        order.OrderDate = orderDateFactory.date;
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(null);
    };
});

//delete
onboard_app.controller('ModalInstanceDeleteOneOrder', function ($uibModalInstance, $scope, order) {
    $scope.order = order;
    $scope.title = "Delete the order";
    $scope.ok = function (order) {
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(null);
    };
});


//datepicker
onboard_app.controller('DatepickerPopupDemoCtrl', function ($scope, orderDateFactory) {

    $scope.today = function () {
        var dtNumber = Number($scope.dt);

        if (dtNumber === NaN) {
            $scope.dt = new Date();
        } else {
            var dt = new Date(dtNumber);
            $scope.dt = dt;
        }
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled() {
        return null;
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    
    orderDateFactory.date = $scope.dt; //default value  ??

    //save the selected date in the factory
    $scope.select = function (dt) {
        orderDateFactory.date = dt; //seletec value
    };

    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});




