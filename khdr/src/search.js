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
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.MaxPower == undefined || performOperator(cardDatabase[CardID].MainAbility.MaxPower, document.getElementById("Power").value, document.getElementById("PowerOrder").value) == false)  {
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

/*
  __  __          _____ _   _            ____ _____ _      _____ _________     __
 |  \/  |   /\   |_   _| \ | |     /\   |  _ \_   _| |    |_   _|__   __\ \   / /
 | \  / |  /  \    | | |  \| |    /  \  | |_) || | | |      | |    | |   \ \_/ / 
 | |\/| | / /\ \   | | | . ` |   / /\ \ |  _ < | | | |      | |    | |    \   /  
 | |  | |/ ____ \ _| |_| |\  |  / ____ \| |_) || |_| |____ _| |_   | |     | |   
 |_|  |_/_/    \_\_____|_| \_| /_/    \_\____/_____|______|_____|  |_|     |_|   
*/
    
    if(document.getElementById("abilityFilters_SelfBuffs_FillsGaugeIMG").src.indexOf("On.png") != -1)   {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.SelfBuffs == undefined || cardDatabase[CardID].MainAbility.SelfBuffs.FillsGauge == undefined) {
            return 0;
        }
    }

    if(document.getElementById("abilityFilters_SelfBuffs_HPRecoveryIMG").src.indexOf("On.png") != -1)   {
        if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.SelfBuffs == undefined || cardDatabase[CardID].MainAbility.SelfBuffs.HPRecovery == undefined) {
            return 0;
        }
    }

    if(document.getElementById("abilityFilters_SelfBuffs_EsunaIMG").src.indexOf("On.png") != -1)   {
        if(document.getElementById("abilityFilters_SelfBuffs_EsunaIMGcaption/Type").value != undefined && document.getElementById("abilityFilters_SelfBuffs_EsunaIMGcaption/Type").value != "")   {
            if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.SelfBuffs == undefined || cardDatabase[CardID].MainAbility.SelfBuffs.CuresStatus != document.getElementById("abilityFilters_SelfBuffs_EsunaIMGcaption/Type").value) {
                return 0;
            }
        }
        else if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.SelfBuffs == undefined || cardDatabase[CardID].MainAbility.SelfBuffs.CuresStatus == undefined) {
            return 0;
        }
    }

    var buffTypeStoreArray = ["Strength", "Defense", "Magic", "MagicResist"];
    var buffArray = ["Buff"];
    for(var tempBuffValue of buffArray)   {
        for(var tempTypeValue of buffTypeStoreArray)  {
            if(document.getElementById("abilityFilters_SelfBuffs_" + tempBuffValue + tempTypeValue + "IMG").src.indexOf("On.png") != -1)   {
                if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.SelfBuffs == undefined || cardDatabase[CardID].MainAbility.SelfBuffs[tempBuffValue + tempTypeValue] == undefined) {
                    return 0;
                }
                if(document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != undefined && document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != "" && cardDatabase[CardID].MainAbility.SelfBuffs[tempBuffValue + tempTypeValue].BuffCount != document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value)   {
                    return 0;
                }
                if(document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != undefined && document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != "" && cardDatabase[CardID].MainAbility.SelfBuffs[tempBuffValue + tempTypeValue].Duration != document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value)   {
                    return 0;
                }
            }
        }
    }


    if(document.getElementById("abilityFilters_EnemyBuffs_InflictsStatusIMG").src.indexOf("On.png") != -1)   {
        if(document.getElementById("abilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value != undefined && document.getElementById("abilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value != "")   {
            if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs.InflictsStatus != document.getElementById("abilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value) {
                return 0;
            }
        }
        else if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs.InflictsStatus == undefined) {
            return 0;
        }
    }

    var debuffArray = ["Debuff"];

    for(var tempBuffValue of debuffArray)   {
        for(var tempTypeValue of buffTypeStoreArray)  {
            if(document.getElementById("abilityFilters_EnemyBuffs_" + tempBuffValue + tempTypeValue + "IMG").src.indexOf("On.png") != -1)   {
                if(cardDatabase[CardID].MainAbility == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs == undefined || cardDatabase[CardID].MainAbility.EnemyBuffs[tempBuffValue + tempTypeValue] == undefined) {
                    return 0;
                }
                if(document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != undefined && document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != "" && cardDatabase[CardID].MainAbility.EnemyBuffs[tempBuffValue + tempTypeValue].BuffCount != document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/BuffCount").value)   {
                    return 0;
                }
                if(document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != undefined && document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != "" && cardDatabase[CardID].MainAbility.EnemyBuffs[tempBuffValue + tempTypeValue].Duration != document.getElementById("abilityFilters_SelfBuffs_BuffDebuff/DurationCount").value)   {
                    return 0;
                }
            }
        }
    }

