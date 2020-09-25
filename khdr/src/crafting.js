var currAccessoryArray = [];
var summedBP = 0;
var summedMaterials = [];
var currentButton = 0;

function loadPage()   {
    for(var p = 1; p < Object.keys(accessoryDatabase).length + 1; p++) {
        currAccessoryArray[p] = p;
    }

    for(var p = 1; p < Object.keys(materialDatabase).length + 1; p++) {
        summedMaterials[p] = 0;
    }

    loadLeftAccessory();
    initEnemy();
}

function initEnemy()    {
    for(var p = 1; p < Object.keys(enemyDatabase).length + 1; p++) {
        // Preload
        new Image().src = "./images/enemies/" + enemyDatabase[p].Image;
    }
}

function switchLeftSide(value)  {
    if(value == "toMaterial")   {
        var accessoryButton = document.getElementById("leftAccessoryID");
        var materialButton = document.getElementById("leftMaterialID");

        accessoryButton.src = "./images/ui/crafting_AccessoryOff.png";
        materialButton.src = "./images/ui/crafting_MaterialOn.png";

        loadLeftMaterial();
    }
    else if (value == "toAccessory")    {
        var accessoryButton = document.getElementById("leftAccessoryID");
        var materialButton = document.getElementById("leftMaterialID");

        accessoryButton.src = "./images/ui/crafting_AccessoryOn.png";
        materialButton.src = "./images/ui/crafting_MaterialOff.png";

        loadLeftAccessory();
    }
}

function loadLeftMaterial() {
    var leftSideContainer = document.getElementById("leftSide");

    leftSideContainer.innerHTML = "";

    for(var i = Object.keys(materialDatabase).length; i > 0; i--)  {
        var accessoryBaseDiv = document.createElement('div');
        accessoryBaseDiv.setAttribute("onclick", "popupMaterial('" + i + "');");
        accessoryBaseDiv.style = "cursor: pointer; display: inline-block; position: relative;"
        
        var accessoryBaseIMG = document.createElement('img');
        accessoryBaseIMG.src = "./images/ui/accessoryButtonOff.png";
        accessoryBaseIMG.setAttribute("id", "accessoryBaseIMG" + i);
        accessoryBaseIMG.style = "width: 250px; position: relative; z-index: 10";
        accessoryBaseDiv.appendChild(accessoryBaseIMG);

        var accessoryName = document.createElement('span');
        accessoryName.style = "font-family: UI Font; position: absolute; color: white; font-size: 1.3em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); z-index: 15; text-align: left; left: 10%; top: 14.5%";
        accessoryName.appendChild(document.createTextNode(materialDatabase[i].Name));
        accessoryBaseDiv.appendChild(accessoryName);
        
        var accessoryIMG = document.createElement('img');
        accessoryIMG.src = "./images/assets/material/" + materialDatabase[i].Image;
        accessoryIMG.style = "width: 50px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 60%";
        accessoryBaseDiv.appendChild(accessoryIMG);

        leftSideContainer.appendChild(accessoryBaseDiv);
    }
}

function loadLeftAccessory()   {
    var leftSideContainer = document.getElementById("leftSide");

    leftSideContainer.innerHTML = "";

    for(var i = currAccessoryArray.length - 1; i > 0; i--)  {
        var accessoryBaseDiv = document.createElement('div');
        accessoryBaseDiv.setAttribute("onclick", "loadAccessory('" + i + "');");
        accessoryBaseDiv.style = "cursor: pointer; display: inline-block; position: relative;"
        
        var accessoryBaseIMG = document.createElement('img');
        accessoryBaseIMG.src = "./images/ui/accessoryButtonOff.png";
        accessoryBaseIMG.setAttribute("id", "accessoryBaseIMG" + i);
        accessoryBaseIMG.style = "width: 250px; position: relative; z-index: 10";
        accessoryBaseDiv.appendChild(accessoryBaseIMG);

        var accessoryName = document.createElement('span');
        accessoryName.style = "font-family: UI Font; position: absolute; color: white; font-size: 1.3em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); z-index: 15; text-align: left; left: 10%; top: 14.5%";
        accessoryName.appendChild(document.createTextNode(accessoryDatabase[i].Name));
        accessoryBaseDiv.appendChild(accessoryName);
        
        var accessoryIMG = document.createElement('img');
        accessoryIMG.src = "./images/assets/material/" + accessoryDatabase[i].Image;
        accessoryIMG.style = "width: 50px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 60%";
        accessoryBaseDiv.appendChild(accessoryIMG);

        if(accessoryDatabase[i].Rarity == 1)    {
            var accessoryRarity = document.createElement('img');
            accessoryRarity.src = "./images/ui/RarityStar.png";
            accessoryRarity.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity);
        }
        else if(accessoryDatabase[i].Rarity == 2)    {
            var accessoryRarity1 = document.createElement('img');
            accessoryRarity1.src = "./images/ui/RarityStar.png";
            accessoryRarity1.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 47%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity1);

            var accessoryRarity2 = document.createElement('img');
            accessoryRarity2.src = "./images/ui/RarityStar.png";
            accessoryRarity2.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 53%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity2);
        }
        else if(accessoryDatabase[i].Rarity == 3)    {
            var accessoryRarity1 = document.createElement('img');
            accessoryRarity1.src = "./images/ui/RarityStar.png";
            accessoryRarity1.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 45%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity1);

            var accessoryRarity2 = document.createElement('img');
            accessoryRarity2.src = "./images/ui/RarityStar.png";
            accessoryRarity2.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity2);

            var accessoryRarity3 = document.createElement('img');
            accessoryRarity3.src = "./images/ui/RarityStar.png";
            accessoryRarity3.style = "width: 20px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 55%; top: 78%";
            accessoryBaseDiv.appendChild(accessoryRarity3);
        }

        leftSideContainer.appendChild(accessoryBaseDiv);
    }
}

