// Toggle dropdown
function keybladeDropdown() {
  var comparator = document.getElementById("dropbtn_container").src.substring(document.getElementById("dropbtn_container").src.length - 5, document.getElementById("dropbtn_container").src.length);
  if(comparator == "n.png")  {
    document.getElementById("dropbtn_container").src = "./images/ui/kbButton_Off.png";
  }
  else  {
    document.getElementById("dropbtn_container").src = "./images/ui/kbButton_On.png";
  }
  document.getElementById("dropdown_container").classList.toggle("show");
}

var currentKeyblade = "";

function selectKeyblade(value)  {
  if(value != "") {
    console.log(value);

    /* Reset values */
    currentKeyblade = value;

    document.getElementById("dropbtn_container").src = "./images/ui/kbButton_Off.png";
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }

    document.getElementById("number_container").classList.toggle("showNum", true);
    document.getElementById("gap_container").classList.toggle("showNum", true);

    calculatePassives();
  }
}

function calculatePassives()   {
    var thisBlade;
      switch(currentKeyblade) {
        case "kb1":
          thisBlade = kb1_pass;
          break;
        case "kb2":
          thisBlade = kb2_pass;
          break;
        case "kb3":
          thisBlade = kb3_pass;
          break;
        case "kb4":
          thisBlade = kb4_pass;
          break;
        case "kb5":
          thisBlade = kb5_pass;
          break;
        case "kb6":
          thisBlade = kb6_pass;
          break;
        case "kb7":
          thisBlade = kb7_pass;
          break;
        case "kb8":
          thisBlade = kb8_pass;
          break;
        case "kb9":
          thisBlade = kb9_pass;
          break;
        case "kb10":
          thisBlade = kb10_pass;
          break;
        case "kb11":
          thisBlade = kb11_pass;
          break;
        case "kb12":
          thisBlade = kb12_pass;
          break;
        case "kb13":
          thisBlade = kb13_pass;
          break;
        case "kb14":
          thisBlade = kb14_pass;
          break;
        case "kb15":
          thisBlade = kb15_pass;
          break;
        case "kb16":
          thisBlade = kb16_pass;
          break;
      }

      var passiveDiv = document.getElementById("number_container");
      passiveDiv.innerHTML = "";
      passiveDiv.className = "number-content";
      passiveDiv.style = "font-size:20px; text-align:center; color:black; font-family:Verdana, sans-serif";

      var grabKeyblade = document.createElement('img');
      grabKeyblade.style = "display: block; text-align: center; margin-left: auto; margin-right: auto";
      grabKeyblade.className = "shadow";
      grabKeyblade.src = "./images/icon/" + currentKeyblade + "_icon.png";
      passiveDiv.appendChild(grabKeyblade);

      var tableElement = document.createElement('table');
      tableElement.style = "margin: 50px; text-align: center; display: inline-block";
      tableElement.setAttribute('border', '1');
      var tableBodyElement = document.createElement('tbody');
      
      for(var level in thisBlade)   {
        var trElement = document.createElement('tr');
          for(var passive in thisBlade[level])  {
            var tdElement1 = document.createElement('td');
            tdElement1.style = "width: 150px; margin-right: 100px";
            tdElement1.appendChild(document.createTextNode(level));
            trElement.appendChild(tdElement1);

            
            var tdElement2 = document.createElement('td');
            var tdElement2IMG = document.createElement('img');
            tdElement2IMG.src = "./images/ui/" + passive + ".png";
            tdElement2IMG.style = "width: 80px";
            tdElement2.appendChild(tdElement2IMG);
            trElement.appendChild(tdElement2);


            var tdElement3 = document.createElement('td');
            tdElement3.style = "width: 100px";
            tdElement3.appendChild(document.createTextNode(" +" + thisBlade[level][passive]));
            trElement.appendChild(tdElement3);
          }
          tableBodyElement.appendChild(trElement);
      }
      tableElement.appendChild(tableBodyElement);
      passiveDiv.appendChild(tableElement);
}

// Close the dropdown menu if the user clicks outside of it

