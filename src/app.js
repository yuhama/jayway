var app = angular.module('robot', []);
app.controller('RobotController', function ($scope) {
  $scope.submit = function () {
    var bounds = $scope.shape === 'rectangle' ? {
        x: $scope.boundsX,
        y: $scope.boundsY
      } : { r: $scope.boundsR };

    $scope.result = followCommands({
      bounds: bounds,
      position: {
        x: $scope.startPositionX,
        y: $scope.startPositionY
      },
      language: $scope.language,
      shape:  $scope.shape
    }, $scope.commands);
  };

  $scope.boundsX = 5;
  $scope.boundsY = 5;
  $scope.boundsR = 5;
  $scope.startPositionX = 0;
  $scope.startPositionY = 0;
  $scope.language = 'english';
  $scope.shape = 'rectangle';
});