function loadAccessory(value)    {
    var rightSideContainer = document.getElementById("rightSide");

    rightSideContainer.innerHTML = "";

    var accessoryMat = 0;

    if(currentButton == 0) {
        var accessoryBaseButton = document.getElementById("accessoryBaseIMG" + value);
        accessoryBaseButton.src = "./images/ui/accessoryButtonOn.png"
        currentButton = value;
    }
    else {
        var accessoryBaseButtonOld = document.getElementById("accessoryBaseIMG" + currentButton);
        accessoryBaseButtonOld.src = "./images/ui/accessoryButtonOff.png";
        var accessoryBaseButton = document.getElementById("accessoryBaseIMG" + value);
        accessoryBaseButton.src = "./images/ui/accessoryButtonOn.png"
        currentButton = value;
    }


    var accessoryTitle = document.createElement('span');
    accessoryTitle.style = "display: inline-block; color: white; font-size: 3em; text-shadow: 1.5px 1.5px rgb(0, 0, 0); vertical-align: middle";
    accessoryTitle.appendChild(document.createTextNode(accessoryDatabase[value].Name));
    rightSideContainer.appendChild(accessoryTitle);
    var blankSpacer = document.createElement('br');
    rightSideContainer.appendChild(blankSpacer);

    var accessoryEffect = document.createElement('span');
    accessoryEffect.style = "display: inline-block; color: white; font-size: 1.75em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); vertical-align: middle";
    accessoryEffect.appendChild(document.createTextNode("Effect: " + accessoryDatabase[value].Effect.BuffType + " +" + accessoryDatabase[value].Effect.BuffCount));
    rightSideContainer.appendChild(accessoryEffect);

    var accessoryItemBox = document.createElement('img');
    accessoryItemBox.src = "./images/ui/itemBox.png";
    accessoryItemBox.style = "width: 100px; position: absolute; z-index: 10; transform: translate(-50%, -50%); left: 50%; top: 33%";
    rightSideContainer.appendChild(accessoryItemBox);

    var accessoryImage = document.createElement('img');
    accessoryImage.src = "./images/assets/material/" + accessoryDatabase[value].Image;
    accessoryImage.style = "width: 94px; position: absolute; z-index: 15; transform: translate(-50%, -50%); left: 50%; top: 33%";
    rightSideContainer.appendChild(accessoryImage);

    if(accessoryDatabase[value].Rarity == 1)    {
        var accessoryRarity = document.createElement('img');
        accessoryRarity.src = "./images/ui/RarityStar.png";
        accessoryRarity.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 42%";
        rightSideContainer.appendChild(accessoryRarity);
    }
    else if(accessoryDatabase[value].Rarity == 2)    {
        var accessoryRarity1 = document.createElement('img');
        accessoryRarity1.src = "./images/ui/RarityStar.png";
        accessoryRarity1.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 47%; top: 42%";
        rightSideContainer.appendChild(accessoryRarity1);

        var accessoryRarity2 = document.createElement('img');
        accessoryRarity2.src = "./images/ui/RarityStar.png";
        accessoryRarity2.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 53%; top: 42%";
        rightSideContainer.appendChild(accessoryRarity2);
    }
    else if(accessoryDatabase[value].Rarity == 3)    {
        var accessoryRarity1 = document.createElement('img');
        accessoryRarity1.src = "./images/ui/RarityStar.png";
        accessoryRarity1.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 45%; top: 42%";
        rightSideContainer.appendChild(accessoryRarity1);

        var accessoryRarity2 = document.createElement('img');
        accessoryRarity2.src = "./images/ui/RarityStar.png";
        accessoryRarity2.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 50%; top: 42%";
        rightSideContainer.appendChild(accessoryRarity2);

        var accessoryRarity3 = document.createElement('img');
        accessoryRarity3.src = "./images/ui/RarityStar.png";
        accessoryRarity3.style = "width: 30px; position: absolute; z-index: 20; transform: translate(-50%, -50%); left: 55%; top: 43%";
        rightSideContainer.appendChild(accessoryRarity3);
    }
    
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());

    var componentBPCost = document.createElement('span');
    componentBPCost.style = "display: inline-block; color: white; font-size: 1.5em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); vertical-align: middle";
    componentBPCost.setAttribute("id", "accessoryBPCostID");
    componentBPCost.appendChild(document.createTextNode("Costs " + accessoryDatabase[value].BPCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " BP to craft."));
    rightSideContainer.appendChild(componentBPCost);
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());

    var componentBreakerText = document.createElement('span');
    componentBreakerText.style = "display: inline-block; color: white; font-size: 1.75em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); vertical-align: middle";
    componentBreakerText.appendChild(document.createTextNode("Ingredients"));
    rightSideContainer.appendChild(componentBreakerText);

    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());

    var arrayIndex = ["Item1", "Item2", "Item3", "Item4", "Item5"];

    var accessoryMaterialList = document.createElement('div');
    accessoryMaterialList.setAttribute("id", "accessoryMaterialListID");

    for(var indexElement of arrayIndex) {
        if(accessoryDatabase[value].Components[indexElement] != undefined && accessoryDatabase[value].Components[indexElement].materialID != undefined)  {
            var materialBaseDiv = document.createElement('div');
            materialBaseDiv.setAttribute("onclick", "popupMaterial('" + accessoryDatabase[value].Components[indexElement].materialID + "');");
            materialBaseDiv.style = "cursor: pointer; display: inline-block; position: relative; margin: 2px"
            
            var accessoryBaseIMG = document.createElement('img');
            accessoryBaseIMG.src = "./images/ui/materialButton1.png";
            accessoryBaseIMG.style = "width: 300px; position: relative; z-index: 25";
            materialBaseDiv.appendChild(accessoryBaseIMG);
            
            var accessoryIMG = document.createElement('img');
            accessoryIMG.src = "./images/assets/material/" + materialDatabase[accessoryDatabase[value].Components[indexElement].materialID].Image;
            accessoryIMG.style = "width: 32px; position: absolute; z-index: 30; transform: translate(-50%, -50%); left: 6.1%; top: 52%";
            materialBaseDiv.appendChild(accessoryIMG);

            var materialTitle = document.createElement('span');
            materialTitle.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); left: 15%; top: 6.5%; text-align: left; z-index: 35";
            materialTitle.appendChild(document.createTextNode(materialDatabase[accessoryDatabase[value].Components[indexElement].materialID].Name));
            materialBaseDiv.appendChild(materialTitle);

            var materialQuantity = document.createElement('span');
            materialQuantity.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); right: 5%; top: 6.5%; text-align: right; z-index: 35";
            materialQuantity.appendChild(document.createTextNode("x" + accessoryDatabase[value].Components[indexElement].quantity));
            materialBaseDiv.appendChild(materialQuantity);
    
            accessoryMaterialList.appendChild(materialBaseDiv);
        }
        else if(accessoryDatabase[value].Components[indexElement] != undefined && accessoryDatabase[value].Components[indexElement].accessoryID != undefined)  {
            accessoryMat++;
            var materialBaseDiv = document.createElement('div');
            materialBaseDiv.setAttribute("onclick", "loadAccessory('" + accessoryDatabase[value].Components[indexElement].accessoryID + "');");
            materialBaseDiv.style = "cursor: pointer; display: inline-block; position: relative; margin: 2px"
            
            var accessoryBaseIMG = document.createElement('img');
            accessoryBaseIMG.src = "./images/ui/materialButton2.png";
            accessoryBaseIMG.style = "width: 300px; position: relative; z-index: 25";
            materialBaseDiv.appendChild(accessoryBaseIMG);
            
            var accessoryIMG = document.createElement('img');
            accessoryIMG.src = "./images/assets/material/" + accessoryDatabase[accessoryDatabase[value].Components[indexElement].accessoryID].Image;
            accessoryIMG.style = "width: 32px; position: absolute; z-index: 30; transform: translate(-50%, -50%); left: 6.1%; top: 52%";
            materialBaseDiv.appendChild(accessoryIMG);

            var materialTitle = document.createElement('span');
            materialTitle.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); left: 15%; top: 6.5%; text-align: left; z-index: 35";
            materialTitle.appendChild(document.createTextNode(accessoryDatabase[accessoryDatabase[value].Components[indexElement].accessoryID].Name));
            materialBaseDiv.appendChild(materialTitle);

            var materialQuantity = document.createElement('span');
            materialQuantity.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); right: 5%; top: 6.5%; text-align: right; z-index: 35";
            materialQuantity.appendChild(document.createTextNode("x" + accessoryDatabase[value].Components[indexElement].quantity));
            materialBaseDiv.appendChild(materialQuantity);
    
            accessoryMaterialList.appendChild(materialBaseDiv);
        }
    }

    rightSideContainer.appendChild(accessoryMaterialList);
    
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());

    if(accessoryMat != 0)   {
        var ingredientButton = document.createElement('img');
        ingredientButton.setAttribute("onclick", "addIngredients('" + value + "');");
        ingredientButton.setAttribute("id", "ingredientButtonID");
        ingredientButton.src = "./images/ui/crafting_IngredientSum.png";
        ingredientButton.style = "cursor: pointer; display: inline-block; position: relative; width: 150px"
        rightSideContainer.appendChild(ingredientButton);
    }
    
    rightSideContainer.appendChild(blankSpacer.cloneNode());
    rightSideContainer.appendChild(blankSpacer.cloneNode());
}



