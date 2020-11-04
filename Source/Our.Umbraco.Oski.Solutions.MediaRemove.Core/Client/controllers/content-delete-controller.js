angular.module('umbraco').controller('Our.Umbraco.Oski.Solutions.MediaRemove.ContentDeleteController',
    ['$scope', '$controller', 
    function ($scope, $controller) {
        $scope.isMedia = false;

        // inherit base delete controller        
        angular.extend(this, $controller('Our.Umbraco.Oski.Solutions.MediaRemove.BaseDeleteController', { $scope: $scope }));
    }]);