window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropbtn')) {
    document.getElementById("dropbtn_container").src = "./images/ui/kbButton_Off.png";
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
});

var kb1_pass = {      // Keyblade1: Starlight
    "Lv. 35":     {"upSpeed":       50},
    "Lv. 35.5":   {"upMagic":       50},
    "Lv. 36":     {"revPower":      50},
    "Lv. 36.5":   {"upPower":       50},
    "Lv. 37":     {"revMagic":      50},
    "Lv. 37.5":   {"upSpeed":       50},
    "Lv. 38":     {"upSpeed":       50},
    "Lv. 38.5":   {"upMagic":       50},
    "Lv. 39":     {"revPower":      50},
    "Lv. 39.5":   {"revSpeed":      50},
    "Lv. 40":     {"genMagic":      100},
    "Lv. 40.5":   {"upSpeed":       50},
    "Lv. 41":     {"upSpeed":       50},
    "Lv. 41.5":   {"upMagic":       50},
    "Lv. 42":     {"revPower":      50},
    "Lv. 42.5":   {"upPower":       50},
    "Lv. 43":     {"upMagic":       50},
    "Lv. 43.5":   {"upSpeed":       50},
    "Lv. 44":     {"upSpeed":       50},
    "Lv. 44.5":   {"upMagic":       50},
    "Lv. 45":     {"revPower":      50},
    "Lv. 45.5":   {"revSpeed":      50},
    "Lv. 46":     {"revMagic":      50},
    "Lv. 46.5":   {"upSpeed":       50},
    "Lv. 47":     {"upSpeed":       50},
    "Lv. 47.5":   {"upMagic":       50},
    "Lv. 48":     {"revPower":      50},
    "Lv. 48.5":   {"revSpeed":      50},
    "Lv. 49":     {"revMagic":      50},
    "Lv. 49.5":   {"revMagic":      50},
    "Lv. 50":     {"genSpeed":      200}
};      // Keyblade1: Starlight

var kb2_pass = {      // Keyblade2: Treasure Trove
    "Lv. 35":     {"upPower":       50},
    "Lv. 35.5":   {"revPower":      50},
    "Lv. 36":     {"upPower":       50},
    "Lv. 36.5":   {"revPower":      50},
    "Lv. 37":     {"upPower":       50},
    "Lv. 37.5":   {"revPower":      50},
    "Lv. 38":     {"upPower":       50},
    "Lv. 38.5":   {"revPower":      50},
    "Lv. 39":     {"upPower":       50},
    "Lv. 39.5":   {"revPower":      50},
    "Lv. 40":     {"genPower":      200},
    "Lv. 40.5":   {"revPower":      50},
    "Lv. 41":     {"upPower":       50},
    "Lv. 41.5":   {"revPower":      50},
    "Lv. 42":     {"upPower":       50},
    "Lv. 42.5":   {"revPower":      50},
    "Lv. 43":     {"upPower":       50},
    "Lv. 43.5":   {"revPower":      50},
    "Lv. 44":     {"upPower":       50},
    "Lv. 44.5":   {"revPower":      50},
    "Lv. 45":     {"upPower":       50},
    "Lv. 45.5":   {"revPower":      50},
    "Lv. 46":     {"upPower":       50},
    "Lv. 46.5":   {"revPower":      50},
    "Lv. 47":     {"upPower":       50},
    "Lv. 47.5":   {"revPower":      50},
    "Lv. 48":     {"upPower":       50},
    "Lv. 48.5":   {"revPower":      50},
    "Lv. 49":     {"upPower":       50},
    "Lv. 49.5":   {"revPower":      50},
    "Lv. 50":     {"genPower":      200}
};      // Keyblade2: Treasure Trove

