var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var name = process.argv[2] 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var kittySchema = new mongoose.Schema({
        name: String
    });
    
    kittySchema.methods.speak = function () {
        var greeting = this.name
          ? "Meow name is " + this.name
          : "I don't have a name";
        console.log(greeting);
    }
      
    var Kitten = mongoose.model('Kitten', kittySchema);
    var fluffy = new Kitten({ name: name });
    // console.log(silence.name); // 'Silence'

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        //fluffy.speak();
        Kitten.find(function (err, kittens) {
            if (err) return console.error(err);
            kittens.forEach(element => {
                element.speak()
            })
        })
    });
});
