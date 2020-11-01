// Toggle dropdown
function keybladeDropdown() {
  var comparator = document.getElementById("dropbtn_container").src.substring(document.getElementById("dropbtn_container").src.length - 5, document.getElementById("dropbtn_container").src.length);
  if(comparator == "n.png")  {
    document.getElementById("dropbtn_container").src = "./images/ui/passiveButton_Off.png";
  }
  else  {
    document.getElementById("dropbtn_container").src = "./images/ui/passiveButton_On.png";
  }
  document.getElementById("dropdown_container").classList.toggle("show");
}

var currentKeyblade = "";

function selectPlayer()  {
    document.getElementById("dropbtn_container").src = "./images/ui/passiveButton_Off.png";
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

    document.getElementById("LUXlevel").value = "";
    document.getElementById("LUXlevel").classList.toggle("showLabel", true);

    openPlayerPassives(0);
}

function openPlayerPassives(value) {
      var passiveDiv1 = document.getElementById("number_container1");
      passiveDiv1.innerHTML = "";
      passiveDiv1.className = "number-content";
      passiveDiv1.style = "font-size:20px; text-align:center; color:black; font-family:Verdana, sans-serif";

      var grabPlayer = document.createElement('img');
      grabPlayer.style = "display: block; text-align: center; margin-left: auto; margin-right: auto; margin-bottom: 20px";
      grabPlayer.className = "shadow";
      grabPlayer.src = "./images/icon/Player_icon.png";
      passiveDiv1.appendChild(grabPlayer);



      var totalArray = {
        "HP": 0,
        "Gauge": 0,
        "STR": 0,
        "DEF": 0
      }

      var passiveDiv = document.getElementById("number_container");
      passiveDiv.innerHTML = "";
      passiveDiv.className = "number-content";
      passiveDiv.style = "font-size:20px; text-align:center; color:black; font-family:Verdana, sans-serif";
      
      var passiveDivScroll = document.getElementById("scrollable_container");
      passiveDivScroll.innerHTML = "";
      passiveDivScroll.className = "scrollable-content";
      passiveDivScroll.style = "font-size:20px; text-align:center; color:black; font-family:Verdana, sans-serif";

      var tableElement = document.createElement('table');
      tableElement.style = "margin: 50px; text-align: center; display: inline-block";
      tableElement.setAttribute('border', '1');
      var tableBodyElement = document.createElement('tbody');
      
      if(value >= 350 && value <= 900)  {
          for(var level in player_passives)   {
          if(level > value)  {
              break;
          }
          var trElement = document.createElement('tr');
              var tdElement1 = document.createElement('td');
              tdElement1.style = "width: 150px; margin-right: 100px";
              tdElement1.appendChild(document.createTextNode("Lv. " + level));
              trElement.appendChild(tdElement1);

              
              var tdElement2 = document.createElement('td');
              var tdElement2IMG = document.createElement('img');
              tdElement2IMG.src = "./images/ui/PlayerPassive_" + player_passives[level].Type + ".png";
              tdElement2IMG.style = "width: 40px";
              tdElement2.appendChild(tdElement2IMG);
              trElement.appendChild(tdElement2);


              var tdElement3 = document.createElement('td');
              tdElement3.style = "width: 100px";
              tdElement3.appendChild(document.createTextNode(" +" + player_passives[level].Count));
              trElement.appendChild(tdElement3);

              totalArray[player_passives[level].Type] += player_passives[level].Count;

            tableBodyElement.appendChild(trElement);
          }
          tableElement.appendChild(tableBodyElement);
      }
      else  {
          tableElement = "";
      }



      var totalTableElement = document.createElement('table');
      totalTableElement.style = "margin: 25px; text-align: center; display: inline-block";
      totalTableElement.setAttribute('border', '1');
      var totalTableBodyElement = document.createElement('tbody');

      var counter = 0;
      var trElement1 = document.createElement('tr');
      for(var passiveVar in totalArray) {
          var tdElement1 = document.createElement('td');
          var tdElement1IMG = document.createElement('img');
          tdElement1IMG.src = "./images/ui/PlayerPassive_" + passiveVar + ".png";
          tdElement1IMG.style = "width: 40px";
          tdElement1.appendChild(tdElement1IMG);
          trElement1.appendChild(tdElement1);


          var tdElement2 = document.createElement('td');
          tdElement2.style = "width: 100px";
          tdElement2.appendChild(document.createTextNode(" +" + totalArray[passiveVar]));
          trElement1.appendChild(tdElement2);

          totalTableBodyElement.appendChild(trElement1);

          counter++;

          if(counter > 0 && counter % 2 == 0) {
              totalTableBodyElement.appendChild(trElement1);
              var trElement2 = document.createElement('tr');
              trElement1 = trElement2;
          }
      }

      totalTableElement.appendChild(totalTableBodyElement);

      var titleSpan = document.createElement('span');
      titleSpan.style = "display: block; font-size: 36px";
      titleSpan.appendChild(document.createTextNode("Total Passives"));
      passiveDiv.appendChild(titleSpan);

      passiveDiv.appendChild(totalTableElement);

      if(tableElement != "")  {
          var blankSpacer = document.createElement('br');
          passiveDivScroll.appendChild(blankSpacer);
          passiveDivScroll.appendChild(tableElement);
      }
}

