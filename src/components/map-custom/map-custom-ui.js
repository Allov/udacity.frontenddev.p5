define(['text!./map-custom.html', 'knockout', 'google-maps'],
    function(template, ko, gmaps) {
        'use strict';

        var Map = function(params, componentInfo) {
            self = this;

            self.list = params.list;
            self.selected = params.selected;

            self.map = new gmaps.Map(document.getElementById('map'), {
                center: {lat: 34.023, lng: -118.390},
                zoom: 12,
                mapTypeControl: false
            });

            /** Create markers for all places */
            self.list().forEach(function(place){
                /** Create infoWindows for all places */
                place.infowindow = new gmaps.InfoWindow({
                    position: place.coords,
                    content: '<div><h5>'+place.name+'</h5></div>'
                });

                // Create a marker for each place
                place.marker = new gmaps.Marker({
                    position: place.coords,
                    map: self.map,
                    title: place.name
                });

                /**
                 * Open the place's infoWindow when its marker is clicked
                 */
                gmaps.event.addListener(place.marker, 'click', (function(place, selected){
                    return function(){
                        /** Set selected place */
                        selected(place);
                    };
                })(place, self.selected));
            });

            /**
             * Subscribe to the selected place for changes
             * - close other place infowindows
             * - pan to place's marker, pop-up place's infowindow
             */
            self.selected.subscribe((function(places){
                return function(selectedPlace){
                    /** Close all infowindows on the map */
                    places().forEach(function(item){
                        item.infowindow.close();
                    });

                    /** If a place is selected, open its infowindow */
                    if(selectedPlace){
                        selectedPlace.infowindow.open(selectedPlace.marker.map, selectedPlace.marker);
                        // Re-center the map
                        selectedPlace.marker.map.panTo(selectedPlace.coords);
                    }
                };
            })(self.list));

        };

        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
        Map.prototype.dispose = function() {};

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new Map (params, componentInfo);
                }
            },
            template: template
        };
    });
