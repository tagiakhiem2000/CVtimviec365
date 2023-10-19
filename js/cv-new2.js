$(document).on('click', '#dm_ttin_chitiet', function () {
    if ($('#tatca_dm').css('display') === 'block') {
      $('#tatca_dm').css('display', 'none');
    } else {
      $('#tatca_dm').css('display', 'block ');
    }
  });
  $('p.chonmuc_moi').click(function () {
    $('p.chonmuc_moi').removeClass('active');
    $(this).addClass('active');
  
    let selectedContent = $(this).html();
    $('#muc_chon').html(
      selectedContent +
        `<img src="https://dev.timviec365.vn/cv365/images/img_new/exp_up.png">`
    );
  
    $('div.ttin_noidung').removeClass('active');
    let dataIdValue = $(this).data('id');
    let selectedElement = $("div.ttin_noidung[data-id='" + dataIdValue + "']");
    selectedElement.addClass('active');
  
    $('img.gui_ai').removeClass('active');
    let buttonSelect = $("img.gui_ai[data-id='" + dataIdValue + "']");
    buttonSelect.addClass('active');
  });
  $('div.ttin_noidung').click(function () {
    $('div.ttin_noidung').removeClass('active');
    $(this).addClass('active');
  });
  
  //validate
  $(document).ready(function () {
    $('#language-value-input').on('input', function () {
      let minValue = 0;
      let maxValue = 100;
      let value = parseFloat($(this).val());
  
      if (value < minValue) {
        $(this).val(minValue);
      } else if (value > maxValue) {
        $(this).val(maxValue);
      }
    });
    $('#skills-value-input').on('input', function () {
      let minValue = 1;
      let maxValue = 10;
      let value = parseFloat($(this).val());
  
      if (value < minValue) {
        $(this).val(minValue);
      } else if (value > maxValue) {
        $(this).val(maxValue);
      }
    });
  });
  
  //xoa
  $('.xoa_dm').click(function () {
    $('.ttin_noidung.active').find('input, textarea').val('');
  });
  
  $(document).ready(function () {
    $('.mo_rong').click(function () {
      $('#center').toggleClass('hidden');
      $('#block_left').toggleClass('active');
      $('#top').toggleClass('active');
    });
  
    // next
    // $(".ttin_noidung.active").keydown(function(event){
    //   if (event.which === 13 || event.keyCode === 13) {
    //     event.preventDefault();
    //     var nextElement = $(this).nextAll('input:first, textarea:first');
  
    //     if (nextElement.length > 0) {
    //       nextElement.focus();
    //     } else {
    //       // Nếu không còn phần tử nào khác, thực hiện hành động mong muốn
    //       // Ví dụ: $('form').submit();
    //     }
    //   }
    // })
  });
  $('input, textarea').keydown(function (event) {
    if (event.which === 13 && !event.shiftKey) {
      event.preventDefault();
      let inputs = $('input, textarea');
      let currentIndex = inputs.index(this);
      let nextInput = inputs.eq(currentIndex + 1);
  
      if (nextInput.length) {
        nextInput.focus();
      } else {
        event.preventDefault();
        // If the last input is reached, perform any desired action, such as submitting the form
        // Example: $('form').submit();
      }
    }
  });
$(window).resize(function () {
  $('#cvWrapper').css('height', `${$('#cvWrapper').width() / 348 * 190}`)
})
$(window).ready(function () {
  $('#cvWrapper').css('height', `${$('#cvWrapper').width() / 348 * 190}`);
  $('.muc_chon').click(function(){
    $('.tatca_dm').toggle();
  });
  $('.div_choose_lang').click(function(){
    $('.block_choose_lang').toggleClass('hide');
  })
  $('.chonmuc_moi').click(function(){
    let muc_chon = $(this).text();
    $('.muc_chon').text(muc_chon);
    $('.tatca_dm').toggle();
  })
})