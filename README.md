express-href -- expose express request into req.href
====================================================

Usage
-----

```
var app = require('express-href')(require('express')());

app.use(function(req, res, next) {
	res.send(`The request absolute url was ${req.href}`);
});
```

Warning
-------

This module enables `trust proxy`, so the application *must* run
behind a proxy.


