define(['text!./place-info.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var PlaceInfo = function(params, componentInfo) {
            self = this;

            self.selected = params.selected;
            self.showDesc = ko.observable(false);

            /*
             * Close Place Info by unsetting selected place
             */
            self.close = function(){
                self.showDesc(false); // Reset showDesc boolean
                self.selected(null);
            };

            /*
             * Create a truncated description to show
             */
            self.truncatedDesc = ko.pureComputed(function(){
                if (self.selected() && self.selected().description) {
                    if(self.selected().description.length > 75) {
                        return self.selected().description.slice(0, 75) + ' ...';
                    }
                    return self.selected().description;
                }
                return '';
            }).extend({ notify: 'always' });

            /*
             * Toggle showDesc
             */
            self.showDescription = function(){
                self.showDesc(!self.showDesc());
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
