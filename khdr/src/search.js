var queryArray = [];

var secondaryInfo = "";

var sortCondition = "";

var attributeOff = "False";

var mainAbilityElementOff = "False";

var maxResults = -1;

var saveSearchForm;

function loadPage()   {
    saveSearchForm = document.getElementById("cardSortFilterPopup").innerHTML;
    maxResults = 20;
    searchCard();
}

function resetForm(value)    {
    document.getElementById("cardSortFilterPopup").innerHTML = saveSearchForm;
    var comparator = document.getElementById(value).src.substring(document.getElementById(value).src.length - 6, document.getElementById(value).src.length);
    if(comparator == "On.png")  {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 6);
        document.getElementById(value).src = document.getElementById(value).src + "Off.png";
    }
    else    {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 7);
        document.getElementById(value).src = document.getElementById(value).src + "On.png";
    }

    setTimeout(function()   {
        comparator = document.getElementById(value).src.substring(document.getElementById(value).src.length - 6, document.getElementById(value).src.length);
        if(comparator == "On.png")  {
            document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 6);
            document.getElementById(value).src = document.getElementById(value).src + "Off.png";
        }
        else    {
            document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 7);
            document.getElementById(value).src = document.getElementById(value).src + "On.png";
        }
    }, 200);
}

function searchFormButton(value)    {
    var comparator = document.getElementById(value).src.substring(document.getElementById(value).src.length - 6, document.getElementById(value).src.length);
    if(comparator == "On.png")  {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 6);
        document.getElementById(value).src = document.getElementById(value).src + "Off.png";
    }
    else    {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 7);
        document.getElementById(value).src = document.getElementById(value).src + "On.png";
    }

    searchCard();

    var container1 = $("#cardSortFilterPopup");
    var container2 = $("#darkOverlay");

    container1.fadeOut(200);
    container2.fadeOut(200);

    setTimeout(function()   {
        comparator = document.getElementById(value).src.substring(document.getElementById(value).src.length - 6, document.getElementById(value).src.length);
        if(comparator == "On.png")  {
            document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 6);
            document.getElementById(value).src = document.getElementById(value).src + "Off.png";
        }
        else    {
            document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 7);
            document.getElementById(value).src = document.getElementById(value).src + "On.png";
        }
    }, 200);
}

function performOperator(value1, value2, operator)  {
    switch(operator)   {
        case ">":
            return value1 > value2;
        case "<":
            return value1 < value2;
        case "=":
            return value1 == value2;
        case ">=":
            return value1 >= value2;
        case "<=":
            return value1 <= value2;
        case "!=":
            return value1 != value2;
    }
}

function lightButtons(value)    {
    var comparator = document.getElementById(value).src.substring(document.getElementById(value).src.length - 6, document.getElementById(value).src.length);
    if(comparator == "On.png")  {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 6);
        document.getElementById(value).src = document.getElementById(value).src + "Off.png";
    }
    else    {
        document.getElementById(value).src = document.getElementById(value).src.substring(0, document.getElementById(value).src.length - 7);
        document.getElementById(value).src = document.getElementById(value).src + "On.png";
    }
    var captionContainer = document.getElementById(value + "caption");
    if(captionContainer)    {
        captionContainer.classList.toggle("showCaption");
    }
}

function compareDropdown(value) {
    if(value.value == "Up")   {
        var captionContainer = document.getElementById(value.parentNode.id + "caption");
        if(captionContainer)    {
            captionContainer.classList.toggle("showCaption");
        }
    }
    else if(value.value != "Up")   {
        var captionContainer = document.getElementById(value.parentNode.id + "caption");
        if(captionContainer)    {
            captionContainer.classList.remove("showCaption");
        }
    }
}

function parseCardName(value)  {
    // Handle shorthand and synonyms
    value = value.toLowerCase();
    if(value.length > 0)    {
        if(value.length > 1)    {
            if((value.indexOf(" i") != -1 || value.substring(0, 1) == "i") && value.indexOf("ienzo") == -1 && value.indexOf("incredibles") == -1 && value.indexOf("isa") == -1 && value.indexOf("iago") == -1 && value.indexOf("ice") == -1 && value.indexOf("illustrated") == -1)    {
                value = value.replace("i", "illustrated ");
            }

            if(value.substring(0, 2) == "ka" && value.indexOf("kairi") == -1 && value.indexOf("wakka") == -1)    {
                value = value.replace("ka", "key art ");
            }

            if(value.substring(0, 2) == "ks")    {
                value = value.replace("ks", "key scene ");
            }
        }
        value = value.replace("#", " # ");
        value = value.replace("-", " - ");
        value = value.replace("(", " ( ");
        value = value.replace(")", " ) ");
        value = value.replace("[", " [ ");
        value = value.replace("]", " ] ");
        value = value.replace(",", " , ");
        value = value.replace("&", " & ");
        value = value.replace("kh2", "kh ii");
        value = value.replace("kh3", "kh iii");

        queryArray = value.split(" ");
    }
    else    {
        queryArray = [];
    }
}

document.getElementById("searchCardString").onkeydown = function(event) {
    if (event.keyCode == 13) {
        searchCard();
    }
}