function selectKeyblade(value)  {
  if(value != "") {

    /* Reset values */
    currentKeyblade = value;
    document.getElementById("LUXlevel").classList.toggle("showLabel", false);
    document.getElementById("LUXlevel").value = "";
    var passiveDiv1 = document.getElementById("number_container1");
    passiveDiv1.innerHTML = "";

    document.getElementById("dropbtn_container").src = "./images/ui/passiveButton_Off.png";
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

      var passiveDivScroll = document.getElementById("scrollable_container");
      passiveDivScroll.innerHTML = "";
      passiveDivScroll.className = "scrollable-content";
      passiveDivScroll.style = "font-size:20px; text-align:center; color:black; font-family:Verdana, sans-serif";

      var grabKeyblade = document.createElement('img');
      grabKeyblade.style = "display: block; text-align: center; margin-left: auto; margin-right: auto";
      grabKeyblade.className = "shadow";
      grabKeyblade.src = "./images/icon/" + currentKeyblade + "_icon.png";
      passiveDiv.appendChild(grabKeyblade);

      var tableElement = document.createElement('table');
      tableElement.style = "margin: 50px; text-align: center; display: inline-block";
      tableElement.setAttribute('border', '1');
      var tableBodyElement = document.createElement('tbody');

      var totalArray = {
        "genUp": 0,
        "genRev": 0,
        "genPower": 0,
        "genSpeed": 0,
        "genMagic": 0,
        "upPower": 0,
        "upSpeed": 0,
        "upMagic": 0,
        "revPower": 0,
        "revSpeed": 0,
        "revMagic": 0
      }
      
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

            totalArray[passive] += thisBlade[level][passive];
          }
          tableBodyElement.appendChild(trElement);
      }
      tableElement.appendChild(tableBodyElement);


      
      var totalTableElement = document.createElement('table');
      totalTableElement.style = "margin: 25px; text-align: center; display: inline-block";
      totalTableElement.setAttribute('border', '1');
      var totalTableBodyElement = document.createElement('tbody');

      var counter = 0;
      var trElement1 = document.createElement('tr');
      for(var passiveVar in totalArray) {
        if(totalArray[passiveVar] != 0) {
          var tdElement1 = document.createElement('td');
          var tdElement1IMG = document.createElement('img');
          tdElement1IMG.src = "./images/ui/" + passiveVar + ".png";
          tdElement1IMG.style = "width: 75px";
          tdElement1.appendChild(tdElement1IMG);
          trElement1.appendChild(tdElement1);


          var tdElement2 = document.createElement('td');
          tdElement2.style = "width: 100px";
          tdElement2.appendChild(document.createTextNode(" +" + totalArray[passiveVar]));
          trElement1.appendChild(tdElement2);

          counter++;

          if(counter > 0 && counter % 2 == 0) {
              totalTableBodyElement.appendChild(trElement1);
              var trElement2 = document.createElement('tr');
              trElement1 = trElement2;
          }
        }
      }

      if(counter % 2 != 0)  {
        totalTableBodyElement.appendChild(trElement1);
      }

      totalTableElement.appendChild(totalTableBodyElement);

      var titleSpan = document.createElement('span');
      titleSpan.style = "display: block; font-size: 36px; margin-top: 10px";
      titleSpan.appendChild(document.createTextNode("Total Passives"));
      passiveDiv.appendChild(titleSpan);

      passiveDiv.appendChild(totalTableElement);

      if(tableElement != "")  {
          var blankSpacer = document.createElement('br');
          passiveDivScroll.appendChild(blankSpacer);
          passiveDivScroll.appendChild(tableElement);
      }
}

// Close the dropdown menu if the user clicks outside of it

window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropbtn')) {
    document.getElementById("dropbtn_container").src = "./images/ui/passiveButton_Off.png";
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

