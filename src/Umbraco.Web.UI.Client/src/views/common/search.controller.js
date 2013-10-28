﻿/**
 * @ngdoc controller
 * @name Umbraco.SearchController
 * @function
 * 
 * @description
 * Controls the search functionality in the site
 *  
 */
function SearchController($scope, searchService, $log, navigationService) {

    $scope.searchTerm = null;
    $scope.searchResults = [];
    
    $scope.isSearching = false;

    //watch the value change but don't do the search on every change - that's far too many queries
    // we need to debounce
    $scope.$watch("searchTerm", $.debounce(400, function () {
        if ($scope.searchTerm) {
            $scope.isSearching = true;
            navigationService.showSearch();
            searchService.searchAll({ term: $scope.searchTerm }).then(function (result) {
                $scope.searchResults = result;
            });
        }
    }), true);

}
//register it
angular.module('umbraco').controller("Umbraco.SearchController", SearchController);