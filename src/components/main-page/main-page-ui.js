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
            self.places = ko.observableArray( [{
                    "name":"Santa Monica Pier",
                    "coords": {lat: 34.0099455, lng: -118.49637860000001}
                },
                {
                    "name":"Santa Monica State Beach",
                    "coords": {lat: 34.0072324, lng: -118.49369100000001}
                },
                {
                    "name":"Third Street Promenade",
                    "coords": {lat: 34.01627, lng: -118.49687}
                },
                {
                    "name":"Pacific Park",
                    "coords": {lat: 34.008456, lng: -118.49748699999998}
                },
                {
                    "name":"Palisades Park",
                    "coords": {lat: 34.023018, lng: -118.50947859999997}
                },
                {
                    "name":"Santa Monica Pier Aquarium",
                    "coords": {lat: 34.0104235, lng: -118.4959508}
                },
                {
                    "name":"Santa Monica Looff Hippodrome",
                    "coords": {lat: 34.0099455, lng: -118.4963786}
                },
                {
                    "name":"Muscle Beach",
                    "coords": {lat: 33.9854323, lng: -118.47270249999997}
                },
                {
                    "name":"Museum of Flying",
                    "coords": {lat: 34.0145512, lng: -118.4477099}
                },
                {
                    "name":"Santa Monica Museum of Art",
                    "coords": {lat: 34.057104, lng: -118.41755639999997}
                },
                {
                    "name":"Angels Attic",
                    "coords": {lat: 34.014686, lng: -118.49045380000001}
                },
                {
                    "name":"Universal Studios Hollywood",
                    "coords": {lat: 34.13811680000001, lng: -118.35337830000003}
                },
                {
                    "name":"Disneyland",
                    "coords": {lat: 33.815458, lng: -117.92358569999999}
                },
                {
                    "name":"Hollywood Walk of Fame",
                    "coords": {lat: 34.1017458, lng: -118.32719159999999}
                },
                {
                    "name":"Griffith Park",
                    "coords": {lat: 34.13655440000001, lng: -118.29419999999999}
                },
                {
                    "name":"Getty Center",
                    "coords": {lat: 34.0780358, lng: -118.47409540000001}
                },
                {
                    "name":"Griffith Observatory",
                    "coords": {lat: 34.119322, lng: -118.30015200000003}
                },
                {
                    "name":"TCL Chinese Theatre",
                    "coords": {lat: 34.1020231, lng: -118.34097120000001}
                },
                {
                    "name":"Hollywood Sign",
                    "coords": {lat: 34.1341151, lng: -118.3215482}
                },
                {
                    "name":"Walt Disney Concert Hall",
                    "coords": {lat: 34.0554362, lng: -118.24993999999998}
                },
                {
                    "name":"La Brea Tar Pits",
                    "coords": {lat: 34.0637876, lng: -118.35543369999999}
                },
                {
                    "name":"Hollywood Bowl",
                    "coords": {lat: 34.112224, lng: -118.3391279}
                },
                {
                    "name":"Staples Center",
                    "coords": {lat: 34.0430315, lng: -118.26684899999998}
                },
                {
                    "name":"Los Angeles Zoo",
                    "coords": {lat: 34.1549784, lng: -118.29718739999998}
                },
                {
                    "name":"Museum of Contemporary Art, Los Angeles",
                    "coords": {lat: 34.0504802, lng: -118.23854080000001}
                },
                {
                    "name":"Dolby Theatre",
                    "coords": {lat: 34.1026919, lng: -118.34041560000003}
                },
                {
                    "name":"L.A. Live",
                    "coords": {lat: 34.0447628, lng: -118.26542890000002}
                },
                {
                    "name":"Getty Villa",
                    "coords": {lat: 34.0452944, lng: -118.56521279999998}
                },
                {
                    "name":"Madame Tussauds Hollywood",
                    "coords": {lat: 34.101712, lng: -118.34153500000002}
                },
                {
                    "name":"Universal CityWalk",
                    "coords": {lat: 34.136315, lng: -118.35480100000001}
                },
                {
                    "name":"Runyon Canyon Park",
                    "coords": {lat: 34.11289229999999, lng: -118.35070669999999}
                },
                {
                    "name":"Dodger Stadium",
                    "coords": {lat: 34.07273560000001, lng: -118.24061560000001}
                },
                {
                    "name":"Petersen Automotive Museum",
                    "coords": {lat: 34.062348, lng: -118.36113360000002}
                },
                {
                    "name":"The Grammy Museum",
                    "coords": {lat: 34.0447868, lng: -118.26529820000002}
                },
                {
                    "name":"El Capitan Theatre",
                    "coords": {lat: 34.101195, lng: -118.33978000000002}
                },
                {
                    "name":"The Grove at Farmers Market",
                    "coords": {lat: 34.07142339999999, lng: -118.3577406}
                },
                {
                    "name":"Greek Theatre (Los Angeles)",
                    "coords": {lat: 34.11950569999999, lng: -118.29633150000001}
            }]);

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