function addIngredients(value)  {

    var accessoryMaterialList = document.getElementById("accessoryMaterialListID");
    accessoryMaterialList.innerHTML = "";

    var buttonDisappear = document.getElementById("ingredientButtonID");
    buttonDisappear.style = "display: none";

    for(var p = 1; p < Object.keys(materialDatabase).length + 1; p++) {
        summedMaterials[p] = 0;
    }

    summedBP = 0;

    summedBP = summedBP + accessoryDatabase[value].BPCost;

    for(var entry of Object.keys(accessoryDatabase[value].Components))  {
        if(accessoryDatabase[value].Components[entry].accessoryID != undefined) {
            for(var i = 0; i < accessoryDatabase[value].Components[entry].quantity; i++)    {
                enterLoop(accessoryDatabase[value].Components[entry].accessoryID);
            }
        }
        else if(accessoryDatabase[value].Components[entry].materialID != undefined) {
            summedMaterials[accessoryDatabase[value].Components[entry].materialID] = summedMaterials[accessoryDatabase[value].Components[entry].materialID] + accessoryDatabase[value].Components[entry].quantity;
        }
    }

    var componentBPCost = document.getElementById("accessoryBPCostID");
    componentBPCost.setAttribute("id", "accessoryBPCostID");
    componentBPCost.innerHTML = "";
    componentBPCost.appendChild(document.createTextNode("Costs " + summedBP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " BP to craft."));

    for(var j = 1; j < summedMaterials.length + 1; j++) {

        if(summedMaterials[j] > 0)  {
            var materialBaseDiv = document.createElement('div');
            materialBaseDiv.setAttribute("onclick", "popupMaterial('" + j + "');");
            materialBaseDiv.style = "cursor: pointer; display: inline-block; position: relative; margin: 2px"
                    
            var accessoryBaseIMG = document.createElement('img');
            accessoryBaseIMG.src = "./images/ui/materialButton1.png";
            accessoryBaseIMG.style = "width: 300px; position: relative; z-index: 25";
            materialBaseDiv.appendChild(accessoryBaseIMG);
                    
            var accessoryIMG = document.createElement('img');
            accessoryIMG.src = "./images/assets/material/" + materialDatabase[j].Image;
            accessoryIMG.style = "width: 32px; position: absolute; z-index: 30; transform: translate(-50%, -50%); left: 6.1%; top: 52%";
            materialBaseDiv.appendChild(accessoryIMG);
        
            var materialTitle = document.createElement('span');
            materialTitle.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); left: 15%; top: 6.5%; text-align: left; z-index: 35";
            materialTitle.appendChild(document.createTextNode(materialDatabase[j].Name));
            materialBaseDiv.appendChild(materialTitle);
        
            var materialQuantity = document.createElement('span');
            materialQuantity.style = "font-family: UI Font; display: inline-block; position: absolute; color: white; font-size: 1.25em; text-shadow: 1.25px 1.25px rgb(0, 0, 0); right: 5%; top: 6.5%; text-align: right; z-index: 35";
            materialQuantity.appendChild(document.createTextNode("x" + summedMaterials[j]));
            materialBaseDiv.appendChild(materialQuantity);
            
            accessoryMaterialList.appendChild(materialBaseDiv);
        }
    }

}

