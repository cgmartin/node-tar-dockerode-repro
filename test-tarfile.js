var tarfs = require('tar-fs');
var tar = require('tar');
var fstream = require('fstream');
var fs = require('fs');
var path = require('path');

console.log('Using tar and fstream...');
var writeStream = fs.createWriteStream('/tmp/node-tar.tar');
fstream.Reader({ path: path.resolve('./'), type: "Directory"})
     .pipe(tar.Pack({ fromBase: true, noProprietary: true }))
     .pipe(writeStream);
    
console.log('Using tar-fs (and tar-stream)...');
var writeStream2 = fs.createWriteStream('/tmp/node-tar-fs.tar');
tarfs.pack(path.resolve('./'))    
    .pipe(writeStream2);
    