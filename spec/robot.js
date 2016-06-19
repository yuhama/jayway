describe('Jayway robot test suite', function () {
  describe('Robot state init', function () {
    var initState = makeInitState({});

    it('should face north', function () {
      expect(initState.direction).toBe('north');
    });
    it('should start at 0,0', function () {
      expect(initState.position).toEqual({ x: 0, y: 0 });
    });
    it('should default to english', function () {
      expect(initState.language).toBe('english');
    });
    it('should default to bounds 5x5', function () {
      expect(initState.bounds).toEqual({ x: 5, y: 5 });
    });
  });

  describe('Getting a new position given an original position and a direction', function () {
    it('should handle going north', function () {
      var result = getNewPosition({ x: 0, y: 0 }, 'north');
      expect(result).toEqual({ x: 0, y: 1 });
    });
    it('should handle going east', function () {
      var result = getNewPosition({ x: 0, y: 0 }, 'east');
      expect(result).toEqual({ x: 1, y: 0 });
    });
    it('should handle going west', function () {
      var result = getNewPosition({ x: 0, y: 0 }, 'west');
      expect(result).toEqual({ x: -1, y: 0 });
    });
    it('should handle going south', function () {
      var result = getNewPosition({ x: 0, y: 0 }, 'south');
      expect(result).toEqual({ x: 0, y: -1 });
    });
  });

  describe('Getting a new direction given an original direction and a command', function () {
    it('should handle going left', function () {
      var result = getNewDirection('north', 'left');
      expect(result).toBe('west');
    });
    it('should handle going right', function () {
      var result = getNewDirection('north', 'right');
      expect(result).toBe('east');
    });
  });

  describe('Check bounds rectangle', function () {
    it('should return false if position is out of bounds', function () {
      var result = checkBounds({
        position: { x: -1, y: 0 },
        bounds: { x: 5, y: 5 }
      });
      expect(result).toBe(false);
      result = checkBounds({
        position: { x: 5, y: 0 },
        bounds: { x: 5, y: 5 }
      });
      expect(result).toBe(false);
    });
    it('should return true if position is inside of bounds', function () {
      var result = checkBounds({
        position: { x: 1, y: 1 },
        bounds: { x: 5, y: 5 }
      });
      expect(result).toBe(true);
    });
  });

  describe('Check bounds circle', function () {
    it('should return false if position is out of bounds', function () {
      var result = checkBounds({
        position: { x: 4, y: 3 },
        bounds: { r: 5 },
        shape: 'circle'
      });
      expect(result).toBe(false);
    });
    it('should return true if position is inside of bounds', function () {
      var result = checkBounds({
        position: { x: -1, y: -1 },
        bounds: { r: 5 },
        shape: 'circle'
      });
      expect(result).toBe(true);
    });
  });

  describe('Commands should be translated to common symbols', function () {
    it('should handle english', function () {
      var result = translateCommands('english', 'FFLR');
      expect(result).toEqual(['forward', 'forward', 'left', 'right']);
    });
    it('should handle swedish', function () {
      var result = translateCommands('swedish', 'GGVH');
      expect(result).toEqual(['forward', 'forward', 'left', 'right']);
    });
  });

  describe('Robot next state', function () {
    var initState = makeInitState({});

    it('should move north if given a forward command', function () {
      expect(initState.position).toEqual({ x: 0, y: 0 });
      var nextState = getNextState(initState, 'forward');
      expect(nextState.position).toEqual({ x: 0, y: 1 });
    });
    it('should face east if given a right command', function () {
      expect(initState.direction).toBe('north');
      var nextState = getNextState(initState, 'right');
      expect(nextState.direction).toBe('east');
    });
    it('should face west if given a left command', function () {
      expect(initState.direction).toBe('north');
      var nextState = getNextState(initState, 'left');
      expect(nextState.direction).toBe('west');
    });
    it('should be unable to move outside of bounds', function () {
      var nextState = getNextState(initState, 'left');
      nextState = getNextState(nextState, 'forward');
      expect(nextState.position).toEqual({ x: 0, y: 0 });
    });
  });

  describe('Robot follow commands', function () {
    it('should follow a series of commands', function () {
      var result = followCommands({}, 'FFLRRF');
      expect(result.position).toEqual({ x: 1, y: 2 });
      expect(result.direction).toBe('east');
    });
    it('should respect bounds', function () {
      var result = followCommands({}, 'LFFRRF');
      expect(result.position).toEqual({ x: 1, y: 0 });
      expect(result.direction).toBe('east');
    });
  });
});