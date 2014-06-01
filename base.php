<?php get_template_part ( 'templates/head' ); ?>
<body <?php body_class (); ?> >

<!--[if lt IE 9]>
<div class="alert alert-warning">
	<?php _e('You are using an <strong>outdated</strong> browser. Please
	<a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'roots'); ?>
</div>
<![endif]-->

<?php
do_action ( 'get_header' );

if ( ! is_front_page () ) {
	get_template_part ( 'templates/header' );
}
?>


<?php if ( ! is_front_page () ): ?>

	<div class="wrap" role="document">
		<div class="content">
			<main class="main" role="main">
				<?php include roots_template_path (); ?>
			</main>
			<!-- /.main -->
		</div>
		<!-- /.content -->
	</div><!-- /.wrap -->

<?php else: ?>
	<?php include roots_template_path (); ?>
<?php endif; ?>

<?php get_template_part ( 'templates/footer' ); ?>
</body>
</html>
