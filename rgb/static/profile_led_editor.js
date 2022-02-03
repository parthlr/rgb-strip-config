var profile_leds = parseInt($('#num_leds').val());
var previousNumber = profile_leds;

const hex_values = [];

var led_group = "";

var custom_led_html = $('#leds').html();
var single_led_html = "<div class='d-flex justify-content-center'>" +
                        "<div class='flex-container single-color'>" +
                          "<div id='led_s' class='input-group' title='Using input value'>" +
                              "<input type='text' id='input_s' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                              "<span class='input-group-append'>" +
                                "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                              "</span>" +
                          "</div>" +
                          "<script>" +
                            "$(function () {" +
                              "$('#led_s').colorpicker({" +
                                "format: 'hex'," +
                                "color: '#FF0000'," +
                              "});" +
                            "});" +
                          "</script>" +
                        "</div>" +
                      "</div>";
var gradient_led_html = "<div class='d-flex justify-content-center'>" +
                          "<div class='flex-container single-color'>" +
                            "<div id='led_g1' class='input-group' title='Using input value'>" +
                                "<input type='text' id='input_g1' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                                "<span class='input-group-append'>" +
                                  "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                                "</span>" +
                            "</div>" +
                            "<script>" +
                              "$(function () {" +
                                "$('#led_g1').colorpicker({" +
                                  "format: 'hex'," +
                                  "color: '#FF0000'," +
                                "});" +
                              "});" +
                            "</script>" +
                            "<div id='led_g2' class='input-group' title='Using input value'>" +
                                "<input type='text' id='input_g2' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                                "<span class='input-group-append'>" +
                                  "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                                "</span>" +
                            "</div>" +
                            "<script>" +
                              "$(function () {" +
                                "$('#led_g2').colorpicker({" +
                                  "format: 'hex'," +
                                  "color: '#FF0000'," +
                                "});" +
                              "});" +
                            "</script>" +
                          "</div>" +
                        "</div>";
var rainbow_led_html = "<div class='flex-container'>";
const rainbow_vals = ["#FF0000", "#FFAA00", "#FFFF00", "#00FF00", "#00FFAA", "#00FFFF", "#0000FF", "#AA00FF", "#FF00FF", "#FF0000"];

for (var i = 0; i < 10; i++) {
  rainbow_led_html += "<div id='led_r" + i.toString() + "' class='input-group' title='Using input value'>" +
                          "<input type='text' id='input_r" + i.toString() + "' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                          "<span class='input-group-append'>" +
                            "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                          "</span>" +
                        "</div>" +
                        "<script>" +
                          "$(function () {" +
                            "$('#led_r" + i.toString() + "').colorpicker({" +
                              "format: 'hex'," +
                              "color: '" + rainbow_vals[i] + "'," +
                            "});" +
                          "});" +
                        "</script>";
}
rainbow_led_html += "</div>";

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
  custom_led_html = $('#leds').html();
});

$('#profile_type').on('change', function() {
  if (this.value == 'default') {
    $('#default_type').show();
    if ($('#default_type').val() == 'color') {
      $('#leds').html(single_led_html);
    } else if ($('#default_type').val() == 'gradient') {
      $('#leds').html(gradient_led_html);
    } else if ($('#default_type').val() == 'rainbow') {
      $('#leds').html(rainbow_led_html);
    }
  } else if (this.value == 'custom') {
    $('#default_type').hide();
    $('#leds').html(custom_led_html);
  }
});

$('#default_type').on('focus', function() {
  if (this.value == 'color') {
    single_led_html = "<div class='d-flex justify-content-center'>" +
                        "<div class='flex-container single-color'>" +
                          "<div id='led_s' class='input-group' title='Using input value'>" +
                              "<input type='text' id='input_s' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                              "<span class='input-group-append'>" +
                                "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                              "</span>" +
                          "</div>" +
                          "<script>" +
                            "$(function () {" +
                              "$('#led_s').colorpicker({" +
                                "format: 'hex'," +
                                "color: '" + $('#input_s').val() + "'," +
                              "});" +
                            "});" +
                          "</script>" +
                        "</div>" +
                      "</div>";
  } else if (this.value == 'gradient') {
    gradient_led_html = "<div class='d-flex justify-content-center'>" +
                          "<div class='flex-container single-color'>" +
                            "<div id='led_g1' class='input-group' title='Using input value'>" +
                                "<input type='text' id='input_g1' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                                "<span class='input-group-append'>" +
                                  "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                                "</span>" +
                            "</div>" +
                            "<script>" +
                              "$(function () {" +
                                "$('#led_g1').colorpicker({" +
                                  "format: 'hex'," +
                                  "color: '" + $('#input_g1').val() + "'," +
                                "});" +
                              "});" +
                            "</script>" +
                            "<div id='led_g2' class='input-group' title='Using input value'>" +
                                "<input type='text' id='input_g2' name='ledff' class='form-control input-lg' value='#FF0000' hidden>" +
                                "<span class='input-group-append'>" +
                                  "<span class='input-group-text colorpicker-input-addon'><i></i></span>" +
                                "</span>" +
                            "</div>" +
                            "<script>" +
                              "$(function () {" +
                                "$('#led_g2').colorpicker({" +
                                  "format: 'hex'," +
                                  "color: '" + $('#input_g2').val() + "'," +
                                "});" +
                              "});" +
                            "</script>" +
                          "</div>" +
                        "</div>";
  }
}).change(function() {
  if (this.value == 'color') {
    $('#leds').html(single_led_html);
  } else if (this.value == 'gradient') {
    $('#leds').html(gradient_led_html);
  } else if (this.value == 'rainbow') {
    $('#leds').html(rainbow_led_html);
  }
});
