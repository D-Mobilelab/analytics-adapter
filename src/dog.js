/**
 * @ngdoc object
 * @name dog
 *
 * @description
 * I'm dog module..
 */

module.exports = {

    /**
     * @ngdoc function
     * @name dog#hello
     * @methodOf dog
     *
     * @description Hello method
     *
      * @param {string} name name of the dog
     * @return {string} greeting from your dog
     * 
     * @example
     * <pre>
     * hello('pippo');
     * // hi, I am pippo, I am a dog!!
     * </pre>
     */

    hello: function(name){
        return 'hi, I am ' + name + ', I am a dog!!';
    }

};