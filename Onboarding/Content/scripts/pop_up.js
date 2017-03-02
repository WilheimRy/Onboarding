angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($uibModal) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.open = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        //to display the results
        modalInstance.result.then(function (selectedItem) {
            debugger;
            $ctrl.selected = selectedItem;
            $ctrl.name = name;
            $ctrl.pwd = pwd;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    }; // end of $ctrl.open

}); // end of ModalDemoCtrl

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});