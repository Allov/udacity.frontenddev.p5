define(['text!./place-info.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var PlaceInfo = function(params, componentInfo) {
            self = this;

            self.selected = params.selected;

            self.close = function(){
                self.selected(null);
            };

        };

        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
        PlaceInfo .prototype.dispose = function() {};

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new PlaceInfo (params, componentInfo);
                }
            },
            template: template
        };
    });
