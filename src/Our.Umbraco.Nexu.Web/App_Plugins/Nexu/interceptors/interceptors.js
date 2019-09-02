﻿angular.module('umbraco.services').config([
    '$httpProvider',
    function ($httpProvider) {

        $httpProvider.interceptors.push(function () {
            return {
                'request': function (request) {


                    // Redirect any requests to built in content delete to our custom delete
                    if (request.url.indexOf("views/content/delete.html") === 0) {
                        request.url = '/App_Plugins/Nexu/views/content-delete.html';
                    }

                    // Redirect any requests to built in media delete to our custom delete
                    if (request.url.indexOf("views/media/delete.html") === 0) {
                        request.url = '/App_Plugins/Nexu/views/media-delete.html';
                    }

                    // Redirect requests to unpublish confirmation to our own (v7.12+)
                    if (request.url.indexOf("views/content/overlays/unpublish.html") === 0) {
                        request.url = '/App_Plugins/Nexu/views/unpublish.html';
                    }


                    return request;
                }
            };
        });

    }]);