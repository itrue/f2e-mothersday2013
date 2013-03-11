//跑馬燈 ---------------- start
$(document).ready(function(){
  $('[data-type=slidetext]').each(function() {
    var dom = $(this);
    var height = dom.attr('data-height');
    dom.css('position', 'relative').css('overflow', 'hidden').css('height', height)
    $('ul', dom).css('position', 'absolute').css('height', height).css('top', '-'+height);;
    var speed = parseInt(dom.attr("data-speed"));
    if(speed <= 0) speed = 300;
    var pause = parseInt(dom.attr("data-pause"));
    if(pause <= 0) speed = 2000;
    dom.textslider({
      direction : 'scrollUp', // 捲動方向: scrollUp向上, scrollDown向下
      scrollNum : 1, // 一次捲動幾個元素
      scrollSpeed : speed, // 捲動速度(ms)
      pause : pause // 停頓時間(ms)
    });
  });
});
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
}

function left_box_hide_direct(block) {
  $('[data-type=bt-show]', block).show();
  $('[data-type=bt-hide]', block).hide();
  $('[data-type=content]', block).hide();
}

function left_box_show(block) {
  $('[data-type=bt-hide]', block).show();
  $('[data-type=bt-show]', block).hide();
  block.hide();
  $('[data-type=content]', block).show();
  block.show("slide", { direction: "left" });
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
    left_box_show(block);
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
    var top = $("#div-gpt-ad-1362741724637-0").position().top;
  } else {
    var top = dom.position().top;
  }
  dom.hide();
  bottom_box_init(dom);
  $(window).bind('scroll', function() {
    if($(window).scrollTop() + 400 > top) {
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