function enterLoop(value)   {
    summedBP = summedBP + accessoryDatabase[value].BPCost;
    for(var entry of Object.keys(accessoryDatabase[value].Components))  {
        if(accessoryDatabase[value].Components[entry].accessoryID != undefined) {
            for(var i = 0; i < accessoryDatabase[value].Components[entry].quantity; i++)    {
                enterLoop(accessoryDatabase[value].Components[entry].accessoryID);
            }
        }
        else if(accessoryDatabase[value].Components[entry].materialID != undefined) {
            summedMaterials[accessoryDatabase[value].Components[entry].materialID] = summedMaterials[accessoryDatabase[value].Components[entry].materialID] + accessoryDatabase[value].Components[entry].quantity;
        }
    }
}



function popupMaterial(value)    {
    var popupDiv = document.getElementById("materialPopup");
    popupDiv.innerHTML = "";

    var blankSpacer = document.createElement('br');
    popupDiv.appendChild(blankSpacer);

    var materialTitle = document.createElement('span');
    materialTitle.style = "display: inline-block; color: white; font-size: 2em; text-shadow: 2px 2px rgb(0, 0, 0); vertical-align: middle";
    materialTitle.appendChild(document.createTextNode(materialDatabase[value].Name));
    popupDiv.appendChild(materialTitle);
    
    popupDiv.appendChild(blankSpacer.cloneNode());

    var materialDescription = document.createElement('span');
    materialDescription.style = "display: inline-block; position: relative; color: white; font-size: 1.75em; text-shadow: 1.75px 1.75px rgb(0, 0, 0); vertical-align: middle";
    materialDescription.appendChild(document.createTextNode(materialDatabase[value].Text));
    popupDiv.appendChild(materialDescription);

    var materialItemBox = document.createElement('img');
    materialItemBox.src = "./images/ui/itemBox.png";
    materialItemBox.style = "width: 100px; position: absolute; z-index: 10; transform: translate(-50%, -50%); left: 50%; top: 33%";
    popupDiv.appendChild(materialItemBox);

    var accessoryImage = document.createElement('img');
    accessoryImage.src = "./images/assets/material/" + materialDatabase[value].Image;
    accessoryImage.style = "width: 100px; position: absolute; z-index: 15; transform: translate(-50%, -50%); left: 50%; top: 33%";
    popupDiv.appendChild(accessoryImage);
    
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());

    var materialEnemyHeader = document.createElement('span');
    materialEnemyHeader.style = "display: inline-block; color: white; font-size: 1.75em; text-shadow: 1.75px 1.75px rgb(0, 0, 0); vertical-align: middle";
    materialEnemyHeader.appendChild(document.createTextNode("Enemies that drop this material"));
    popupDiv.appendChild(materialEnemyHeader);

    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());
    
    for(var i = 1; i < Object.keys(enemyDatabase).length + 1; i++)   {
        if(enemyDatabase[i].Items != undefined) {
            for(var entry of enemyDatabase[i].Items)    {
                if(entry == value)  {
                    console.log(i)
                    var enemyMatch = document.createElement('img');
                    enemyMatch.src = "./images/enemies/" + enemyDatabase[i].Image;
                    enemyMatch.style = "max-height: 200px; max-width: 200px; margin: 5%; display: inline-block";
                    popupDiv.appendChild(enemyMatch);
                }
            }
        }
    }

    popupDiv.appendChild(blankSpacer.cloneNode());
    popupDiv.appendChild(blankSpacer.cloneNode());

    $('#materialPopup').fadeToggle(200);
    $('#darkOverlay').fadeToggle(200);
}

