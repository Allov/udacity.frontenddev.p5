//
// Here you can modify the require.js configuration. This is the require.js configuration object as per http://requirejs.org/docs/api.html#config.
//

var require = {
    baseUrl: 'https://github.com/julianfresco/udacity.frontenddev.p5',
    paths: {
        'configs': './app/configs/configs',
        'configs-transforms': './app/configs/configs.local',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'jquery': 'bower_components/jquery/dist/jquery',
        'byroads': 'bower_components/byroads.js/dist/byroads',
        'knockout': 'bower_components/knockout/dist/knockout',
        'knockout-mapping': 'bower_components/knockout-mapping/knockout.mapping',
        'text': 'bower_components/requirejs-text/text',
        'lodash': 'bower_components/lodash/lodash',
        'knockout-validation': 'bower_components/knockout-validation/dist/knockout.validation',
        'dialoger': 'bower_components/koco-dialoger/src/dialoger',
        'modaler': 'bower_components/koco-modaler/src/modaler',
        'knockout-utilities': 'bower_components/koco-knockout-utilities/src/knockout-utilities',
        'router-event': 'bower_components/koco-router/src/router-event',
        'router-state': 'bower_components/koco-router/src/router-state-push'
    },
    packages: [
    { name: 'router',
      location: 'bower_components/koco-router/src',  // default 'packagename'
      main: 'router'                // default 'main'
    }],
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'knockout.validation': {
            deps: ['knockout']
        },
        'knockout-mapping': {
            deps: ['knockout']
        }
    }
};
