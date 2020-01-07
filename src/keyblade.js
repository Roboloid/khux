// Toggle dropdown
function keybladeDropdown() {
  document.getElementById("dropdown_container").classList.toggle("show");
}

var currentKeyblade = "";
var cost1 = "";
var cost2 = "";

function selectKeyblade(value)  {
  if(value != "") {
    console.log(value);

    /* Reset values */
    document.getElementById("level1").value = "";
    document.getElementById("level2").value = "";
    currentKeyblade = value;
    grabKeybladeImg(currentKeyblade);
    cost1 = "";
    cost2 = "";

    document.getElementById("showPower").classList.toggle("showPowerNum", false);
    document.getElementById("showSpeed").classList.toggle("showSpeedNum", false);
    document.getElementById("showMagic").classList.toggle("showMagicNum", false);
    document.getElementById("showSun").classList.toggle("showSunNum", false);
    document.getElementById("showMoon").classList.toggle("showMoonNum", false);

    document.getElementById("number_container").classList.toggle("showNum", true);
  }
}

function grabKeybladeImg(value)  {
  document.getElementById("kbImage").src = "./public/images/keyblade/" + value + "_3.png";
}

function inputValue(value)  {
  if(value == "") {
    cost1 = "NaN";
  }
  else  {
    cost1 = parseFloat(value);
  }
  calculateCost();
  // document.getElementById("displayValue_container").innerHTML = value;
}

function inputValue2(value)  {
  if(value == "") {
    cost2 = "NaN";
  }
  else  {
    cost2 = parseFloat(value);
  }
  calculateCost();
  // document.getElementById("displayValue_container2").innerHTML = value;
}

function sumCost(keyblade, base, target) {
  var sum = 0;
  for(var value in keyblade)  {
    if(value <= base || value > target) {

    }
    else  {
      sum = sum + keyblade[value];
    }
  }
  return sum;
}

function calculateCost() {
  if(cost1 == "NaN" || cost2 == "NaN" || currentKeyblade == "" || cost1 >= cost2)  { // Inputs not yet full, do nothing
    document.getElementById("displayNumErr").innerHTML = "";
    document.getElementById("showPower").classList.toggle("showPowerNum", false);
    document.getElementById("showSpeed").classList.toggle("showSpeedNum", false);
    document.getElementById("showMagic").classList.toggle("showMagicNum", false);
    document.getElementById("showSun").classList.toggle("showSunNum", false);
    document.getElementById("showMoon").classList.toggle("showMoonNum", false);
  }
  else  {
    if(cost1 < 0 || cost2 > 50)  { // Inputs full but invalid
      document.getElementById("displayNumErr").innerHTML = "Invalid input.";
      document.getElementById("showPower").classList.toggle("showPowerNum", false);
      document.getElementById("showSpeed").classList.toggle("showSpeedNum", false);
      document.getElementById("showMagic").classList.toggle("showMagicNum", false);
      document.getElementById("showSun").classList.toggle("showSunNum", false);
      document.getElementById("showMoon").classList.toggle("showMoonNum", false);
    }
    else  {
      document.getElementById("displayNumErr").innerHTML = "";
      var thisBlade;
      switch(currentKeyblade) {
        case "kb1":
          thisBlade = kb1_cost;
          break;
        case "kb2":
          thisBlade = kb2_cost;
          break;
        case "kb3":
          thisBlade = kb3_cost;
          break;
        case "kb4":
          thisBlade = kb4_cost;
          break;
        case "kb5":
          thisBlade = kb5_cost;
          break;
        case "kb6":
          thisBlade = kb6_cost;
          break;
        case "kb7":
          thisBlade = kb7_cost;
          break;
        case "kb8":
          thisBlade = kb8_cost;
          break;
        case "kb9":
          thisBlade = kb9_cost;
          break;
        case "kb10":
          thisBlade = kb10_cost;
          break;
        case "kb11":
          thisBlade = kb11_cost;
          break;
        case "kb12":
          thisBlade = kb12_cost;
          break;
        case "kb13":
          thisBlade = kb13_cost;
          break;
        case "kb14":
          thisBlade = kb14_cost;
          break;
        case "kb15":
          thisBlade = kb15_cost;
          break;
        case "kb16":
          thisBlade = kb16_cost;
          break;
      }
      var powerCost = sumCost(thisBlade.power, cost1, cost2);
      var speedCost = sumCost(thisBlade.speed, cost1, cost2);
      var magicCost = sumCost(thisBlade.magic, cost1, cost2);
      var sunCost = sumCost(thisBlade.sun, cost1, cost2);
      var moonCost = sumCost(thisBlade.moon, cost1, cost2);
      if(powerCost != 0)  {
        document.getElementById("showPower").classList.toggle("showPowerNum", true);
        document.getElementById("powerCost_container").innerHTML = powerCost;
      }
      else  {
        document.getElementById("showPower").classList.toggle("showPowerNum", false);
      }

      if(speedCost != 0)  {
        document.getElementById("showSpeed").classList.toggle("showSpeedNum", true);
        document.getElementById("speedCost_container").innerHTML = speedCost;
      }
      else  {
        document.getElementById("showSpeed").classList.toggle("showSpeedNum", false);
      }

      if(magicCost != 0)  {
        document.getElementById("showMagic").classList.toggle("showMagicNum", true);
        document.getElementById("magicCost_container").innerHTML = magicCost;
      }
      else  {
        document.getElementById("showMagic").classList.toggle("showMagicNum", false);
      }

      if(sunCost != 0)  {
        document.getElementById("showSun").classList.toggle("showSunNum", true);
        document.getElementById("sunCost_container").innerHTML = sunCost;
      }
      else  {
        document.getElementById("showSun").classList.toggle("showSunNum", false);
      }

      if(moonCost != 0)  {
        document.getElementById("showMoon").classList.toggle("showMoonNum", true);
        document.getElementById("moonCost_container").innerHTML = moonCost;
      }
      else  {
        document.getElementById("showMoon").classList.toggle("showMoonNum", false);
      }

      if(powerCost == 0 && speedCost == 0 && magicCost == 0 && sunCost == 0 && moonCost == 0) {
        document.getElementById("displayNumErr").innerHTML = "There are no gem costs from Lv. " + cost1 + " to Lv. " + cost2 + ".";
      }
      else  {
        document.getElementById("displayNumErr").innerHTML = "";
      }
      
    }
  }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var kb1_cost = {      // Keyblade1: Starlight
  power:  {
    25: 0,
    26: 0,
    27: 1,
    28: 0,
    29: 1,
    30: 1,
    31: 2,
    32: 1,
    33: 2,
    34: 3,
    35: 3
  },
  speed:  {
    25: 0,
    26: 1,
    27: 0,
    28: 1,
    29: 1,
    30: 1,
    31: 1,
    32: 2,
    33: 2,
    34: 3,
    35: 3
  },
  magic:  {
    25: 0,
    26: 0,
    27: 1,
    28: 1,
    29: 1,
    30: 1,
    31: 1,
    32: 2,
    33: 2,
    34: 2,
    35: 4
  },
  sun:  {
    40: 1,
    41: 1,
    42: 1,
    43: 1,
    44: 1,
    45: 1,
    46: 1,
    47: 1,
    48: 1,
    49: 1,
    50: 1
  },
  moon: {
    40: 1,
    41: 1,
    42: 1,
    43: 1,
    44: 1,
    45: 1,
    46: 1,
    47: 1,
    48: 1,
    49: 1,
    50: 1
  }
};      // Keyblade1: Starlight


