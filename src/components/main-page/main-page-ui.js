define(['text!./main-page.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var Main = function(params, componentInfo) {
            var self = this;

            self.params = params;
            self.searchQuery = ko.observable();
            self.selectedPlace = ko.observable();
            self.apis = {
                    wikipedia: "https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=true&prop=extracts&exintro=true&explaintext=true&exsectionformat=plain&titles="
            };

            /*
             * Places model
             */
            self.places = ko.observableArray( [{"name":"Santa Monica Pier"},
                {"name":"Santa Monica State Beach"},
                {"name":"Third Street Promenade"},
                {"name":"Pacific Park"},
                {"name":"Palisades Park"},
                {"name":"Santa Monica Pier Aquarium"},
                {"name":"Santa Monica Looff Hippodrome"},
                {"name":"Muscle Beach"},
                {"name":"Museum of Flying"},
                {"name":"Santa Monica Museum of Art"},
                {"name":"Angels Attic"},
                {"name":"Universal Studios Hollywood"},
                {"name":"Disneyland"},
                {"name":"Hollywood Walk of Fame"},
                {"name":"Griffith Park"},
                {"name":"Getty Center"},
                {"name":"Griffith Observatory"},
                {"name":"TCL Chinese Theatre"},
                {"name":"Hollywood Sign"},
                {"name":"Walt Disney Concert Hall"},
                {"name":"La Brea Tar Pits"},
                {"name":"Hollywood Bowl"},
                {"name":"Staples Center"},
                {"name":"Los Angeles Zoo"},
                {"name":"Museum of Contemporary Art, Los Angeles"},
                {"name":"Dolby Theatre"},
                {"name":"L.A. Live"},
                {"name":"Getty Villa"},
                {"name":"Madame Tussauds Hollywood"},
                {"name":"Universal CityWalk"},
                {"name":"Runyon Canyon Park"},
                {"name":"Dodger Stadium"},
                {"name":"Petersen Automotive Museum"},
                {"name":"The Grammy Museum"},
                {"name":"El Capitan Theatre"},
                {"name":"The Grove at Farmers Market"},
                {"name":"Greek Theatre (Los Angeles)"}
            ]);

            /*
             * Clears the search query
             */
            self.clearQuery = function(){
                    self.searchQuery('');
            };

            /*
             * Computes a filtered list of places based on the search query
             */
            self.filteredPlaces = ko.pureComputed(function(){
                var q = self.searchQuery();
                // If no search query, do not filter
                if (!q) {
                    return self.places();
                }
                // Search query present, filter places
                return self.places().filter(function(place){
                    return place.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
                });
            }).extend({ notify: 'always' });


            /*
             * Fetches data from Third-party API's when DOM is ready,
             * this improves the UX
             */
            self.fetchAPIdata = function(){
                    // Loop through places
                    self.places().forEach(function(item){
                        // Fetch Wikipedia data
                        (function(p){
                                $.ajax({
                                        type: "POST",
                                        dataType: 'jsonp',
                                        url: self.apis.wikipedia + p.name, 
                                        success: function( data ) {
                                                for(var val in data.query.pages ) {
                                                        if(data.query.pages[val].extract) {
                                                                p.description = data.query.pages[val].extract;
                                                        }
                                                }
                                        }
                                });
                        })(item);

                        // Fetch other data ...
                    });
            };

            /*
             * Invokes fetchAPIdata when DOM is loaded
             */
            $(self.fetchAPIdata);
            
        };

        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
        Main .prototype.dispose = function() {};

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new Main (params, componentInfo);
                }
            },
            template: template
        };
    });
