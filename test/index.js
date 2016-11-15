var express = require('express');
var http = require('http');
var assert = require('assert');

var socket = 'tmp.socket';

describe("req.href()", function suite() {
	var server, app;
	before(function() {
		app = require('..')(express());
		server = app.listen(socket);
	});
	after(function() {
		server.close();
	});

	it("Should return absolute url", function(done) {
		app.get('/absolute/*', function(req, res, next) {
			res.send(req.href());
		});
		var req = http.request({
			socketPath: socket,
			path: '/absolute/path?var=1'
		}, function(res) {
			res.on('data', (chunk) => {
				assert.equal(chunk.toString(), "http://localhost/absolute/path?var=1");
				done();
			});
		}).end();
	});

	it("Should return relative url", function(done) {
		app.get('/relative/*', function(req, res, next) {
			res.send(req.href('../../test?q=3'));
		});
		var req = http.request({
			socketPath: socket,
			path: '/relative/path/to/inner/dir?var=2'
		}, function(res) {
			res.on('data', (chunk) => {
				assert.equal(chunk.toString(), "http://localhost/relative/path/test?q=3");
				done();
			});
		}).end();
	});
});

