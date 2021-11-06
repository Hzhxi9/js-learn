var name = 'windows';

var ob = {
    name: 'object',
    getName: function(){
        var that = this
        return function(){
            return that.name
        }
    }
}

console.log(ob.getName()())