'use strict';
var through = require('through2');
var encode = require('./lib/encode');

module.exports = function (opts) {

    function rebase(file, encoding, callback) {
        var self = this;

        encode.stylesheet(file, opts, function (err, src) {
            if (err) {
                console.error(err);
            }
            file.contents = new Buffer(src);

            self.push(file);
            callback();
        });

    }

    return through.obj(rebase);
};