/*
   _____ _    _ ____             ____ _____ _      _____ _________     __
  / ____| |  | |  _ \      /\   |  _ \_   _| |    |_   _|__   __\ \   / /
 | (___ | |  | | |_) |    /  \  | |_) || | | |      | |    | |   \ \_/ / 
  \___ \| |  | |  _ <    / /\ \ |  _ < | | | |      | |    | |    \   /  
  ____) | |__| | |_) |  / ____ \| |_) || |_| |____ _| |_   | |     | |   
 |_____/ \____/|____/  /_/    \_\____/_____|______|_____|  |_|     |_|   
*/

    if(document.getElementById("subAbilityFilters_SelfBuffs_FillsGaugeIMG").src.indexOf("On.png") != -1)   {
        if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.SelfBuffs == undefined || cardDatabase[CardID].SubAbility.SelfBuffs.FillsGauge == undefined) {
            return 0;
        }
    }

    if(document.getElementById("subAbilityFilters_SelfBuffs_HPRecoveryIMG").src.indexOf("On.png") != -1)   {
        if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.SelfBuffs == undefined || cardDatabase[CardID].SubAbility.SelfBuffs.HPRecovery == undefined) {
            return 0;
        }
    }

    for(var tempBuffValue of buffArray)   {
        for(var tempTypeValue of buffTypeStoreArray)  {
            if(document.getElementById("subAbilityFilters_SelfBuffs_" + tempBuffValue + tempTypeValue + "IMG").src.indexOf("On.png") != -1)   {
                if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.SelfBuffs == undefined || cardDatabase[CardID].SubAbility.SelfBuffs[tempBuffValue + tempTypeValue] == undefined) {
                    return 0;
                }
                if(document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != undefined && document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != "" && cardDatabase[CardID].SubAbility.SelfBuffs[tempBuffValue + tempTypeValue].BuffCount != document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value)   {
                    return 0;
                }
                if(document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != undefined && document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != "" && cardDatabase[CardID].SubAbility.SelfBuffs[tempBuffValue + tempTypeValue].Duration != document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value)   {
                    return 0;
                }
            }
        }
    }


    if(document.getElementById("subAbilityFilters_EnemyBuffs_InflictsStatusIMG").src.indexOf("On.png") != -1)   {
        if(document.getElementById("subAbilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value != undefined && document.getElementById("subAbilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value != "")   {
            if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs.InflictsStatus != document.getElementById("subAbilityFilters_EnemyBuffs_InflictsStatusIMGcaption/Type").value) {
                return 0;
            }
        }
        else if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs.InflictsStatus == undefined) {
            return 0;
        }
    }

    for(var tempBuffValue of debuffArray)   {
        for(var tempTypeValue of buffTypeStoreArray)  {
            if(document.getElementById("subAbilityFilters_EnemyBuffs_" + tempBuffValue + tempTypeValue + "IMG").src.indexOf("On.png") != -1)   {
                if(cardDatabase[CardID].SubAbility == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs == undefined || cardDatabase[CardID].SubAbility.EnemyBuffs[tempBuffValue + tempTypeValue] == undefined) {
                    return 0;
                }
                if(document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != undefined && document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value != "" && cardDatabase[CardID].SubAbility.EnemyBuffs[tempBuffValue + tempTypeValue].BuffCount != document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/BuffCount").value)   {
                    return 0;
                }
                if(document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != undefined && document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value != "" && cardDatabase[CardID].SubAbility.EnemyBuffs[tempBuffValue + tempTypeValue].Duration != document.getElementById("subAbilityFilters_SelfBuffs_BuffDebuff/DurationCount").value)   {
                    return 0;
                }
            }
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
            Effect: "Restores 50 HP. Stacking Cards does not increase value.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Fixed",
                    Amount: 50
                }
            }
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
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 15,
            MaxPower: 50,
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
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
            Effect: "Defense +1 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffDefense:   {
                    Type: "General",
                    BuffCount: 1,
                    Duration: 10
                }
            }
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
            Effect: "Magic Resist +1 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagicResist:   {
                    Type: "General",
                    BuffCount: 1,
                    Duration: 10
                }
            }
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
            Effect: "Cures Poison.",
            SelfBuffs:  {
                CuresStatus: "Poison"
            }
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
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
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
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
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
            Effect: "Strength +1 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 1,
                    Duration: 10
                }
            }
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
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
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
            Effect: "Fills the bonus gauge. Stacking Cards does not increase value.",
            SelfBuffs:  {
                FillsGauge: "Yes"
            }
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
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
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
            Effect: "A lesser non-element magic attack that has a low chance of inflicting poison.",
            EnemyBuffs:  {
                InflictsStatus: "Poison"
            }
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
    54:  {
        ID: 54,
        AlbumNum: 54,
        CardImage: "54_Cloud.png",
        RenderImage: "54_Cloud_Render.png",
        Name: "Cloud",
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
            Name: "Cross Slash",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful non-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    55:  {
        ID: 55,
        AlbumNum: 55,
        CardImage: "55_Sephiroth.png",
        RenderImage: "55_Sephiroth_Render.png",
        Name: "Sephiroth",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Meteor Rain",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful fire-element magic attack."
        },
        SubAbility:    {
            Name: "Magic Boost+",
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    56:  {
        ID: 56,
        AlbumNum: 56,
        CardImage: "56_Key_Art_%234.png",
        RenderImage: "56_Key_Art_%234_Render.png",
        Name: "Key Art #4",
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
            BasePower: 15,
            MaxPower: 55,
            Effect: "A powerful physical attack."
        }
    },
    57:  {
        ID: 57,
        AlbumNum: 57,
        CardImage: "57_Roxas.png",
        RenderImage: "57_Roxas_Render.png",
        Name: "Roxas",
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
            Name: "Black Hole",
            AttackType: "Sword",
            Element: "Water",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful water-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    58:  {
        ID: 58,
        AlbumNum: 58,
        CardImage: "58_Namine.png",
        RenderImage: "58_Namine_Render.png",
        Name: "Naminé",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Circle of Innocence",
            AttackType: "Staff",
            Element: "Light",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful light-element magic attack."
        },
        SubAbility:    {
            Name: "Magic Boost+",
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    59:  {
        ID: 59,
        AlbumNum: 59,
        CardImage: "59_Winnie_the_Pooh.png",
        RenderImage: "59_Winnie_the_Pooh_Render.png",
        Name: "Winnie the Pooh",
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
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Magic DEF Sap",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Target's Magic Resist -5 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            EnemyBuffs:  {
                DebuffMagicResist:   {
                    Type: "General",
                    BuffCount: 5,
                    Duration: 10
                }
            }
        }
    },
    60:  {
        ID: 60,
        AlbumNum: 60,
        CardImage: "60_Xion.png",
        RenderImage: "60_Xion_Render.png",
        Name: "Xion",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Thundaga",
            AttackType: "Staff",
            Element: "Lightning",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful lightning-element magic attack."
        },
        SubAbility:    {
            Name: "Magic Boost+",
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    61:  {
        ID: 61,
        AlbumNum: 61,
        CardImage: "61_Marluxia.png",
        RenderImage: "61_Marluxia_Render.png",
        Name: "Marluxia",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Blossom of Thorns",
            AttackType: "Sword",
            Element: "Wind",
            BasePower: 38,
            MaxPower: 80,
            Effect: "A powerful wind-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    62:  {
        ID: 62,
        AlbumNum: 62,
        CardImage: "62_Larxene.png",
        RenderImage: "62_Larxene_Render.png",
        Name: "Larxene",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Savage Knives",
            AttackType: "Sword",
            Element: "Lightning",
            BasePower: 38,
            MaxPower: 80,
            Effect: "A powerful lightning-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    63:  {
        ID: 63,
        AlbumNum: 63,
        CardImage: "63_Zexion.png",
        RenderImage: "63_Zexion_Render.png",
        Name: "Zexion",
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
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Meteor Mirage",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 38,
            MaxPower: 80,
            Effect: "A powerful fire-element magic attack."
        },
        SubAbility:    {
            Name: "Magic Boost+",
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    64:  {
        ID: 64,
        AlbumNum: 64,
        CardImage: "64_Halloween_Sora.png",
        RenderImage: "64_Halloween_Sora_Render.png",
        Name: "Halloween Sora",
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
            Name: "Pumpkin Pummel",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 38,
            MaxPower: 78,
            Effect: "Consumes 10% of the bonus gauge to unleash a powerful non-element physical attack. Power +5."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    65:  {
        ID: 65,
        AlbumNum: 65,
        CardImage: "65_Xemnas.png",
        RenderImage: "65_Xemnas_Render.png",
        Name: "Xemnas",
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
            Name: "Rosea Arcanum",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 38,
            MaxPower: 78,
            Effect: "Consumes 10% HP to unleash a powerful non-element physical attack. Power +5."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    66:  {
        ID: 66,
        AlbumNum: 66,
        CardImage: "66_Saix.png",
        RenderImage: "66_Saix_Render.png",
        Name: "Saïx",
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
            Name: "Dark Break",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 45,
            MaxPower: 85,
            Effect: "Exchanges Defense for a powerful non-element attack."
        },
        SubAbility:    {
            Name: "Attack Boost+",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    67:  {
        ID: 67,
        AlbumNum: 67,
        CardImage: "67_King_Mickey_B.png",
        RenderImage: "67_King_Mickey_B_Render.png",
        Name: "King Mickey B",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Pulsing Flame",
            AttackType: "Staff",
            Element: "Water",
            BasePower: 40,
            MaxPower: 80,
            Effect: "A powerful water-element magic attack."
        },
        SubAbility:    {
            Name: "Cure",
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
        }
    },
    68:  {
        ID: 68,
        AlbumNum: 68,
        CardImage: "68_KH_III_Sora.png",
        RenderImage: "68_KH_III_Sora_Render.png",
        Name: "KH III Sora",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Tornado",
            AttackType: "Staff",
            Element: "Wind",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful wind-element magic attack."
        },
        SubAbility:    {
            Name: "Cure II",
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
        }
    },
    69:  {
        ID: 69,
        AlbumNum: 69,
        CardImage: "69_KH_III_Riku.png",
        RenderImage: "69_KH_III_Riku_Render.png",
        Name: "KH III Riku",
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
            Name: "Blazing End",
            AttackType: "Sword",
            Element: "Fire",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful fire-element physical attack."
        },
        SubAbility:    {
            Name: "Defense Sap 3",
            Effect: "Target's Defense -3 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            EnemyBuffs:  {
                DebuffDefense:   {
                    Type: "General",
                    BuffCount: 3,
                    Duration: 10
                }
            }
        }
    },
    70:  {
        ID: 70,
        AlbumNum: 70,
        CardImage: "70_KH_III_Kairi.png",
        RenderImage: "70_KH_III_Kairi_Render.png",
        Name: "KH III Kairi",
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
            BuffCount: 2
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Magic",
            BuffCount: 2
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic Resist",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Radiant Glory",
            AttackType: "Sword",
            Element: "Light",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful light-element physical attack."
        },
        SubAbility:    {
            Name: "Gauge Boost",
            Effect: "Fills the bonus gauge. Stacking Cards does not increase value.",
            SelfBuffs:  {
                FillsGauge: "Yes"
            }
        }
    },
    71:  {
        ID: 71,
        AlbumNum: 71,
        CardImage: "71_Vanitas.png",
        RenderImage: "71_Vanitas_Render.png",
        Name: "Vanitas",
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
            Name: "Spinning Shadows",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 45,
            MaxPower: 90,
            Effect: "A powerful non-element physical attack that has a chance of inflicting paralysis.",
            EnemyBuffs:  {
                InflictsStatus: "Paralysis"
            }
        },
        SubAbility:    {
            Name: "Defense Sap 3",
            Effect: "Target's Defense -3 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            EnemyBuffs:  {
                DebuffDefense:   {
                    Type: "General",
                    BuffCount: 3,
                    Duration: 10
                }
            }
        }
    },
    72:  {
        ID: 72,
        AlbumNum: 72,
        CardImage: "72_Yuffie.png",
        RenderImage: "72_Yuffie_Render.png",
        Name: "Yuffie",
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
            Name: "Icicle Spear",
            AttackType: "Sword",
            Element: "Water",
            BasePower: 20,
            MaxPower: 54,
            Effect: "A water-element physical attack."
        }
    },
    73:  {
        ID: 73,
        AlbumNum: 73,
        CardImage: "73_Monstro.png",
        RenderImage: "73_Monstro_Render.png",
        Name: "Monstro",
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
            Name: "Blizzard",
            AttackType: "Staff",
            Element: "Water",
            BasePower: 25,
            MaxPower: 45,
            Effect: "A water-element magic attack."
        }
    },
    74:  {
        ID: 74,
        AlbumNum: 74,
        CardImage: "74_Hades.png",
        RenderImage: "74_Hades_Render.png",
        Name: "Hades",
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
            Name: "Ultimate Blaze",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 15,
            MaxPower: 50,
            Effect: "Consumes 50% HP to unleash a powerful fire-element magic attack. Power +15."
        }
    },
    75:  {
        ID: 75,
        AlbumNum: 75,
        CardImage: "75_Potion_II.png",
        RenderImage: "75_Potion_II_Render.png",
        Name: "Potion II",
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
            Name: "Potion II",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 0,
            MaxPower: 0,
            Effect: "Restores 80 HP. Stacking Cards does not increase value.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Fixed",
                    Amount: 80
                }
            }
        },
        SubAbility:    {
            Name: "Potion",
            Effect: "Restores 50 HP. Stacking Cards does not increase value.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Fixed",
                    Amount: 50
                }
            }
        }
    },
    76:  {
        ID: 76,
        AlbumNum: 76,
        CardImage: "76_Genie_Jafar.png",
        RenderImage: "76_Genie_Jafar_Render.png",
        Name: "Genie Jafar",
        DirectionType: "Dark",
        ColorType: "Green",
        AttackType: "Shield",
        Passive1:   {
            ReqCount: 1,
            BuffType: "HP",
            BuffCount: 1
        },
        Passive2:   {
            ReqCount: 3,
            BuffType: "Magic",
            BuffCount: 3
        },
        Passive3:   {
            ReqCount: 5,
            BuffType: "Defense",
            BuffCount: 3
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Strength",
            BuffCount: 3
        },
        MainAbility:    {
            Name: "Absorption",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 50,
            MaxPower: 50,
            Effect: "Absorbs 50 HP. Stacking Cards does not increase value.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Fixed",
                    Amount: 50
                }
            }
        }
    },
    77:  {
        ID: 77,
        AlbumNum: 77,
        CardImage: "77_Festive_Roxas.png",
        RenderImage: "77_Festive_Roxas_Render.png",
        Name: "Festive Roxas",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Radiant Star",
            AttackType: "Staff",
            Element: "Light",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful light-element magic attack."
        },
        SubAbility:    {
            Name: "Magic DEF Sap 3",
            Effect: "Target's Magic Resist -3 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            EnemyBuffs:  {
                DebuffMagicResist:   {
                    Type: "General",
                    BuffCount: 3,
                    Duration: 10
                }
            }
        }
    },
    78:  {
        ID: 78,
        AlbumNum: 78,
        CardImage: "78_Ansem.png",
        RenderImage: "78_Ansem_Render.png",
        Name: "Ansem",
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
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Dark Fire Raid",
            AttackType: "Sword",
            Element: "Fire",
            BasePower: 15,
            MaxPower: 45,
            Effect: "A fire-element physical attack."
        }
    },
    79:  {
        ID: 79,
        AlbumNum: 79,
        CardImage: "79_Key_Art_%235.png",
        RenderImage: "79_Key_Art_%235_Render.png",
        Name: "Key Art #5",
        DirectionType: "Light",
        ColorType: "Red",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Thundaga",
            AttackType: "Staff",
            Element: "Lightning",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful lightning-element magic attack."
        },
        SubAbility:    {
            Name: "Poison",
            Effect: "Low chance to inflict poison.",
            EnemyBuffs:  {
                InflictsStatus: "Poison"
            }
        }
    },
    80:  {
        ID: 80,
        AlbumNum: 80,
        CardImage: "80_Key_Art_%236.png",
        RenderImage: "80_Key_Art_%236_Render.png",
        Name: "Key Art #6",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Firaga",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful fire-element magic attack."
        },
        SubAbility:    {
            Name: "Paralysis",
            Effect: "Low chance to inflict paralysis.",
            EnemyBuffs:  {
                InflictsStatus: "Paralysis"
            }
        }
    },
    81:  {
        ID: 81,
        AlbumNum: 81,
        CardImage: "81_Key_Art_%237.png",
        RenderImage: "81_Key_Art_%237_Render.png",
        Name: "Key Art #7",
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
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Black Hole",
            AttackType: "Sword",
            Element: "Water",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful water-element physical attack."
        },
        SubAbility:    {
            Name: "Sleep",
            Effect: "Low chance to inflict sleep.",
            EnemyBuffs:  {
                InflictsStatus: "Sleep"
            }
        }
    },
    82:  {
        ID: 82,
        AlbumNum: 82,
        CardImage: "82_Merlin.png",
        RenderImage: "82_Merlin_Render.png",
        Name: "Merlin",
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
            Name: "Cure",
            AttackType: "Shield",
            Element: "Neutral",
            BasePower: 15,
            MaxPower: 50,
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
        },
        SubAbility:    {
            Name: "Cure",
            Effect: "Restores HP. Amount restored is based on Magic.",
            SelfBuffs:  {
                HPRecovery: {
                    Type: "Magic"
                }
            }
        }
    },
    83:  {
        ID: 83,
        AlbumNum: 83,
        CardImage: "83_Yuna.png",
        RenderImage: "83_Yuna_Render.png",
        Name: "Yuna",
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
            Name: "Fire",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 30,
            MaxPower: 60,
            Effect: "A fire-element magic attack."
        }
    },
    84:  {
        ID: 84,
        AlbumNum: 84,
        CardImage: "84_Pete.png",
        RenderImage: "84_Pete_Render.png",
        Name: "Pete",
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
            Name: "Dark Fire Raid",
            AttackType: "Sword",
            Element: "Fire",
            BasePower: 30,
            MaxPower: 65,
            Effect: "A powerful fire-element physical attack."
        }
    },
    85:  {
        ID: 85,
        AlbumNum: 85,
        CardImage: "85_Master_Xehanort.png",
        RenderImage: "85_Master_Xehanort_Render.png",
        Name: "Master Xehanort",
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
            BuffType: "Magic",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Magic",
            BuffCount: 2
        },
        MainAbility:    {
            Name: "Firaga",
            AttackType: "Staff",
            Element: "Fire",
            BasePower: 50,
            MaxPower: 100,
            Effect: "A powerful fire-element magic attack."
        },
        SubAbility:    {
            Name: "Magic Boost 2",
            Effect: "Magic +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffMagic:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    86:  {
        ID: 86,
        AlbumNum: 86,
        CardImage: "86_Sora_&_Riku.png",
        RenderImage: "86_Sora_&_Riku_Render.png",
        Name: "Sora & Riku",
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
            Name: "Radiant Glory",
            AttackType: "Sword",
            Element: "Light",
            BasePower: 60,
            MaxPower: 110,
            Effect: "A powerful light-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost 2",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
    87:  {
        ID: 87,
        AlbumNum: 87,
        CardImage: "87_KH_III_King_Mickey.png",
        RenderImage: "87_KH_III_King_Mickey_Render.png",
        Name: "KH III King Mickey",
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
            BuffType: "Strength",
            BuffCount: 1
        },
        Passive4:   {
            ReqCount: 10,
            BuffType: "Defense",
            BuffCount: 1
        },
        MainAbility:    {
            Name: "Storm Dance",
            AttackType: "Sword",
            Element: "Wind",
            BasePower: 20,
            MaxPower: 50,
            Effect: "A powerful wind-element physical attack."
        }
    },
    88:  {
        ID: 88,
        AlbumNum: 88,
        CardImage: "88_Key_Art_%238.png",
        RenderImage: "88_Key_Art_%238_Render.png",
        Name: "Key Art #8",
        DirectionType: "Light",
        ColorType: "Blue",
        AttackType: "Sword",
        MainAbility:    {
            Name: "Extreme Arcana",
            AttackType: "Sword",
            Element: "Neutral",
            BasePower: 60,
            MaxPower: 120,
            Effect: "A powerful non-element physical attack."
        },
        SubAbility:    {
            Name: "Attack Boost 2",
            Effect: "Strength +2 for 10s. Stacking Cards does not increase value. Can be applied more than once.",
            SelfBuffs:  {
                BuffStrength:   {
                    Type: "General",
                    BuffCount: 2,
                    Duration: 10
                }
            }
        }
    },
};