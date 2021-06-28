var baseNumber = 10;

$('#num_leds').on('input', function(e) {
  var leds = $('#num_leds').val();
  var led_group = "<div class='flex-container'>";
  for (var i = 0; i < leds; i++) {
    if (i % 10 == 0 && i != 0) {
      led_group += "</div>";
      $('#leds').append(led_group);
      led_group = "";
      led_group += "<div class='flex-container'>";
    }
    led_group += "<div id='led" + (i + 10) + "' class='input-group' title='Using input value'>" +
                    "<input type='text' name='led" + (i + 10) + "' class='form-control input-lg' value='#000000' hidden>" +
                    "<span class='input-group-append'>" +
                      "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                    "</span>" +
                  "</div>" +
                  "<script>" +
                    "$(function () {" +
                      "$('#led" + (i + 10) + "').colorpicker({" +
                        "format: 'hex'" +
                      "});" +
                    "});" +
                  "</script>";
  }
  //led_group += "</div>";
  //$('#leds').append(led_group);
  //baseNumber += leds;
});
