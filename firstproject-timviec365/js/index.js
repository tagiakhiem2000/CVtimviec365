//scale CV theo chiều rộng của màn hình
$(window).resize(function(){
    $('#root').css('scale',`${$(window).width()/1067}`);
    $('#cv').css('margin',`${$(window).width()/1067*50}px`);
})
$(window).ready(function(){
    $('#root').css('scale',`${$(window).width()/1067}`);
    $('#cv').css('margin',`${$(window).width()/1067*50}px`);
})