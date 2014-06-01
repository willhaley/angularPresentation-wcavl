<?php
/**
 * Custom functions
 */

if ( ! class_exists( 'Angular_Presentation' ) ) {

	class Angular_Presentation {

		function __construct () {

			add_action ( 'wp_enqueue_scripts',                      array ( $this, 'wp_enqueue_scripts' ) );
			add_action ( 'wp_enqueue_scripts',                      array ( $this, 'load_page_data' ) );

			add_action ( 'wp_ajax_angularPress_next_previous_page',          array ( $this, 'get_next_previous_page' ) );
			add_action ( 'wp_ajax_nopriv_angularPress_next_previous_page',   array ( $this, 'get_next_previous_page' ) );

			add_action ( 'wp_ajax_angularPress_getPersonalNoteID',           array ( $this, 'getPersonalNoteID' ) );
			add_action ( 'wp_ajax_nopriv_angularPress_getPersonalNoteID',    array ( $this, 'getPersonalNoteID' ) );



		}

		function wp_enqueue_scripts(){

			wp_enqueue_script ( 'angular', get_template_directory_uri() . '/assets/bower/angular/angular.min.js', array(), hash_file( 'md5',  get_template_directory_uri() . '/assets/bower/angular/angular.min.js' ) );

		}

		function load_page_data(){

			global $post;

			wp_localize_script ( 'angular', 'angularPress', array ( 'ajaxURL' => admin_url ( 'admin-ajax.php' ), 'currentMenuOrder' => $post->menu_order ) );

		}

		function get_next_previous_page(){

			/**
			 * @var $wpdb wpdb
			 */
			global $wpdb;

			if ( isset ( $_REQUEST[ 'current' ] ) ) {

				$sql = '
				SELECT \'nextPage\' as direction, ( SELECT `id` FROM ' .  $wpdb->posts . ' WHERE post_type = %s AND menu_order > %d ORDER BY menu_order LIMIT 1 ) as id
					UNION
				SELECT \'previousPage\' as direction, ( SELECT `id` FROM ' .  $wpdb->posts . ' WHERE post_type = %s AND menu_order < %d  ORDER BY menu_order DESC LIMIT 1 ) as id
				';

				$return =  $wpdb->get_results ( $wpdb->prepare ( $sql, 'page', $_REQUEST [ 'current' ], 'page', $_REQUEST[ 'current' ] ) );

				if ( $return ) {

					$array = array();

					foreach ( $return as $result ){

						is_front_page();

						if ( 1 == $_REQUEST [ 'current' ] && 'previousPage' == $result->direction ) {
							$array[ $result->direction ] = false;
							continue;
						}

						$array[ $result->direction ] = ( $result->id ) ? get_page_link( $result->id ) : false;

					}

					wp_send_json_success( $array );

				} else {

					wp_send_json_error( 0 );

				}

				die();

			} else {

				wp_send_json_error(0);
				die();

			}

		}

	}

}

$angular_presentation = new Angular_Presentation();