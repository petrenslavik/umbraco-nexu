angular.module('umbraco').controller('Our.Umbraco.Oski.Solutions.MediaRemove.DashboardController',
    ['$scope', 'Our.Umbraco.Oski.Solutions.MediaRemove.Resource', '$timeout', function ($scope, nexuResource, $timeout) {
        $scope.isLoading = true;
        $scope.RebuildStatus = {
            IsProcessing: true,
            ItemName: '',
            ItemsProcessed: 0
        };

        $scope.unusedMedia = {
            IsProcessingMedia: false,
            Data : []
        };
        $scope.filteredMedia = [];
        $scope.autoRefresh = true;
        $scope.exceptionListSource = null;
        $scope.exceptionSources = [];

        $scope.preventDelete = Umbraco.Sys.ServerVariable.OskiMediaRemove.PreventDelete;
        $scope.preventUnPublish = Umbraco.Sys.ServerVariables.OskiMediaRemove.PreventUnPublish;

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
            if ($scope.unusedMedia.IsProcessingMedia) {
                return;
            }
            nexuResource.getUnusedMedia()
                .then(function () {
                    $scope.getUnusedMediaStatus();
                });
        };

        $scope.getUnusedMediaStatus = function() {
            nexuResource.getUnusedMediaStatus()
                .then(function ({ data }) {
                    console.log(data);
                    $scope.unusedMedia = data;
                    data.Data.forEach((x) => {
                        x.ToRemove = true;
                        if (x.Source) {
                            try {
                                x.Source = JSON.parse(x.Source).src;
                            } catch (ex) {
                                console.log(ex);
                            }
                            if ($scope.exceptionSources.indexOf(x.Source) > -1) {
                                x.ToRemove = false;
                            }
                        }
                    });
                    $scope.filteredMedia = data.Data;
                    if ($scope.unusedMedia.IsProcessingMedia) {
                        $timeout(function () { $scope.getUnusedMediaStatus() }, 5000, true);
                    }
                });
        };

        $scope.deleteUnusedMedia = function () {
            if ($scope.filteredMedia.length == 0 && $scope.unusedMedia.IsProcessingMedia) {
                return;
            }
            let forDeleting = [];
            let forLeaving = [];
            $scope.filteredMedia.forEach((x) => {
                if (x.ToRemove) {
                    forDeleting.push(x);
                } else {
                    forLeaving.push(x);
                }
            });
            let ids = forDeleting.map(x => x.Id);
            nexuResource.deleteUnusedMedia(ids)
                .then(function () {
                    $scope.filteredMedia = forLeaving;
                });
        };

        $scope.$watch('autoRefresh', function () {
            if ($scope.autoRefresh === true) {
                $scope.getRebuildStatus();
            }
        }, true);


        $scope.showContent = function ( fileContent, fileName ) {
            $scope.exceptionListSource = fileName;
            $scope.exceptionSources = fileContent.split(/\r\n|\n/);;
            $scope.unusedMedia.Data.forEach((x) => {
                if ($scope.exceptionSources.indexOf(x.Source) > -1) {
                    x.ToRemove = false;
                } else {
                    x.ToRemove = true;
                }
            });
            $scope.filteredMedia = $scope.unusedMedia.Data;
        }

        $scope.getRebuildStatus();
        $scope.getUnusedMediaStatus();
    }]);