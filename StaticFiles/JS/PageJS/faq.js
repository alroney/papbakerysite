$(document).ready(function(){
    $('.accordion-button').click(function(){
      // Toggle 'selected' class for the clicked accordion button
      $(this).toggleClass('selected');
      
      // Toggle 'selected' class for the corresponding accordion body
      $(this).next('.accordion-collapse').toggleClass('selected');
      
      // Remove 'selected' class from other accordion buttons and bodies
      $('.accordion-button').not(this).removeClass('selected');
      $('.accordion-collapse').not($(this).next('.accordion-collapse')).removeClass('selected');
    });
  });
  