function playMusic(value) {
  var music = "./music/" + value;
  var musicName = value.replace(/_/g, " ");
  musicName = musicName.substring(0, musicName.length - 4);
  document.getElementById("currentMusic").src = music;
  document.getElementById("musicPlayer").load();
  document.getElementById("musicPlayer").play();
  document.getElementById("nowPlayingText").innerHTML = "Now playing 『" + musicName + "』";
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
      var temp = document.getElementById("currentMusic").src;
      var currentMusicName = temp.substring(temp.lastIndexOf("/") + 1);
      var newMusicName;

      var currentTrackNum = getKeyByValue(musicArray, currentMusicName);
      if(currentTrackNum == 1)  {
        newMusicName = musicArray[111];
        document.getElementById("currentMusic").src = "./music/" + newMusicName;
      }
      else{
        newMusicName = musicArray[Number(currentTrackNum) - 1];
        document.getElementById("currentMusic").src = "./music/" + newMusicName;
      }
    }
    else if(value == "FF")  {
      var temp = document.getElementById("currentMusic").src;
      var currentMusicName = temp.substring(temp.lastIndexOf("/") + 1);
      var newMusicName;

      var currentTrackNum = getKeyByValue(musicArray, currentMusicName);
      if(currentTrackNum == 111)  {
        newMusicName = musicArray[1];
        document.getElementById("currentMusic").src = "./music/" + newMusicName;
      }
      else{
        newMusicName = musicArray[Number(currentTrackNum) + 1];
        document.getElementById("currentMusic").src = "./music/" + newMusicName;
      }
    }

    var musicName = newMusicName.replace(/_/g, " ");
    musicName = musicName.substring(0, musicName.length - 4);
    document.getElementById("musicPlayer").load();
    document.getElementById("musicPlayer").play();
    document.getElementById("nowPlayingText").innerHTML = "Now playing 『" + musicName + "』";
  }
}

