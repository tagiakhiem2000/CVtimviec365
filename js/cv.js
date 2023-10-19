// var lang_change = false;
let contactList = ['phone', 'mail', 'location'];
let phoneEdited = false, mailEdited = false, locationEdited = false, languageEdited = false, skillsEdited=false;
// var count_lang = 0;
// var count_skill = 0;
// function adjustLinePositions() {
//   var imgOffsetLeft = $('#img').offset().left;

//   //lang
//   var screenWidth = $(window).width();

//   var line2Width, line3Left;

//   if (screenWidth > 1024) {
//     line2Width = -22 + imgOffsetLeft;
//     line3Left = -30 + imgOffsetLeft;
//   } else {
//     line2Width = 176 + imgOffsetLeft;
//     line3Left = 169 + imgOffsetLeft;
//   }

//   $('.line2').css('width', line2Width + 'px');
//   $('.line3').css('left', line3Left + 'px');

//   //under
//   $('.line8').css('width', line2Width + 'px');
//   $('.line9').css('left', line3Left + 'px');

//   //skill
//   if (lang_change) {
//     //under-right
//     if (count_lang == 1) {
//       $('.line11').css('width', 36 + 'px');
//       $('.line12').css('left', -16 + 'px');

//       $('.line5').css('width', 81 + 'px');
//       $('.line5').css('right', 102 + 'px');
//       $('.line6').css('right', 176 + 'px');
//     } else if (count_lang == 2) {
//       $('.line11').css('width', 97 + 'px');
//       $('.line12').css('left', 45 + 'px');

//       $('.line5').css('width', 81 + 'px');
//       $('.line5').css('right', 102 + 'px');
//       $('.line6').css('right', 176 + 'px');
//     } else if (count_lang == 3) {
//       $('.line11').css('width', 196 + 'px');
//       $('.line12').css('left', 144 + 'px');

//       $('.line5').css('width', 81 + 'px');
//       $('.line5').css('right', 101 + 'px');
//       $('.line6').css('right', 175 + 'px');
//     }
//   } else {
//     // var line5Width = 6 + imgOffsetLeft;
//     $('.line5').css('width', 81 + 'px');
//     $('.line5').css('right', 88 + 'px');
//     $('.line6').css('right', 162 + 'px');
//   }
// }

// $(window).on('resize', function () {
//   var currentImgOffsetLeft = $('#img').offset().left;
//   var currentImgOffsetTop = $('#img').offset().top;

//   if (
//     currentImgOffsetLeft !== prevImgOffsetLeft ||
//     currentImgOffsetTop !== prevImgOffsetTop
//   ) {
//     adjustLinePositions();
//     prevImgOffsetLeft = currentImgOffsetLeft;
//     prevImgOffsetTop = currentImgOffsetTop;
//   }
// });