function quickSort(originalArr, sortChecker) {
    if (originalArr.length <= 1) {
        return originalArr;
    }
    else if(sortChecker == "BasePower") {
        var leftArr = [];              
        var rightArr = [];
        var newArr = [];
        var pivot = originalArr[0];
        var length = originalArr.length;
        for (var i = 1; i < length; i++) {
            if (cardDatabase[originalArr[i]].MainAbility.BasePower >= cardDatabase[pivot].MainAbility.BasePower) {
                leftArr.push(originalArr[i]);
            }  
            else {
                rightArr.push(originalArr[i]);
            }
        }
        return newArr.concat(quickSort(leftArr, sortChecker), pivot, quickSort(rightArr, sortChecker));
    }
    else if(sortChecker == "MaxPower") {
        var leftArr = [];              
        var rightArr = [];
        var newArr = [];
        var pivot = originalArr[0];
        var length = originalArr.length;
        for (var i = 1; i < length; i++) {
            if (cardDatabase[originalArr[i]].MainAbility.MaxPower >= cardDatabase[pivot].MainAbility.MaxPower) {
                leftArr.push(originalArr[i]);
            }  
            else {
                rightArr.push(originalArr[i]);
            }
        }
        return newArr.concat(quickSort(leftArr, sortChecker), pivot, quickSort(rightArr, sortChecker));
    }
    else if(sortChecker == "Element") {
        var leftArr = [];              
        var rightArr = [];
        var newArr = [];
        var pivot = originalArr[0];
        var length = originalArr.length;
        for (var i = 1; i < length; i++) {
            if (cardDatabase[originalArr[i]].DirectionType == "Light" && cardDatabase[pivot].DirectionType == "Dark") {
                leftArr.push(originalArr[i]);
            }
            else if (cardDatabase[originalArr[i]].DirectionType == "Dark" && cardDatabase[pivot].DirectionType == "Light") {
                rightArr.push(originalArr[i]);
            }
            // Both cards are the same direction
            else if (cardDatabase[originalArr[i]].ColorType == "Red" && (cardDatabase[pivot].ColorType == "Green" || cardDatabase[pivot].ColorType == "Blue")) {
                leftArr.push(originalArr[i]);
            }
            else if (cardDatabase[originalArr[i]].ColorType == "Green" && cardDatabase[pivot].ColorType == "Blue") {
                leftArr.push(originalArr[i]);
            }
            else if (cardDatabase[originalArr[i]].DirectionType == cardDatabase[pivot].DirectionType && cardDatabase[originalArr[i]].ColorType == cardDatabase[pivot].ColorType) {
                leftArr.push(originalArr[i]);
            }
            else {
                rightArr.push(originalArr[i]);
            }
        }
        return newArr.concat(quickSort(leftArr, sortChecker), pivot, quickSort(rightArr, sortChecker));
    }
    else {
        var leftArr = [];              
        var rightArr = [];
        var newArr = [];
        var pivot = originalArr[0];
        var length = originalArr.length;
        for (var i = 1; i < length; i++) {
            if (cardDatabase[originalArr[i]][sortChecker] >= cardDatabase[pivot][sortChecker]) {    // using pivot value start comparing
                leftArr.push(originalArr[i]);
            }  
            else {
                rightArr.push(originalArr[i]);
            }
        }
        return newArr.concat(quickSort(leftArr, sortChecker), pivot, quickSort(rightArr, sortChecker));
    }
}

/*
   _____   ______              _____     _____   _    _ 
  / ____| |  ____|     /\     |  __ \   / ____| | |  | |
 | (___   | |__       /  \    | |__) | | |      | |__| |
  \___ \  |  __|     / /\ \   |  _  /  | |      |  __  |
  ____) | | |____   / ____ \  | | \ \  | |____  | |  | |
 |_____/  |______| /_/    \_\ |_|  \_\  \_____| |_|  |_|
                                                        
*/

function searchCard()  {
    var resDiv = document.getElementById("resultsList");

    resDiv.innerHTML = "";

    secondaryInfo = document.getElementById("secondaryInformation").value;

    sortCondition = document.getElementById("sortCondition").value;

    

    // console.log("Secondary: " + secondaryInfo + " / Sort: " + sortCondition);

    var workingArray = [];

    for(var p = 1; p < Object.keys(cardDatabase).length + 1; p++) {
        workingArray[p] = p;
    }

    // Check conditions
    if(maxResults == -1)    {       // Ignore if page load
        var tempCount = 0;

        tempCount = 0;
        var tempElementArray = ["Red", "Green", "Blue", "Light", "Dark", "Sword", "Staff", "Shield"];
        for(var tempItem of tempElementArray)  {
            if((document.getElementById(tempItem).src).indexOf("Off.png") != -1) {
                tempCount++;
            }
        }
        if(tempCount >= 8)  {
            attributeOff = "True";
        }
        else{
            attributeOff = "False";
        }

        tempCount = 0;
        var tempAbilityElementArray = ["Fire", "Water", "Lightning", "Wind", "Light", "Dark", "Neutral"];
        for(var tempItem of tempAbilityElementArray)  {
            if((document.getElementById("MainAbility" + tempItem).src).indexOf("Off.png") != -1) {
                tempCount++;
            }
        }
        if(tempCount >= 7)  {
            mainAbilityElementOff = "True";
        }
        else{
            mainAbilityElementOff = "False";
        }

        for(var i = workingArray.length - 1; i > 0; i--)   {
            var entry = cardDatabase[workingArray[i]];
            if(checkConditions(workingArray[i]) == 0)  {
                workingArray.splice(i, 1);
            }
        }
    }

    workingArray.splice(0, 1);

    console.log(workingArray);

    workingArray = quickSort(workingArray, sortCondition);

    if(document.getElementById("ascendingOrder").value == "Ascending")    {
        workingArray = workingArray.reverse();
    }

    if(maxResults == -1)    {
        resDiv.style = "color: rgb(0, 29, 119); font-size: 36px; text-shadow: 1px 1px rgb(0, 148, 211)";
        resDiv.appendChild(document.createTextNode((workingArray.length) + " results found."));
        var blankSpacer = document.createElement('br');
        resDiv.appendChild(blankSpacer);
    }
    else    {
        resDiv.style = "color: rgb(0, 29, 119); font-size: 36px; text-shadow: 1px 1px rgb(0, 148, 211)";
        resDiv.appendChild(document.createTextNode("Displaying " + maxResults + " most recent entries"));
        var blankSpacer = document.createElement('br');
        resDiv.appendChild(blankSpacer);
    }

    for(var i = 0; i < workingArray.length && i < ((maxResults == -1) ? workingArray.length : maxResults); i++)   {
        var entry = cardDatabase[workingArray[i]];

            var newFig = document.createElement('figure');

            var newFigCaption = document.createElement('figcaption');
            newFigCaption.className = "shape1";
            newFigCaption.innerHTML = entry.Name;

            var secondaryFigCaption = document.createElement('figcaption');
            secondaryFigCaption.className = "shape2";

            if(secondaryInfo == "BasePower" && entry.MainAbility != undefined && entry.MainAbility.BasePower != undefined)    {
                secondaryFigCaption.innerHTML = "Base Power: " + entry.MainAbility.BasePower;
            }
            else if(secondaryInfo == "MaxPower" && entry.MainAbility != undefined && entry.MainAbility.MaxPower != undefined)    {
                secondaryFigCaption.innerHTML = "Max Power: " + entry.MainAbility.MaxPower;
            }
            else if(entry[secondaryInfo] != undefined && secondaryInfo == "AlbumNum")   {
                secondaryFigCaption.innerHTML = "No. " + entry[secondaryInfo];
            }
            else if(entry[secondaryInfo] != undefined)   {
                secondaryFigCaption.innerHTML = secondaryInfo + ": " + entry[secondaryInfo];
            }

            var newImg = document.createElement('img');
            newImg.className = "imgClass";
            newImg.src = "./images/cards/" + entry.CardImage;
            newImg.setAttribute("onclick", "generateCard(" + entry.ID + ")");

            newFig.appendChild(newImg);
            newFig.appendChild(newFigCaption);
            newFig.appendChild(secondaryFigCaption);
            newFig.style = "max-width: 50%";
            resDiv.appendChild(newFig);
    }

    maxResults = -1;
    
}

