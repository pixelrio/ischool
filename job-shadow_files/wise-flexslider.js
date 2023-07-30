/**
 * @file
 * Start and control the slider.
 */
(function($) {
  var WiseFlexslider;

  WiseFlexslider = (function() {
    var running_videos = [];

    /**
     * Setup flexsliders on load
     */
    function load() {

      if ($('.flexslider').length) {

        if (typeof $.fn.fitVids === 'function') {
          $('.flexslider')
            .fitVids();
        }

        // Setup the flexslider with support for controlling video.
        if (typeof $.fn.flexslider === 'function') {
          $('.flexslider')
            .flexslider({
              animation: 'slide',
              useCSS: false,
              animationLoop: false,
              smoothHeight: false,
              video: true,
              controlNav: true,
              prevText: '<i class="icon-angle-left"></i><span class="sr-only">Previous Slide</span>',
              nextText: '<i class="icon-angle-right"></i><span class="sr-only">Next Slide</span>',
              start: function(slider) {
                var benchmark_height = slider.height();
                $.each(slider.slides, function() {
                  var $this = $(this);

                  if ($this.height() > benchmark_height) {
                    $this.find('.slide').addClass('video-overflow');
                  }
                });
              },
              before: function() {
                var i;

                // Loop over running videos, and pause them if running.
                for (i in running_videos) {
                  if (running_videos[i]) {
                    running_videos[i].videoController('pause');
                  }
                }
              }
            });

          // Attach video controllers
          // This is using a copy of the nice little library that ships with slider pro
          $('.flexslider iframe').videoController({
            videoStart: null,
            videoPlay: function() {
              var $video = this.$video,
                flexslider = $video.parents('.flexslider');

              // Store the VideoController instance
              running_videos[$video[0].id] = $video;
              flexslider.flexslider('pause');
            },
            videoPause: function() {
              var $video = this.$video,
                flexslider = $video.parents('.flexslider');

              // Clear the VideoController instance and start the slideshow back up.
              running_videos[$video[0].id] = null;
              flexslider.flexslider('play');
            },
            videoEnded: function() {
              var $video = this.$video,
                flexslider = $video.parents('.flexslider');

              // Clear the VideoController instance and start the slideshow back up.
              running_videos[$video[0].id] = null;
              flexslider.flexslider('play');
            }
          });
        }
      }
    }

    // Return public interface.
    return {
      load: load
    };
  })();

  $(window).load(WiseFlexslider.load);
})(jQuery);