var kb3_pass = {      // Keyblade3: Lady Luck
    "Lv. 35":     {"upSpeed":       50},
    "Lv. 35.5":   {"revSpeed":      50},
    "Lv. 36":     {"upSpeed":       50},
    "Lv. 36.5":   {"revSpeed":      50},
    "Lv. 37":     {"upSpeed":       50},
    "Lv. 37.5":   {"revSpeed":      50},
    "Lv. 38":     {"upSpeed":       50},
    "Lv. 38.5":   {"revSpeed":      50},
    "Lv. 39":     {"upSpeed":       50},
    "Lv. 39.5":   {"revSpeed":      50},
    "Lv. 40":     {"genSpeed":      200},
    "Lv. 40.5":   {"revSpeed":      50},
    "Lv. 41":     {"upSpeed":       50},
    "Lv. 41.5":   {"revSpeed":      50},
    "Lv. 42":     {"upSpeed":       50},
    "Lv. 42.5":   {"revSpeed":      50},
    "Lv. 43":     {"upSpeed":       50},
    "Lv. 43.5":   {"revSpeed":      50},
    "Lv. 44":     {"upSpeed":       50},
    "Lv. 44.5":   {"revSpeed":      50},
    "Lv. 45":     {"upSpeed":       50},
    "Lv. 45.5":   {"revSpeed":      50},
    "Lv. 46":     {"upSpeed":       50},
    "Lv. 46.5":   {"revSpeed":      50},
    "Lv. 47":     {"upSpeed":       50},
    "Lv. 47.5":   {"revSpeed":      50},
    "Lv. 48":     {"upSpeed":       50},
    "Lv. 48.5":   {"revSpeed":      50},
    "Lv. 49":     {"upSpeed":       50},
    "Lv. 49.5":   {"revSpeed":      50},
    "Lv. 50":     {"genSpeed":      200}
};      // Keyblade3: Lady Luck

var kb4_pass = {      // Keyblade4: Three Wishes
    "Lv. 35":     {"upMagic":       50},
    "Lv. 35.5":   {"revMagic":      50},
    "Lv. 36":     {"upMagic":       50},
    "Lv. 36.5":   {"revMagic":      50},
    "Lv. 37":     {"upMagic":       50},
    "Lv. 37.5":   {"revMagic":      50},
    "Lv. 38":     {"upMagic":       50},
    "Lv. 38.5":   {"revMagic":      50},
    "Lv. 39":     {"upMagic":       50},
    "Lv. 39.5":   {"revMagic":      50},
    "Lv. 40":     {"genMagic":      200},
    "Lv. 40.5":   {"revMagic":      50},
    "Lv. 41":     {"upMagic":       50},
    "Lv. 41.5":   {"revMagic":      50},
    "Lv. 42":     {"upMagic":       50},
    "Lv. 42.5":   {"revMagic":      50},
    "Lv. 43":     {"upMagic":       50},
    "Lv. 43.5":   {"revMagic":      50},
    "Lv. 44":     {"upMagic":       50},
    "Lv. 44.5":   {"revMagic":      50},
    "Lv. 45":     {"upMagic":       50},
    "Lv. 45.5":   {"revMagic":      50},
    "Lv. 46":     {"upMagic":       50},
    "Lv. 46.5":   {"revMagic":      50},
    "Lv. 47":     {"upMagic":       50},
    "Lv. 47.5":   {"revMagic":      50},
    "Lv. 48":     {"upMagic":       50},
    "Lv. 48.5":   {"revMagic":      50},
    "Lv. 49":     {"upMagic":       50},
    "Lv. 49.5":   {"revMagic":      50},
    "Lv. 50":     {"genMagic":      200}
};      // Keyblade4: Three Wishes

