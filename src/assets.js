// Display maps
function showFunction(value)  {
    var variable = value + "_Container";
    document.getElementById(variable).classList.toggle("showSection");
    $(document).ready(function() {
      $("#" + variable).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
}