$(document).mouseup(function (e) {
    var container1 = $("#materialPopup");
    var container2 = $("#darkOverlay");

    if (!container1.is(e.target)
        && container1.has(e.target).length === 0)
    {
        container1.fadeOut(200);
        container2.fadeOut(200);
    }
});

var accessoryDatabase = {
    1:  {
        Name: "Badge",
        NameJP: "バッジ",
        Rarity: 1,
        Image: "Dark_Material_601.png",
        Effect: {
            BuffType: "HP",
            BuffCount: 2
        },
        Components: {
            Item1:  {
                materialID: 1,
                quantity: 5
            },
            Item2:  {
                materialID: 2,
                quantity: 5
            }
        },
        BPCost: 5000
    },
    2:  {
        Name: "Ring",
        NameJP: "リング",
        Rarity: 1,
        Image: "Dark_Material_102.png",
        Effect: {
            BuffType: "Strength",
            BuffCount: 1
        },
        Components: {
            Item1:  {
                materialID: 3,
                quantity: 3
            },
            Item2:  {
                materialID: 4,
                quantity: 1
            },
            Item3:  {
                materialID: 5,
                quantity: 5
            },
            Item4:  {
                materialID: 6,
                quantity: 5
            },
            Item5:  {
                accessoryID: 1,
                quantity: 2
            }
        },
        BPCost: 25000
    },
    3:  {
        Name: "Necklace",
        NameJP: "ネックレス",
        Rarity: 1,
        Image: "Dark_Material_302.png",
        Effect: {
            BuffType: "Defense",
            BuffCount: 1
        },
        Components: {
            Item1:  {
                materialID: 7,
                quantity: 3
            },
            Item2:  {
                materialID: 4,
                quantity: 1
            },
            Item3:  {
                materialID: 8,
                quantity: 5
            },
            Item4:  {
                materialID: 9,
                quantity: 5
            },
            Item5:  {
                accessoryID: 1,
                quantity: 2
            }
        },
        BPCost: 25000
    },
    4:  {
        Name: "Earring",
        NameJP: "ピアス",
        Rarity: 1,
        Image: "Dark_Material_203.png",
        Effect: {
            BuffType: "Magic",
            BuffCount: 1
        },
        Components: {
            Item1:  {
                materialID: 10,
                quantity: 3
            },
            Item2:  {
                materialID: 11,
                quantity: 1
            },
            Item3:  {
                materialID: 5,
                quantity: 5
            },
            Item4:  {
                materialID: 12,
                quantity: 5
            },
            Item5:  {
                accessoryID: 1,
                quantity: 2
            }
        },
        BPCost: 25000
    },
    5:  {
        Name: "Chain",
        NameJP: "チェーン",
        Rarity: 1,
        Image: "Dark_Material_403.png",
        Effect: {
            BuffType: "Magic Resist",
            BuffCount: 1
        },
        Components: {
            Item1:  {
                materialID: 13,
                quantity: 3
            },
            Item2:  {
                materialID: 11,
                quantity: 1
            },
            Item3:  {
                materialID: 6,
                quantity: 5
            },
            Item4:  {
                materialID: 9,
                quantity: 5
            },
            Item5:  {
                accessoryID: 1,
                quantity: 2
            }
        },
        BPCost: 25000
    },
    6:  {
        Name: "Badge II",
        NameJP: "バッジII",
        Rarity: 1,
        Image: "Dark_Material_601.png",
        Effect: {
            BuffType: "HP",
            BuffCount: 3
        },
        Components: {
            Item1:  {
                accessoryID: 1,
                quantity: 3
            },
            Item2:  {
                materialID: 1,
                quantity: 3
            },
            Item3:  {
                materialID: 2,
                quantity: 3
            }
        },
        BPCost: 10000
    },
    7:  {
        Name: "Ring II",
        NameJP: "リングII",
        Rarity: 1,
        Image: "Dark_Material_102.png",
        Effect: {
            BuffType: "Strength",
            BuffCount: 2
        },
        Components: {
            Item1:  {
                accessoryID: 2,
                quantity: 3
            },
            Item2:  {
                materialID: 3,
                quantity: 3
            },
            Item3:  {
                materialID: 4,
                quantity: 2
            }
        },
        BPCost: 50000
    },
    8:  {
        Name: "Necklace II",
        NameJP: "ネックレスII",
        Rarity: 1,
        Image: "Dark_Material_302.png",
        Effect: {
            BuffType: "Defense",
            BuffCount: 2
        },
        Components: {
            Item1:  {
                accessoryID: 3,
                quantity: 3
            },
            Item2:  {
                materialID: 7,
                quantity: 3
            },
            Item3:  {
                materialID: 4,
                quantity: 2
            },
        },
        BPCost: 50000
    },
    9:  {
        Name: "Earring II",
        NameJP: "ピアスII",
        Rarity: 1,
        Image: "Dark_Material_203.png",
        Effect: {
            BuffType: "Magic",
            BuffCount: 2
        },
        Components: {
            Item1:  {
                accessoryID: 4,
                quantity: 3
            },
            Item2:  {
                materialID: 10,
                quantity: 3
            },
            Item3:  {
                materialID: 11,
                quantity: 2
            }
        },
        BPCost: 50000
    },
    10:  {
        Name: "Chain II",
        NameJP: "チェーンII",
        Rarity: 1,
        Image: "Dark_Material_403.png",
        Effect: {
            BuffType: "Magic Resist",
            BuffCount: 2
        },
        Components: {
            Item1:  {
                accessoryID: 5,
                quantity: 3
            },
            Item2:  {
                materialID: 13,
                quantity: 3
            },
            Item3:  {
                materialID: 11,
                quantity: 2
            }
        },
        BPCost: 50000
    },
    11:  {
        Name: "Badge III",
        NameJP: "バッジIII",
        Rarity: 1,
        Image: "Dark_Material_601.png",
        Effect: {
            BuffType: "HP",
            BuffCount: 5
        },
        Components: {
            Item1:  {
                accessoryID: 6,
                quantity: 5
            },
            Item2:  {
                materialID: 1,
                quantity: 10
            },
            Item3:  {
                materialID: 2,
                quantity: 10
            }
        },
        BPCost: 80000
    },
    12:  {
        Name: "Ring III",
        NameJP: "リングIII",
        Rarity: 1,
        Image: "Dark_Material_102.png",
        Effect: {
            BuffType: "Strength",
            BuffCount: 3
        },
        Components: {
            Item1:  {
                accessoryID: 7,
                quantity: 5
            },
            Item2:  {
                materialID: 3,
                quantity: 10
            },
            Item3:  {
                materialID: 4,
                quantity: 2
            }
        },
        BPCost: 100000
    },
    13:  {
        Name: "Necklace III",
        NameJP: "ネックレスIII",
        Rarity: 1,
        Image: "Dark_Material_302.png",
        Effect: {
            BuffType: "Defense",
            BuffCount: 3
        },
        Components: {
            Item1:  {
                accessoryID: 8,
                quantity: 5
            },
            Item2:  {
                materialID: 7,
                quantity: 10
            },
            Item3:  {
                materialID: 4,
                quantity: 2
            },
        },
        BPCost: 100000
    },
    14:  {
        Name: "Earring III",
        NameJP: "ピアスIII",
        Rarity: 1,
        Image: "Dark_Material_203.png",
        Effect: {
            BuffType: "Magic",
            BuffCount: 3
        },
        Components: {
            Item1:  {
                accessoryID: 9,
                quantity: 5
            },
            Item2:  {
                materialID: 10,
                quantity: 10
            },
            Item3:  {
                materialID: 11,
                quantity: 2
            }
        },
        BPCost: 100000
    },
    15:  {
        Name: "Chain III",
        NameJP: "チェーンIII",
        Rarity: 1,
        Image: "Dark_Material_403.png",
        Effect: {
            BuffType: "Magic Resist",
            BuffCount: 3
        },
        Components: {
            Item1:  {
                accessoryID: 10,
                quantity: 5
            },
            Item2:  {
                materialID: 13,
                quantity: 10
            },
            Item3:  {
                materialID: 11,
                quantity: 2
            }
        },
        BPCost: 100000
    },
}






