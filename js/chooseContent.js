$(document).ready(
    $('.chonmuc_moi').click(function(){
        $('.ttin_noidung').removeClass('active');
        $(`[data-id='${$(this).data('id')}']`).addClass('active');
        
    })
)