/*
   _____   _    _   ______    _____   _  __     _____    ____    _   _   _____    _____   _______   _____    ____    _   _    _____ 
  / ____| | |  | | |  ____|  / ____| | |/ /    / ____|  / __ \  | \ | | |  __ \  |_   _| |__   __| |_   _|  / __ \  | \ | |  / ____|
 | |      | |__| | | |__    | |      | ' /    | |      | |  | | |  \| | | |  | |   | |      | |      | |   | |  | | |  \| | | (___  
 | |      |  __  | |  __|   | |      |  <     | |      | |  | | | . ` | | |  | |   | |      | |      | |   | |  | | | . ` |  \___ \ 
 | |____  | |  | | | |____  | |____  | . \    | |____  | |__| | | |\  | | |__| |  _| |_     | |     _| |_  | |__| | | |\  |  ____) |
  \_____| |_|  |_| |______|  \_____| |_|\_\    \_____|  \____/  |_| \_| |_____/  |_____|    |_|    |_____|  \____/  |_| \_| |_____/ 

*/

function checkConditions(CardID)   {
   
    // Filter out invalid conditonals
    if(cardDatabase[CardID][secondaryInfo] == undefined && secondaryInfo != "BasePower" && secondaryInfo != "MaxPower")   {
        return 0;
    }
    else if(cardDatabase[CardID][secondaryInfo] == undefined && secondaryInfo == "BasePower") {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.BasePower == undefined)  {
            return 0;
        }
    }
    else if(cardDatabase[CardID][secondaryInfo] == undefined && secondaryInfo == "MaxPower") {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.MaxPower == undefined)  {
            return 0;
        }
    }

    if(sortCondition == "BasePower")   {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.BasePower == undefined)  {
            return 0;
        }
    }
    else if(sortCondition == "MaxPower")   {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.MaxPower == undefined)  {
            return 0;
        }
    }
    else if(cardDatabase[CardID][sortCondition] == undefined && sortCondition != "Element")  {
        return 0;
    }

    // Search by name
    if(queryArray.length > 0)   {
        var cardNameHolder = cardDatabase[CardID].Name;
        cardNameHolder = cardNameHolder.toLowerCase();

        cardNameHolder = cardNameHolder.replace("#", " # ");
        cardNameHolder = cardNameHolder.replace("-", " - ");
        cardNameHolder = cardNameHolder.replace("(", " ( ");
        cardNameHolder = cardNameHolder.replace(")", " ) ");
        cardNameHolder = cardNameHolder.replace("[", " [ ");
        cardNameHolder = cardNameHolder.replace("]", " ] ");
        cardNameHolder = cardNameHolder.replace(",", " , ");

        cardNameHolder = cardNameHolder.replace("é", "e");
        cardNameHolder = cardNameHolder.replace("ï", "i");
        cardNameHolder = cardNameHolder.replace("è", "e");

        var cardNameArray = cardNameHolder.split(" ");

        for(var index = 0; index < queryArray.length; index++)  {
            var counter = 0;
            for(var cardNameHolder of cardNameArray)  {
                if(cardNameHolder == queryArray[index])    {
                    counter++;
                }
            }

            if(counter == 0)    {
                return 0;
            }
        }
    }
    
    // Check by other conditions
    if(document.getElementById("AlbumNum").value != undefined && document.getElementById("AlbumNum").value != "")   {
        if(cardDatabase[CardID].AlbumNum == undefined || performOperator(cardDatabase[CardID].AlbumNum, document.getElementById("AlbumNum").value, document.getElementById("AlbumNumOrder").value) == false)  {
            return 0;
        }
    }
    if(document.getElementById("Power").value != undefined && document.getElementById("Power").value != "")   {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.Power == undefined || performOperator(cardDatabase[CardID].MainAbility.Power, document.getElementById("Power").value, document.getElementById("PowerOrder").value) == false)  {
            return 0;
        }
    }
    if((document.getElementById("HasSubAbility").src).indexOf("On.png") != -1)   {
        if(cardDatabase[CardID].SubAbility == undefined)  {
            return 0;
        }
    }

    var attributeCounter = 0;
    if(attributeOff == "False")    {
        var attributeArray1 = ["Red", "Green", "Blue"];
        var attributeArray2 = ["Light", "Dark"];
        var attributeArray3 = ["Sword", "Staff", "Shield"];
        var attributeOn1 = [];
        var attributeOn2 = [];
        var attributeOn3 = [];
        var attributeIndex = 0;
        for(var tempAttributeHolder1 of attributeArray1)  {
            if((document.getElementById(tempAttributeHolder1).src).indexOf("On.png") != -1)    {
                attributeOn1[attributeIndex] = tempAttributeHolder1;
                attributeIndex++;
            }
        }
        attributeIndex = 0;
        for(var tempAttributeHolder2 of attributeArray2)  {
            if((document.getElementById(tempAttributeHolder2).src).indexOf("On.png") != -1)    {
                attributeOn2[attributeIndex] = tempAttributeHolder2;
                attributeIndex++;
            }
        }
        attributeIndex = 0;
        for(var tempAttributeHolder3 of attributeArray3)  {
            if((document.getElementById(tempAttributeHolder3).src).indexOf("On.png") != -1)    {
                attributeOn3[attributeIndex] = tempAttributeHolder3;
                attributeIndex++;
            }
        }



        if(attributeOn1.length > 0) {
            for(var tempAttributeHolder4 of attributeOn1)   {
                if(cardDatabase[CardID].ColorType == tempAttributeHolder4)    {
                    if(attributeOn2.length > 0) {
                        for(var tempAttributeHolder5 of attributeOn2)   {
                            if(cardDatabase[CardID].DirectionType == tempAttributeHolder5)    {
                                if(attributeOn3.length > 0) {
                                    for(var tempAttributeHolder6 of attributeOn3)   {
                                        if(cardDatabase[CardID].AttackType == tempAttributeHolder6) {
                                            attributeCounter++;
                                        }
                                    }
                                }
                                else    {
                                    attributeCounter++;
                                }
                            }
                        }
                    }
                    else if(attributeOn3.length > 0)    {
                        for(var tempAttributeHolder5 of attributeOn3)   {
                            if(cardDatabase[CardID].AttackType == tempAttributeHolder5) {
                                attributeCounter++;
                            }
                        }
                    }
                    else    {
                        attributeCounter++;
                    }
                }
            }
        }
        else if(attributeOn2.length > 0) {
            for(var tempAttributeHolder4 of attributeOn2)   {
                if(cardDatabase[CardID].DirectionType == tempAttributeHolder4)    {
                    if(attributeOn3.length > 0) {
                        for(var tempAttributeHolder5 of attributeOn3)   {
                            if(cardDatabase[CardID].AttackType == tempAttributeHolder5)    {
                                attributeCounter++;
                            }
                        }
                    }
                    else    {
                        attributeCounter++;
                    }
                }
            }
        }
        else if(attributeOn3.length > 0) {
            for(var tempAttributeHolder4 of attributeOn3)   {
                if(cardDatabase[CardID].AttackType == tempAttributeHolder4)    {
                    attributeCounter++;
                }
            }
        }
        if(attributeCounter == 0)  {
            return 0;
        }
    }

    var abilityElement = ["Fire", "Water", "Lightning", "Wind", "Light", "Dark", "Neutral"];
    attributeCounter = 0;
    if(mainAbilityElementOff == "False")   {
        for(var mainAbilityElement of abilityElement)   {
            if((document.getElementById("MainAbility" + mainAbilityElement).src).indexOf("On.png") != -1)   {
                if(cardDatabase[CardID].MainAbility.Element == mainAbilityElement)  {
                    attributeCounter++;
                }
            }
        }
        if(attributeCounter == 0)  {
            return 0;
        }
    }
    

    return 1;

}

