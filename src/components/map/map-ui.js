define(['text!./map.html', 'knockout', 'jquery'],
    function(template, ko, $) {
        'use strict';

        var Map = function(params, componentInfo) {
            self = this;

            self.list = params.list;
            self.selected = params.selected;

            self.map = window.map;

            /** Create markers for all places */
            self.list().forEach(function(place){
                /** Create infoWindows for all places */
                place.infowindow = new google.maps.InfoWindow({
                    position: place.coords,
                    content: '<div><h5>'+place.name+'</h5></div>'
                });

                // Create a marker for each place
                place.marker = new google.maps.Marker({
                    position: place.coords,
                    map: self.map,
                    title: place.name
                });

                /** 
                 * Open the place's infoWindow when its marker is clicked
                 */
                google.maps.event.addListener(place.marker, 'click', (function(iw, places){
                    return function(){
                        /** Close all infowindows on the map */
                        places().forEach(function(place){
                            place.infowindow.close();
                        });
                        /** Open the current infowindow */
                        iw.open(this.map, this)
                    };
                })(place.infowindow, self.list));
            });
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