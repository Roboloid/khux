function switchDisplay() {
  var comparator = document.getElementById("swapbtn_container").src.substring(document.getElementById("swapbtn_container").src.length - 5, document.getElementById("swapbtn_container").src.length);
  if(comparator == "r.png")  {
    document.getElementById("swapbtn_container").src = "./images/ui/medalButton_toMedal.png";
    document.getElementById("Medals_Container").classList.toggle("show1");
    document.getElementById("Renders_Container").classList.toggle("show2");
  }
  else  {
    document.getElementById("swapbtn_container").src = "./images/ui/medalButton_toRender.png";
    document.getElementById("Medals_Container").classList.toggle("show1");
    document.getElementById("Renders_Container").classList.toggle("show2");
  }
}