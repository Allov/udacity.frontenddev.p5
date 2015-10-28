define(['text!./map.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var Map = function(params, componentInfo) {
            self = this;

            self.list = params.list;
            self.selected = params.selected;

        };

        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
        Map .prototype.dispose = function() {};

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new Map (params, componentInfo);
                }
            },
            template: template
        };
    });
