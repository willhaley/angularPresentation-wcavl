<?php
/**
 * Created by PhpStorm.
 * User: whaley
 * Date: 5/2/14
 * Time: 11:49 AM
 */
if ( ! class_exists( 'AA_Personal_Notes' ) ) {

	class AA_Personal_Notes {

		/**
		 * @var string
		 */
		public $personalNoteID;

		/**
		 * @var array
		 */
		public $notes;

		function __construct( $personalNoteID ) {
			$this->personalNoteID = $personalNoteID;
		}


		public function setNote( string $page_id,  AA_Personal_Note $note ){
			$this->notes[$page_id] = $note;
		}

		public function removeNote( string $page_id){
			unset ( $this->notes [ $page_id ] );
		}

	}

}

 