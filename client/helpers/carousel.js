if (Meteor.isClient) {
  Template.carousel.rendered = function() {
    $('#carousel').slick({
      slidesToScroll:2,
      slidesToShow:6,
      autoplay: true,
      autoplaySpeed: 2000,
    });
  }
}