function switchImage(value) {
    var split = value.split(",");
    var CardID = parseInt(split[0]);
    var type = split[1];
    if(type == "Card")    {
        if(currentDisplayedImagePath.src.indexOf("Card") != -1) {
        }
        else{
            currentImage.src = "./images/cards/" + cardDatabase[CardID].CardImage;
            currentDisplayedImagePath.src = currentDisplayedImagePath.src.substring(0, currentDisplayedImagePath.src.length - 6);
            currentDisplayedImagePath.src = currentDisplayedImagePath.src + "Off.png";
            currentImage.setAttribute("onclick", "window.open(\"./images/cards/" + cardDatabase[CardID].CardImage + "\")");
            currentDisplayedImagePath = cardButtonImage;
            currentDisplayedImagePath.src = currentDisplayedImagePath.src.substring(0, currentDisplayedImagePath.src.length - 7);
            currentDisplayedImagePath.src = currentDisplayedImagePath.src + "On.png";
        }
    }
    else if(type == "Render")  {
        if(currentDisplayedImagePath.src.indexOf("Render") != -1) {

        }
        else{
            currentImage.src = "./images/renders/" + cardDatabase[CardID].RenderImage;
            currentDisplayedImagePath.src = currentDisplayedImagePath.src.substring(0, currentDisplayedImagePath.src.length - 6);
            currentDisplayedImagePath.src = currentDisplayedImagePath.src + "Off.png";
            currentImage.setAttribute("onclick", "window.open(\"./images/renders/" + cardDatabase[CardID].RenderImage + "\")");
            currentDisplayedImagePath = renderButtonImage;
            currentDisplayedImagePath.src = currentDisplayedImagePath.src.substring(0, currentDisplayedImagePath.src.length - 7);
            currentDisplayedImagePath.src = currentDisplayedImagePath.src + "On.png";
        }
    }
}

var currentDisplayedImagePath;
var currentImage;
var cardButtonImage;
var renderButtonImage;
var artButtonImage;
var musicButtonImage;


/*
   _____   ______   _   _   ______   _____               _______   ______      _____              _____    _____  
  / ____| |  ____| | \ | | |  ____| |  __ \      /\     |__   __| |  ____|    / ____|     /\     |  __ \  |  __ \ 
 | |  __  | |__    |  \| | | |__    | |__) |    /  \       | |    | |__      | |         /  \    | |__) | | |  | |
 | | |_ | |  __|   | . ` | |  __|   |  _  /    / /\ \      | |    |  __|     | |        / /\ \   |  _  /  | |  | |
 | |__| | | |____  | |\  | | |____  | | \ \   / ____ \     | |    | |____    | |____   / ____ \  | | \ \  | |__| |
  \_____| |______| |_| \_| |______| |_|  \_\ /_/    \_\    |_|    |______|    \_____| /_/    \_\ |_|  \_\ |_____/ 

*/


