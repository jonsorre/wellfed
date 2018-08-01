<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Tasman
 */

?><!doctype html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">

	<?php get_template_part( 'template-parts/skip', 'links' );?>

	<header id="masthead" class="site-header" role="banner">
		<?php get_template_part( 'template-parts/header', 'image' );?>
		
			<?php

			// tasman_custom_logo();

			if ( is_front_page() && is_home() ) : ?>
					<div class="site-logo">
						<a href="<?php echo site_url(); ?>">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/wellfed-red.png" />
						</a>
					</div>
					<div class="site-branding">
					<!-- Begin MailChimp Signup Form -->
					<h5>love food.</h5>
					<p>Stay in the know about new episodes, events, and products 🍽️</p>
					<!-- <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"> -->
					<div id="mc_embed_signup">
						<form action="https://jonsorrentino.us12.list-manage.com/subscribe/post?u=170cc7d7b09ed97923ebe1131&amp;id=ebe9b04c09" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
							<div id="mc_embed_signup_scroll">

							<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Your email address here..." required>
							<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
							<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_170cc7d7b09ed97923ebe1131_ebe9b04c09" tabindex="-1" value=""></div>
							<div class="clear"><input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
							</div>
						</form>
					</div>

					<!--End mc_embed_signup-->
			<?php else : ?>
				<div class="site-logo">
						<a href="<?php echo site_url(); ?>">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/wellfed-white.png" />
						</a>
				</div>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php
			endif;

			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) : ?>
				<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
			<?php
			endif; ?>
		</div><!-- .site-branding -->

	</header><!-- #masthead -->

	<?php if( has_nav_menu( 'menu-1') ) : ?>
		<nav id="site-navigation" class="main-navigation" role="navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
				<?php
				echo tasman_get_svg( array( 'icon' => 'menu' ) ); /* WPCS: xss ok. */
				echo tasman_get_svg( array( 'icon' => 'close' ) ); /* WPCS: xss ok. */
				esc_html_e( 'Navigation', 'tasman' );
				?>
			</button>
			<?php
				wp_nav_menu( array(
					'theme_location' 	=> 'menu-1',
					'menu_id'        	=> 'primary-menu',
					'container_class' 	=> 'wrap'
				) );
			?>
		</nav><!-- #site-navigation -->
	<?php endif;?>

	<div id="content" class="site-content">
