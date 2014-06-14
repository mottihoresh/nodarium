'use strict';

// The Package is past automatically as first parameter
module.exports = function(Sensors, app, auth, database) {

    app.get('/sensors/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/sensors/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/sensors/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/sensors/example/render', function(req, res, next) {
        Sensors.render('index', {
            package: 'sensors'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