function generateCard(CardID)  {
    var cardDiv = document.getElementById("cardPopup");

    cardDiv.innerHTML = "";

    var blankSpacer = document.createElement('br');

    var cardName = document.createElement('span');
    cardName.style = "font-size: 36px; text-shadow: 3px 3px rgb(0, 0, 0)";
    cardName.appendChild(document.createTextNode("No. " + cardDatabase[CardID].AlbumNum + ": \xa0\xa0\xa0" + cardDatabase[CardID].Name));
    cardDiv.appendChild(cardName);

    cardDiv.appendChild(blankSpacer);
    cardDiv.appendChild(blankSpacer.cloneNode());



    var upperDiv = document.createElement('div');
    upperDiv.style = "overflow: hidden; display: block";

    var currentImageSpan = document.createElement('span');
    currentImageSpan.style = "display: inline-block; margin-left: auto; float: left; width: 450px; max-width: 45%";
    currentImage = document.createElement('img');
    currentImage.style = "cursor: pointer; height: 300px; max-width: 75%; -o-object-fit: contain; object-fit: contain; border-style: solid; border-width: 4px; border-color:rgb(71, 0, 119);";
    currentImage.src = "./images/cards/" + cardDatabase[CardID].CardImage;
    currentImage.setAttribute("onclick", "window.open(\"./images/cards/" + cardDatabase[CardID].CardImage + "\")");
    currentImageSpan.appendChild(currentImage);

    currentImageSpan.appendChild(blankSpacer.cloneNode());

    cardButtonImage = document.createElement('img');
    cardButtonImage.ID = "cardButtonImageID";
    cardButtonImage.src = "./images/ui/SearchCard_On.png";
    cardButtonImage.style = "cursor: pointer; width: 60px; margin: 10px auto";
    cardButtonImage.setAttribute("onclick", "switchImage(\"" + CardID + ",Card\")");
    currentDisplayedImagePath = cardButtonImage;
    currentImageSpan.appendChild(cardButtonImage);

    if(cardDatabase[CardID].RenderImage !== undefined)  {
        renderButtonImage = document.createElement('img');
        renderButtonImage.src = "./images/ui/SearchRender_Off.png";
        renderButtonImage.style = "cursor: pointer; width: 60px; margin: 10px auto";
        renderButtonImage.setAttribute("onclick", "switchImage(\"" + CardID + ",Render\")");
        currentImageSpan.appendChild(renderButtonImage);
    }

    upperDiv.appendChild(currentImageSpan);


    


    var sideSpan = document.createElement('div');
    sideSpan.style = "display: inline-block; float: left; margin-left: auto; margin-top: 15px; width: 50%";

    var tableElement = document.createElement('table');
    tableElement.style = "text-align: center; border-color: rgb(71, 0, 119); vertical-align: middle; display: inline-block; table-layout: fixed";
    tableElement.setAttribute('border', '1');
    var tableBodyElement = document.createElement('tbody');

    var passiveArray = ["Passive1", "Passive2", "Passive3", "Passive4"];

    for(var passiveObject of passiveArray)  {
        if(cardDatabase[CardID][passiveObject] != undefined)  {
            var trElement = document.createElement('tr');
            var tdElement1 = document.createElement('td');
            tdElement1.style = "width: 25%"
            var tdElement1IMG = document.createElement('img');
            tdElement1IMG.src = "./images/ui/Icon_" + passiveObject + ".png";
            tdElement1IMG.style = "max-width: 80%; margin-top: 5%; margin-bottom: 5%";
            tdElement1.appendChild(tdElement1IMG);
            trElement.appendChild(tdElement1);

            var tdElement2 = document.createElement('td');
            tdElement2.style = "width: 50%; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0)";
            tdElement2.appendChild(document.createTextNode(cardDatabase[CardID][passiveObject].BuffType));
            trElement.appendChild(tdElement2);

            var tdElement3 = document.createElement('td');
            tdElement3.style = "width: 25%; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0)";
            tdElement3.appendChild(document.createTextNode("+" + cardDatabase[CardID][passiveObject].BuffCount));
            trElement.appendChild(tdElement3);

            tableBodyElement.appendChild(trElement);
        }
        else    {
            var trElement = document.createElement('tr');
            var tdElement1 = document.createElement('td');
            tdElement1.style = "width: 25%"
            var tdElement1IMG = document.createElement('img');
            tdElement1IMG.src = "./images/ui/Icon_" + passiveObject + ".png";
            tdElement1IMG.style = "max-width: 80%; margin-top: 5%; margin-bottom: 5%";
            tdElement1.appendChild(tdElement1IMG);
            trElement.appendChild(tdElement1);

            var tdElement2 = document.createElement('td');
            tdElement2.style = "width: 50%; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0)";
            tdElement2.appendChild(document.createTextNode("-----"));
            trElement.appendChild(tdElement2);

            var tdElement3 = document.createElement('td');
            tdElement3.style = "width: 25%; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0)";
            tdElement3.appendChild(document.createTextNode("---"));
            trElement.appendChild(tdElement3);

            tableBodyElement.appendChild(trElement);
        }
    }


    
    tableElement.appendChild(tableBodyElement);
    sideSpan.appendChild(tableElement);

    upperDiv.appendChild(sideSpan);

    cardDiv.appendChild(upperDiv);

    cardDiv.appendChild(blankSpacer.cloneNode());



    if(cardDatabase[CardID].MainAbility !== undefined && cardDatabase[CardID].MainAbility.Name !== undefined)   {
        var abilityNameSpan = document.createElement('span');
        if(cardDatabase[CardID].MainAbility.Element !== undefined) {
            var mainAbilityElement = document.createElement('img');
            mainAbilityElement.src = "./images/ui/Attribute_" + cardDatabase[CardID].MainAbility.Element + ".png";
            mainAbilityElement.style = "max-width: 50px; vertical-align: middle; margin-right: 5px";
            cardDiv.appendChild(mainAbilityElement);
        }
        abilityNameSpan.style = "font-size: 28px; text-shadow: 1.50px 1.50px rgb(0, 0, 0); vertical-align: middle";
        abilityNameSpan.appendChild(document.createTextNode("Main Ability: " + cardDatabase[CardID].MainAbility.Name));
        cardDiv.appendChild(abilityNameSpan);
    }

    if(cardDatabase[CardID].MainAbility !== undefined && cardDatabase[CardID].MainAbility.BasePower !== undefined)  {
        var mainAbilityBasePower = document.createElement('div');
        mainAbilityBasePower.style = "float: center; font-size: 18px; text-shadow: 1px 1px rgb(0, 0, 0)";
        mainAbilityBasePower.appendChild(document.createTextNode("Base Power: " + cardDatabase[CardID].MainAbility.BasePower));
        cardDiv.appendChild(mainAbilityBasePower);
    }

    if(cardDatabase[CardID].MainAbility !== undefined && cardDatabase[CardID].MainAbility.MaxPower !== undefined)  {
        var mainAbilityMaxPower = document.createElement('div');
        mainAbilityMaxPower.style = "float: center; font-size: 22px; text-shadow: 1.25px 1.25px rgb(0, 0, 0)";
        mainAbilityMaxPower.appendChild(document.createTextNode("Max Power: " + cardDatabase[CardID].MainAbility.MaxPower));
        cardDiv.appendChild(mainAbilityMaxPower);
    }

    if(cardDatabase[CardID].MainAbility !== undefined && cardDatabase[CardID].MainAbility.Effect !== undefined)  {
        var abilityText = document.createElement('div');
        abilityText.style = "float: center; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0); margin: 30px; border-style: dashed; border-width: 2px; border-color: rgb(71, 0, 119)";
        abilityText.appendChild(document.createTextNode(cardDatabase[CardID].MainAbility.Effect));
        cardDiv.appendChild(abilityText);
    }

if(cardDatabase[CardID].SubAbility !== undefined)  {
    if(cardDatabase[CardID].SubAbility.Name !== undefined)   {
        var hrBlock = document.createElement('hr');
        cardDiv.appendChild(hrBlock);

        var subAbilityNameSpan = document.createElement('span');
        subAbilityNameSpan.style = "font-size: 28px; text-shadow: 1.50px 1.50px rgb(0, 0, 0); vertical-align: middle";
        subAbilityNameSpan.appendChild(document.createTextNode("Sub-Ability: " + cardDatabase[CardID].SubAbility.Name));
        subAbilityNameSpan.appendChild(document.createTextNode("\xa0\xa0\xa0"));
        cardDiv.appendChild(subAbilityNameSpan);
    }

    if(cardDatabase[CardID].SubAbility.Effect !== undefined)  {
        var subAbilityText = document.createElement('div');
        subAbilityText.style = "float: center; font-size: 24px; text-shadow: 1.25px 1.25px rgb(0, 0, 0); margin: 30px; border-style: dashed; border-width: 2px; border-color: rgb(71, 0, 119)";
        subAbilityText.appendChild(document.createTextNode(cardDatabase[CardID].SubAbility.Effect));
        cardDiv.appendChild(subAbilityText);
    }
}

    $('#cardPopup').fadeToggle(200);
    $('#darkOverlay2').fadeToggle(200);
}

