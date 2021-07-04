var profile_leds = parseInt($('#num_leds').val());
var previousNumber = profile_leds;

const hex_values = [];

var led_group = "";

$('#num_leds').on('input', function(e) {
  for (var i = 0; i < previousNumber; i++) {
    hex_values[i] = $('#input' + i.toString()).val();
  }

  var leds = $('#num_leds').val();
  if (leds == '') {
    leds = 0;
  } else {
    leds = parseInt(leds);
  }
  $('#test-text').text(leds);
  if (leds > previousNumber) {
    for (var i = previousNumber; i < leds; i++) {
      if (i % 10 == 0) {
          $('#leds').append("<div class='flex-container' id='flex" + i.toString() + "'></div>");
      }
      if (i < hex_values.length) {
        led_group = "<div id='led" + i.toString() + "' class='input-group' title='Using input value'>" +
                        "<input type='text' id='input" + i.toString() + "' name='led" + i.toString() + "' class='form-control input-lg' value='#000000' hidden>" +
                        "<span class='input-group-append'>" +
                          "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                        "</span>" +
                      "</div>" +
                      "<script id='colorpicker" + i.toString() + "'>" +
                        "$(function () {" +
                          "$('#led" + i.toString() + "').colorpicker({" +
                            "format: 'hex'," +
                            "color: '" + hex_values[i] + "'," +
                          "});" +
                        "});" +
                      "</script>";
      } else {
        led_group = "<div id='led" + i.toString() + "' class='input-group' title='Using input value'>" +
                        "<input type='text' id='input" + i.toString() + "' name='led" + i.toString() + "' class='form-control input-lg' value='#000000' hidden>" +
                        "<span class='input-group-append'>" +
                          "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                        "</span>" +
                      "</div>" +
                      "<script id='colorpicker" + i.toString() + "'>" +
                        "$(function () {" +
                          "$('#led" + i.toString() + "').colorpicker({" +
                            "format: 'hex'" +
                          "});" +
                        "});" +
                      "</script>";
        hex_values[i] = $('input' + i.toString()).val();
      }
      $('#flex' + (i - (i % 10)).toString()).append(led_group);
    }
  } else if (leds < previousNumber) {
    for (var i = previousNumber - 1; i >= leds; i--) {
      $('#led' + i.toString()).remove();
      $('#colorpicker' + i.toString()).remove();
      $('#flex' + i.toString()).remove();
    }
  }
  previousNumber = leds;
});
