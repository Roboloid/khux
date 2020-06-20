// Display maps
function mapFunction(value)  {
    var variable = value + "_Container";
    document.getElementById(variable).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
}