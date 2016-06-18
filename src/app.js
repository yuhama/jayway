var app = angular.module('robot', []);
app.controller('RobotController', function ($scope) {
  $scope.submit = function () {
    $scope.result = followCommands({
      bounds: {
        x: $scope.boundsX,
        y: $scope.boundsY
      },
      position: {
        x: $scope.startPositionX,
        y: $scope.startPositionY
      },
      language: $scope.language
    }, $scope.commands);
  };

  $scope.boundsX = 5;
  $scope.boundsY = 5;
  $scope.startPositionX = 0;
  $scope.startPositionY = 0;
  $scope.language = 'english';
});
