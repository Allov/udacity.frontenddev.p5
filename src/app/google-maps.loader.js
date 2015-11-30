/** Add google maps to app */
define(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyBmc92xjnK-Pv9SXfL7rjY93BgAyoYXiC8'],
function(){
    console.log('Here we are...');
    // return the google-maps namespace for brevity
    return window.google.maps;
});