var materialDatabase = {
    1:  {
        Name: "Soothing Shard",
        NameJP: "うるおいのかけら",
        Image: "Dark_Material_1.png",
        Text: "A gem fragment filled with brightness."
    },
    2:  {
        Name: "Starry Sand",
        NameJP: "星のかたちの砂",
        Image: "Dark_Material_1.png",
        Text: "A bag of rare star-shaped sand."
    },
    3:  {
        Name: "Pulsing Shard",
        NameJP: "力のかけら",
        Image: "Dark_Material_1.png",
        Text: "A gem fragment filled with power."
    },
    4:  {
        Name: "Iron Ore",
        NameJP: "鉄の原石",
        Image: "Dark_Material_1.png",
        Text: "Ore from an iron deposit."
    },
    5:  {
        Name: "Burnt Coal",
        NameJP: "燃えつきた炭",
        Image: "Dark_Material_1.png",
        Text: "A pile of charred coal briquettes."
    },
    6:  {
        Name: "Strange Leaf",
        NameJP: "おかしな葉っぱ",
        Image: "Dark_Material_3.png",
        Text: "A leaf from a wild plant that grows in the forest."
    },
    7:  {
        Name: "Wellspring Shard",
        NameJP: "みなぎるかけら",
        Image: "Dark_Material_1.png",
        Text: "A gem fragment filled with energy."
    },
    8:  {
        Name: "Scorching Sand",
        NameJP: "熱をおびた砂",
        Image: "Dark_Material_1.png",
        Text: "A bag of piping hot sand."
    },
    9:  {
        Name: "Strange Bulb",
        NameJP: "おかしな球根",
        Image: "Dark_Material_3.png",
        Text: "A bulb from a wild plant that grows in the forest."
    },
    10:  {
        Name: "Hungry Shard",
        NameJP: "満たされるかけら",
        Image: "Dark_Material_1.png",
        Text: "A gem fragment filled with contentment."
    },
    11:  {
        Name: "Copper Ore",
        NameJP: "銅の原石",
        Image: "Dark_Material_1.png",
        Text: "Ore from a copper deposit."
    },
    12:  {
        Name: "White Flower Dew",
        NameJP: "白い花のつゆ",
        Image: "Dark_Material_2.png",
        Text: "A phial of morning dew gathered from the petals of a white flower."
    },
    13:  {
        Name: "Twilight Shard",
        NameJP: "たそがれのかけら",
        Image: "Dark_Material_1.png",
        Text: "A gem fragment filled with twilight."
    },
}






