'use strict';

var epsilon = require('./epsilon');
var factorial = require('./factorial');

/**
 * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
 * is a discrete probability distribution that expresses the probability
 * of a given number of events occurring in a fixed interval of time
 * and/or space if these events occur with a known average rate and
 * independently of the time since the last event.
 *
 * The Poisson Distribution is characterized by the strictly positive
 * mean arrival or occurrence rate, `λ`.
 *
 * @param {number} position location poisson distribution
 * @returns {number} value of poisson distribution at that point
 */
function poisson_distribution(lambda) {
    // Check that lambda is strictly positive
    if (lambda <= 0) { return null; }

    // our current place in the distribution
    var x = 0,
        // and we keep track of the current cumulative probability, in
        // order to know when to stop calculating chances.
        cumulative_probability = 0,
        // the calculated cells to be returned
        cells = {};

    // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function)
    function probability_mass(x, lambda) {
        return (Math.pow(Math.E, -lambda) * Math.pow(lambda, x)) /
            factorial(x);
    }

    // This algorithm iterates through each potential outcome,
    // until the `cumulative_probability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        cells[x] = probability_mass(x, lambda);
        cumulative_probability += cells[x];
        x++;
    // when the cumulative_probability is nearly 1, we've calculated
    // the useful range of this distribution
    } while (cumulative_probability < 1 - epsilon);

    return cells;
}

module.exports = poisson_distribution;
