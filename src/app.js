var app = angular.module('robot', []);
app.controller('RobotController', function ($scope) {
  $scope.submit = function () {
    $scope.result = followCommands({}, $scope.commands);
  };
});
