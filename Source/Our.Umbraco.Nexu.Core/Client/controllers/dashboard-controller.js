angular.module('umbraco').controller('Our.Umbraco.Nexu.DashboardController',
    ['$scope', 'Our.Umbraco.Nexu.Resource', '$timeout', function ($scope, nexuResource, $timeout) {
        $scope.isLoading = true;
        $scope.RebuildStatus = {
            IsProcessing: true,
            ItemName: '',
            ItemsProcessed: 0
        };

        $scope.links = [];
        $scope.autoRefresh = true;

        $scope.preventDelete = Umbraco.Sys.ServerVariables.Nexu.PreventDelete;
        $scope.preventUnPublish = Umbraco.Sys.ServerVariables.Nexu.PreventUnPublish;

        $scope.getRebuildStatus = function () {
            nexuResource.getRebuildStatus()
                .then(function (result) {
                    $scope.isLoading = false;
                    $scope.RebuildStatus = result.data;

                    if ($scope.RebuildStatus.IsProcessing && $scope.autoRefresh) {
                        $timeout(function () { $scope.getRebuildStatus() }, 5000, true);
                    }
                });
        };

        $scope.rebuild = function () {
            nexuResource.rebuild(-1)
                .then(function (result) {
                    $scope.getRebuildStatus();
                });

            $timeout(function () { $scope.getRebuildStatus() }, 500, true);
        };

        $scope.getUnusedMedia = function () {
            nexuResource.getUnusedMedia()
                .then(function ({ data }) {
                    data.forEach((x) => { x.ToRemove = true });
                    $scope.links = data;
                });
        };

        $scope.deleteUnusedMedia = function () {
            let forDeleting = [];
            let forLeaving = [];
            $scope.links.forEach((x) => {
                if (x.ToRemove) {
                    forDeleting.push(x);
                } else {
                    forLeaving.push(x);
                }
            });
            let ids = forDeleting.map(x => x.Id);
            nexuResource.deleteUnusedMedia(ids)
                .then(function () {
                    $scope.links = forLeaving;
                });
        };

        $scope.$watch('autoRefresh', function () {
            if ($scope.autoRefresh === true) {
                $scope.getRebuildStatus();
            }
        }, true);

        $scope.getRebuildStatus();

    }]);