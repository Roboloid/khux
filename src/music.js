var globalTrackNumber = -1;

function playMusic(value) {
	value = value.replace(/\\/g, "");
	var music = "./music/" + value;
	var musicName = value.replace(/_/g, " ");
	musicName = musicName.substring(0, musicName.length - 4);
	document.getElementById("currentMusic").src = music;
	document.getElementById("musicPlayer").load();
	document.getElementById("musicPlayer").play();
	musicName = musicName.replace(/\\/g, "");
	document.getElementById("nowPlayingText").innerHTML = "Now playing 『" + musicName + "』";
	
	value = value.replace(/\'/g, "\\\'");
	globalTrackNumber = parseInt(getKeyByValue(musicArray, value));
}

function loopMusic() {
	var comparator = document.getElementById("looper").src.substring(document.getElementById("looper").src.length - 5, document.getElementById("looper").src.length);
	if(comparator == "n.png")  {
		document.getElementById("looper").src = "./images/icon/loopButton_Off.png";
		document.getElementById("musicPlayer").loop = false;
		document.getElementById("musicPlayer").load();
	}
	else  {
		document.getElementById("looper").src = "./images/icon/loopButton_On.png";
		document.getElementById("musicPlayer").loop = true;
		document.getElementById("musicPlayer").load();
	}
}

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

function skipTrack(value) {
	if(document.getElementById("currentMusic").src == "") {
		// Do nothing
	}
	else  {
		if(value == "RW") {
			if(globalTrackNumber <= 1)  {
				globalTrackNumber = 115;
				playMusic(musicArray[globalTrackNumber]);
			}
			else{
				globalTrackNumber = globalTrackNumber - 1;
				playMusic(musicArray[globalTrackNumber]);
			}
		}
		else if(value == "FF")  {
			if(globalTrackNumber >= 115)  {
				globalTrackNumber = 1;
				playMusic(musicArray[globalTrackNumber]);
			}
			else{
				globalTrackNumber = globalTrackNumber + 1;
				playMusic(musicArray[globalTrackNumber]);
			}
		}
	}
}

function pageLoad()	{
	if(getParameterByName("voice") == "true")   {
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toMusic.png";
		generateVoice();
    }
	else	{
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toVoice.png";
		generateMusic();
	}
}

function switchSound() {
	var comparator = document.getElementById("soundButtonSwitcher").src;
	if(comparator.includes("toVoice"))  {
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toMusic.png";
		generateVoice();
	}
	else  {
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toVoice.png";
		generateMusic();
	}
  }

function generateMusic()	{
	var mainDiv = document.getElementById("mainDiv");
	mainDiv.innerHTML = "";

	var musicBoxDiv = document.createElement('div');
	musicBoxDiv.className = "musicTable";
	musicBoxDiv.style = "align-self:center";

	var tableElement = document.createElement('table');

    var tableBodyElement = document.createElement('tbody');
      
    for(var i = 1; i < Object.keys(musicArray).length + 1; i++)   {
		
        var trElement = document.createElement('tr');


        var tdElement1 = document.createElement('th');
		tdElement1.className = "musicEntry";
        tdElement1.style = "width: 50px";
		var playIMG = document.createElement('img');
		playIMG.src = "./images/icon/playButton.png";
		playIMG.setAttribute("onclick", "playMusic('" + musicArray[i] + "')");
		tdElement1.appendChild(playIMG);
        trElement.appendChild(tdElement1);

              
        var tdElement2 = document.createElement('th');
		tdElement2.className = "musicLabel";
        tdElement2.style = "width: 85%";
		var musicNameLabel = musicArray[i];
		musicNameLabel = musicNameLabel.replace(".mp3", "");
		musicNameLabel = musicNameLabel.replace(/_/g, " ");
		musicNameLabel = musicNameLabel.replace(/\\/g, "");
		tdElement2.appendChild(document.createTextNode(musicNameLabel));
        trElement.appendChild(tdElement2);


        var tdElement3 = document.createElement('th');
		tdElement3.className = "musicEntry";
        tdElement3.style = "width: 50px";
		var downloadIMG = document.createElement('img');
		downloadIMG.src = "./images/icon/downloadButton.png";
		downloadIMG.setAttribute("onclick", "window.open('./music/" + musicArray[i] + "')");
		tdElement3.appendChild(downloadIMG);
        trElement.appendChild(tdElement3);

        tableBodyElement.appendChild(trElement);
    }
    tableElement.appendChild(tableBodyElement);
	musicBoxDiv.appendChild(tableElement);
	mainDiv.appendChild(musicBoxDiv);
}

function generateVoice()	{
	var mainDiv = document.getElementById("mainDiv");
	mainDiv.innerHTML = "";

	var voiceDiv = document.createElement('div');
	voiceDiv.className = "resultsListClass";

	for(var i = Object.keys(voiceArray).length; i > 0; i--)   {

		var playIMG = document.createElement('img');
		var medalIMG = voiceArray[i];
		medalIMG = medalIMG.replace("_Voice.mp3", ".png");
		playIMG.className = "imgClass";
		playIMG.src = "./images/medals/en/" + medalIMG;
		playIMG.setAttribute("onclick", "playSound('" + voiceArray[i] + "')");

        voiceDiv.appendChild(playIMG);
    }
	mainDiv.appendChild(voiceDiv);
}

function playSound(value)	{
	var sound = new Audio("./voice/" + value);
	sound.volume = 0.7;
    sound.play();
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





var musicArray = {
	1: "(KHBC)_Case_of_the_Foretellers.mp3",
	2: "(KHBC)_Guiding_Key.mp3",
	3: "(KHBC)_The_Foretellers.mp3",
	4: "(KHUX)_A_Nameless_Planet.mp3",
	5: "(KHUX)_Before_The_Daylight.mp3",
	6: "(KHUX)_Clash_On_the_Big_Bridge.mp3",
	7: "(KHUX)_Classic_Kingdom.mp3",
	8: "(KHUX)_Dancing_Mad.mp3",
	9: "(KHUX)_Daybreak_Town_The_Heart_of_X.mp3",
	10: "(KHUX)_Dearly_Beloved_-Unchained_X_Version-.mp3",
	11: "(KHUX)_Dearly_Beloved_-Union_X_Version-.mp3",
	12: "(KHUX)_Defeat....mp3",
	13: "(KHUX)_Game_Central_Station.mp3",
	14: "(KHUX)_Gummi_Ship_Editor.mp3",
	15: "(KHUX)_Hand_in_Hand_-Union_X_Version-.mp3",
	16: "(KHUX)_Hero\\'s_Duty_Troopers.mp3",
	17: "(KHUX)_I\\'m_Gonna_Wreck_It!.mp3",
	18: "(KHUX)_Master_of_Masters.mp3",
	19: "(KHUX)_Mission_Complete!.mp3",
	20: "(KHUX)_Quest_Selection.mp3",
	21: "(KHUX)_The_Candy-Filled_Kingdom.mp3",
	22: "(KHUX)_The_Fastest_Racer.mp3",
	23: "(KHUX)_TWISTER_-UNION_X_MIX-.mp3",
	24: "(KHUX)_Wake Up,_World!.mp3",
	25: "(KHUX)_Welcome_to_Niceland.mp3",
	26: "(KHBBS)_Aqua.mp3",
	27: "(KHBBS)_Black_Power.mp3",
	28: "(KHBBS)_Castle_Escapade.mp3",
	29: "(KHBBS)_Drops_of_Poison.mp3",
	30: "(KHBBS)_Extreme_Encounters.mp3",
	31: "(KHBBS)_Go!_Go!_Rumble_Racer.mp3",
	32: "(KHBBS)_Innocent_Times.mp3",
	33: "(KHBBS)_Night_in_the_Dark_Dream.mp3",
	34: "(KHBBS)_Night_of_Tragedy.mp3",
	35: "(KHBBS)_Peaceful_Hearts.mp3",
	36: "(KHBBS)_Risky_Romp.mp3",
	37: "(KHBBS)_Tears_of_the_Light.mp3",
	38: "(KHBBS)_Terra.mp3",
	39: "(KHBBS)_The_Key.mp3",
	40: "(KHBBS)_The_Key_of_Light.mp3",
	41: "(KHBBS)_The_Rustling_Forest.mp3",
	42: "(KHBBS)_The_Secret_Whispers.mp3",
	43: "(KHBBS)_The_Silent_Forest.mp3",
	44: "(KHBBS)_Unbreakable_Chains.mp3",
	45: "(KHBBS)_Ventus.mp3",
	46: "(KH1)_Night_of_Fate.mp3",
	47: "(KH1)_Shrouding_Dark_Cloud.mp3",
	48: "(KH1.5)_Another_Side.mp3",
	49: "(KH1.5)_Arabian_Dream.mp3",
	50: "(KH1.5)_A_Day_in_Agrabah.mp3",
	51: "(KH1.5)_Blast_Away!_-Gummi_Ship_I-.mp3",
	52: "(KH1.5)_Dearly_Beloved.mp3",
	53: "(KH1.5)_Destiny\\'s_Force.mp3",
	54: "(KH1.5)_Destiny_Islands.mp3",
	55: "(KH1.5)_Kairi_(Piano).mp3",
	56: "(KH1.5)_Kairi_I.mp3",
	57: "(KH1.5)_Musique_pour_la_tristesse_de_Xion.mp3",
	58: "(KH1.5)_Musique_pour_la_tristesse_de_Xion_(Piano).mp3",
	59: "(KH1.5)_No_Time_to_Think.mp3",
	60: "(KH1.5)_Olympus_Coliseum.mp3",
	61: "(KH1.5)_Road_to_a_Hero.mp3",
	62: "(KH1.5)_Shrouding_Dark_Cloud.mp3",
	63: "(KH1.5)_Spooks_of_Halloween_Town.mp3",
	64: "(KH1.5)_Squirming_Evil.mp3",
	65: "(KH1.5)_Strange_Whispers.mp3",
	66: "(KH1.5)_The_Deep_End.mp3",
	67: "(KH1.5)_To_Our_Surprise.mp3",
	68: "(KH1.5)_Treasured_Memories.mp3",
	69: "(KH1.5)_Welcome_to_Wonderland.mp3",
	70: "(KHReCoM)_La_Pace.mp3",
	71: "(KHReCoM)_Namine.mp3",
	72: "(KHReCoM)_Scent_of_Silence.mp3",
	73: "(KH358)_Vector_to_the_Heavens.mp3",
	74: "(KH2)_Organization_XIII.mp3",
	75: "(KH2)_Rowdy_Rumble.mp3",
	76: "(KH2.5)_Apprehension.mp3",
	77: "(KH2.5)_A_Walk_in_Andante.mp3",
	78: "(KH2.5)_Battleship_Bravery.mp3",
	79: "(KH2.5)_Dance_of_the_Daring.mp3",
	80: "(KH2.5)_Dance_to_the_Death.mp3",
	81: "(KH2.5)_Darkness_of_the_Unknown.mp3",
	82: "(KH2.5)_Desire_for_All_That_is_Lost.mp3",
	83: "(KH2.5)_Dive_Into_the_Heart_-Destati-.mp3",
	84: "(KH2.5)_Fate_of_the_Unknown.mp3",
	85: "(KH2.5)_Fragments_of_Sorrow.mp3",
	86: "(KH2.5)_Friends_in_My_Heart.mp3",
	87: "(KH2.5)_Gearing_Up.mp3",
	88: "(KH2.5)_Hesitation.mp3",
	89: "(KH2.5)_Laughter_and_Merriment.mp3",
	90: "(KH2.5)_Lazy_Afternoons.mp3",
	91: "(KH2.5)_Missing_You.mp3",
	92: "(KH2.5)_One-Winged_Angel.mp3",
	93: "(KH2.5)_Riku.mp3",
	94: "(KH2.5)_Road_to_a_Hero.mp3",
	95: "(KH2.5)_Roxas.mp3",
	96: "(KH2.5)_Roxas_(Piano).mp3",
	97: "(KH2.5)_Sora.mp3",
	98: "(KH2.5)_The_Encounter.mp3",
	99: "(KH2.5)_The_Other_Promise.mp3",
	100: "(KH2.5)_The_Other_Promise_(Drammatica).mp3",
	101: "(KH2.5)_The_Underworld.mp3",
	102: "(KH2.5)_Villains_of_a_Sort.mp3",
	103: "(KH2.5)_Vim_and_Vigor.mp3",
	104: "(KH2.5)_Waltz_of_the_Damned.mp3",
	105: "(KH2.5)_What_Lies_Beneath.mp3",
	106: "(KH3D)_Dearly_Beloved.mp3",
	107: "(KH3D)_Dream_Eaters.mp3",
	108: "(KH3D)_Ever_After.mp3",
	109: "(KH3D)_Link_to_All.mp3",
	110: "(KH3D)_The_Dread_of_Night.mp3",
	111: "(KH3D)_The_Dream.mp3",
	112: "(KH3D)_The_Nightmare.mp3",
	113: "(KH3)_Eye_of_the_Storm.mp3",
	114: "(KH3)_Peaceful_Hearts.mp3",
	115: "(KH3)_Titanic_Clash.mp3"	
}

var voiceArray = {
	1: "448_6Star_Illustrated_Sora_A_Voice.mp3",
	2: "449_6Star_Illustrated_Riku_A_Voice.mp3",
	3: "460_6Star_Illustrated_Terra_A_Voice.mp3",
	4: "461_6Star_Illustrated_Ventus_Voice.mp3",
	5: "470_6Star_Illustrated_Aqua_A_Voice.mp3",
	6: "489_6Star_Illustrated_Ansem_Voice.mp3",
	7: "490_6Star_Boss_Marluxia_Voice.mp3",
	8: "513_6Star_Illustrated_Sephiroth_Voice.mp3",
	9: "523_6Star_Illustrated_Kairi_Voice.mp3",
	10: "533_6Star_Illustrated_King_Mickey_Voice.mp3",
	11: "549_6Star_Maleficent_A_Voice.mp3",
	12: "550_6Star_HD_Sora_Voice.mp3",
	13: "551_6Star_HD_Riku_Voice.mp3",
	14: "563_6Star_Illustrated_Xemnas_Voice.mp3",
	15: "564_6Star_Illustrated_Xion_Voice.mp3",
	16: "567_6Star_HD_Axel_Voice.mp3",
	17: "568_6Star_Casual_Roxas_Voice.mp3",
	18: "609_6Star_Illustrated_Sora_B_Voice.mp3",
	19: "616_6Star_Illustrated_Riku_B_Voice.mp3",
	20: "631_6Star_HD_Ursula_Voice.mp3",
	21: "639_6Star_HD_Roxas_Voice.mp3",
	22: "657_6Star_Dark_Riku_Voice.mp3",
	23: "660_6Star_Illustrated_KH_II_Kairi_Voice.mp3",
	24: "661_6Star_Illustrated_KH_II_Sora_Voice.mp3",
	25: "703_6Star_KH_II_Cloud_[EX]_Voice.mp3",
	26: "717_6Star_Axel_Art_[EX]_Voice.mp3",
	27: "720_6Star_SP_Vanitas_Voice.mp3",
	28: "739_6Star_Sora_Art_[EX]_Voice.mp3",
	29: "757_6Star_Sephiroth_[EX]_Voice.mp3",
	30: "767_6Star_Roxas_Art_[EX]_Voice.mp3",
	31: "775_6Star_Final_Boss_Xion_Voice.mp3",
	32: "776_6Star_HD_Xion_[EX]_Voice.mp3",
	33: "794_6Star_Riku_Art_[EX]_Voice.mp3",
	34: "795_6Star_Illustrated_Aqua_B_Voice.mp3",
	35: "796_6Star_Illustrated_Neku_Voice.mp3",
	36: "798_6Star_Illustrated_Kairi_[EX]_Voice.mp3",
	37: "800_6Star_Illustrated_KH_II_Sora_&_Riku_[EX]_Voice.mp3",
	38: "810_6Star_Illustrated_Marluxia_[EX]_Voice.mp3",
	39: "812_6Star_HD_Ira_[EX]_Voice.mp3",
	40: "813_6Star_HD_Invi_[EX]_Voice.mp3",
	41: "814_6Star_HD_Aced_[EX]_Voice.mp3",
	42: "815_6Star_HD_Gula_[EX]_Voice.mp3",
	43: "816_6Star_HD_Ava_[EX]_Voice.mp3",
	44: "819_6Star_Dual_Wield_Roxas_[EX]_Voice.mp3",
	45: "822_6Star_HD_Larxene_Voice.mp3",
	46: "826_6Star_358-2_Days_Black_Coat_Riku_Voice.mp3",
	47: "831_6Star_HD_King_Mickey_[EX]_Voice.mp3",
	48: "833_6Star_Illustrated_Xion_[EX]_Voice.mp3",
	49: "970_6Star_HD_Axel_[EX]_Voice.mp3",
	50: "972_6Star_HD_Sora_&_Kairi_[EX]_Voice.mp3",
	51: "976_6Star_HD_Terra_[EX]_Voice.mp3",
	52: "977_6Star_HD_Aqua_[EX]_Voice.mp3",
	53: "978_6Star_HD_Ventus_[EX]_Voice.mp3",
	54: "985_6Star_Illustrated_KH_Riku_[EX]_Voice.mp3",
	55: "991_6Star_Sephiroth_[EX+]_Voice.mp3",
	56: "992_6Star_KH_II_Cloud_[EX+]_Voice.mp3",
	57: "994_6Star_HD_Vanitas_[EX+]_Voice.mp3",
	58: "996_6Star_Vexen_[+]_Voice.mp3",
	59: "1004_6Star_Master_Xehanort_[EX+]_Voice.mp3",
	60: "1013_6Star_Lexaeus_[+]_Voice.mp3",
	61: "1463_6Star_Zexion_[+]_Voice.mp3",
	62: "1467_6Star_KH_II_Kairi_[EX+]_Voice.mp3",
	63: "1477_6Star_Xion_[EX+]_Voice.mp3",
	64: "1483_6Star_Saix_[+]_Voice.mp3",
	65: "1515_6Star_Axel_[+]_Voice.mp3",
	66: "1519_6Star_Namine_[EX+]_Voice.mp3",
	67: "1542_7Star_HD_Ava_[EX+]_Voice.mp3",
	68: "1545_7Star_HD_Ira_[EX+]_Voice.mp3",
	69: "1546_7Star_HD_Invi_[EX+]_Voice.mp3",
	70: "1547_6Star_Demyx_[+]_Voice.mp3",
	71: "1549_7Star_HD_Aced_[EX+]_Voice.mp3",
	72: "1550_7Star_HD_Gula_[EX+]_Voice.mp3",
	73: "1553_6Star_Xaldin_[+]_Voice.mp3",
	74: "1564_7Star_Supernova_-_Sephiroth_Voice.mp3",
	75: "1567_6Star_Luxord_[+]_Voice.mp3",
	76: "1584_6Star_Marluxia_[+]_Voice.mp3",
	77: "1586_6Star_Prime_-_HD_King_Mickey_Voice.mp3",
	78: "1591_7Star_Supernova_-_Riku_Replica_Voice.mp3",
	79: "1607_6Star_Larxene_[+]_Voice.mp3",
	80: "1615_7Star_Supernova_-_HD_Terra_Voice.mp3",
	81: "1616_7Star_Supernova_-_HD_Ventus_Voice.mp3",
	82: "1617_7Star_Supernova_-_HD_Aqua_Voice.mp3",
	83: "1624_6Star_Xemnas_[+]_Voice.mp3",
	84: "1668_6Star_Xigbar_[+]_Voice.mp3",
	85: "1692_6Star_Roxas_[+]_Voice.mp3",
	86: "1735_7Star_Supernova_-_KH_III_Roxas_Voice.mp3",
	87: "1740_7Star_SN_-_KH_III_Pirate_Sora_Voice.mp3",
	88: "1741_7Star_SN_-_KH_III_Kairi_B_Voice.mp3",
	89: "1742_7Star_SN_-_KH_III_Xion_A_Voice.mp3",
	90: "1743_7Star_SN_-_KH_III_Aqua_Voice.mp3",
	91: "1746_7Star_SN_-_Ultimate_Form_Sora_Voice.mp3",
	92: "1759_7Star_SN+_-_KH_Cloud_Dissidia_Voice.mp3",
	93: "1760_7Star_SN+_-_KH_Leon_Dissidia_Voice.mp3",
	94: "1790_7Star_SN++_-_KH_Sephiroth_Dissidia_Voice.mp3",
	95: "1833_7Star_SN++_-_FF7R_Aerith_Voice.mp3",
	96: "1834_7Star_SN++_-_FF7R_Cloud_Voice.mp3",
	97: "1835_7Star_SN++_-_FF7R_Sephiroth_Voice.mp3",
	98: "1836_7Star_SN++_-_FF7R_Tifa_Voice.mp3",
	99: "1847_7Star_SN++_-_Key_Art_%2323_Voice.mp3",
	100: "1872_7Star_SN++_-_Illus._KH_III_Sora_Voice.mp3",
	101: "1873_7Star_SN++_-_Illus._KH_III_Riku_Voice.mp3",
	102: "1874_7Star_SN++_-_Illus._KH_III_Kairi_Voice.mp3",
	103: "1903_7Star_SN++_-_KH_II_Sephiroth_Voice.mp3",
	104: "1904_7Star_SN++_-_KH_II_Cloud_Voice.mp3",
	105: "1915_7Star_SN++_-_Axel_B_Voice.mp3",
	106: "1916_7Star_SN++_-_Roxas_Voice.mp3",
	107: "1917_7Star_SN++_-_Xion_Voice.mp3"
}