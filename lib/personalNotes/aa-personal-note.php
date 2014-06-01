<?php
/**
 * Created by PhpStorm.
 * User: whaley
 * Date: 5/2/14
 * Time: 11:47 AM
 */
if ( ! class_exists( 'AA_Personal_Note' ) ) {

	class AA_Personal_Note {

		/**
		 * @var string
		 */
		public $personalID;

		/**
		 * @var string
		 */
		public $pageID;

		/**
		 * @var string
		 */
		public $note;

		/**
		 * @return string
		 */
		public function getNotes() {
			return $this->$note;
		}

		/**
		 * @return string
		 */
		public function getPersonalID() {
			return $this->personalID;
		}

		/**
		 * @param string $personalID
		 */
		public function setPersonalID( $personalID ) {
			$this->personalID = $personalID;
		}

		/**
		 * @param string $note
		 */
		public function setNotes( $note ) {
			$this->note = $note;
		}

		/**
		 * @return string
		 */
		public function getPageID() {
			return $this->pageID;
		}

		/**
		 * @param string $pageID
		 */
		public function setPageID( $pageID ) {
			$this->pageID = $pageID;
		}


		public function saveNote( ){

			$tag = sprintf( 'APN%s%s', $this->personalID, $this->pageID );
			return set_transient( $tag,  $this->note, (24*60) );

		}

		public function retreiveNote(){
			return get_transient( sprintf( 'APN%s%s', $this->personalID, $this->pageID ) );

		}

	}

}

 