function loadSearchBox()    {
    $('#cardSortFilterPopup').fadeToggle(200);
    $('#darkOverlay').fadeToggle(200);
}

// Close search box when the user clicks outside of the window
$(document).mouseup(function (e) {
    var container1 = $("#cardSortFilterPopup");
    var container2 = $("#darkOverlay");

    if (!container1.is(e.target)
        && container1.has(e.target).length === 0)
    {
        container1.fadeOut(200);
        container2.fadeOut(200);
    }
});


// Close the medal popup when the user clicks outside of the window
$(document).mouseup(function (e) {
    var container3 = $("#cardPopup");
    var container4 = $("#darkOverlay2");

    if (!container3.is(e.target)
        && container3.has(e.target).length === 0)
    {
        container3.fadeOut(200);
        container4.fadeOut(200);
    }
});



/*
  _____               _______              ____                _____   ______ 
 |  __ \      /\     |__   __|     /\     |  _ \      /\      / ____| |  ____|
 | |  | |    /  \       | |       /  \    | |_) |    /  \    | (___   | |__   
 | |  | |   / /\ \      | |      / /\ \   |  _ <    / /\ \    \___ \  |  __|  
 | |__| |  / ____ \     | |     / ____ \  | |_) |  / ____ \   ____) | | |____ 
 |_____/  /_/    \_\    |_|    /_/    \_\ |____/  /_/    \_\ |_____/  |______|

*/



