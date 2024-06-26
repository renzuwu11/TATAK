$(document).ready(function () {
  $.getJSON("/get-fonts", function (data) {
    var fonts = data.fonts;
    var fontStyleSelect = $("#font-style");

    fonts.forEach(function (font) {
      fontStyleSelect.append(
        $("<option>", {
          value: font.url,
          text: font.name,
        })
      );
    });

    fontStyleSelect.on("change", function () {
      var selectedFontUrl = $(this).val();
      var selectedFontName = $(this).find("option:selected").text();

      if (selectedFontUrl) {
        var newFont = new FontFace(selectedFontName, `url(${selectedFontUrl})`);
        newFont
          .load()
          .then(function (loadedFont) {
            document.fonts.add(loadedFont);
            $("#logo-text").css("font-family", selectedFontName);
          })
          .catch(function (error) {
            console.error("Failed to load font:", error);
          });
      }
    });
  });

  $("#business-name").on("input", function () {
    $("#logo-text").text($(this).val());
  });

  $("#font-size").on("input", function () {
    $("#logo-text").css("font-size", $(this).val() + "px");
  });

  $("#text-color-start, #text-color-end").on("input", function () {
    var startColor = $("#text-color-start").val();
    var endColor = $("#text-color-end").val();
    $("#logo-text").css(
      "background",
      `linear-gradient(to right, ${startColor}, ${endColor})`
    );
    $("#logo-text").css("-webkit-background-clip", "text");
    $("#logo-text").css("-webkit-text-fill-color", "transparent");
  });

  $("#bg-color-start, #bg-color-end").on("input", function () {
    var startColor = $("#bg-color-start").val();
    var endColor = $("#bg-color-end").val();
    $(".logo-preview").css(
      "background",
      `linear-gradient(to right, ${startColor}, ${endColor})`
    );
  });

  $("#logo-width, #logo-height").on("input", function () {
    var width = $("#logo-width").val();
    var height = $("#logo-height").val();
    $(".logo-preview").css("width", width + "px");
    $(".logo-preview").css("height", height + "px");
  });
});
