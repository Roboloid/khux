function showFunction(value)  {
    var variable = value + "_Container";
    document.getElementById(variable).classList.toggle("showSection");
    $(document).ready(function() {
      $("#" + variable).find("img").each(function() {
          $(this).attr("src", $(this).data("src"));
        });
    });
}

function pageLoad()	{
    if(getParameterByName("world") == "true")   {
        var variable1 = "WorldIcon_Container";
        document.getElementById(variable1).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable1).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("artwork") == "true")   {
        var variable2 = "Artwork_Container";
        document.getElementById(variable2).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable2).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("character") == "true")   {
        var variable3 = "Character_Container";
        document.getElementById(variable3).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable3).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("keyblade") == "true")   {
        var variable4 = "Keyblade_Container";
        document.getElementById(variable4).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable4).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("title") == "true")   {
        var variable5 = "Title_Container";
        document.getElementById(variable5).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable5).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("board") == "true")   {
        var variable6 = "Board_Container";
        document.getElementById(variable6).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable6).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("avatar") == "true")   {
        var variable7 = "Avatar_Container";
        document.getElementById(variable7).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable7).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("pet") == "true")   {
        var variable8 = "Pet_Container";
        document.getElementById(variable8).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable8).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("accessory") == "true")   {
        var variable9 = "Accessory_Container";
        document.getElementById(variable9).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable9).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("xtres") == "true")   {
        var variable10 = "Xtres_Container";
        document.getElementById(variable10).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable10).find("img").each(function() {
            $(this).attr("src", $(this).data("src"));
            });
        });
    }
    
    if(getParameterByName("other") == "true")   {
        var variable11 = "Other_Container";
        document.getElementById(variable11).classList.toggle("showSection");
        $(document).ready(function() {
        $("#" + variable11).find("img").each(function() {
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