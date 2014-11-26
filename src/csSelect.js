ng.module('smart-table')
 .directive('csSelect', [function () {
    return {
        require: '^stTable',
        template: '',
        scope: {
            row: '=csSelect',
            master: '=',
            rowCollection: '='
        },
        link: function (scope, element, attr, ctrl) {
        	scope.allSelected = false; // initial status. Used to ignore errors if some of the rows are changed before all select is used.
            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                    if(scope.master === true) {
                    	ctrl.selectMaster(scope.rowCollection);
                    	angular.forEach(scope.rowCollection, function(row) {
                    	    if(!row.isSelected || scope.allSelected){
                    			ctrl.select(row, 'multiple');
                    		}
                    	});
                    	scope.allSelected = !scope.allSelected;
                    }
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                } else {
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
}]);