var commandDictionary = {
  swedish: {
    'G': 'forward',
    'V': 'left',
    'H': 'right'
  },
  english: {
    'F': 'forward',
    'L': 'left',
    'R': 'right'
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
    bounds: configuration.bounds || {
      x: 5,
      y: 5
    },
    position: configuration.startPosition || { x: 0, y: 0 },
    direction: 'north',
    language: configuration.language || 'english'
  };
};

var checkBounds = function (state) {
  return state.position.x < state.bounds.x
      && state.position.y < state.bounds.y
      && state.position.x >= 0
      && state.position.y >= 0;
};

var getNewPosition = function (position, direction) {
  var directionValue = directionValues[direction];

  return {
    x: position.x + directionValue.x,
    y: position.y + directionValue.y
  };
};

var getNewDirection = function (direction, command) {
  var modifier = command === 'right' ? 1 : -1,
      currentDirectionIndex = directions.indexOf(direction),
      nextDirectionIndex = (currentDirectionIndex + modifier) % directions.length;

  // If going left from north we get negative 1 in nextDirectionIndex, but it should be 3.
  var fixedDirectionIndex = nextDirectionIndex === -1 ? 3 : nextDirectionIndex; 

  return directions[fixedDirectionIndex];
};

var makeNewState = function (state, change) {
  return _.merge({}, state, change);
};

var getNextState = function (state, command) {
  if (command === 'forward') {
    var newState = makeNewState(state, {
      position: getNewPosition(state.position, state.direction)
    });

    // If the new state is valid we return it
    // else the previous state (ie ignoring the command)
    if (checkBounds(newState)) {
      return newState;
    } else {
      return state;
    }
  } else {
    return makeNewState(state, {
      direction: getNewDirection(state.direction, command)
    });
  }
};

var translateCommands = function (language, string) {
  return string.split('').map(function (char) {
    return commandDictionary[language][char];
  });
};

var followCommands = function (configuration, string) {
  var initState = makeInitState(configuration);
  var translatedCommands = translateCommands(initState.language, string);

  return _.reduce(translatedCommands, getNextState, initState);
};
