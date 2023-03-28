/**
 * 1. Import the `BASE_NUM` variable from the `constants.js` file
 *    and use it in the `add()` function to add it to the 2 parameters
 */
 const BASE_NUM = require('./constants.js');
//  add(BASE_NUM, BASE_NUM)

/**
 * 2. Use module.exports = { ... } to export 2 functions:
 *
 * 2.1. add(a, b)
 *    Takes 2 parameters `a` and `b` and returns their sum
 *    add to the `BASE_NUM` constant variable imported
 *
 * 2.2. subtract(a, b)
 *    Takes 2 parameters `a` and `b` and returns `b` - `a`
 */
module.exports = {
	add: function(a, b) {
		return a + b + BASE_NUM;
	},
	subtract: function(a, b) {
		return b - a;
	}
}