// Display maps
function mapFunction(value)  {
  if(value == "All")  {
    document.getElementById("Daybreak_Town_Container").classList.toggle("showMap");
    document.getElementById("Scala_ad_Caelum_Container").classList.toggle("showMap");
    document.getElementById("Dwarf_Woodlands_Container").classList.toggle("showMap");
    document.getElementById("Wonderland_Container").classList.toggle("showMap");
    document.getElementById("Agrabah_Container").classList.toggle("showMap");
    document.getElementById("Olympus_Coliseum_Container").classList.toggle("showMap");
    document.getElementById("Beasts_Castle_Container").classList.toggle("showMap");
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

function pageLoad()	{
	if(getParameterByName("daybreak") == "true")   {
		var variable1 = "Daybreak_Town_Container";
    document.getElementById(variable1).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable1).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("scala") == "true")   {
		var variable2 = "Scala_ad_Caelum_Container";
    document.getElementById(variable2).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable2).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("dwarf") == "true")   {
		var variable3 = "Dwarf_Woodlands_Container";
    document.getElementById(variable3).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable3).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("wonderland") == "true")   {
		var variable4 = "Wonderland_Container";
    document.getElementById(variable4).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable4).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("agrabah") == "true")   {
		var variable5 = "Agrabah_Container";
    document.getElementById(variable5).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable5).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("olympus") == "true")   {
		var variable6 = "Olympus_Coliseum_Container";
    document.getElementById(variable6).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable6).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("beast") == "true")   {
		var variable7 = "Beasts_Castle_Container";
    document.getElementById(variable7).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable7).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("dreams") == "true")   {
		var variable8 = "Castle_of_Dreams_Container";
    document.getElementById(variable8).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable8).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("enchanted") == "true")   {
		var variable9 = "Enchanted_Dominion_Container";
    document.getElementById(variable9).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable9).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("gamecentral") == "true")   {
		var variable10 = "Game_Central_Station_Container";
    document.getElementById(variable10).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable10).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("niceland") == "true")   {
		var variable11 = "Niceland_Container";
    document.getElementById(variable11).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable11).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("cybug") == "true")   {
		var variable12 = "Cy-Bug_Sector_Container";
    document.getElementById(variable12).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable12).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("candy") == "true")   {
		var variable13 = "Candy_Kingdom_Container";
    document.getElementById(variable13).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable13).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
  
	if(getParameterByName("extras") == "true")   {
		var variable14 = "Extras_Container";
    document.getElementById(variable14).classList.toggle("showMap");
    $(document).ready(function() {
      $("#" + variable14).find("img").each(function() {
           $(this).attr("src", $(this).data("src"));
         });
    });
  }
}

function getParameterByName(name, url = window.location.href) {
  name = name.toLowerCase();
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



/* $(document).ready(function() {
  $("div:visible").each(function() {
     $(this).find("img").each(function() {
       $(this).attr("src", $(this).data("src"));
     });
  });
}); */