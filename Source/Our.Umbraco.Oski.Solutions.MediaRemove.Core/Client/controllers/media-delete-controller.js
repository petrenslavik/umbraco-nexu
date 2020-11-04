angular.module('umbraco').controller('Our.Umbraco.Oski.Solutions.MediaRemove.MediaDeleteController',
    ['$scope', '$controller', 
    function ($scope, $controller) {
        $scope.isMedia = true;

        // inherit base delete controller        
        angular.extend(this, $controller('Our.Umbraco.Oski.Solutions.MediaRemove.BaseDeleteController', { $scope: $scope }));
        
    }]);