var enemyDatabase = {
    1: {
        Name: "Shadow",
        Image: "1_Shadow.png",
        Items:  [
            1,
            7,
            13
        ]
    },
    2: {
        Name: "Fat Bandit",
        Image: "2_Fat_Bandit.png",
        Items:  [
            8,
        ]
    },
    3: {
        Name: "Yellow Opera",
        Image: "3_Yellow_Opera.png"
    },
    4: {
        Name: "Red Nocturne",
        Image: "4_Red_Nocturne.png",
        Items:  [
            1,
            2
        ]
    },
    5: {
        Name: "Blue Rhapsody",
        Image: "5_Blue_Rhapsody.png"
    },
    6: {
        Name: "Soldier",
        Image: "6_Soldier.png",
        Items:  [
            2,
            10
        ]
    },
    7: {
        Name: "Large Body",
        Image: "7_Large_Body.png"
    },
    8: {
        Name: "Bandit",
        Image: "8_Bandit.png",
        Items:  [
            2,
        ]
    },
    9: {
        Name: "Air Soldier",
        Image: "9_Air_Soldier.png"
    },
    10: {
        Name: "Wizard",
        Image: "10_Wizard.png",
        Items:  [
            2,
        ]
    },
    11: {
        Name: "Possessor",
        Image: "11_Possessor.png",
        Items:  [
            3,
        ]
    },
    12: {
        Name: "Armored Knight",
        Image: "12_Armored_Knight.png",
        Items:  [
            10,
        ]
    },
    13: {
        Name: "Flower Rider",
        Image: "13_Flower_Rider.png",
        Items:  [
            6,
            10,
            13
        ]
    },
    14: {
        Name: "Large Armor",
        Image: "14_Large_Armor.png",
        Items:  [
            1,
            10,
        ]
    },
    15: {
        Name: "Armored Archer",
        Image: "15_Armored_Archer.png",
        Items:  [
            4,
            10
        ]
    },
    16: {
        Name: "Red Bandit",
        Image: "16_Red_Bandit.png",
        Items:  [
            8,
        ]
    },
    17: {
        Name: "Creeper Plant",
        Image: "17_Creeper_Plant.png",
        Items:  [
            2,
        ]
    },
    18: {
        Name: "Dire Plant",
        Image: "18_Dire_Plant.png",
        Items:  [
            6,
            13
        ]
    },
    19: {
        Name: "Fire Plant",
        Image: "19_Fire_Plant.png"
    },
    20: {
        Name: "Gift Shadow",
        Image: "20_Gift_Shadow.png",
        Items:  [
            1,
        ]
    },
    21: {
        Name: "Chomper Egg",
        Image: "21_Chomper_Egg.png",
        Items:  [
            2,
        ]
    },
    22: {
        Name: "Red Rose",
        Image: "22_Red_Rose.png",
        Items:  [
            9,
            12
        ]
    },
    23: {
        Name: "White Rose",
        Image: "23_White_Rose.png",
        Items:  [
            9,
        ]
    },
    24: {
        Name: "Morning Star",
        Image: "24_Morning_Star.png",
        Items:  [
            3,
            5,
        ]
    },
    25: {
        Name: "Eggcognito",
        Image: "25_Eggcognito.png"
    },
    26: {
        Name: "Gargoyle",
        Image: "26_Gargoyle.png",
        Items:  [
            11,
        ]
    },
    27: {
        Name: "High Wizard",
        Image: "27_High_Wizard.png",
        Items:  [
            3,
        ]
    },
    28: {
        Name: "Wyvern",
        Image: "28_Wyvern.png",
        Items:  [
            7,
        ]
    },
    29: {
        Name: "Invisible",
        Image: "29_Invisible.png",
        Items:  [
            2,
            13,
        ]
    },
    30: {
        Name: "Lance Soldier",
        Image: "30_Lance_Soldier.png"
    },
    31: {
        Name: "Aeroplane",
        Image: "31_Aeroplane.png",
        Items:  [
            1,
            2,
            3
        ]
    },
    32: {
        Name: "Ice Plant",
        Image: "32_Ice_Plant.png",
        Items:  [
            9,
            10
        ]
    },
    33: {
        Name: "Dark Plant",
        Image: "33_Dark_Plant.png",
        Items:  [
            9,
            11,
            12
        ]
    },
    34: {
        Name: "Powerwild",
        Image: "34_Powerwild.png"
    },
    35: {
        Name: "Nimble Bee",
        Image: "35_Nimble_Bee.png"
    },
    36: {
        Name: "Stinging Bee",
        Image: "36_Stinging_Bee.png"
    },
    37: {
        Name: "Mega-Shadow",
        Image: "37_Mega-Shadow.png",
        Items:  [
            2,
        ]
    },
    38: {
        Name: "Gold Tricholoma",
        Image: "38_Gold_Tricholoma.png"
    },
    39: {
        Name: "Emerald Sonata",
        Image: "39_Emerald_Sonata.png",
        Items:  [
            2,
            4
        ]
    },
    40: {
        Name: "Sparkler",
        Image: "40_Sparkler.png"
    },
    41: {
        Name: "Poison Archer",
        Image: "41_Poison_Archer.png"
    },
    42: {
        Name: "Paralysis Archer",
        Image: "42_Paralysis_Archer.png",
        Items:  [
            2,
        ]
    },
    43: {
        Name: "Sleep Archer",
        Image: "43_Sleep_Archer.png",
        Items:  [
            4,
            10,
        ]
    },
    44: {
        Name: "Blitz Spear",
        Image: "44_Blitz_Spear.png"
    },
    45: {
        Name: "Chill Ripper",
        Image: "45_Chill_Ripper.png",
        Items:  [
            10,
            11,
        ]
    },
    46: {
        Name: "Heat Saber",
        Image: "46_Heat_Saber.png",
        Items:  [
            10,
        ]
    },
    47: {
        Name: "Pot Spider",
        Image: "47_Pot_Spider.png"
    },
    48: {
        Name: "Pot Scorpion",
        Image: "48_Pot_Scorpion.png"
    },
    49: {
        Name: "Pot Centipede",
        Image: "49_Pot_Centipede.png",
        Items:  [
            3,
        ]
    },
    50: {
        Name: "Defender",
        Image: "50_Defender.png"
    },
    51: {
        Name: "Flame Core",
        Image: "51_Flame_Core.png"
    },
    52: {
        Name: "Wicked Watermelon",
        Image: "52_Wicked_Watermelon.png"
    },
    53: {
        Name: "Huge Watermelon",
        Image: "53_Huge_Watermelon.png"
    },
    54: {
        Name: "Gummi Hammer",
        Image: "54_Gummi_Hammer.png"
    },
    55: {
        Name: "Fluttering",
        Image: "55_Fluttering.png"
    },
    56: {
        Name: "Ifrit",
        Image: "56_Ifrit.png"
    },
    57: {
        Name: "Ferry Reaper",
        Image: "57_Ferry_Reaper.png"
    },
    58: {
        Name: "Wight Knight",
        Image: "58_Wight_Knight.png"
    },
    59: {
        Name: "Darkball",
        Image: "59_Darkball.png"
    },
    60: {
        Name: "Polliwog",
        Image: "60_Polliwog.png"
    },
    61: {
        Name: "Tornado Step",
        Image: "61_Tornado_Step.png"
    },
    62: {
        Name: "Gigas Shadow",
        Image: "62_Gigas_Shadow.png",
        Items:  [
            13,
        ]
    },
    63: {
        Name: "Icy Beast",
        Image: "63_Icy_Beast.png",
        Items:  [
            2,
        ]
    },
    64: {
        Name: "Ogre",
        Image: "64_Ogre.png",
        Items:  [
            1,
            2
        ]
    },
}




