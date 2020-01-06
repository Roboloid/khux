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
    cost1 = "";
    cost2 = "";

    document.getElementById("number_container").classList.toggle("showNum", true);
  }
}

function inputValue(value)  {
  if(value == "") {
    cost1 = "NaN";
  }
  else  {
    cost1 = parseFloat(value);
  }
  calculateCost();
  document.getElementById("displayValue_container").innerHTML = value;
}

function inputValue2(value)  {
  if(value == "") {
    cost2 = "NaN";
  }
  else  {
    cost2 = parseFloat(value);
  }
  calculateCost();
  document.getElementById("displayValue_container2").innerHTML = value;
}

function calculateCost() {
  if(cost1 == "NaN" || cost2 == "NaN" || currentKeyblade == "")  { // Inputs not yet full, do nothing
    // document.getElementById("displayValue_container3").innerHTML = "Nope.";
  }
  else  {
    if(cost1 >= cost2)  { // Inputs full but invalid (smaller level is not smaller)
      // document.getElementById("displayValue_container3").innerHTML = "Almost." + cost1 + " " + cost2;
    }
    else  {
      // document.getElementById("displayValue_container3").innerHTML = "Success!" + cost1 + " " + cost2;
      
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