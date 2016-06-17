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
});