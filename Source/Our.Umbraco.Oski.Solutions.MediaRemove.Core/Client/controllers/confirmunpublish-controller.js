angular.module('umbraco').controller('Our.Umbraco.Oski.Solutions.MediaRemove.ConfirmUnpublishController',
    [
        '$scope', '$controller', 'Our.Umbraco.Oski.Solutions.MediaRemove.Resource', 'editorState',
        function($scope, $controller, nexuResource, editorState) {
            angular.extend(this, $controller('Umbraco.Notifications.ConfirmUnpublishController', { $scope: $scope }));

            $scope.preventUnPublish = Umbraco.Sys.ServerVariables.Nexu.PreventUnPublish;
            $scope.allowUnPublish = true;

            $scope.links = {};
            $scope.descendantsHaveLinks = false;
            $scope.isLoading = true;

            var id = editorState.current.id;

            nexuResource.getIncomingLinks(id).then(function (result) {
                $scope.links = result.data;

                if (result.data.length == 0) {
                    nexuResource.checkDescendants(id, false).then(function (result) {
                        $scope.descendantsHaveLinks = result.data;
                        if ($scope.descendantsHaveLinks === "true" && $scope.preventUnPublish) {
                            $scope.allowUnPublish = false;
                        }
                        $scope.isLoading = false;
                    });
                } else {
                    // we found links, so prevent deleting if set in config
                    if ($scope.preventUnPublish) {
                        $scope.allowUnPublish = false;
                    }
                    $scope.isLoading = false;
                }

            });
        }
    ]);