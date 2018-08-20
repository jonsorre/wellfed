<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Tasman
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', get_post_format() );

			if ( get_theme_mod( 'author_display', true ) == true ) {
				get_template_part( 'template-parts/biography' );
			}

			$next_post = get_next_post();
			$previous_post = get_previous_post();

			the_post_navigation( array(
			    'prev_text'                  => __( '%title' . get_the_post_thumbnail($previous_post->ID,'full'), 'tasman' ),
			    'next_text'                  => __( '%title' . get_the_post_thumbnail($next_post->ID,'full'), 'tasman' ),
			    'screen_reader_text'		 => __( 'Continue Reading', 'tasman' ),
			) );

			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