var player_passives = {
    350:  {
        Type: "STR",
        Count: 100
    },
    355:  {
        Type: "DEF",
        Count: 10
    },
    360:  {
        Type: "DEF",
        Count: 100
    },
    365:  {
        Type: "HP",
        Count: 50
    },
    370:  {
        Type: "HP",
        Count: 100
    },
    375:  {
        Type: "STR",
        Count: 10
    },
    380:  {
        Type: "STR",
        Count: 100
    },
    385:  {
        Type: "DEF",
        Count: 10
    },
    390:  {
        Type: "HP",
        Count: 50
    },
    395:  {
        Type: "STR",
        Count: 10
    },
    400:  {
        Type: "STR",
        Count: 200
    },
    405:  {
        Type: "DEF",
        Count: 10
    },
    410:  {
        Type: "DEF",
        Count: 100
    },
    415:  {
        Type: "HP",
        Count: 50
    },
    420:  {
        Type: "HP",
        Count: 100
    },
    425:  {
        Type: "STR",
        Count: 10
    },
    430:  {
        Type: "DEF",
        Count: 100
    },
    435:  {
        Type: "HP",
        Count: 50
    },
    440:  {
        Type: "STR",
        Count: 10
    },
    445:  {
        Type: "DEF",
        Count: 10
    },
    450:  {
        Type: "STR",
        Count: 100
    },
    452:  {
        Type: "HP",
        Count: 50
    },
    454:  {
        Type: "STR",
        Count: 10
    },
    456:  {
        Type: "DEF",
        Count: 10
    },
    458:  {
        Type: "HP",
        Count: 50
    },
    460:  {
        Type: "DEF",
        Count: 100
    },
    462:  {
        Type: "STR",
        Count: 10
    },
    464:  {
        Type: "DEF",
        Count: 10
    },
    466:  {
        Type: "HP",
        Count: 50
    },
    468:  {
        Type: "STR",
        Count: 10
    },
    470:  {
        Type: "HP",
        Count: 100
    },
    472:  {
        Type: "DEF",
        Count: 10
    },
    474:  {
        Type: "STR",
        Count: 10
    },
    476:  {
        Type: "DEF",
        Count: 10
    },
    478:  {
        Type: "HP",
        Count: 50
    },
    480:  {
        Type: "STR",
        Count: 100
    },
    482:  {
        Type: "HP",
        Count: 50
    },
    484:  {
        Type: "DEF",
        Count: 10
    },
    486:  {
        Type: "STR",
        Count: 10
    },
    488:  {
        Type: "HP",
        Count: 50
    },
    490:  {
        Type: "DEF",
        Count: 100
    },
    492:  {
        Type: "STR",
        Count: 10
    },
    494:  {
        Type: "DEF",
        Count: 10
    },
    496:  {
        Type: "HP",
        Count: 100
    },
    498:  {
        Type: "DEF",
        Count: 10
    },
    500:  {
        Type: "STR",
        Count: 200
    },
    502:  {
        Type: "DEF",
        Count: 10
    },
    504:  {
        Type: "HP",
        Count: 50
    },
    506:  {
        Type: "STR",
        Count: 10
    },
    508:  {
        Type: "HP",
        Count: 50
    },
    510:  {
        Type: "DEF",
        Count: 100
    },
    512:  {
        Type: "STR",
        Count: 10
    },
    514:  {
        Type: "STR",
        Count: 10
    },
    516:  {
        Type: "HP",
        Count: 50
    },
    518:  {
        Type: "DEF",
        Count: 10
    },
    520:  {
        Type: "HP",
        Count: 100
    },
    522:  {
        Type: "DEF",
        Count: 10
    },
    524:  {
        Type: "HP",
        Count: 50
    },
    526:  {
        Type: "STR",
        Count: 10
    },
    528:  {
        Type: "DEF",
        Count: 10
    },
    530:  {
        Type: "STR",
        Count: 100
    },
    532:  {
        Type: "HP",
        Count: 50
    },
    534:  {
        Type: "STR",
        Count: 10
    },
    536:  {
        Type: "DEF",
        Count: 10
    },
    538:  {
        Type: "HP",
        Count: 50
    },
    540:  {
        Type: "DEF",
        Count: 100
    },
    542:  {
        Type: "STR",
        Count: 10
    },
    544:  {
        Type: "DEF",
        Count: 10
    },
    546:  {
        Type: "HP",
        Count: 50
    },
    548:  {
        Type: "DEF",
        Count: 10
    },
    550:  {
        Type: "STR",
        Count: 100
    },
    551:  {
        Type: "DEF",
        Count: 10
    },
    552:  {
        Type: "HP",
        Count: 50
    },
    553:  {
        Type: "STR",
        Count: 10
    },
    554:  {
        Type: "DEF",
        Count: 10
    },
    555:  {
        Type: "Gauge",
        Count: 1
    },
    556:  {
        Type: "STR",
        Count: 10
    },
    557:  {
        Type: "DEF",
        Count: 10
    },
    558:  {
        Type: "DEF",
        Count: 10
    },
    559:  {
        Type: "STR",
        Count: 10
    },
    560:  {
        Type: "DEF",
        Count: 100
    },
    561:  {
        Type: "HP",
        Count: 50
    },
    562:  {
        Type: "STR",
        Count: 10
    },
    563:  {
        Type: "DEF",
        Count: 10
    },
    564:  {
        Type: "HP",
        Count: 100
    },
    565:  {
        Type: "STR",
        Count: 10
    },
    566:  {
        Type: "DEF",
        Count: 10
    },
    567:  {
        Type: "HP",
        Count: 50
    },
    568:  {
        Type: "STR",
        Count: 10
    },
    569:  {
        Type: "DEF",
        Count: 10
    },
    570:  {
        Type: "HP",
        Count: 100
    },
    571:  {
        Type: "DEF",
        Count: 10
    },
    572:  {
        Type: "DEF",
        Count: 10
    },
    573:  {
        Type: "HP",
        Count: 50
    },
    574:  {
        Type: "STR",
        Count: 10
    },
    575:  {
        Type: "DEF",
        Count: 10
    },
    576:  {
        Type: "HP",
        Count: 50
    },
    577:  {
        Type: "STR",
        Count: 10
    },
    578:  {
        Type: "DEF",
        Count: 10
    },
    579:  {
        Type: "HP",
        Count: 50
    },
    580:  {
        Type: "STR",
        Count: 100
    },
    581:  {
        Type: "DEF",
        Count: 10
    },
    582:  {
        Type: "DEF",
        Count: 10
    },
    583:  {
        Type: "STR",
        Count: 10
    },
    584:  {
        Type: "DEF",
        Count: 10
    },
    585:  {
        Type: "HP",
        Count: 100
    },
    586:  {
        Type: "STR",
        Count: 10
    },
    587:  {
        Type: "DEF",
        Count: 10
    },
    588:  {
        Type: "DEF",
        Count: 10
    },
    589:  {
        Type: "STR",
        Count: 10
    },
    590:  {
        Type: "DEF",
        Count: 100
    },
    591:  {
        Type: "HP",
        Count: 50
    },
    592:  {
        Type: "STR",
        Count: 10
    },
    593:  {
        Type: "DEF",
        Count: 10
    },
    594:  {
        Type: "HP",
        Count: 50
    },
    595:  {
        Type: "STR",
        Count: 10
    },
    596:  {
        Type: "DEF",
        Count: 10
    },
    597:  {
        Type: "HP",
        Count: 100
    },
    598:  {
        Type: "STR",
        Count: 10
    },
    599:  {
        Type: "DEF",
        Count: 10
    },
    600:  {
        Type: "STR",
        Count: 200
    },
    601:  {
        Type: "DEF",
        Count: 10
    },
    602:  {
        Type: "HP",
        Count: 50
    },
    603:  {
        Type: "DEF",
        Count: 10
    },
    604:  {
        Type: "DEF",
        Count: 10
    },
    605:  {
        Type: "HP",
        Count: 50
    },
    606:  {
        Type: "STR",
        Count: 10
    },
    607:  {
        Type: "DEF",
        Count: 10
    },
    608:  {
        Type: "HP",
        Count: 50
    },
    609:  {
        Type: "STR",
        Count: 10
    },
    610:  {
        Type: "DEF",
        Count: 100
    },
    611:  {
        Type: "DEF",
        Count: 10
    },
    612:  {
        Type: "STR",
        Count: 10
    },
    613:  {
        Type: "DEF",
        Count: 10
    },
    614:  {
        Type: "HP",
        Count: 50
    },
    615:  {
        Type: "STR",
        Count: 10
    },
    616:  {
        Type: "DEF",
        Count: 10
    },
    617:  {
        Type: "HP",
        Count: 50
    },
    618:  {
        Type: "STR",
        Count: 10
    },
    619:  {
        Type: "DEF",
        Count: 10
    },
    620:  {
        Type: "HP",
        Count: 100
    },
    621:  {
        Type: "DEF",
        Count: 10
    },
    622:  {
        Type: "HP",
        Count: 50
    },
    623:  {
        Type: "DEF",
        Count: 10
    },
    624:  {
        Type: "HP",
        Count: 50
    },
    625:  {
        Type: "DEF",
        Count: 10
    },
    626:  {
        Type: "STR",
        Count: 10
    },
    627:  {
        Type: "DEF",
        Count: 10
    },
    628:  {
        Type: "HP",
        Count: 50
    },
    629:  {
        Type: "DEF",
        Count: 10
    },
    630:  {
        Type: "STR",
        Count: 100
    },
    631:  {
        Type: "DEF",
        Count: 10
    },
    632:  {
        Type: "HP",
        Count: 50
    },
    633:  {
        Type: "DEF",
        Count: 10
    },
    634:  {
        Type: "STR",
        Count: 10
    },
    635:  {
        Type: "DEF",
        Count: 10
    },
    636:  {
        Type: "HP",
        Count: 100
    },
    637:  {
        Type: "DEF",
        Count: 10
    },
    638:  {
        Type: "STR",
        Count: 10
    },
    639:  {
        Type: "DEF",
        Count: 10
    },
    640:  {
        Type: "DEF",
        Count: 100
    },
    641:  {
        Type: "HP",
        Count: 50
    },
    642:  {
        Type: "DEF",
        Count: 10
    },
    643:  {
        Type: "STR",
        Count: 10
    },
    644:  {
        Type: "DEF",
        Count: 10
    },
    645:  {
        Type: "HP",
        Count: 50
    },
    646:  {
        Type: "DEF",
        Count: 10
    },
    647:  {
        Type: "STR",
        Count: 10
    },
    648:  {
        Type: "DEF",
        Count: 10
    },
    649:  {
        Type: "HP",
        Count: 50
    },
    650:  {
        Type: "STR",
        Count: 100
    },
    651:  {
        Type: "DEF",
        Count: 10
    },
    652:  {
        Type: "DEF",
        Count: 10
    },
    653:  {
        Type: "STR",
        Count: 10
    },
    654:  {
        Type: "DEF",
        Count: 10
    },
    655:  {
        Type: "HP",
        Count: 50
    },
    656:  {
        Type: "STR",
        Count: 10
    },
    657:  {
        Type: "DEF",
        Count: 10
    },
    658:  {
        Type: "HP",
        Count: 50
    },
    659:  {
        Type: "STR",
        Count: 10
    },
    660:  {
        Type: "DEF",
        Count: 100
    },
    661:  {
        Type: "HP",
        Count: 50
    },
    662:  {
        Type: "STR",
        Count: 10
    },
    663:  {
        Type: "DEF",
        Count: 10
    },
    664:  {
        Type: "HP",
        Count: 100
    },
    665:  {
        Type: "STR",
        Count: 10
    },
    666:  {
        Type: "Gauge",
        Count: 1
    },
    667:  {
        Type: "DEF",
        Count: 10
    },
    668:  {
        Type: "HP",
        Count: 50
    },
    669:  {
        Type: "STR",
        Count: 10
    },
    670:  {
        Type: "HP",
        Count: 100
    },
    671:  {
        Type: "DEF",
        Count: 10
    },
    672:  {
        Type: "HP",
        Count: 50
    },
    673:  {
        Type: "STR",
        Count: 10
    },
    674:  {
        Type: "DEF",
        Count: 10
    },
    675:  {
        Type: "HP",
        Count: 50
    },
    676:  {
        Type: "STR",
        Count: 10
    },
    677:  {
        Type: "DEF",
        Count: 10
    },
    678:  {
        Type: "HP",
        Count: 50
    },
    679:  {
        Type: "DEF",
        Count: 10
    },
    680:  {
        Type: "STR",
        Count: 100
    },
    681:  {
        Type: "DEF",
        Count: 10
    },
    682:  {
        Type: "HP",
        Count: 50
    },
    683:  {
        Type: "STR",
        Count: 10
    },
    684:  {
        Type: "DEF",
        Count: 10
    },
    685:  {
        Type: "HP",
        Count: 50
    },
    686:  {
        Type: "DEF",
        Count: 10
    },
    687:  {
        Type: "DEF",
        Count: 10
    },
    688:  {
        Type: "HP",
        Count: 50
    },
    689:  {
        Type: "STR",
        Count: 10
    },
    690:  {
        Type: "DEF",
        Count: 100
    },
    691:  {
        Type: "DEF",
        Count: 10
    },
    692:  {
        Type: "STR",
        Count: 10
    },
    693:  {
        Type: "DEF",
        Count: 10
    },
    694:  {
        Type: "HP",
        Count: 100
    },
    695:  {
        Type: "STR",
        Count: 10
    },
    696:  {
        Type: "DEF",
        Count: 10
    },
    697:  {
        Type: "HP",
        Count: 50
    },
    698:  {
        Type: "STR",
        Count: 10
    },
    699:  {
        Type: "DEF",
        Count: 10
    },
    700:  {
        Type: "STR",
        Count: 200
    },
    701:  {
        Type: "DEF",
        Count: 10
    },
    702:  {
        Type: "HP",
        Count: 100
    },
    703:  {
        Type: "DEF",
        Count: 10
    },
    704:  {
        Type: "DEF",
        Count: 10
    },
    705:  {
        Type: "HP",
        Count: 100
    },
    706:  {
        Type: "STR",
        Count: 10
    },
    707:  {
        Type: "DEF",
        Count: 10
    },
    708:  {
        Type: "DEF",
        Count: 10
    },
    709:  {
        Type: "STR",
        Count: 10
    },
    710:  {
        Type: "DEF",
        Count: 100
    },
    711:  {
        Type: "HP",
        Count: 100
    },
    712:  {
        Type: "STR",
        Count: 10
    },
    713:  {
        Type: "DEF",
        Count: 10
    },
    714:  {
        Type: "DEF",
        Count: 10
    },
    715:  {
        Type: "STR",
        Count: 10
    },
    716:  {
        Type: "DEF",
        Count: 10
    },
    717:  {
        Type: "DEF",
        Count: 10
    },
    718:  {
        Type: "STR",
        Count: 10
    },
    719:  {
        Type: "DEF",
        Count: 10
    },
    720:  {
        Type: "HP",
        Count: 100
    },
    721:  {
        Type: "STR",
        Count: 10
    },
    722:  {
        Type: "DEF",
        Count: 10
    },
    723:  {
        Type: "DEF",
        Count: 10
    },
    724:  {
        Type: "STR",
        Count: 10
    },
    725:  {
        Type: "DEF",
        Count: 10
    },
    726:  {
        Type: "HP",
        Count: 100
    },
    727:  {
        Type: "STR",
        Count: 10
    },
    728:  {
        Type: "DEF",
        Count: 10
    },
    729:  {
        Type: "DEF",
        Count: 10
    },
    730:  {
        Type: "STR",
        Count: 100
    },
    731:  {
        Type: "DEF",
        Count: 10
    },
    732:  {
        Type: "HP",
        Count: 100
    },
    733:  {
        Type: "DEF",
        Count: 10
    },
    734:  {
        Type: "DEF",
        Count: 10
    },
    735:  {
        Type: "HP",
        Count: 100
    },
    736:  {
        Type: "STR",
        Count: 10
    },
    737:  {
        Type: "DEF",
        Count: 10
    },
    738:  {
        Type: "HP",
        Count: 100
    },
    739:  {
        Type: "STR",
        Count: 10
    },
    740:  {
        Type: "DEF",
        Count: 100
    },
    741:  {
        Type: "DEF",
        Count: 10
    },
    742:  {
        Type: "STR",
        Count: 10
    },
    743:  {
        Type: "DEF",
        Count: 10
    },
    744:  {
        Type: "DEF",
        Count: 10
    },
    745:  {
        Type: "STR",
        Count: 10
    },
    746:  {
        Type: "DEF",
        Count: 10
    },
    747:  {
        Type: "DEF",
        Count: 10
    },
    748:  {
        Type: "STR",
        Count: 10
    },
    749:  {
        Type: "DEF",
        Count: 10
    },
    750:  {
        Type: "STR",
        Count: 100
    },
    751:  {
        Type: "DEF",
        Count: 10
    },
    752:  {
        Type: "DEF",
        Count: 10
    },
    753:  {
        Type: "STR",
        Count: 10
    },
    754:  {
        Type: "DEF",
        Count: 10
    },
    755:  {
        Type: "DEF",
        Count: 10
    },
    756:  {
        Type: "STR",
        Count: 10
    },
    757:  {
        Type: "DEF",
        Count: 10
    },
    758:  {
        Type: "HP",
        Count: 100
    },
    759:  {
        Type: "STR",
        Count: 10
    },
    760:  {
        Type: "DEF",
        Count: 100
    },
    761:  {
        Type: "DEF",
        Count: 10
    },
    762:  {
        Type: "STR",
        Count: 10
    },
    763:  {
        Type: "DEF",
        Count: 10
    },
    764:  {
        Type: "DEF",
        Count: 10
    },
    765:  {
        Type: "STR",
        Count: 10
    },
    766:  {
        Type: "DEF",
        Count: 10
    },
    767:  {
        Type: "DEF",
        Count: 10
    },
    768:  {
        Type: "STR",
        Count: 10
    },
    769:  {
        Type: "DEF",
        Count: 10
    },
    770:  {
        Type: "HP",
        Count: 100
    },
    771:  {
        Type: "STR",
        Count: 10
    },
    772:  {
        Type: "DEF",
        Count: 10
    },
    773:  {
        Type: "DEF",
        Count: 10
    },
    774:  {
        Type: "STR",
        Count: 10
    },
    775:  {
        Type: "DEF",
        Count: 10
    },
    776:  {
        Type: "DEF",
        Count: 10
    },
    777:  {
        Type: "Gauge",
        Count: 1
    },
    778:  {
        Type: "STR",
        Count: 10
    },
    779:  {
        Type: "DEF",
        Count: 10
    },
    780:  {
        Type: "DEF",
        Count: 100
    },
    781:  {
        Type: "DEF",
        Count: 10
    },
    782:  {
        Type: "STR",
        Count: 10
    },
    783:  {
        Type: "DEF",
        Count: 10
    },
    784:  {
        Type: "DEF",
        Count: 10
    },
    785:  {
        Type: "STR",
        Count: 10
    },
    786:  {
        Type: "DEF",
        Count: 10
    },
    787:  {
        Type: "DEF",
        Count: 10
    },
    788:  {
        Type: "STR",
        Count: 10
    },
    789:  {
        Type: "DEF",
        Count: 10
    },
    790:  {
        Type: "HP",
        Count: 100
    },
    791:  {
        Type: "DEF",
        Count: 10
    },
    792:  {
        Type: "STR",
        Count: 10
    },
    793:  {
        Type: "DEF",
        Count: 10
    },
    794:  {
        Type: "DEF",
        Count: 10
    },
    795:  {
        Type: "DEF",
        Count: 10
    },
    796:  {
        Type: "STR",
        Count: 10
    },
    797:  {
        Type: "DEF",
        Count: 10
    },
    798:  {
        Type: "HP",
        Count: 100
    },
    799:  {
        Type: "DEF",
        Count: 10
    },
    800:  {
        Type: "STR",
        Count: 200
    },
    801:  {
        Type: "DEF",
        Count: 10
    },
    802:  {
        Type: "DEF",
        Count: 10
    },
    803:  {
        Type: "HP",
        Count: 10
    },
    804:  {
        Type: "HP",
        Count: 10
    },
    805:  {
        Type: "STR",
        Count: 10
    },
    806:  {
        Type: "DEF",
        Count: 10
    },
    807:  {
        Type: "DEF",
        Count: 10
    },
    808:  {
        Type: "HP",
        Count: 10
    },
    809:  {
        Type: "HP",
        Count: 10
    },
    810:  {
        Type: "STR",
        Count: 10
    },
    811:  {
        Type: "DEF",
        Count: 10
    },
    812:  {
        Type: "DEF",
        Count: 10
    },
    813:  {
        Type: "HP",
        Count: 10
    },
    814:  {
        Type: "HP",
        Count: 10
    },
    815:  {
        Type: "STR",
        Count: 10
    },
    816:  {
        Type: "DEF",
        Count: 10
    },
    817:  {
        Type: "DEF",
        Count: 10
    },
    818:  {
        Type: "HP",
        Count: 10
    },
    819:  {
        Type: "HP",
        Count: 10
    },
    820:  {
        Type: "STR",
        Count: 10
    },
    821:  {
        Type: "DEF",
        Count: 10
    },
    822:  {
        Type: "DEF",
        Count: 10
    },
    823:  {
        Type: "HP",
        Count: 10
    },
    824:  {
        Type: "HP",
        Count: 10
    },
    825:  {
        Type: "STR",
        Count: 10
    },
    826:  {
        Type: "DEF",
        Count: 10
    },
    827:  {
        Type: "DEF",
        Count: 10
    },
    828:  {
        Type: "HP",
        Count: 10
    },
    829:  {
        Type: "HP",
        Count: 10
    },
    830:  {
        Type: "STR",
        Count: 10
    },
    831:  {
        Type: "DEF",
        Count: 10
    },
    832:  {
        Type: "DEF",
        Count: 10
    },
    833:  {
        Type: "HP",
        Count: 10
    },
    834:  {
        Type: "HP",
        Count: 10
    },
    835:  {
        Type: "STR",
        Count: 10
    },
    836:  {
        Type: "DEF",
        Count: 10
    },
    837:  {
        Type: "DEF",
        Count: 10
    },
    838:  {
        Type: "HP",
        Count: 10
    },
    839:  {
        Type: "HP",
        Count: 10
    },
    840:  {
        Type: "STR",
        Count: 10
    },
    841:  {
        Type: "DEF",
        Count: 10
    },
    842:  {
        Type: "DEF",
        Count: 10
    },
    843:  {
        Type: "HP",
        Count: 10
    },
    844:  {
        Type: "HP",
        Count: 10
    },
    845:  {
        Type: "STR",
        Count: 10
    },
    846:  {
        Type: "DEF",
        Count: 10
    },
    847:  {
        Type: "DEF",
        Count: 10
    },
    848:  {
        Type: "HP",
        Count: 10
    },
    849:  {
        Type: "HP",
        Count: 10
    },
    850:  {
        Type: "STR",
        Count: 100
    },
    851:  {
        Type: "DEF",
        Count: 10
    },
    852:  {
        Type: "DEF",
        Count: 10
    },
    853:  {
        Type: "HP",
        Count: 10
    },
    854:  {
        Type: "HP",
        Count: 10
    },
    855:  {
        Type: "STR",
        Count: 10
    },
    856:  {
        Type: "DEF",
        Count: 10
    },
    857:  {
        Type: "DEF",
        Count: 10
    },
    858:  {
        Type: "HP",
        Count: 10
    },
    859:  {
        Type: "HP",
        Count: 10
    },
    860:  {
        Type: "STR",
        Count: 10
    },
    861:  {
        Type: "DEF",
        Count: 10
    },
    862:  {
        Type: "DEF",
        Count: 10
    },
    863:  {
        Type: "HP",
        Count: 10
    },
    864:  {
        Type: "HP",
        Count: 10
    },
    865:  {
        Type: "STR",
        Count: 10
    },
    866:  {
        Type: "DEF",
        Count: 10
    },
    867:  {
        Type: "DEF",
        Count: 10
    },
    868:  {
        Type: "HP",
        Count: 10
    },
    869:  {
        Type: "HP",
        Count: 10
    },
    870:  {
        Type: "STR",
        Count: 10
    },
    871:  {
        Type: "DEF",
        Count: 10
    },
    872:  {
        Type: "DEF",
        Count: 10
    },
    873:  {
        Type: "HP",
        Count: 10
    },
    874:  {
        Type: "HP",
        Count: 10
    },
    875:  {
        Type: "STR",
        Count: 10
    },
    876:  {
        Type: "DEF",
        Count: 10
    },
    877:  {
        Type: "DEF",
        Count: 10
    },
    878:  {
        Type: "HP",
        Count: 10
    },
    879:  {
        Type: "HP",
        Count: 10
    },
    880:  {
        Type: "STR",
        Count: 10
    },
    881:  {
        Type: "DEF",
        Count: 10
    },
    882:  {
        Type: "DEF",
        Count: 10
    },
    883:  {
        Type: "HP",
        Count: 10
    },
    884:  {
        Type: "HP",
        Count: 10
    },
    885:  {
        Type: "STR",
        Count: 10
    },
    886:  {
        Type: "DEF",
        Count: 10
    },
    887:  {
        Type: "DEF",
        Count: 10
    },
    888:  {
        Type: "HP",
        Count: 10
    },
    889:  {
        Type: "HP",
        Count: 10
    },
    890:  {
        Type: "STR",
        Count: 10
    },
    891:  {
        Type: "DEF",
        Count: 10
    },
    892:  {
        Type: "DEF",
        Count: 10
    },
    893:  {
        Type: "HP",
        Count: 10
    },
    894:  {
        Type: "HP",
        Count: 10
    },
    895:  {
        Type: "STR",
        Count: 10
    },
    896:  {
        Type: "DEF",
        Count: 10
    },
    897:  {
        Type: "DEF",
        Count: 10
    },
    898:  {
        Type: "HP",
        Count: 10
    },
    899:  {
        Type: "HP",
        Count: 10
    },
    900:  {
        Type: "STR",
        Count: 100
    }
};

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
    "Lv. 50":     {"genSpeed":      200},
    "Lv. 50.5":   {"upSpeed":       50},
    "Lv. 51":     {"upSpeed":       50},
    "Lv. 51.5":   {"upMagic":       50},
    "Lv. 52":     {"revPower":      50},
    "Lv. 52.5":   {"upPower":       50},
    "Lv. 53":     {"revMagic":      50},
    "Lv. 53.5":   {"upSpeed":       50},
    "Lv. 54":     {"upSpeed":       50},
    "Lv. 54.5":   {"upMagic":       50},
    "Lv. 55":     {"revPower":      50},
    "Lv. 55.5":   {"revSpeed":      50},
    "Lv. 56":     {"revMagic":      50},
    "Lv. 56.5":   {"upSpeed":       50},
    "Lv. 57":     {"upSpeed":       50},
    "Lv. 57.5":   {"upMagic":       50},
    "Lv. 58":     {"revPower":      50},
    "Lv. 58.5":   {"revSpeed":      50},
    "Lv. 59":     {"revMagic":      50},
    "Lv. 59.5":   {"revMagic":      50},
    "Lv. 60":     {"genMagic":      200}
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
    "Lv. 50":     {"genPower":      200},
    "Lv. 50.5":   {"upPower":       50},
    "Lv. 51":     {"revPower":      50},
    "Lv. 51.5":   {"upPower":       50},
    "Lv. 52":     {"revPower":      50},
    "Lv. 52.5":   {"upPower":       50},
    "Lv. 53":     {"revPower":      50},
    "Lv. 53.5":   {"upPower":       50},
    "Lv. 54":     {"revPower":      50},
    "Lv. 54.5":   {"upPower":       50},
    "Lv. 55":     {"revPower":      50},
    "Lv. 55.5":   {"upPower":       50},
    "Lv. 56":     {"revPower":      50},
    "Lv. 56.5":   {"upPower":       50},
    "Lv. 57":     {"revPower":      50},
    "Lv. 57.5":   {"upPower":       50},
    "Lv. 58":     {"revPower":      50},
    "Lv. 58.5":   {"upPower":       50},
    "Lv. 59":     {"revPower":      50},
    "Lv. 59.5":   {"upPower":       50},
    "Lv. 60":     {"genPower":      200}
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
    "Lv. 50":     {"genSpeed":      200},
    "Lv. 50.5":   {"upSpeed":       50},
    "Lv. 51":     {"revSpeed":      50},
    "Lv. 51.5":   {"upSpeed":       50},
    "Lv. 52":     {"revSpeed":      50},
    "Lv. 52.5":   {"upSpeed":       50},
    "Lv. 53":     {"revSpeed":      50},
    "Lv. 53.5":   {"upSpeed":       50},
    "Lv. 54":     {"revSpeed":      50},
    "Lv. 54.5":   {"upSpeed":       50},
    "Lv. 55":     {"revSpeed":      50},
    "Lv. 55.5":   {"upSpeed":       50},
    "Lv. 56":     {"revSpeed":      50},
    "Lv. 56.5":   {"upSpeed":       50},
    "Lv. 57":     {"revSpeed":      50},
    "Lv. 57.5":   {"upSpeed":       50},
    "Lv. 58":     {"revSpeed":      50},
    "Lv. 58.5":   {"upSpeed":       50},
    "Lv. 59":     {"revSpeed":      50},
    "Lv. 59.5":   {"upSpeed":       50},
    "Lv. 60":     {"genSpeed":      200}
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
    "Lv. 50":     {"genMagic":      200},
    "Lv. 50.5":   {"upMagic":       50},
    "Lv. 51":     {"revMagic":      50},
    "Lv. 51.5":   {"upMagic":       50},
    "Lv. 52":     {"revMagic":      50},
    "Lv. 52.5":   {"upMagic":       50},
    "Lv. 53":     {"revMagic":      50},
    "Lv. 53.5":   {"upMagic":       50},
    "Lv. 54":     {"revMagic":      50},
    "Lv. 54.5":   {"upMagic":       50},
    "Lv. 55":     {"revMagic":      50},
    "Lv. 55.5":   {"upMagic":       50},
    "Lv. 56":     {"revMagic":      50},
    "Lv. 56.5":   {"upMagic":       50},
    "Lv. 57":     {"revMagic":      50},
    "Lv. 57.5":   {"upMagic":       50},
    "Lv. 58":     {"revMagic":      50},
    "Lv. 58.5":   {"upMagic":       50},
    "Lv. 59":     {"revMagic":      50},
    "Lv. 59.5":   {"upMagic":       50},
    "Lv. 60":     {"genMagic":      200}
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
    "Lv. 50":     {"genSpeed":      200},
    "Lv. 50.5":   {"upPower":       50},
    "Lv. 51":     {"upSpeed":       50},
    "Lv. 51.5":   {"revPower":      50},
    "Lv. 52":     {"revSpeed":      50},
    "Lv. 52.5":   {"upPower":       50},
    "Lv. 53":     {"upSpeed":       50},
    "Lv. 53.5":   {"revPower":      50},
    "Lv. 54":     {"revSpeed":      50},
    "Lv. 54.5":   {"upPower":       50},
    "Lv. 55":     {"upSpeed":       50},
    "Lv. 55.5":   {"revPower":      50},
    "Lv. 56":     {"revSpeed":      50},
    "Lv. 56.5":   {"upPower":       50},
    "Lv. 57":     {"upSpeed":       50},
    "Lv. 57.5":   {"revPower":      50},
    "Lv. 58":     {"revSpeed":      50},
    "Lv. 58.5":   {"upPower":       50},
    "Lv. 59":     {"upSpeed":       50},
    "Lv. 59.5":   {"revPower":      50},
    "Lv. 60":     {"genPower":      200}
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
    "Lv. 50":     {"genSpeed":      200},
    "Lv. 50.5":   {"upMagic":       50},
    "Lv. 51":     {"upMagic":       50},
    "Lv. 51.5":   {"revSpeed":      50},
    "Lv. 52":     {"upMagic":       50},
    "Lv. 52.5":   {"revMagic":      50},
    "Lv. 53":     {"revSpeed":      50},
    "Lv. 53.5":   {"upMagic":       50},
    "Lv. 54":     {"upMagic":       50},
    "Lv. 54.5":   {"revSpeed":      50},
    "Lv. 55":     {"upMagic":       50},
    "Lv. 55.5":   {"revMagic":      50},
    "Lv. 56":     {"revSpeed":      50},
    "Lv. 56.5":   {"upMagic":       50},
    "Lv. 57":     {"upMagic":       50},
    "Lv. 57.5":   {"revSpeed":      50},
    "Lv. 58":     {"upMagic":       50},
    "Lv. 58.5":   {"revMagic":      50},
    "Lv. 59":     {"revSpeed":      50},
    "Lv. 59.5":   {"upMagic":       50},
    "Lv. 60":     {"genSpeed":      200}
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
    "Lv. 50":     {"genPower":      200},
    "Lv. 50.5":   {"revMagic":      50},
    "Lv. 51":     {"revPower":      50},
    "Lv. 51.5":   {"upMagic":       50},
    "Lv. 52":     {"upPower":       50},
    "Lv. 52.5":   {"revMagic":      50},
    "Lv. 53":     {"revPower":      50},
    "Lv. 53.5":   {"upMagic":       50},
    "Lv. 54":     {"upPower":       50},
    "Lv. 54.5":   {"revMagic":      50},
    "Lv. 55":     {"revPower":      50},
    "Lv. 55.5":   {"upMagic":       50},
    "Lv. 56":     {"upPower":       50},
    "Lv. 56.5":   {"revMagic":      50},
    "Lv. 57":     {"revPower":      50},
    "Lv. 57.5":   {"upMagic":       50},
    "Lv. 58":     {"upPower":       50},
    "Lv. 58.5":   {"revMagic":      50},
    "Lv. 59":     {"revPower":      50},
    "Lv. 59.5":   {"upMagic":       50},
    "Lv. 60":     {"genMagic":      200}
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
    "Lv. 50":     {"genUp":      	200},
    "Lv. 50.5":   {"upSpeed":      	50},
    "Lv. 51":     {"upSpeed":      	50},
    "Lv. 51.5":   {"upSpeed":      	50},
    "Lv. 52":     {"upSpeed":      	50},
    "Lv. 52.5":   {"upSpeed":      	50}
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
    "Lv. 50":     {"genUp":      	200},
    "Lv. 50.5":   {"upMagic":      	50},
    "Lv. 51":     {"upMagic":      	50},
    "Lv. 51.5":   {"upMagic":      	50},
    "Lv. 52":     {"upMagic":      	50},
    "Lv. 52.5":   {"upMagic":      	50}
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
    "Lv. 50":     {"genPower":      200},
    "Lv. 50.5":   {"upPower":       50},
    "Lv. 51":     {"upMagic":       50},
    "Lv. 51.5":   {"revSpeed":      50},
    "Lv. 52":     {"revPower":      50},
    "Lv. 52.5":   {"upPower":       50},
    "Lv. 53":     {"upMagic":       50},
    "Lv. 53.5":   {"revSpeed":      50},
    "Lv. 54":     {"revPower":      50},
    "Lv. 54.5":   {"upPower":       50},
    "Lv. 55":     {"upMagic":       50},
    "Lv. 55.5":   {"revSpeed":      50},
    "Lv. 56":     {"revPower":      50},
    "Lv. 56.5":   {"upPower":       50},
    "Lv. 57":     {"upMagic":       50},
    "Lv. 57.5":   {"revSpeed":      50},
    "Lv. 58":     {"revPower":      50},
    "Lv. 58.5":   {"upPower":       50},
    "Lv. 59":     {"upMagic":       50},
    "Lv. 59.5":   {"revSpeed":      50},
    "Lv. 60":     {"genMagic":      200}
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
    "Lv. 50":     {"genUp":      	200},
    "Lv. 50.5":   {"upPower":      	50},
    "Lv. 51":     {"upPower":      	50},
    "Lv. 51.5":   {"upPower":      	50},
    "Lv. 52":     {"upPower":      	50},
    "Lv. 52.5":   {"upPower":      	50}
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
    "Lv. 50":     {"genRev":      	200},
    "Lv. 50.5":   {"revPower":      50},
    "Lv. 51":     {"revPower":      50},
    "Lv. 51.5":   {"revPower":      50},
    "Lv. 52":     {"revPower":      50},
    "Lv. 52.5":   {"revPower":      50}
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
    "Lv. 50":     {"genRev":      	200},
    "Lv. 50.5":   {"revSpeed":      50},
    "Lv. 51":     {"revSpeed":      50},
    "Lv. 51.5":   {"revSpeed":      50}
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
    "Lv. 50":     {"genMagic":      200},
    "Lv. 50.5":   {"revMagic":      50},
    "Lv. 51":     {"upSpeed":       50},
    "Lv. 51.5":   {"revMagic":      50},
    "Lv. 52":     {"upSpeed":       50},
    "Lv. 52.5":   {"revPower":      50},
    "Lv. 53":     {"upPower":       50},
    "Lv. 53.5":   {"revMagic":      50},
    "Lv. 54":     {"revMagic":      50},
    "Lv. 54.5":   {"upSpeed":       50},
    "Lv. 55":     {"revMagic":      50},
    "Lv. 55.5":   {"upSpeed":       50},
    "Lv. 56":     {"revPower":      50},
    "Lv. 56.5":   {"upPower":       50},
    "Lv. 57":     {"revMagic":      50},
    "Lv. 57.5":   {"revMagic":      50},
    "Lv. 58":     {"upSpeed":       50},
    "Lv. 58.5":   {"revMagic":      50},
    "Lv. 59":     {"upSpeed":       50},
    "Lv. 59.5":   {"revPower":      50},
    "Lv. 60":     {"genSpeed":      200}
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
    "Lv. 50":     {"genRev":      	200},
    "Lv. 50.5":   {"revMagic":      50},
    "Lv. 51":     {"revMagic":      50},
    "Lv. 51.5":   {"revMagic":      50}
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
    "Lv. 50":     {"genPower":      200},
    "Lv. 51":     {"upSpeed":       50},
    "Lv. 52":     {"upPower":       50},
    "Lv. 53":     {"revSpeed":      50},
    "Lv. 54":     {"revSpeed":      50},
    "Lv. 55":     {"upSpeed":       50},
    "Lv. 56":     {"upPower":       50},
    "Lv. 57":     {"revSpeed":      50},
    "Lv. 58":     {"revSpeed":      50},
    "Lv. 59":     {"upSpeed":       50},
    "Lv. 60":     {"genMagic":      100}
};      // Keyblade16: Bad Guy Breaker
