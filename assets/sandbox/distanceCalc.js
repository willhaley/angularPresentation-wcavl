'use strict';

angular.module('calcDistance', ['ngResource', 'googleGeocode', 'calculateDistance']);

function calcDistanceCtrl($scope, googleGeocode, calculateDistance){

  $scope.raleigh = { lat: 35.792265, lng: -78.642996};

  $scope.calculateDistance = function(){

    if ( 5 == $scope.zipCode.toString().length ) {

      var coords = googleGeocode.byZipCode($scope.zipCode);

      coords.then(function(data){

          calculateDistance.setPointA($scope.raleigh);
          calculateDistance.setPointB({lat: data.lat(), lng: data.lng()});

          $scope.result = calculateDistance.calculate();

      });

      return;

    }

  }


}

/**
 * angular service that supports google maps based geocoding
 * requires the ngResource Lib to be loaded
 * returns the results in {lat: '', lng: ''} object
 */

angular.module('googleGeocode', ['ngResource', 'calculateDistance'])
    .service('googleGeocode', function($http, $q, $log){

      this.googleUrl = 'http://maps.googleapis.com/maps/api/geocode/xml?sensor=true';

      /**
       * Gets the latitude and longitude for a zipcode
       * @param zipCode
       * @returns {Function} promise
       */
      this.byZipCode = function(zipCode){

        var geocoder = new google.maps.Geocoder();
        var coords = $q.defer();
        geocoder.geocode({address: zipCode.toString()}, function(results, status) {

          if ( results.length > 1 ){
            coords.resolve(0);
          }

          if ( !! results[0].geometry.location ){
            coords.resolve(results[0].geometry.location);
          }
          else {
            coords.resolve(0);
          }
        });

        return coords.promise;

      }

      /**
       * Supports reverse geocoding by type of return
       * @param type
       * @param lat
       * @param lng
       * @returns {Function}
       */
      this.reverseGeocode = function(type, lat, lng){

        var result = $q.defer();
        var latlng = new google.maps.LatLng(lat, lng);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({latLng: latlng}, function(results, status){

          if ( status != 'OK' ){
            result.resolve('Unknown Error Occured');
          }
          switch ( type ){
            case 'zipCode':
              angular.forEach(results[0].address_components, function(value, key){
                if ( value.types.indexOf('postal_code') > -1 ){
                  result.resolve(value.short_name * 1);
                }
              });
              break;
            default:
              result.resolve(results[0].address_components);
              break;
          }

        });

        return result.promise;
      }

    });

angular.module('calculateDistance', [])
    .service('calculateDistance', function($q){

      this.radius = 3961;
      this.pointA = {};
      this.pointB = {};

      this.setPointA = function( latLng ) {
        this.pointA = latLng;
      };

      this.setPointB = function ( latLng ){
        this.pointB = latLng;
      }

      this.calculate = function(){

        var lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km;
        /*		console.log(this.pointA, this.pointB);
         */		// get values for lat1, lon1, lat2, and lon2
        // convert coordinates to radians
        lat1 = this.deg2rad(this.pointA.lat * 1);
        lon1 = this.deg2rad(this.pointA.lng * 1);
        lat2 = this.deg2rad(this.pointB.lat * 1);
        lon2 = this.deg2rad(this.pointB.lng * 1);

        // find the differences between the coordinates
        dlat = lat2 - lat1;
        dlon = lon2 - lon1;
        /*	console.log(dlon, dlat);
         */	// here's the heavy lifting
        a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
        c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
        dm = c * this.radius; // great circle distance in miles
        /*console.log(dm);
         */return this.round(dm);
      };

      this.calculateRouteDistance = function(){

        this.pointB = new google.maps.LatLng(this.pointB.lat, this.pointB.lng);
        var distance = $q.defer();

        var directionsService = new google.maps.DirectionsService();

        directionsService.route({ origin: this.pointA, destination:this.pointB, travelMode: google.maps.DirectionsTravelMode.DRIVING}, function(results, status) {
          if ( status == google.maps.DirectionsStatus.OVER_QUERY_LIMIT ){
            distance.resolve(false);
          }

          if (status == google.maps.DirectionsStatus.OK) {
            distance.resolve(results.routes[0].legs[0].distance.value * 0.00062137);
          } else {
            distance.resolve(false);
          }
        });

        return distance.promise;
      };

      this.deg2rad = function(deg) {
        return deg * Math.PI/180; // radians = degrees * pi/180
      };

      this.round = function(number){
        return Math.round( number * 1000) / 1000;
      }

    });