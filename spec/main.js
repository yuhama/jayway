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

  describe('Robot next state', function () {
    var initState = makeInitState({});

    it('should move north if given a forward command', function () {
      expect(initState.position).toEqual({ x: 0, y: 0 });
      var nextState = getNextState('forward', initState);
      expect(nextState.position).toEqual({ x: 0, y: 1 });
    });
    it('should face east if given a right command', function () {
      expect(initState.direction).toBe('north');
      var nextState = getNextState('right', initState);
      expect(nextState.direction).toBe('east');
    });
    it('should face west if given a left command', function () {
      expect(initState.direction).toBe('north');
      var nextState = getNextState('left', initState);
      expect(nextState.direction).toBe('west');
    });
  });
});