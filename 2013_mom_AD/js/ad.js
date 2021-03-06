//跑馬燈 ---------------- start
$(document).ready(function() {
  activate_marquee();
  $('[data-type=marquee] > li').each(function(){
    activate_marquee_style(this);
  });
});
$(window).load(function(){
  // this block is for auto remove empty <li>
  $('[data-type=marquee] > li').each(function(){
    activate_marquee_style(this);
    $(this).bind('DOMSubtreeModified',function(){
      $('[data-type=marquee] > li > div').each(function(){
        var pattern = $(this).find("iframe").first().contents().find("a").html();
        if(!pattern){
          $(this).parents("li").remove();
          $('[data-type=dfp_marquee_tag]').css("box-shadow","").css("background-color","");
          if($('[data-type=marquee]').children().length == 0){
            $('[data-type=dfp_marquee_tag]').css("box-shadow","").css("background-color","");
            $('[data-type=dfp_marquee_tag]').closest('div').remove(); // remove it's farther
          }
        }else{
          $('[data-type=dfp_marquee_tag]').css("box-shadow","1px 1px 2px rgba(0, 0, 0, 0.3)").css("background-color","#8b4582");
        }
      });
      var ul = $(this).parents("[data-type=marquee]")
      ul.marquee('update');
      $('[data-type=marquee] li iframe:visible').each(function() {
        //$('[data-type=dfp_marquee_tag]').css("box-shadow","1px 1px 2px rgba(0, 0, 0, 0.3)").css("background-color","#8b4582");
        var test_iframe = $(this).contents();
        test_iframe.find('a').attr("style", ul.attr('data-style'));
        test_iframe.find('span').attr("style", ul.attr('data-style'));
        var word = test_iframe.find('b').html();
        test_iframe.find('b').parents('span').html(word);
      });
    });
  });
});
function activate_marquee_style(li){
  var ul = $(li).parents("[data-type=marquee]")
  ul.find('li iframe:visible').each(function() {
    //$('[data-type=dfp_marquee_tag]').css("box-shadow","1px 1px 2px rgba(0, 0, 0, 0.3)").css("background-color","#8b4582");
    var test_iframe = $(this).contents();
    test_iframe.find('a').attr("style", ul.attr('data-style'));
    test_iframe.find('span').attr("style", ul.attr('data-style'));
    var word = test_iframe.find('b').html();
    test_iframe.find('b').parents('span').html(word);
  });
}
function activate_marquee(){
  $('[data-type=dfp_marquee_tag]').css("box-shadow","").css("background-color","");
  $('[data-type=marquee]').each(function(){
    var dom = $(this);
    var height = dom.height();
    dom.css('position', 'relative').css('overflow', 'hidden').css('height', height).css('display', 'block');
    $('li', dom).css('position', 'absolute').css('display', 'block').css('top', '-'+height+'px');
    var speed = parseInt(dom.attr("data-speed"));
    if(speed <= 0) speed = 300;
    var pause = parseInt(dom.attr("data-pause"));
    if(pause <= 0) speed = 2000;
    dom.marquee({
      yScroll : 'bottom',
      showSpeed : 1000,
      scrollSpeed : speed,
      pauseSpeed : pause ,
      pauseOnHover : true,
      loop: -1
    });
  });
}
//跑馬燈 ---------------- end

//直式標籤 -------------- start
function left_box_close(block) {
  block.remove();
}

function left_box_hide(block) {
  block.hide("slide", { direction: "left" }, function() {
    $('[data-type=bt-show]', block).show();
    $('[data-type=bt-hide]', block).hide();
    $('[data-type=content]', block).hide();
    block.show();
  });
  block.attr("data-showed", "false");
}

function left_box_hide_direct(block) {
  $('[data-type=bt-show]', block).show();
  $('[data-type=bt-hide]', block).hide();
  $('[data-type=content]', block).hide();
  block.attr("data-showed", "hide");
}

function left_box_show(block) {
  $('[data-type=bt-hide]', block).show();
  $('[data-type=bt-show]', block).hide();
  block.hide();
  $('[data-type=content]', block).show();
  block.show("slide", { direction: "left" });
  block.attr("data-showed", "true");
}

function left_box_init(dom) {
  var block = $(dom).css('position', 'absolute').css('bottom', '100px').css('left', '0');
  $(window).bind('scroll', function() {
    block.css('position', 'fixed').css('bottom', '100px').css('left', '0');
  });
  $('[data-type=bt-hide]', block).bind('click', function() {
    left_box_hide(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $('[data-type=bt-show]', block).bind('click', function() {
    left_box_show(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $(block).bind('mouseover', function() {
    if(block.attr("movered") != "true") {
      left_box_show(block);
      block.attr("movered", "true");
    }
  });
  $('[data-type=title]', block).bind('click', function() {
    if(block.attr("data-showed") == "true") {
      left_box_hide(block);
    } else {
      left_box_show(block);
    }
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $('[data-type=bt-close]', block).bind('click', function() {
    left_box_close(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  left_box_hide_direct(block);
}

function activate_mikegay_left(){
  $('[data-type=left-box]').each(function() {
    left_box_init(this);
  });
}
//直式標籤 -------------- end


//橫式標籤 -------------- start
function bottom_box_lazy_load(dom) {
  var dom = $(dom);
  if(dom.attr("data-position")) {
    var top = $(dom.attr("data-position")).offset().top;
  } else {
    var top = dom.offset().top;
  }
  dom.hide();
  bottom_box_init(dom);
  $(window).bind('scroll', function() {
    if($(window).scrollTop() + 400 > top) {
      if(dom.attr("data-showed") != "true") {
        $('[data-type=bt-show]', dom).hide();
        dom.attr("data-showed", "true");
      }
      dom.slideDown();
    } else {
      dom.slideUp();
    }
  });
}

function bottom_box_close(block) {
  block.remove();
}

function bottom_box_hide(block) {
  block.attr("showed", "false");
  $('[data-type=bt-show]', block).show();
  $('[data-type=bt-hide]', block).hide();
  $('[data-type=content]', block).slideUp();
}

function bottom_box_show(block) {
  $('[data-type=bt-hide]', block).show();
  $('[data-type=bt-show]', block).hide();
  $('[data-type=content]', block).slideDown();
}

function bottom_box_init(dom) {
  var block = $(dom).css('position', 'absolute').css('bottom', '0').css('right', '0');
  $(window).bind('scroll', function() {
    block.css('position', 'fixed').css('bottom', '0').css('right', '0');
  });
  $('[data-type=bt-hide]', block).bind('click', function() {
    bottom_box_hide(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $('[data-type=bt-show]', block).bind('click', function() {
    bottom_box_show(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $('[data-type=title]', block).bind('click', function() {
    bottom_box_show(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
  $('[data-type=bt-close]', block).bind('click', function() {
    bottom_box_close(block);
    return false; //該按鈕是 <a href="#"> 就不會亂跳 anchor
  });
}

function activate_mikegay_bottom(){
  $('[data-type=bottom-box]').each(function() {
    bottom_box_lazy_load($(this));
  });   
}

//橫式標籤 -------------- end