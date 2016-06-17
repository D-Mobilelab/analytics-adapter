/**
 * @ngdoc object
 * @name cat
 *
 * @description
 * I'm cat module..
 */

module.exports = {

    /**
     * @ngdoc function
     * @name cat#hello
     * @methodOf cat
     *
     * @description Hello method
     *
     * @param {string} name name of the cat
     * @return {string} greeting from your cat
     * 
     * @example
     * <pre>
     * hello('pippo');
     * // hi, I am pippo, I am a cat!!
     * </pre>
     */

    hello: function(name){
        return 'hi, I am ' + name + ', I am a cat!!';
    }

};