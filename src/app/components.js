//
// Main component registry file. It is called once at application start. Any scaffolded component will be added here.
//

define(['knockout-utilities', 'router', 'dialoger', 'modaler', 'configs'],
    function(koUtilities, router, dialoger, modaler, configs) {
        'use strict';

        var Components = function() {};

        Components.prototype.registerComponents = function() {
            router.registerPage('main');

            koUtilities.registerComponent('map-custom');

            koUtilities.registerComponent('search');

            koUtilities.registerComponent('place-info');

            router.addRoute('', { pageName: 'main', title: 'Fantastic Map App' });

            // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

            //Register components, dialogs & pages here


        };

        return new Components();
    });