$(document).ready(function () {
  window.addEventListener('message', function (event) {
    var cv2 = JSON.parse(event.data);
    if (cv2.job !== null) {
      $('#job').html(cv2.job);
    }

    if (cv2.name !== null) {
      try {
        if (cv2.name.indexOf(' ') >= 0) {
          $('#name').html(cv2.name.substr(0, cv2.name.indexOf(' ')));
          $('#surName').html(cv2.name.substr(cv2.name.indexOf(' ') + 1, cv2.name.length));
        }
        else {
          $('#name').html(cv2.name);
          $('#surName').html('');
        }
      }
      catch { }

      lang_change = true;
    }

    if (cv2.abstract !== null) {
      try {
        if (cv2.abstract.length <= 530) {
          $('#aim').html(cv2.abstract);
        }
        else {
          this.alert('Tiểu sử không vượt quá 530 ký tự');
        }
      }
      catch { }
    }

    if (cv2.contact && cv2.contact.title) {
      if (contactList.includes(cv2.contact.contents[0].title)) {
        switch (cv2.contact.contents[0].title) {
          case 'phone': {
            if (phoneEdited == false) {
              $('#listPhoneNumber').empty();
            }
            $('#listPhoneNumber').append(`<li>${cv2.contact.contents[0].context}</li>`);
            phoneEdited = true;
            break;
          }
          case 'mail': {
            if (mailEdited == false) {
              $('#listMail').empty();
            }
            $('#listMail').append(`<li>${cv2.contact.contents[0].context}</li>`);
            mailEdited = true;
            break;
          }
          case 'location': {
            if (locationEdited == false) {
              $('#location').empty();
            }
            $('#location').html(`${cv2.contact.contents[0].context}`);
            locationEdited = true;
            break;
          }
        }
      }
      else {
        this.alert('Vui lòng nhập phương thức liên lạc trong danh sách ' + contactList);
      }
    }

    if (cv2.language && cv2.language.title) {
      if (languageEdited == false) {
        $('#languages').empty();
      }
      if (cv2.language.contents[0].title.length <= 10) {
        $('#languages').append(`<li>
      <div id="languagesList" class="container">
          <div class="row">
              <div class="col-3">

                  <p class="typeLanguage">${cv2.language.contents[0].title}</p>
              </div>
              <div class="col wrapperProgress">

                  <div class="progress">
                      <div class="progress-bar" role="progressbar" style="width: ${cv2.language.contents[0].value}%"
                          aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
              <div class="col-1">

                  <p class="percent">${cv2.language.contents[0].value}%</p>
              </div>
          </div>
      </div>

  </li>`);
        languageEdited = true;
      }
      else {
        this.alert('Tên ngôn ngữ không lớn hơn 10 ký tự');
      }
    }

    if (cv2.skills && cv2.skills.title) {
      if (skillsEdited == false) {
        $('#skills').empty();
      }
      if (cv2.skills.contents[0].title.length <= 11) {
        $('#skills').append(`
                            <li>
                                <p>${cv2.skills.contents[0].title}</p>
                                <div id="skillValue">
                                    
                                </div>
                                <p>${cv2.skills.contents[0].value}0%</p>
                            </li>
        `);
        for (let i=0;i <= cv2.skills.contents[0].value;i++) {
          $('#skillValue').append(`<i class="fa-solid fa-circle chosen"></i>
        `);
        };
        console.log(cv2.skills.contents[0].value-1+2);
        for (let j=cv2.skills.contents[0].value-1+2;j <= 10;j++) {
          $('#skillValue').append(`<i class="fa-solid fa-circle notChosen"></i>
        `);
        };
        skillsEdited=true;
      }
      else{
        this.alert('Tên kĩ năng không lớn hơn 11 ký tự');
      }
    }
    //   if (cv2.contact && cv2.contact.title) {
    //     $('#contact').html(cv2.contact.title);
    //     $('#line_under').empty();
    //     var lineUnder = $(
    //       '<div class="line7"></div>' +
    //         '<div class="line8"></div>' +
    //         '<div class="line9"></div>'
    //     );
    //     $('#line_under').append(lineUnder);

    //     var contacts = cv2.contact.contents;
    //     $('.list').empty(); // Thêm phần tử listItem vào phần tử có class "list"
    //     contacts.forEach(function (item, index) {
    //       var listItem = $('<div class="item"></div>');
    //       var imgIcon = $('<div class="img_icon"></div>');
    //       var img = $('<img alt="" />');

    //       // Kiểm tra giá trị index và gán đường dẫn hình ảnh tương ứng hoặc mặc định
    //       if (index === 0) {
    //         img.attr('src', './phone-call-svgrepo-com.svg');
    //       } else if (index === 1) {
    //         img.attr('src', './email-svgrepo-com.svg');
    //       } else if (index === 2) {
    //         img.attr('src', './gps.svg');
    //       } else {
    //         img.attr('src', './phone-call-svgrepo-com.svg');
    //       }

    //       var textRight = $('<div class="text_right"></div>');
    //       var label = $('<div class="label">' + item.title + '</div>');
    //       var value = $('<div class="value">' + item.context + '</div>');

    //       imgIcon.append(img);
    //       textRight.append(label);
    //       textRight.append(value);

    //       listItem.append(imgIcon);
    //       listItem.append(textRight);

    //       $('.list').append(listItem);
    //     });
    //   } else {
    //     $('#contact').html(null);
    //   }

    //   if (cv2.language && cv2.language.title) {
    //     $('#language').html(cv2.language.title);
    //   } else {
    //     $('#language').html(null);
    //   }

    //   if (cv2.language && cv2.language.contents) {
    //     lang_change = true;
    //     if (lang_change) {
    //       $('#line_under').attr('style', 'margin-top: -20px !important;');
    //     }
    //     count_lang = cv2.language.contents.length;
    //     $('#line_langs').empty();
    //     var lineLang = $(
    //       '<div class="line1"></div>' +
    //         '<div class="line2"></div>' +
    //         '<div class="line3"></div>'
    //     );
    //     $('#line_langs').append(lineLang);
    //     $('#language-container').empty();
    //     var langs = cv2.language.contents; // Lấy mảng contents từ JSON
    //     langs.forEach(function (item) {
    //       var title = item.title;
    //       var value = item.value;

    //       // Tạo phần tử HTML mới
    //       var langItem = $('<div class="lang_item"></div>');
    //       var process = $('<div class="process"></div>');
    //       var progressBar = $('<div class="progress-bar"></div>');
    //       var text = $(
    //         '<div class="text"><div class="num_per">' +
    //           value +
    //           '%' +
    //           '</div><p>' +
    //           title +
    //           '</p></div>'
    //       );

    //       // Đặt chiều rộng của phần tử progress-bar dựa trên giá trị phần trăm
    //       progressBar.css('height', value + '%');

    //       // Gắn các phần tử vào langItem
    //       process.append(progressBar);
    //       langItem.append(process);
    //       langItem.append(text);

    //       // Gắn langItem vào phần tử cha
    //       $('#language-container').append(langItem);
    //     });
    //   } else {
    //     var langs = null;
    //   }

    //   // Duyệt qua mảng contents và tạo các phần tử HTML

    //   if (cv2.skills && cv2.skills.title) {
    //     var count_skill = cv2.skills.contents.length;

    //     $('#skills').html(cv2.skills.title);

    //     $('#line_skills').empty();
    //     var lineSkill = $(
    //       '<div class="line4"></div>' +
    //         '<div class="line5"></div>' +
    //         '<div class="line6"></div>'
    //     );
    //     $('#line_skills').append(lineSkill);

    //     $('#skills-container').empty();
    //     //skill
    //     var skills = cv2.skills.contents; // Lấy mảng contents từ JSON

    //     // Duyệt qua mảng contents và tạo các phần tử HTML tương ứng
    //     skills.forEach(function (item) {
    //       var title = item.title;
    //       var value = item.value;

    //       var skillItem = $('<div class="skill_item"></div>');
    //       var titleElement = $('<p>' + title + '</p>');
    //       var rating = $('<div class="rating"></div>');

    //       for (var i = 0; i < 5; i++) {
    //         var circle = $('<div class="circle"></div>');

    //         if (i < value) {
    //           circle.css('background-color', '#2494ea');
    //         } else {
    //           circle.css('background-color', '#191959');
    //         }

    //         rating.append(circle);
    //       }

    //       skillItem.append(titleElement);
    //       skillItem.append(rating);

    //       $('#skills-container').append(skillItem);
    //     });

    //     if (count_skill == 3) {
    //       $('#line_under').attr('style', 'margin-top: -65px !important;');
    //     }
    //   } else {
    //     $('#skills').html(null);
    //   }

    //   if (cv2.exp && cv2.exp.title) {
    //     $('#exp').html(cv2.exp.title);

    //     if (lang_change) {
    //       $('#line_under_right').empty();
    //       var lineUnderRight = $(
    //         '<div class="line10"></div>' +
    //           '<div class="line11"></div>' +
    //           '<div class="line12"></div>'
    //       );
    //       $('#line_under_right').append(lineUnderRight);
    //     }

    //     $('#exp-container').empty();
    //     exps = cv2.exp.contents;
    //     exps.forEach(function (item) {
    //       var stage = $('<div class="stage"></div>'); // Tạo phần tử div với class "stage"
    //       var year = $('<div class="year">' + item.date + '</div>'); // Tạo phần tử div với class "year" và nội dung là giá trị date từ dữ liệu JSON
    //       var wall = $('<div class="wall"></div>');
    //       var desExp = $('<div class="des_exp">' + item.context + '</div>'); // Tạo phần tử div với class "des_exp" và nội dung là giá trị context từ dữ liệu JSON

    //       stage.append(year); // Thêm phần tử year vào phần tử stage
    //       stage.append(wall);
    //       stage.append(desExp); // Thêm phần tử desExp vào phần tử stage

    //       $('#exp-container').append(stage); // Thêm phần tử stage vào phần tử có id "experience"
    //     });
    //   } else {
    //     $('#exp').html(null);
    //   }
    // });

    // $('#name').hover(
    //   function () {
    //     $(this).append('<img src="./trash-solid.svg" class="del" id="del">');
    //   },
    //   function () {
    //     $(this).find('#del').remove();
    //   }
    // );

    // $('#del').on('click', function () {
    //   $('#name').remove();
  });

  // window.addEventListener('message', function (event) {
  //   prevImgOffsetLeft = $('#img').offset().left;
  //   prevImgOffsetTop = $('#img').offset().top;
  //   adjustLinePositions();
  // });
});