var kb5_pass = {      // Keyblade5: Olympia
    "Lv. 35":     {"upSpeed":       50},
    "Lv. 35.5":   {"revPower":      50},
    "Lv. 36":     {"revSpeed":      50},
    "Lv. 36.5":   {"upPower":       50},
    "Lv. 37":     {"upSpeed":       50},
    "Lv. 37.5":   {"revPower":      50},
    "Lv. 38":     {"revSpeed":      50},
    "Lv. 38.5":   {"upPower":       50},
    "Lv. 39":     {"upSpeed":       50},
    "Lv. 39.5":   {"revPower":      50},
    "Lv. 40":     {"genPower":      100},
    "Lv. 40.5":   {"upPower":       50},
    "Lv. 41":     {"upSpeed":       50},
    "Lv. 41.5":   {"revPower":      50},
    "Lv. 42":     {"revSpeed":      50},
    "Lv. 42.5":   {"upPower":       50},
    "Lv. 43":     {"upSpeed":       50},
    "Lv. 43.5":   {"revPower":      50},
    "Lv. 44":     {"revSpeed":      50},
    "Lv. 44.5":   {"upPower":       50},
    "Lv. 45":     {"upSpeed":       50},
    "Lv. 45.5":   {"revPower":      50},
    "Lv. 46":     {"revSpeed":      50},
    "Lv. 46.5":   {"upPower":       50},
    "Lv. 47":     {"upSpeed":       50},
    "Lv. 47.5":   {"revPower":      50},
    "Lv. 48":     {"revSpeed":      50},
    "Lv. 48.5":   {"upPower":       50},
    "Lv. 49":     {"upSpeed":       50},
    "Lv. 49.5":   {"revPower":      50},
    "Lv. 50":     {"genSpeed":      200}
};      // Keyblade5: Olympia

var kb6_pass = {      // Keyblade6: Divine Rose
    "Lv. 35":     {"upMagic":       50},
    "Lv. 35.5":   {"upMagic":       50},
    "Lv. 36":     {"revSpeed":      50},
    "Lv. 36.5":   {"upMagic":       50},
    "Lv. 37":     {"revMagic":      50},
    "Lv. 37.5":   {"revSpeed":      50},
    "Lv. 38":     {"upMagic":       50},
    "Lv. 38.5":   {"upMagic":       50},
    "Lv. 39":     {"revSpeed":      50},
    "Lv. 39.5":   {"upMagic":       50},
    "Lv. 40":     {"genMagic":      100},
    "Lv. 40.5":   {"revSpeed":      50},
    "Lv. 41":     {"upMagic":       50},
    "Lv. 41.5":   {"upMagic":       50},
    "Lv. 42":     {"revSpeed":      50},
    "Lv. 42.5":   {"upMagic":       50},
    "Lv. 43":     {"revMagic":      50},
    "Lv. 43.5":   {"revSpeed":      50},
    "Lv. 44":     {"upMagic":       50},
    "Lv. 44.5":   {"upMagic":       50},
    "Lv. 45":     {"revSpeed":      50},
    "Lv. 45.5":   {"upMagic":       50},
    "Lv. 46":     {"revMagic":      50},
    "Lv. 46.5":   {"revSpeed":      50},
    "Lv. 47":     {"upMagic":       50},
    "Lv. 47.5":   {"upMagic":       50},
    "Lv. 48":     {"revSpeed":      50},
    "Lv. 48.5":   {"upMagic":       50},
    "Lv. 49":     {"revMagic":      50},
    "Lv. 49.5":   {"revSpeed":      50},
    "Lv. 50":     {"genSpeed":      200}
};      // Keyblade6: Divine Rose

var kb7_pass = {      // Keyblade7: Moogle O' Glory
    "Lv. 35":     {"revMagic":      50},
    "Lv. 35.5":   {"revPower":      50},
    "Lv. 36":     {"upMagic":       50},
    "Lv. 36.5":   {"upPower":       50},
    "Lv. 37":     {"revMagic":      50},
    "Lv. 37.5":   {"revPower":      50},
    "Lv. 38":     {"upMagic":       50},
    "Lv. 38.5":   {"upPower":       50},
    "Lv. 39":     {"revMagic":      50},
    "Lv. 39.5":   {"revPower":      50},
    "Lv. 40":     {"genMagic":      100},
    "Lv. 40.5":   {"upPower":       50},
    "Lv. 41":     {"revMagic":      50},
    "Lv. 41.5":   {"revPower":      50},
    "Lv. 42":     {"upMagic":       50},
    "Lv. 42.5":   {"upPower":       50},
    "Lv. 43":     {"revMagic":      50},
    "Lv. 43.5":   {"revPower":      50},
    "Lv. 44":     {"upMagic":       50},
    "Lv. 44.5":   {"upPower":       50},
    "Lv. 45":     {"revMagic":      50},
    "Lv. 45.5":   {"revPower":      50},
    "Lv. 46":     {"upMagic":       50},
    "Lv. 46.5":   {"upPower":       50},
    "Lv. 47":     {"revMagic":      50},
    "Lv. 47.5":   {"revPower":      50},
    "Lv. 48":     {"upMagic":       50},
    "Lv. 48.5":   {"upPower":       50},
    "Lv. 49":     {"revMagic":      50},
    "Lv. 49.5":   {"revPower":      50},
    "Lv. 50":     {"genPower":      200}
};      // Keyblade7: Moogle O' Glory

