let cv2 = {};

function sendData() {
  var iframe = document.getElementById('cv2');
  var iframeUrl = iframe.src;
  function truyenMangVaoIframe() {
    if (iframe) {
      var jsonArray = JSON.stringify(cv2);
      iframe.contentWindow.postMessage(jsonArray, iframeUrl);
    }
  }
  truyenMangVaoIframe();
}

$('.xoa_dm').click(function () {
  let id = $('.ttin_noidung.active').data('id');
  switch (id) {
    case 0:
      cv2.name = '';
      cv2.job = '';
      cv2.abstract = '';
      break;
    default:
      break;
  }
  sendData();
});

$('.xoa_nd').click(function(){
  if ($('.ttin_noidung.active').children().length >= 3) {
      $('.ttin_noidung.active div:last').remove();
  }
})

$('.them_nd').click(function(){
  $('.ttin_noidung.active').append(`
    <div class="ttin_noidung_wrapper">
      ${$('.ttin_noidung.active div:first').html()}
    </div>
  `);
  })

// $('#submit').click(function () {
//   sendData();
// });

$('#name-input').on('input', function () {
  let name = $(this).val();
  if (!name) {
    delete cv2.name;
    $(this).val('');
  }
  cv2.name = name;
  sendData();
});

$('#job-input').on('input', function () {
  let job = $(this).val();

  if (!job) {
    delete cv2.job;
    $(this).val('');
  }
  cv2.job = job;
  sendData();
});

$('#abstract-input').on('input', function () {
  let abstract = $(this).val();

  if (!abstract) {
    delete cv2.abstract;
    $(this).val('');
  }
  cv2.abstract = abstract;
  sendData();
});

// lấy thông tin ngôn ngữ
$('.them_nd').click(function () {
  if ($('#language-title-input').val() && $('#language-value-input').val()) {
    if (cv2.language === undefined) {
      cv2.language = { title: 'NGOẠI NGỮ' };
    }
    if (cv2.language.contents) {
      cv2.language.contents.push({
        title: $('#language-title-input').val(),
        value: $('#language-value-input').val(),
      });
    } else {
      cv2.language.contents = [];
      cv2.language.contents.push({
        title: $('#language-title-input').val(),
        value: $('#language-value-input').val(),
      });
    }
    $('#language-title-input').val('');
    $('#language-value-input').val('');

    sendData();
    cv2.language.contents=[];
  } else {
    alert('Cần nhập đủ thông tin của mục ngôn ngữ');
  }
});

//lấy thông tin kỹ năng
$('#add-skills').click(function () {
  if ($('#skills-title-input').val() && $('#skills-value-input').val()) {
    if (cv2.skills === undefined) {
      cv2.skills = { title: 'KỸ NĂNG' };
    }
    if (cv2.skills.contents) {
      cv2.skills.contents.push({
        title: $('#skills-title-input').val(),
        value: $('#skills-value-input').val(),
      });
    } else {
      cv2.skills.contents = [];
      cv2.skills.contents.push({
        title: $('#skills-title-input').val(),
        value: $('#skills-value-input').val(),
      });
    }
    $('#skills-title-input').val('');
    $('#skills-value-input').val('');
    sendData();
    cv2.skills.contents = [];

  } else {
    alert('Cần nhập đủ thông tin của mục kỹ năng');
  }
});

//lấy thông tin liên hệ
$('#add-contact').click(function () {
  if ($('#contact-title-input').val() && $('#contact-context-input').val()) {
    if (cv2.contact === undefined) {
      cv2.contact = { 
        title: 'THÔNG TIN LIÊN HỆ',
      };
    }
    if (cv2.contact.contents) {
      // if (contactList.includes(cv2.contact.contents[0].title)) {
      //   console.log(111);
      // }
      // console.log(cv2.contact.contents[0].title);
      cv2.contact.contents.push({
        title: $('#contact-title-input').val(),
        context: $('#contact-context-input').val(),
      });
    } else {
      cv2.contact.contents = [];
      cv2.contact.contents.push({
        title: $('#contact-title-input').val(),
        context: $('#contact-context-input').val(),
      });
    }
    $('#contact-title-input').val('');
    $('#contact-context-input').val('');
    sendData();
    cv2.contact.contents=[];
  } else {
    alert('Cần nhập đủ thông tin của mục thông tin liên hệ');
  }
});

//lấy thông tin kinh nghiệm làm việc
$('#add-exp').click(function () {
  if ($('#exp-date-input').val() && $('#exp-context-input').val()) {
    if (cv2.exp === undefined) {
      cv2.exp = { title: 'KINH NGHIỆM LÀM VIỆC' };
    }
    if (cv2.exp.contents) {
      cv2.exp.contents.push({
        date: $('#exp-date-input').val(),
        context: $('#exp-context-input').val(),
      });
    } else {
      cv2.exp.contents = [];
      cv2.exp.contents.push({
        date: $('#exp-date-input').val(),
        context: $('#exp-context-input').val(),
      });
    }
    $('#exp-date-input').val('');
    $('#exp-context-input').val('');

    sendData();
  } else {
    alert('Cần nhập đủ thông tin của mục thông tin liên hệ');
  }
});
