define(['text!./main-page.html', 'knockout'],
    function(template, ko) {
        'use strict';

        var Main = function(params, componentInfo) {
            var self = this;

            self.params = params;

            // Define places model
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
                {"name":"The Grove"},
                {"name":"Greek Theatre"}
            ]);

            self.searchQuery = ko.observable();
            self.clearQuery = function(){
                    self.searchQuery('');
            };

            self.filteredPlaces = ko.pureComputed(function(){
                var q = self.searchQuery();
                // No search query, do not filter places
                if (!q) {
                    return self.places();
                }
                // Filter places
                return self.places().filter(function(place){
                    return place.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
                });
            }).extend({ notify: 'always' });

            self.selectedPlace = ko.observable();
            
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
