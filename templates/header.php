<?php if ( ! is_front_page () ) : ?>

	<header class="banner container-fluid" role="banner" data-ng-app="angularPress">
		<div class="row">
			<div class="col-xs-12 col-sm-6">
				<div class="row">
					<div class="col-xs-4">
						<div class="header__col header__col--logo">
							<a class="brand" href="<?php echo home_url ( '/' ) ?>">
								<img src="<?php echo get_template_directory_uri (); ?>/assets/img/wordpress-angular.svg" class="img-responsive" />
							</a>
						</div>
					</div>
					<div class="col-xs-8">
						<div class="header__col header__col--title">
							<h1>
								<?php echo roots_title (); ?>
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-6">
				<div class="row">
					<div class="hidden-xs col-sm-1 col-sm-offset-6" data-ng-controller="personalNotesCtrl">
						<div class="nav__col nav__col--personal-notes hidden-xs" >
							<span class="glyphicon glyphicon-pencil"></span>
							<div class="personal-notes__content">
								<div class="personal-notes__content--input">
									<textarea class="disable-nav" data-ng-model="personalNote" data-ng-change="personalNoteUpdate()" cols="90" rows="20"></textarea>
								</div>
								<div class="personal-notes__content--bottom">
									<span data-ng-click="getEmailAddress = !getEmailAddress">email</span>
									<div data-ng-show="getEmailAddress" class="email-notes-service">
										<input data-ng-model="emailAddress" placeholder="Email Address" />
										<div class="glyphicon glyphicon-envelope" data-ng-onclick="emailNotes()"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="hidden-xs col-sm-1">
						<div class="nav__col nav__col--footnotes">
							<span class="glyphicon glyphicon-star <?php echo ( get_field( 'foot_notes' ) ) ? 'glyphicon-star-has-content' : ''; ?>"></span>
							<div class="footnote-container footnote__content">
								<?php if ( get_field( 'foot_notes' ) ) : ?>
									<?php the_field ( 'foot_notes' ); ?>
								<?php else : ?>
									No Notes Available
								<?php endif; ?>
								<div class="footnote-container-bottom">
									Slide Notes
								</div>
							</div>

						</div>
					</div>
					<div class="hidden-xs col-sm-1">
						<div class="nav__col nav__col--top-menu">
							<span class="glyphicon glyphicon-align-justify"></span>
							<div class="top-menu-container top-menu__content">
								<nav class="nav-main" role="navigation">
									<?php
									if ( has_nav_menu ( 'primary_navigation' ) ) :
										wp_nav_menu ( array ( 'theme_location' => 'primary_navigation', 'menu_class' => 'nav' ) );
									endif;
									?>

								</nav>
								<div class="top-menu-container-bottom">
									Main Menu
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-3">
						<div class="nav__col nav__col--simple-navigation" ng-controller="simpleNavCtrl" data-ng-init="getSimpleNavLinks()">
							<div class="simple-navigation-icon">
								<span class="glyphicon glyphicon-chevron-left"
							      data-ng-click="navigate(previousPage)"
							      data-ng-disabled="!previousPage"
									></span>

							</div>
							<div class="simple-navigation-icon">
								<span class="glyphicon glyphicon-chevron-right"
							      data-ng-click="navigate(nextPage)"
							      data-ng-disabled="!nextPage"
									></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<div class="container">
		<div class="row">
			<div class="col-sm-12">
<?php endif;