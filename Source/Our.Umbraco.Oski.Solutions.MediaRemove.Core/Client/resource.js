angular.module("umbraco.resources")
        .factory("Our.Umbraco.Oski.Solutions.MediaRemove.Resource", function ($http) {
            return {
                getIncomingLinks: function (id) {
                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.GetIncomingLinks + "?contentId=" + id);
                },
                checkDescendants: function (id, isMedia) {
                    if (isMedia) {
                        return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.CheckMediaDescendantsForIncomingLinks + "?mediaId=" + id);
                    }

                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.CheckContentDescendantsForIncomingLinks + "?contentId=" + id);
                },
                getRebuildStatus : function() {
                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.GetRebuildStatus);
                },
                rebuild : function(id) {
                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.Rebuild + "?id=" + id);
                },
                getUnusedMedia : function() {
                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.GetUnusedMedia);
                },
                deleteUnusedMedia: function(ids) {
                    return $http.post(Umbraco.Sys.ServerVariables.OskiMediaRemove.DeleteUnusedMedia, ids);
                },
                getUnusedMediaStatus: function() {
                    return $http.get(Umbraco.Sys.ServerVariables.OskiMediaRemove.GetUnusedMediaStatus);
                }
            };
        });