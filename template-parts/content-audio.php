<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Tasman
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">

		<?php if( tasman_is_sticky() ) :?>
			<div class="sticky-label">
				<?php echo tasman_get_svg( array( 'icon' => 'star' ) ); // WPCS: XSS OK.?>
			</div>
		<?php endif;?>

		<?php if ( 'post' === get_post_type() ) : ?>
		<div class="entry-meta">
			<?php tasman_posted_on(); ?>
		</div><!-- .entry-meta -->
		<?php endif;?>

		<?php tasman_post_thumbnail();?>

		<?php
		if ( is_singular() ) :
			the_title( '<h1 class="entry-title">', '</h1>' );
		else :
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif;
		?>

		<?php if ( ! is_singular() && ! post_password_required() ) :?>
			<div class="entry-media">
				<?php echo tasman_media_grabber( array( 'type' => 'audio', 'split_media' => true ) ); // WPCS: XSS OK.?>
			</div>
		<?php endif;?>

		<div class="entry-dek">
			<h2><?php
			if ( is_singular() ) :
				the_field( 'post_dek');
			else :
				the_field( 'post_dek');
			endif;
			?></h2>
		</div>

	</header><!-- .entry-header -->


	<?php if( is_singular() || post_password_required() ) : ?>
	<div class="entry-content">
		<?php
			the_content();

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'tasman' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
	<?php else : ?>
	<div class="entry-summary">

		<a class="listen-link" href="<?php esc_url( the_permalink() ); ?>" title="<?php the_title(); ?>" rel="bookmark">
		Listen here
	</a>
	</div><!-- .entry-summary -->

	<?php endif;?>

	<footer class="entry-footer">
		<?php tasman_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