var kb8_pass = {      // Keyblade8: Sleeping Lion
    "Lv. 35":     {"upSpeed":		50},
    "Lv. 35.5":   {"upSpeed":      	50},
    "Lv. 36":     {"upSpeed":       50},
    "Lv. 36.5":   {"upSpeed":       50},
    "Lv. 37":     {"upSpeed":      	50},
    "Lv. 37.5":   {"upSpeed":      	50},
    "Lv. 38":     {"upSpeed":       50},
    "Lv. 38.5":   {"upSpeed":       50},
    "Lv. 39":     {"upSpeed":      	50},
    "Lv. 39.5":   {"upSpeed":      	50},
    "Lv. 40":     {"genUp":      	200},
    "Lv. 40.5":   {"upSpeed":       50},
    "Lv. 41":     {"upSpeed":      	50},
    "Lv. 41.5":   {"upSpeed":      	50},
    "Lv. 42":     {"upSpeed":       50},
    "Lv. 42.5":   {"upSpeed":       50},
    "Lv. 43":     {"upSpeed":      	50},
    "Lv. 43.5":   {"upSpeed":      	50},
    "Lv. 44":     {"upSpeed":       50},
    "Lv. 44.5":   {"upSpeed":       50},
    "Lv. 45":     {"upSpeed":      	50},
    "Lv. 45.5":   {"upSpeed":      	50},
    "Lv. 46":     {"upSpeed":       50},
    "Lv. 46.5":   {"upSpeed":       50},
    "Lv. 47":     {"upSpeed":      	50},
    "Lv. 47.5":   {"upSpeed":      	50},
    "Lv. 48":     {"upSpeed":       50},
    "Lv. 48.5":   {"upSpeed":       50},
    "Lv. 49":     {"upSpeed":      	50},
    "Lv. 49.5":   {"upSpeed":      	50},
    "Lv. 50":     {"genUp":      	200}
};      // Keyblade8: Sleeping Lion

var kb9_pass = {      // Keyblade9: Counterpoint
    "Lv. 35":     {"upMagic":		50},
    "Lv. 35.5":   {"upMagic":      	50},
    "Lv. 36":     {"upMagic":       50},
    "Lv. 36.5":   {"upMagic":       50},
    "Lv. 37":     {"upMagic":      	50},
    "Lv. 37.5":   {"upMagic":      	50},
    "Lv. 38":     {"upMagic":       50},
    "Lv. 38.5":   {"upMagic":       50},
    "Lv. 39":     {"upMagic":      	50},
    "Lv. 39.5":   {"upMagic":      	50},
    "Lv. 40":     {"genUp":      	200},
    "Lv. 40.5":   {"upMagic":       50},
    "Lv. 41":     {"upMagic":      	50},
    "Lv. 41.5":   {"upMagic":      	50},
    "Lv. 42":     {"upMagic":       50},
    "Lv. 42.5":   {"upMagic":       50},
    "Lv. 43":     {"upMagic":      	50},
    "Lv. 43.5":   {"upMagic":      	50},
    "Lv. 44":     {"upMagic":       50},
    "Lv. 44.5":   {"upMagic":       50},
    "Lv. 45":     {"upMagic":      	50},
    "Lv. 45.5":   {"upMagic":      	50},
    "Lv. 46":     {"upMagic":       50},
    "Lv. 46.5":   {"upMagic":       50},
    "Lv. 47":     {"upMagic":      	50},
    "Lv. 47.5":   {"upMagic":      	50},
    "Lv. 48":     {"upMagic":       50},
    "Lv. 48.5":   {"upMagic":       50},
    "Lv. 49":     {"upMagic":      	50},
    "Lv. 49.5":   {"upMagic":      	50},
    "Lv. 50":     {"genUp":      	200}
};      // Keyblade9: Counterpoint

