(function() {
  'use strict';

  function VehicleListController ($modal, genericService, vehiclesService) {
	  
        var vm = this;
       
        vm.items = [];
        vm.currentPage = 1;
        vm.totalItems = 0;
        vm.itemsPerPage = 10;
        vm.sortField = 'registration';
        vm.sortDirection = 'ASC';
        
        vm.onConfirmDeleteClick = function(item){
            
            var modalInstance = $modal.open({
              templateUrl: 'js/app/main/confirmation.tpl.html',
              controller: 'confirmController',
              size: 'md',
              resolve: {
                title: function(){return "messages.confirmation.title";},
                body: function () {return "vehicles.messages.delete.confirmation";}
              }
            });
    
            modalInstance.result.then(function () {
              vm.onDelete(item);
            }, function () {
              // Empty
            });
        };
    
        vm.onDelete = function (item) {
            vehiclesService.resource.remove({"id":item.id}, function () {
        		genericService.showMessage('vehicles.messages.delete.success');
            	vm.onSearch();
            });
        };
    
        vm.onSearch = function () {
            vehiclesService.resource.search({'page': vm.currentPage - 1, 'pageSize': vm.itemsPerPage, 'sortField': vm.sortField, 'sortDirection': vm.sortDirection}, function (result) {
                vm.items = result.list;
                vm.totalItems = result.total;
            });
            
        };
    
        vm.onPageChanged = function () {
            vm.onSearch();
        };
        
        // Call init methods
        vm.onSearch();
       
    }
  
    angular.module('cpFacturasApp').controller('vehicleListController', ['$modal', 'genericService', 'vehiclesService', VehicleListController]);

}());