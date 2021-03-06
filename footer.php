<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Tasman
 */

?>

	</div><!-- #content -->

	<?php get_sidebar();?>

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="wrap">

			<div class="footer-logo">
						<a href="<?php echo site_url(); ?>">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/images/wellfed-red.png" />
						</a>
			</div>

			<?php
			if ( has_nav_menu( 'menu-3' ) ) : ?>
				<nav class="page-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Page Links Menu', 'tasman' ); ?>">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'menu-3',
							'menu_class'     => 'page-links-menu',
							'depth'          => 1,
							'link_before'    => '<span class="footer-link">',
							'link_after'     => '</span>',
						) );
					?>
				</nav><!-- .social-navigation -->
			<?php endif;?>

			<?php
			if ( has_nav_menu( 'menu-2' ) ) : ?>
				<nav class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Social Links Menu', 'tasman' ); ?>">
					<?php
						wp_nav_menu( array(
							'theme_location' => 'menu-2',
							'menu_class'     => 'social-links-menu',
							'depth'          => 1,
							'link_before'    => '<span class="screen-reader-text">',
							'link_after'     => '</span>' . tasman_get_svg( array( 'icon' => 'share' ) ),
						) );
					?>
				</nav><!-- .social-navigation -->
			<?php endif;?>
			<span id="copyright-text">Copyright 🍽️ 2018 wellfed.</span>
		</div><!-- .wrap -->
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php tasman_return_to_top();?>

<?php wp_footer(); ?>

</body>
</html>
