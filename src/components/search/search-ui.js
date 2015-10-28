define(['text!./search.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var Search = function(params, componentInfo) {

            self = this;

            self.list = params.list;
            self.selected = params.selected;
            self.query = params.query;
            self.clear = params.clear;

            self.selectItem = function(){
                self.selected(this);
            };

        };

        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
        Search .prototype.dispose = function() {};

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new Search (params, componentInfo);
                }
            },
            template: template
        };
    });
