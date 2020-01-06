// Toggle dropdown
function keybladeDropdown() {
  document.getElementById("dropdown_container").classList.toggle("show");
}

function selectKeyblade(value)  {
  if(value != "") {
    console.log(value);

    /* Reset values */
    document.getElementById("level1").value = "";
    document.getElementById("level2").value = "";
    loadKeyblade();
  }
}

function loadKeyblade()  {
  document.getElementById("number_container").classList.toggle("showNum", true);
}

function displayValue(value)  {
  document.getElementById("displayValue_container").innerHTML = value;
}

function displayValue2(value)  {
  document.getElementById("displayValue_container2").innerHTML = value;
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