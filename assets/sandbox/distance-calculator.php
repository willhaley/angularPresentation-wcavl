<?php
/**
 *
 */
if ( ! function_exists( 'Distance_Calculator_Shortcode' ) ) {

	class Distance_Calculator_Shortcode{


		function __construct() {

			add_shortcode ( 'distance_calc', array ( $this, 'add_shortcode' ) );

			add_action( 'wp_enqueue_scripts', array ( $this, 'wp_enqueue_scripts' ) );
		}

		function add_shortcode(){

			echo file_get_contents( dirname( __FILE__ ) . '/distanceCalc.html' );

		}

		function wp_enqueue_scripts(){

			wp_enqueue_script( 'google-maps', '//maps.googleapis.com/maps/api/js?libraries=geometry&sensor=true', array(), NULL, true );
			wp_enqueue_script( 'angular', '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js', array( 'google-maps' ), '1.2.16', true );
			wp_enqueue_script( 'ng-distance-calc', plugins_url( 'distanceCalc.js' , __FILE__ ) , array( 'angular' ), '1.0.0', true );

		}

	}

}

$distance_calculator_shortcode = new Distance_Calculator_Shortcode();