var kb10_pass = {      // Keyblade10: Stroke of Midnight
    "Lv. 35":     {"upPower":       50},
    "Lv. 35.5":   {"upMagic":       50},
    "Lv. 36":     {"revSpeed":      50},
    "Lv. 36.5":   {"revPower":      50},
    "Lv. 37":     {"upPower":       50},
    "Lv. 37.5":   {"upMagic":       50},
    "Lv. 38":     {"revSpeed":      50},
    "Lv. 38.5":   {"revPower":      50},
    "Lv. 39":     {"upPower":       50},
    "Lv. 39.5":   {"upMagic":       50},
    "Lv. 40":     {"genMagic":      100},
    "Lv. 40.5":   {"revPower":      50},
    "Lv. 41":     {"upPower":       50},
    "Lv. 41.5":   {"upMagic":       50},
    "Lv. 42":     {"revSpeed":      50},
    "Lv. 42.5":   {"revPower":      50},
    "Lv. 43":     {"upPower":       50},
    "Lv. 43.5":   {"upMagic":       50},
    "Lv. 44":     {"revSpeed":      50},
    "Lv. 44.5":   {"revPower":      50},
    "Lv. 45":     {"upPower":       50},
    "Lv. 45.5":   {"upMagic":       50},
    "Lv. 46":     {"revSpeed":      50},
    "Lv. 46.5":   {"revPower":      50},
    "Lv. 47":     {"upPower":       50},
    "Lv. 47.5":   {"upMagic":       50},
    "Lv. 48":     {"revSpeed":      50},
    "Lv. 48.5":   {"revPower":      50},
    "Lv. 49":     {"upPower":       50},
    "Lv. 49.5":   {"upMagic":       50},
    "Lv. 50":     {"genPower":      200}
};      // Keyblade10: Stroke of Midnight

var kb11_pass = {      // Keyblade11: Fenrir
    "Lv. 35":     {"upPower":		50},
    "Lv. 35.5":   {"upPower":      	50},
    "Lv. 36":     {"upPower":       50},
    "Lv. 36.5":   {"upPower":       50},
    "Lv. 37":     {"upPower":      	50},
    "Lv. 37.5":   {"upPower":      	50},
    "Lv. 38":     {"upPower":       50},
    "Lv. 38.5":   {"upPower":       50},
    "Lv. 39":     {"upPower":      	50},
    "Lv. 39.5":   {"upPower":      	50},
    "Lv. 40":     {"genUp":      	200},
    "Lv. 40.5":   {"upPower":       50},
    "Lv. 41":     {"upPower":      	50},
    "Lv. 41.5":   {"upPower":      	50},
    "Lv. 42":     {"upPower":       50},
    "Lv. 42.5":   {"upPower":       50},
    "Lv. 43":     {"upPower":      	50},
    "Lv. 43.5":   {"upPower":      	50},
    "Lv. 44":     {"upPower":       50},
    "Lv. 44.5":   {"upPower":       50},
    "Lv. 45":     {"upPower":      	50},
    "Lv. 45.5":   {"upPower":      	50},
    "Lv. 46":     {"upPower":       50},
    "Lv. 46.5":   {"upPower":       50},
    "Lv. 47":     {"upPower":      	50},
    "Lv. 47.5":   {"upPower":      	50},
    "Lv. 48":     {"upPower":       50},
    "Lv. 48.5":   {"upPower":       50},
    "Lv. 49":     {"upPower":      	50},
    "Lv. 49.5":   {"upPower":      	50},
    "Lv. 50":     {"genUp":      	200}
};      // Keyblade11: Fenrir

