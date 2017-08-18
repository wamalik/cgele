var app = angular.module('golApp', ['ngSanitize']);

app.service('htmlConSrvce', function () {
    this.convertToHtml = function (text) {
        return angular.fromJson(JSON.stringify(text)
            .replace(new RegExp('br', 'gi'), '<br>')
            .replace(new RegExp('alive_cell', 'gi'), '&#x25FB;')
            .replace(new RegExp('dead_cell', 'gi'), '&#9641;'));
    }
});

app.service('stateNmingSrvce', function () {
    this.assignStateName = function (text) {
        if (text == "0") {
            return "Default State";
        }
        return "State " + text;
    }
});

// conway gol main angular controller
app.controller('golController', function ($scope, $http, $location, htmlConSrvce, stateNmingSrvce) {
    $scope.playGame = function () {
        var url = "/conwaygol/play/" + $scope.nbrOfGen;
        $http.get(url).success(function (response) {
            var data = response;
            var htmlGenerations = [];
            angular.forEach(data, function (value, key) {
                // adding the state/generations name
                value.num = stateNmingSrvce.assignStateName(value.num)
                value.view = htmlConSrvce.convertToHtml(value.view);

                this.push(key, value);
            }, htmlGenerations);
            $scope.generations = htmlGenerations;
            console.log($scope.generations);
        });
    };
});
