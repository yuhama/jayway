var commandDictionary = {
  swedish: {
    'G': 'forward',
    'V': 'left',
    'H': 'right'
  },
  english: {
    'F': 'forward',
    'V': 'left',
    'H': 'right'
  }
};

var directions = ['north', 'east', 'south', 'west'];

var directionValues = {
  north: { x:  0, y:  1 },
  east:  { x:  1, y:  0 },
  south: { x:  0, y: -1 },
  west:  { x: -1, y:  0 }
};

var makeInitState = function (configuration) {
  return {
    bounds: {
      x: 5,
      y: 5
    },
    position: configuration.startPosition || { x: 0, y: 0 },
    direction: 'north',
    language: configuration.language || 'english'
  };
};

var getNewPosition = function (position, direction) {
  var directionValue = directionValues[direction];

  return {
    x: position.x + directionValue.x,
    y: position.y + directionValue.y
  };
};

var getNewDirection = function (direction, command) {
  return 'north';
};

var makeNewState = function (state, change) {
  return _.merge({}, state, change);
};

var getNextState = function (command, state) {
  if (command === 'forward') {
    return makeNewState(state, {
      position: getNewPosition(state.position, state.direction)
    });
  } else {
    return makeNewState(state, {
      direction: getNewDirection(state.direction, command)
    });
  }
};

var translateCommands = function (state, string) {
  return string.split('').map(function (char) {
    return commandDictionary[state.configuration.language][char];
  });
};

var main = function () {
  var state = makeInitState({});

  console.log(state);

  var newState = getNextState('forward', state);

  console.log(newState);
};

main();