var kb12_pass = {      // Keyblade12: Darkgnaw
    "Lv. 35":     {"revPower":		50},
    "Lv. 35.5":   {"revPower":      50},
    "Lv. 36":     {"revPower":      50},
    "Lv. 36.5":   {"revPower":      50},
    "Lv. 37":     {"revPower":      50},
    "Lv. 37.5":   {"revPower":      50},
    "Lv. 38":     {"revPower":      50},
    "Lv. 38.5":   {"revPower":      50},
    "Lv. 39":     {"revPower":      50},
    "Lv. 39.5":   {"revPower":      50},
    "Lv. 40":     {"genRev":      	200},
    "Lv. 40.5":   {"revPower":      50},
    "Lv. 41":     {"revPower":      50},
    "Lv. 41.5":   {"revPower":      50},
    "Lv. 42":     {"revPower":      50},
    "Lv. 42.5":   {"revPower":      50},
    "Lv. 43":     {"revPower":      50},
    "Lv. 43.5":   {"revPower":      50},
    "Lv. 44":     {"revPower":      50},
    "Lv. 44.5":   {"revPower":      50},
    "Lv. 45":     {"revPower":      50},
    "Lv. 45.5":   {"revPower":      50},
    "Lv. 46":     {"revPower":      50},
    "Lv. 46.5":   {"revPower":      50},
    "Lv. 47":     {"revPower":      50},
    "Lv. 47.5":   {"revPower":      50},
    "Lv. 48":     {"revPower":      50},
    "Lv. 48.5":   {"revPower":      50},
    "Lv. 49":     {"revPower":      50},
    "Lv. 49.5":   {"revPower":      50},
    "Lv. 50":     {"genRev":      	200}
};      // Keyblade12: Darkgnaw

var kb13_pass = {      // Keyblade13: Missing Ache
    "Lv. 35":     {"revSpeed":		50},
    "Lv. 35.5":   {"revSpeed":      50},
    "Lv. 36":     {"revSpeed":      50},
    "Lv. 36.5":   {"revSpeed":      50},
    "Lv. 37":     {"revSpeed":      50},
    "Lv. 37.5":   {"revSpeed":      50},
    "Lv. 38":     {"revSpeed":      50},
    "Lv. 38.5":   {"revSpeed":      50},
    "Lv. 39":     {"revSpeed":      50},
    "Lv. 39.5":   {"revSpeed":      50},
    "Lv. 40":     {"genRev":      	200},
    "Lv. 40.5":   {"revSpeed":      50},
    "Lv. 41":     {"revSpeed":      50},
    "Lv. 41.5":   {"revSpeed":      50},
    "Lv. 42":     {"revSpeed":      50},
    "Lv. 42.5":   {"revSpeed":      50},
    "Lv. 43":     {"revSpeed":      50},
    "Lv. 43.5":   {"revSpeed":      50},
    "Lv. 44":     {"revSpeed":      50},
    "Lv. 44.5":   {"revSpeed":      50},
    "Lv. 45":     {"revSpeed":      50},
    "Lv. 45.5":   {"revSpeed":      50},
    "Lv. 46":     {"revSpeed":      50},
    "Lv. 46.5":   {"revSpeed":      50},
    "Lv. 47":     {"revSpeed":      50},
    "Lv. 47.5":   {"revSpeed":      50},
    "Lv. 48":     {"revSpeed":      50},
    "Lv. 48.5":   {"revSpeed":      50},
    "Lv. 49":     {"revSpeed":      50},
    "Lv. 49.5":   {"revSpeed":      50},
    "Lv. 50":     {"genRev":      	200}
};      // Keyblade13: Missing Ache

