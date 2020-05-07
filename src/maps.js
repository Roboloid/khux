// Display maps
function mapFunction(value)  {
  if(value == "All")  {
    document.getElementById("Dark_Road_Container").classList.toggle("showMap");
    document.getElementById("Daybreak_Town_Container").classList.toggle("showMap");
    document.getElementById("Dwarf_Woodlands_Container").classList.toggle("showMap");
    document.getElementById("Wonderland_Container").classList.toggle("showMap");
    document.getElementById("Agrabah_Container").classList.toggle("showMap");
    document.getElementById("Olympus_Coliseum_Container").classList.toggle("showMap");
    document.getElementById("Beast's_Castle_Container").classList.toggle("showMap");
    document.getElementById("Castle_of_Dreams_Container").classList.toggle("showMap");
    document.getElementById("Enchanted_Dominion_Container").classList.toggle("showMap");
    document.getElementById("Game_Central_Station_Container").classList.toggle("showMap");
    document.getElementById("Niceland_Container").classList.toggle("showMap");
    document.getElementById("Cy-Bug_Sector_Container").classList.toggle("showMap");
    document.getElementById("Candy_Kingdom_Container").classList.toggle("showMap");
    document.getElementById("Extras_Container").classList.toggle("showMap");
  }
  else  {
    var variable = value + "_Container";
    document.getElementById(variable).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
}



/* $(document).ready(function() {
  $("div:visible").each(function() {
     $(this).find("img").each(function() {
       $(this).attr("src", $(this).data("src"));
     });
  });
}); */