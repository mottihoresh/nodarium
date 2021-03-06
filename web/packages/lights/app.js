'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Lights = new Module('Lights');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lights.register(function (app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Lights.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Lights.menus.add(
        {
            title: 'Light Fixtures',
            link: 'settings.lightFixtures',
            roles: ['authenticated'],
            menu: 'settings'
        }
    );

    Lights.menus.add(
        {
            title: 'Light Schedule',
            link: 'settings.lightschedule',
            roles: ['authenticated'],
            menu: 'settings'
        });

    /*
     //Uncomment to use. Requires meanio@0.3.7 or above
     // Save settings with callback
     // Use this for saving data from administration pages
     Lights.settings({
     'someSetting': 'some value'
     }, function(err, settings) {
     //you now have the settings object
     });

     // Another save settings example this time with no callback
     // This writes over the last settings.
     Lights.settings({
     'anotherSettings': 'some value'
     });

     // Get settings. Retrieves latest saved settigns
     Lights.settings(function(err, settings) {
     //you now have the settings object
     });
     */

    Lights.aggregateAsset('css', 'lights.css');
    return Lights;
});
