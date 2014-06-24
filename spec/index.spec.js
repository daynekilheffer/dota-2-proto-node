describe('parser', function () {
	beforeEach(function() {
		this.addMatchers({
			toBeInstanceOf : function( expected ) {
				return this.actual instanceof expected && this.actual.length > 0;
			},
 
			toBeA: function( expected ) {
				return typeof this.actual === expected;
			}
		});
	});
	it('should return an object containing a DemoParser function', function () {
		var parser = require('..');
		expect(parser.DemoParser).toBeA('function');
	});
	it('should return an object containing a DotaParser function', function () {
		var parser = require('..');
		expect(parser.DotaParser).toBeA('function');
	});
});
