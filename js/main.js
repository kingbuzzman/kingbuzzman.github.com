$(document).ready(function(){

  var navigationLinks = $("#sidebar a");
  var navigationPannels = $("section");

  // initial preparation
  (function(){
    var CURRENT_YEAR = (new Date).getFullYear();
    
    var URL_HASH = window.location.hash;
    var preload = navigationPannels.filter(URL_HASH);
    
    // update copyright year
    $("#year").html(CURRENT_YEAR);
    
    // hide all pannels
    navigationPannels.addClass("hidden");
    
    // if theres a hash in the URL start with that pannel open
    if(preload.length === 1){
      preload.removeClass("hidden");
      navigationLinks.filter("[href=" + URL_HASH + "]").addClass("bold");
    } else {
      navigationPannels.first().removeClass("hidden");
      navigationLinks.first().addClass("bold");
    }
  })();

  // breakdown animation -- fixes double-click bug with slideToggle()
  function toggleBreakdown(){
    var element = $(this);
    element.children("img").slideToggle("slow", function(){
      element.unbind("click").one("click", toggleBreakdown);
    });
  }

  // image breakdown for tags
  $(".breakdown").hover(function(){
      $(this).children("img").hide();
    }, function(){
      $(this).unbind("click").one("click", toggleBreakdown).children("img").stop().removeAttr('style');
    }
  ).one("click", toggleBreakdown);

  // navigation handling
  navigationLinks.click(function(){
    var navigationLink = $(this);
    var element = $(navigationLink.attr("href"));

    navigationPannels.addClass("hidden");
    navigationLinks.removeClass("bold");
    navigationLink.addClass("bold");

    // to use animations the element needs to be hidden (not with a class)
    element.hide().removeClass("hidden").fadeIn();
  });

});