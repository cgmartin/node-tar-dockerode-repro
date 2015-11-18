var Docker = require('dockerode');
var tarfs = require('tar-fs');
var tar = require('tar');
var fstream = require('fstream');
var fs = require('fs');
var path = require('path');
var URL = require('url');
var _ = require('lodash');
var concat = require('concat-stream');

var parsedUrl = URL.parse(process.env.DOCKER_HOST);
var options = {
	socketPath: false,
	host: parsedUrl.hostname, 
	port: parsedUrl.port,
	protocol: 'https' 
};

console.log(options);
if (process.env.DOCKER_CERT_PATH) {
	_.merge(options,{
		ca:  process.env.DOCKER_CERT_PATH && path.resolve(process.env.DOCKER_CERT_PATH, 'ca.pem'),
		cert: process.env.DOCKER_CERT_PATH && path.resolve(process.env.DOCKER_CERT_PATH, 'cert.pem'),
		key: process.env.DOCKER_CERT_PATH && path.resolve(process.env.DOCKER_CERT_PATH, 'key.pem')
	});
}
	
var docker = new Docker();

console.log('Using tar and fstream...');
fstream.Reader({ path: path.resolve('.'), type: "Directory"})	
    .pipe(tar.Pack({ fromBase: true, noProprietary: true }))	
    .pipe(concat(function (data) {
		docker.buildImage(data, {t: 'tar-app'}, dockerBuildDebug('tar'));
	}));
	
console.log('Using tar-fs (and tar-stream)...');
tarfs.pack(path.resolve('.'))    
	.pipe(concat(function (data) {
		docker.buildImage(data, {t: 'tarfs-app'}, dockerBuildDebug('tar-fs'));
	}));

function dockerBuildDebug(label) {
	return function(err, stream) {
		if (err) { return console.error(label, err); }
		if (stream) { stream.pipe(process.stdout); }
	};
}