var cardDatabase = {
    1:  {
        ID: 1,
        AlbumNum: 1,
        CardImage: "1_Keyblade_(Red).png",
        RenderImage: "1_Keyblade_(Red)_Render.png",
        Name: "Keyblade (Red)",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    2:  {
        ID: 2,
        AlbumNum: 2,
        CardImage: "2_Keyblade_(Green).png",
        RenderImage: "2_Keyblade_(Green)_Render.png",
        Name: "Keyblade (Green)",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    3:  {
        ID: 3,
        AlbumNum: 3,
        CardImage: "3_Keyblade_(Blue).png",
        RenderImage: "3_Keyblade_(Blue)_Render.png",
        Name: "Keyblade (Blue)",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    4:  {
        ID: 4,
        AlbumNum: 4,
        CardImage: "4_Shadow_(Red).png",
        RenderImage: "4_Shadow_(Red)_Render.png",
        Name: "Shadow (Red)",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    5:  {
        ID: 5,
        AlbumNum: 5,
        CardImage: "5_Shadow_(Green).png",
        RenderImage: "5_Shadow_(Green)_Render.png",
        Name: "Shadow (Green)",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    6:  {
        ID: 6,
        AlbumNum: 6,
        CardImage: "6_Shadow_(Blue).png",
        RenderImage: "6_Shadow_(Blue)_Render.png",
        Name: "Shadow (Blue)",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 2,
            MaxPower: 15,
            Effect: "A lesser physical attack."
        }
    },
    7:  {
        ID: 7,
        AlbumNum: 7,
        CardImage: "7_Abu_(Red).png",
        RenderImage: "7_Abu_(Red)_Render.png",
        Name: "Abu (Red)",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    8:  {
        ID: 8,
        AlbumNum: 8,
        CardImage: "8_Abu_(Green).png",
        RenderImage: "8_Abu_(Green)_Render.png",
        Name: "Abu (Green)",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    9:  {
        ID: 9,
        AlbumNum: 9,
        CardImage: "9_Abu_(Blue).png",
        RenderImage: "9_Abu_(Blue)_Render.png",
        Name: "Abu (Blue)",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    10:  {
        ID: 10,
        AlbumNum: 10,
        CardImage: "10_Playing_Cards_(Red).png",
        RenderImage: "10_Playing_Cards_(Red)_Render.png",
        Name: "Playing Cards (Red)",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    11:  {
        ID: 11,
        AlbumNum: 11,
        CardImage: "11_Playing_Cards_(Green).png",
        RenderImage: "11_Playing_Cards_(Green)_Render.png",
        Name: "Playing Cards (Green)",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    12:  {
        ID: 12,
        AlbumNum: 12,
        CardImage: "12_Playing_Cards_(Blue).png",
        RenderImage: "12_Playing_Cards_(Blue)_Render.png",
        Name: "Playing Cards (Blue)",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 3,
            MaxPower: 18,
            Effect: "A lesser physical attack."
        }
    },
    13:  {
        ID: 13,
        AlbumNum: 13,
        CardImage: "13_Large_Body.png",
        RenderImage: "13_Large_Body_Render.png",
        Name: "Large Body",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 5,
            MaxPower: 20,
            Effect: "A lesser physical attack."
        }
    },
    14:  {
        ID: 14,
        AlbumNum: 14,
        CardImage: "14_Soldier.png",
        RenderImage: "14_Soldier_Render.png",
        Name: "Soldier",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 5,
            MaxPower: 20,
            Effect: "A lesser physical attack."
        }
    },
    15:  {
        ID: 15,
        AlbumNum: 15,
        CardImage: "15_Bandit.png",
        RenderImage: "15_Bandit_Render.png",
        Name: "Bandit",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 5,
            MaxPower: 20,
            Effect: "A lesser physical attack."
        }
    },
    16:  {
        ID: 16,
        AlbumNum: 16,
        CardImage: "16_Tidus.png",
        RenderImage: "16_Tidus_Render.png",
        Name: "Tidus",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Defense",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Sliding Dash",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 9,
            MaxPower: 40,
            Effect: "A physical attack."
        }
    },
    17:  {
        ID: 17,
        AlbumNum: 17,
        CardImage: "17_Selphie.png",
        RenderImage: "17_Selphie_Render.png",
        Name: "Selphie",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Defense",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Sliding Dash",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 9,
            MaxPower: 40,
            Effect: "A physical attack."
        }
    },
    18:  {
        ID: 18,
        AlbumNum: 18,
        CardImage: "18_Wakka.png",
        RenderImage: "18_Wakka_Render.png",
        Name: "Wakka",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Defense",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Sliding Dash",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 9,
            MaxPower: 40,
            Effect: "A physical attack."
        }
    },
    19:  {
        ID: 19,
        AlbumNum: 19,
        CardImage: "19_Red_Nocturne.png",
        RenderImage: "19_Red_Nocturne_Render.png",
        Name: "Red Nocturne",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Fire",
            AttackType: "Sword",
            Element: "Fire",
            BasePower: 15,
            MaxPower: 45,
            Effect: "A fire-element magic attack."
        }
    },
    20:  {
        ID: 20,
        AlbumNum: 20,
        CardImage: "20_Blue_Rhapsody.png",
        RenderImage: "20_Blue_Rhapsody_Render.png",
        Name: "Blue Rhapsody",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Blizzard",
            AttackType: "Sword",
            Element: "Water",
            BasePower: 15,
            MaxPower: 45,
            Effect: "A water-element magic attack."
        }
    },
    21:  {
        ID: 21,
        AlbumNum: 21,
        CardImage: "21_Yellow_Opera.png",
        RenderImage: "21_Yellow_Opera_Render.png",
        Name: "Yellow Opera",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Thunder",
            AttackType: "Sword",
            Element: "Lightning",
            BasePower: 15,
            MaxPower: 45,
            Effect: "A lightning-element magic attack."
        }
    },
    22:  {
        ID: 22,
        AlbumNum: 22,
        CardImage: "22_Potion.png",
        RenderImage: "22_Potion_Render.png",
        Name: "Potion",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "HP",
            BuffCount: 5
        },
        MainAbility:    {
            Name: "Potion",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Restores 50 HP. Stacking Cards does not increase value."
        }
    },
    23:  {
        ID: 23,
        AlbumNum: 23,
        CardImage: "23_Queen_Minnie.png",
        RenderImage: "23_Queen_Minnie_Render.png",
        Name: "Queen Minnie",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "HP",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Cure",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 15,
            MaxPower: 50,
            Effect: "Restores HP. Amount restored is based on Magic."
        }
    },
    24:  {
        ID: 24,
        AlbumNum: 24,
        CardImage: "24_Goofy.png",
        RenderImage: "24_Goofy_Render.png",
        Name: "Goofy",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Defense",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Protect",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Defense +1 for 10s. Stacking Cards does not increase value. Can be applied more than once."
        }
    },
    25:  {
        ID: 25,
        AlbumNum: 25,
        CardImage: "25_Donald.png",
        RenderImage: "25_Donald_Render.png",
        Name: "Donald",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic Resist",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Shell",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Magic Resist +1 for 10s. Stacking Cards does not increase value. Can be applied more than once."
        }
    },
    26:  {
        ID: 26,
        AlbumNum: 26,
        CardImage: "26_Queen_of_Hearts.png",
        RenderImage: "26_Queen_of_Hearts_Render.png",
        Name: "Queen of Hearts",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 10,
            MaxPower: 30,
            Effect: "A physical attack."
        }
    },
    27:  {
        ID: 27,
        AlbumNum: 27,
        CardImage: "27_Maleficent.png",
        RenderImage: "27_Maleficent_Render.png",
        Name: "Maleficent",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 10,
            MaxPower: 30,
            Effect: "A physical attack."
        }
    },
    28:  {
        ID: 28,
        AlbumNum: 28,
        CardImage: "28_Captain_Hook.png",
        RenderImage: "28_Captain_Hook_Render.png",
        Name: "Captain Hook",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 10,
            MaxPower: 30,
            Effect: "A physical attack."
        }
    },
    29:  {
        ID: 29,
        AlbumNum: 29,
        CardImage: "29_Alice.png",
        RenderImage: "29_Alice_Render.png",
        Name: "Alice",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "HP",
            BuffCount: 5
        },
        MainAbility:    {
            Name: "Poisona",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Cures Poison."
        }
    },
    30:  {
        ID: 30,
        AlbumNum: 30,
        CardImage: "30_Genie.png",
        RenderImage: "30_Genie_Render.png",
        Name: "Genie",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Attack Boost",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once."
        }
    },
    31:  {
        ID: 31,
        AlbumNum: 31,
        CardImage: "31_Wizard.png",
        RenderImage: "31_Wizard_Render.png",
        Name: "Wizard",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Magic Boost",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once."
        }
    },
    32:  {
        ID: 32,
        AlbumNum: 32,
        CardImage: "32_Key_Scene_%231.png",
        RenderImage: "32_Key_Scene_%231_Render.png",
        Name: "Key Scene #1",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Ars Arcanum",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 60,
            Effect: "A powerful physical attack."
        }
    },
    33:  {
        ID: 33,
        AlbumNum: 33,
        CardImage: "33_Key_Scene_%232.png",
        RenderImage: "33_Key_Scene_%232_Render.png",
        Name: "Key Scene #2",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Spark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 60,
            Effect: "A powerful physical attack."
        }
    },
    34:  {
        ID: 34,
        AlbumNum: 34,
        CardImage: "34_Key_Scene_%233.png",
        RenderImage: "34_Key_Scene_%233_Render.png",
        Name: "Key Scene #3",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Blade of Seven",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 60,
            Effect: "A powerful physical attack."
        }
    },
    35:  {
        ID: 35,
        AlbumNum: 35,
        CardImage: "35_Key_Art_%231.png",
        RenderImage: "35_Key_Art_%231_Render.png",
        Name: "Key Art #1",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Strike Raid",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 60,
            Effect: "A powerful physical attack."
        }
    },
    36:  {
        ID: 36,
        AlbumNum: 36,
        CardImage: "36_Key_Art_%232.png",
        RenderImage: "36_Key_Art_%232_Render.png",
        Name: "Key Art #2",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 3
        },
        MainAbility:    {
            Name: "Flare",
            AttackType: "Staff",
            Element: "Neutral",
            BasePower: 18,
            MaxPower: 90,
            Effect: "A non-element magic attack."
        },
        SubAbility:    {
            Name: "Attack Boost",
            Effect: "Strength +1 for 10s. Stacking Cards does not increase value. Can be applied more than once."
        }
    },
    37:  {
        ID: 37,
        AlbumNum: 37,
        CardImage: "37_Darkside.png",
        RenderImage: "37_Darkside_Render.png",
        Name: "Darkside",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 10,
            MaxPower: 20,
            Effect: "A physical attack."
        }
    },
    38:  {
        ID: 38,
        AlbumNum: 38,
        CardImage: "38_King_Mickey.png",
        RenderImage: "38_King_Mickey_Render.png",
        Name: "King Mickey",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "HP",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Attack",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 5,
            MaxPower: 24,
            Effect: "A lesser physical attack."
        }
    },
    39:  {
        ID: 39,
        AlbumNum: 39,
        CardImage: "39_Tinker_Bell.png",
        RenderImage: "39_Tinker_Bell_Render.png",
        Name: "Tinker Bell",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "HP",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Cure",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 15,
            MaxPower: 50,
            Effect: "Restores HP. Amount restored is based on Magic."
        }
    },
    40:  {
        ID: 40,
        AlbumNum: 40,
        CardImage: "40_Ariel.png",
        RenderImage: "40_Ariel_Render.png",
        Name: "Ariel",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Blizzard",
            AttackType: "Staff",
            Element: "Water",
            BasePower: 25,
            MaxPower: 45,
            Effect: "A water-element magic attack."
        }
    },
    41:  {
        ID: 41,
        AlbumNum: 41,
        CardImage: "41_Neoshadow.png",
        RenderImage: "41_Neoshadow_Render.png",
        Name: "Neoshadow",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 30,
            Effect: "A physical attack."
        }
    },
    42:  {
        ID: 42,
        AlbumNum: 42,
        CardImage: "42_Riku_Replica.png",
        RenderImage: "42_Riku_Replica_Render.png",
        Name: "Riku Replica",
        DirectionType: "Dark",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Ars Arcanum",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 20,
            MaxPower: 70,
            Effect: "A powerful physical attack."
        }
    },
    43:  {
        ID: 43,
        AlbumNum: 43,
        CardImage: "43_Key_Art_%233.png",
        RenderImage: "43_Key_Art_%233_Render.png",
        Name: "Key Art #3",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 2
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Shining Star",
            AttackType: "Staff",
            Element: "Neutral",
            BasePower: 30,
            MaxPower: 60,
            Effect: "A non-element magic attack."
        }
    },
    44:  {
        ID: 44,
        AlbumNum: 44,
        CardImage: "44_Kairi.png",
        RenderImage: "44_Kairi_Render.png",
        Name: "Kairi",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "HP",
            BuffCount: 5
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 3
        },
        MainAbility:    {
            Name: "Gauge Boost",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Fills the bonus gauge. Stacking Cards does not increase value."
        }
    },
    45:  {
        ID: 45,
        AlbumNum: 45,
        CardImage: "45_Axel.png",
        RenderImage: "45_Axel_Render.png",
        Name: "Axel",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Ignito Raid",
            AttackType: "Sword",
            Element: "Fire",
            BasePower: 25,
            MaxPower: 65,
            Effect: "A powerful fire-element physical attack."
        }
    },
    46:  {
        ID: 46,
        AlbumNum: 46,
        CardImage: "46_Key_Scene_%234.png",
        RenderImage: "46_Key_Scene_%234_Render.png",
        Name: "Key Scene #4",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Rapid Storm",
            AttackType: "Staff",
            Element: "Wind",
            BasePower: 20,
            MaxPower: 65,
            Effect: "A wind-element magic attack."
        }
    },
    47:  {
        ID: 47,
        AlbumNum: 47,
        CardImage: "47_Terra.png",
        RenderImage: "47_Terra_Render.png",
        Name: "Terra",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Glacial Arrows Thunder",
            AttackType: "Sword",
            Element: "Lightning",
            BasePower: 25,
            MaxPower: 65,
            Effect: "A powerful lightning-element physical attack."
        }
    },
    48:  {
        ID: 48,
        AlbumNum: 48,
        CardImage: "48_Aqua.png",
        RenderImage: "48_Aqua_Render.png",
        Name: "Aqua",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Magic Pulse",
            AttackType: "Staff",
            Element: "Water",
            BasePower: 25,
            MaxPower: 65,
            Effect: "A powerful water-element magic attack."
        }
    },
    49:  {
        ID: 49,
        AlbumNum: 49,
        CardImage: "49_Ventus.png",
        RenderImage: "49_Ventus_Render.png",
        Name: "Ventus",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Sword",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Air Flair",
            AttackType: "Sword",
            Element: "Wind",
            BasePower: 25,
            MaxPower: 65,
            Effect: "A powerful wind-element physical attack."
        }
    },
    50:  {
        ID: 50,
        AlbumNum: 50,
        CardImage: "50_Mushu.png",
        RenderImage: "50_Mushu_Render.png",
        Name: "Mushu",
        DirectionType: "Light",
        ColorType: "Red",
        AttackType: "Staff",
        MainAbility:    {
            Name: "Fire",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 25,
            MaxPower: 45,
            Effect: "A fire-element magic attack."
        }
    },
    51:  {
        ID: 51,
        AlbumNum: 51,
        CardImage: "51_Emerald_Blues.png",
        RenderImage: "51_Emerald_Blues_Render.png",
        Name: "Emerald Blues",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Staff",
        MainAbility:    {
            Name: "Aero",
            AttackType: "Staff",
            Element: "Wind",
            BasePower: 15,
            MaxPower: 45,
            Effect: "A wind-element magic attack."
        }
    },
    52:  {
        ID: 52,
        AlbumNum: 52,
        CardImage: "52_Hag.png",
        RenderImage: "52_Hag_Render.png",
        Name: "Hag",
        DirectionType: "Dark",
        ColorType: "Blue",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Poison",
            AttackType: "Staff",
            Element: "Neutral",
            BasePower: 8,
            MaxPower: 18,
            Effect: "A lesser non-element magic attack that has a low chance of inflicting poison."
        }
    },
    53:  {
        ID: 53,
        AlbumNum: 53,
        CardImage: "53_Donald_%232.png",
        RenderImage: "53_Donald_%232_Render.png",
        Name: "Donald #2",
        DirectionType: "Light",
        ColorType: "Green",
        AttackType: "Staff",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Thunder",
            AttackType: "Staff",
            Element: "Lightning",
            BasePower: 12,
            MaxPower: 40,
            Effect: "A lightning-element magic attack."
        }
    },
};