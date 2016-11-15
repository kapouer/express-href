express-href -- expose express request into req.href
====================================================

Usage
-----

```
var app = require('express-href')(require('express')());

app.use(function(req, res, next) {
	console.log("Absolute url", req.href());
	console.log("Relative url", req.href("../test/two?somequery"));
	next();
});
```

Warning
-------

This module enables `trust proxy`, so the application *must* run behind a proxy.

See http://expressjs.com/en/4x/api.html#app.settings.table for more info about that.

