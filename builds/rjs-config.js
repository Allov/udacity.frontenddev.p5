'use strict';
// node modules
var fs = require('fs');
var vm = require('vm');
var _ = require('lodash');
var merge = require('deeply');
var babel = require('babel-core');
var babelConfig = require('./../configuration/babel-config');

// local libs

function rjsConfig(environment, includes, jsFiles, htmlFiles) {
    var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');

    // removes modules already in the paths configuration.
    var values = _.map(Object.keys(requireJsRuntimeConfig.paths), function(k) {
        return requireJsRuntimeConfig.paths[k];
    });

    _.remove(jsFiles, function(f) {
        return _.includes(values, f);
    });

    var requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        useStrict: true,
        paths: {
            requireLib: 'bower_components/requirejs/require',
            'configs-transforms': 'app/configs/configs.' + environment
        },
        include: [
            'requireLib',
            '../node_modules/babel-core/browser-polyfill'
        ].concat(includes, jsFiles, htmlFiles),
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        },
        onBuildRead: function(moduleName, filePath, contents) {
            if (contents && babelConfig.mustBeBabelified(filePath)) {
                return babel.transform(contents).code;
            }

            return contents;
        }
    });

    return requireJsOptimizerConfig;
}

module.exports = rjsConfig;