var kb14_pass = {      // Keyblade14: Fairy Stars
    "Lv. 35":     {"revMagic":      50},
    "Lv. 35.5":   {"upSpeed":       50},
    "Lv. 36":     {"revMagic":      50},
    "Lv. 36.5":   {"upSpeed":       50},
    "Lv. 37":     {"revPower":      50},
    "Lv. 37.5":   {"upPower":       50},
    "Lv. 38":     {"revMagic":      50},
    "Lv. 38.5":   {"revMagic":      50},
    "Lv. 39":     {"upSpeed":       50},
    "Lv. 39.5":   {"revMagic":      50},
    "Lv. 40":     {"genSpeed":      100},
    "Lv. 40.5":   {"revPower":      50},
    "Lv. 41":     {"upPower":       50},
    "Lv. 41.5":   {"revMagic":      50},
    "Lv. 42":     {"revMagic":      50},
    "Lv. 42.5":   {"upSpeed":       50},
    "Lv. 43":     {"revMagic":      50},
    "Lv. 43.5":   {"upSpeed":       50},
    "Lv. 44":     {"revPower":      50},
    "Lv. 44.5":   {"upPower":       50},
    "Lv. 45":     {"revMagic":      50},
    "Lv. 45.5":   {"revMagic":      50},
    "Lv. 46":     {"upSpeed":       50},
    "Lv. 46.5":   {"revMagic":      50},
    "Lv. 47":     {"upSpeed":       50},
    "Lv. 47.5":   {"revPower":      50},
    "Lv. 48":     {"upPower":       50},
    "Lv. 48.5":   {"revMagic":      50},
    "Lv. 49":     {"revMagic":      50},
    "Lv. 49.5":   {"upSpeed":       50},
    "Lv. 50":     {"genMagic":      200}
};      // Keyblade14: Fairy Stars

var kb15_pass = {      // Keyblade15: Diamond Dust
    "Lv. 35":     {"revMagic":		50},
    "Lv. 35.5":   {"revMagic":      50},
    "Lv. 36":     {"revMagic":      50},
    "Lv. 36.5":   {"revMagic":      50},
    "Lv. 37":     {"revMagic":      50},
    "Lv. 37.5":   {"revMagic":      50},
    "Lv. 38":     {"revMagic":      50},
    "Lv. 38.5":   {"revMagic":      50},
    "Lv. 39":     {"revMagic":      50},
    "Lv. 39.5":   {"revMagic":      50},
    "Lv. 40":     {"genRev":      	200},
    "Lv. 40.5":   {"revMagic":      50},
    "Lv. 41":     {"revMagic":      50},
    "Lv. 41.5":   {"revMagic":      50},
    "Lv. 42":     {"revMagic":      50},
    "Lv. 42.5":   {"revMagic":      50},
    "Lv. 43":     {"revMagic":      50},
    "Lv. 43.5":   {"revMagic":      50},
    "Lv. 44":     {"revMagic":      50},
    "Lv. 44.5":   {"revMagic":      50},
    "Lv. 45":     {"revMagic":      50},
    "Lv. 45.5":   {"revMagic":      50},
    "Lv. 46":     {"revMagic":      50},
    "Lv. 46.5":   {"revMagic":      50},
    "Lv. 47":     {"revMagic":      50},
    "Lv. 47.5":   {"revMagic":      50},
    "Lv. 48":     {"revMagic":      50},
    "Lv. 48.5":   {"revMagic":      50},
    "Lv. 49":     {"revMagic":      50},
    "Lv. 49.5":   {"revMagic":      50},
    "Lv. 50":     {"genRev":      	200}
};      // Keyblade15: Diamond Dust

var kb16_pass = {      // Keyblade16: Bad Guy Breaker
    "Lv. 35":     {"upSpeed":		50},
    "Lv. 36":     {"upSpeed":       50},
    "Lv. 37":     {"upPower":       50},
    "Lv. 38":     {"revSpeed":      50},
    "Lv. 39":     {"upSpeed":       50},
    "Lv. 40":     {"genMagic":      100},
    "Lv. 41":     {"upSpeed":       50},
    "Lv. 42":     {"upPower":       50},
    "Lv. 43":     {"revSpeed":      50},
    "Lv. 44":     {"revSpeed":      50},
    "Lv. 45":     {"upSpeed":       50},
    "Lv. 46":     {"upPower":       50},
    "Lv. 47":     {"revSpeed":      50},
    "Lv. 48":     {"revSpeed":      50},
    "Lv. 49":     {"upSpeed":       50},
    "Lv. 50":     {"genPower":      200}
};      // Keyblade16: Bad Guy Breaker