var musicArray = {
  1: "(KHBC)_Case_of_the_Foretellers.mp3",
  2: "(KHBC)_Guiding_Key.mp3",
  3: "(KHBC)_The_Foretellers.mp3",
  4: "(KHUX)_Candy_Kingdom_Battle.mp3",
  5: "(KHUX)_Candy_Kingdom_Field.mp3",
  6: "(KHUX)_Clash_On_the_Big_Bridge.mp3",
  7: "(KHUX)_Classic_Kingdom.mp3",
  8: "(KHUX)_Cy-Bug_Sector_Battle.mp3",
  9: "(KHUX)_Cy-Bug_Sector_Field.mp3",
  10: "(KHUX)_Dancing_Mad.mp3",
  11: "(KHUX)_Daybreak_Town_Battle.mp3",
  12: "(KHUX)_Daybreak_Town_Field.mp3",
  13: "(KHUX)_Daybreak_Town_The_Heart_of_X.mp3",
  14: "(KHUX)_Dearly_Beloved.mp3",
  15: "(KHUX)_Defeat....mp3",
  16: "(KHUX)_Game_Central_Station.mp3",
  17: "(KHUX)_Gummi_Ship_Editor.mp3",
  18: "(KHUX)_Menu.mp3",
  19: "(KHUX)_Niceland_Battle.mp3",
  20: "(KHUX)_Niceland_Field.mp3",
  21: "(KHUX)_Quest_Selection.mp3",
  22: "(KHUX)_Title.mp3",
  23: "(KHUX)_TWISTER_-UNION_X_MIX-.mp3",
  24: "(KHUX)_Victory!.mp3",
  25: "(KHBBS)_Aqua.mp3",
  26: "(KHBBS)_Black_Power.mp3",
  27: "(KHBBS)_Castle_Escapade.mp3",
  28: "(KHBBS)_Drops_of_Poison.mp3",
  29: "(KHBBS)_Extreme_Encounters.mp3",
  30: "(KHBBS)_Go!_Go!_Rumble_Racer.mp3",
  31: "(KHBBS)_Innocent_Times.mp3",
  32: "(KHBBS)_Night_in_the_Dark_Dream.mp3",
  33: "(KHBBS)_Night_of_Tragedy.mp3",
  34: "(KHBBS)_Peaceful_Hearts.mp3",
  35: "(KHBBS)_Risky_Romp.mp3",
  36: "(KHBBS)_Tears_of_the_Light.mp3",
  37: "(KHBBS)_Terra.mp3",
  38: "(KHBBS)_The_Key.mp3",
  39: "(KHBBS)_The_Key_of_Light.mp3",
  40: "(KHBBS)_The_Rustling_Forest.mp3",
  41: "(KHBBS)_The_Secret_Whispers.mp3",
  42: "(KHBBS)_The_Silent_Forest.mp3",
  43: "(KHBBS)_Unbreakable_Chains.mp3",
  44: "(KHBBS)_Ventus.mp3",
  45: "(KH1)_Night_of_Fate.mp3",
  46: "(KH1)_Shrouding_Dark_Cloud.mp3",
  47: "(KH1.5)_Another_Side.mp3",
  48: "(KH1.5)_Arabian_Dream.mp3",
  49: "(KH1.5)_A_Day_in_Agrabah.mp3",
  50: "(KH1.5)_Blast_Away!_-Gummi_Ship_I-.mp3",
  51: "(KH1.5)_Dearly_Beloved.mp3",
  52: "(KH1.5)_Destiny's_Force.mp3",
  53: "(KH1.5)_Destiny_Islands.mp3",
  54: "(KH1.5)_Kairi_(Piano).mp3",
  55: "(KH1.5)_Kairi_I.mp3",
  56: "(KH1.5)_Musique_pour_la_tristesse_de_Xion.mp3",
  57: "(KH1.5)_Musique_pour_la_tristesse_de_Xion_(Piano).mp3.mp3",
  58: "(KH1.5)_No_Time_to_Think.mp3",
  59: "(KH1.5)_Olympus_Coliseum.mp3",
  60: "(KH1.5)_Road_to_a_Hero.mp3",
  61: "(KH1.5)_Shrouding_Dark_Cloud.mp3",
  62: "(KH1.5)_Spooks_of_Halloween_Town.mp3",
  63: "(KH1.5)_Squirming_Evil.mp3",
  64: "(KH1.5)_Strange_Whispers.mp3",
  65: "(KH1.5)_The_Deep_End.mp3",
  66: "(KH1.5)_To_Our_Surprise.mp3",
  67: "(KH1.5)_Treasured_Memories.mp3",
  68: "(KH1.5)_Welcome_to_Wonderland.mp3",
  69: "(KHReCoM)_La_Pace.mp3",
  70: "(KHReCoM)_Namine.mp3",
  71: "(KHReCoM)_Scent_of_Silence.mp3",
  72: "(KH358)_Vector_to_the_Heavens.mp3",
  73: "(KH2)_Organization_XIII.mp3",
  74: "(KH2)_Rowdy_Rumble.mp3",
  75: "(KH2.5)_Apprehension.mp3",
  76: "(KH2.5)_A_Walk_in_Andante.mp3",
  77: "(KH2.5)_Battleship_Bravery.mp3",
  78: "(KH2.5)_Dance_of_the_Daring.mp3",
  79: "(KH2.5)_Dance_to_the_Death.mp3",
  80: "(KH2.5)_Darkness_of_the_Unknown.mp3",
  81: "(KH2.5)_Desire_for_All_That_is_Lost.mp3",
  82: "(KH2.5)_Dive_Into_the_Heart_-Destati-.mp3",
  83: "(KH2.5)_Fate_of_the_Unknown.mp3",
  84: "(KH2.5)_Fragments_of_Sorrow.mp3",
  85: "(KH2.5)_Friends_in_My_Heart.mp3",
  86: "(KH2.5)_Gearing_Up.mp3",
  87: "(KH2.5)_Hesitation.mp3",
  88: "(KH2.5)_Laughter_and_Merriment.mp3",
  89: "(KH2.5)_Lazy_Afternoons.mp3",
  90: "(KH2.5)_Missing_You.mp3",
  91: "(KH2.5)_One-Winged_Angel.mp3",
  92: "(KH2.5)_Riku.mp3",
  93: "(KH2.5)_Road_to_a_Hero.mp3",
  94: "(KH2.5)_Roxas.mp3",
  95: "(KH2.5)_Roxas_(Piano).mp3",
  96: "(KH2.5)_Sora.mp3",
  97: "(KH2.5)_The_Encounter.mp3",
  98: "(KH2.5)_The_Other_Promise.mp3",
  99: "(KH2.5)_The_Other_Promise_(Drammatica).mp3",
  100: "(KH2.5)_The_Underworld.mp3",
  101: "(KH2.5)_Villains_of_a_Sort.mp3",
  102: "(KH2.5)_Vim_and_Vigor.mp3",
  103: "(KH2.5)_Waltz_of_the_Damned.mp3",
  104: "(KH2.5)_What_Lies_Beneath.mp3",
  105: "(KH3D)_Dearly_Beloved.mp3",
  106: "(KH3D)_Dream_Eaters.mp3",
  107: "(KH3D)_Ever_After.mp3",
  108: "(KH3D)_The_Dread_of_Night.mp3",
  109: "(KH3D)_The_Dream.mp3",
  110: "(KH3D)_The_Nightmare.mp3",
  111: "(KH3)_Peaceful_Hearts.mp3",
}