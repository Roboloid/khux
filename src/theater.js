var player;
var videoID;
var isPlaying = false;

function loadDetailsPopup(value)    {
	var detailsPopupDiv = document.getElementById("videoDetailsPopup");

    detailsPopupDiv.innerHTML = "";

	videoID = value;
	

    var blankSpacer = document.createElement('br');

	var cancelImage = document.createElement('img');
    cancelImage.src = "./images/icon/cancelButtonOff.png";
    cancelImage.style = "cursor: pointer; position: absolute; vertical-align: middle; text-align: left; margin: 2.5% auto; float: left; left: 2.5%; z-index: 2";
	cancelImage.addEventListener('mouseover', function(){
		cancelImage.src = "./images/icon/cancelButtonOn.png"
	})
	cancelImage.addEventListener('mouseout', function(){
		cancelImage.src = "./images/icon/cancelButtonOff.png"
	})
	cancelImage.setAttribute("onclick", "closeVideoDetailsPopup()");
    detailsPopupDiv.appendChild(cancelImage);
    detailsPopupDiv.appendChild(blankSpacer);


	var thumbnailCoverImage = document.createElement('img');
    thumbnailCoverImage.src = "./images/icon/video_overlay.png";
    thumbnailCoverImage.style = "width: 95%; vertical-align: middle; position: absolute; transform: translate(-50%,0%); -webkit-transform: translate(-50%,0%); opacity: 100%; z-index: -9";
    detailsPopupDiv.appendChild(thumbnailCoverImage);

	var thumbnailImage = document.createElement('img');
    thumbnailImage.src = "./images/icon/" + videoArray[value].Image;
    thumbnailImage.style = "width: 95%; vertical-align: middle; position: absolute; transform: translate(-50%,0%); -webkit-transform: translate(-50%,0%); opacity: 33%; z-index: -10";
    detailsPopupDiv.appendChild(thumbnailImage);
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());


	var textTitle = document.createElement('span');
    textTitle.style = "display: inline-block; position: relative; font-size: 2.25em; text-shadow: 3px 3px rgb(0, 0, 0); text-align: left; width: 80%; height: auto; margin: 0 auto";
	textTitle.appendChild(document.createTextNode(videoArray[value].Name));
    detailsPopupDiv.appendChild(textTitle);
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());

	var playImage = document.createElement('img');
    playImage.src = "./images/icon/videoPlayButtonOff.png";
    playImage.ID = "videoPlayButtonID";
    playImage.style = "display: inline-block; position: relative; cursor: pointer; width: 200px; vertical-align: middle; text-align: left; margin: 0 auto; float: left; left: 10%";
	playImage.addEventListener('mouseover', function(){
		playImage.src = "./images/icon/videoPlayButtonOn.png"
	})
	playImage.addEventListener('mouseout', function(){
		playImage.src = "./images/icon/videoPlayButtonOff.png"
	})
	playImage.setAttribute("onclick", "handleVideoPlay(\"" + videoArray[value].VideoID + "\")");
    detailsPopupDiv.appendChild(playImage);

    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());

	var textDescription = document.createElement('span');
    textDescription.style = "display: inline-block; position: relative; font-size: 1.75em; text-shadow: 3px 3px rgb(0, 0, 0); text-align: left; width: 80%; height: auto; margin: 0 auto";
	textDescription.appendChild(document.createTextNode(videoArray[value].Description));
    detailsPopupDiv.appendChild(textDescription);
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());
    detailsPopupDiv.appendChild(blankSpacer.cloneNode());

    $('#videoDetailsPopup').fadeToggle(200);
    $('#darkOverlay').fadeToggle(200);
}

function handleVideoPlay(value)	{
	var detailsPopupDiv = document.getElementById("videoDetailsPopup");
	var mainDiv = document.getElementById("mainDiv");

    detailsPopupDiv.innerHTML = "";

	var playerDiv = document.createElement('div');
	playerDiv.id = "videoPlayerReplacer";
	playerDiv.className = "videoPlayerReplacerClass";
	mainDiv.appendChild(playerDiv);

	var currWidth = $(window).width() * 0.8;
	var currHeight = (currWidth/16) * 9;

	var elements = document.querySelectorAll('.videoPlayerReplacerClass');
	for(var i = 0; i < elements.length; i++){
		elements[i].style.width = currWidth + "px";
		elements[i].style.height = currHeight + "px";
	}

	player = new YT.Player('videoPlayerReplacer', {
		height: currHeight.toString(),
		width: currWidth.toString(),
		videoId: value,
		playerVars: {
			'playsinline': 1
		},
		events: {
			'onReady': onPlayerReady
		}
	});
	isPlaying = true;
}

function onPlayerReady(event) {
	event.target.playVideo();
}

$(document).mouseup(function (e) {
    var container1 = $("#videoDetailsPopup");
    var container2 = $("#darkOverlay");

    if (!container1.is(e.target)
        && container1.has(e.target).length === 0
		&& !isPlaying)
    {
        container1.fadeOut(200);
        container2.fadeOut(200);
    }

	else if(!container1.is(e.target)
	&& container1.has(e.target).length === 0
	&& isPlaying)	{
		//player.stopVideo();
		var detailsPopupDiv = document.getElementById("videoPlayerReplacer");
	
		detailsPopupDiv.innerHTML = "";
		var iframes = document.querySelectorAll('iframe');
		for (var i = 0; i < iframes.length; i++) {
			iframes[i].parentNode.removeChild(iframes[i]);
		}
		isPlaying = false;
        container1.fadeOut(200);
        container2.fadeOut(200);
	}
});

function closeVideoDetailsPopup()	{
    var container1 = $("#videoDetailsPopup");
    var container2 = $("#darkOverlay");
	
	container1.fadeOut(200);
	container2.fadeOut(200);
}

function pageLoad()	{
	/*
	if(getParameterByName("voice") == "true")   {
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toMusic.png";
		generateVoice();
    }
	else	{
		document.getElementById("soundButtonSwitcher").src = "./images/ui/musicButton_toVoice.png";
		generateMusic();
	}
	*/
}

var videoArray = {
    "complete_story":  {
        Name: "The Complete Story",
		VideoID: "UxHAz1mz3HA",
		Image: "video_complete_story.png",
		Description: "This movie contains every story cutscene in Kingdom Hearts Unchained χ & Union Cross, including the Disney worlds. It's also interspersed with gameplay where appropriate to make the experience more complete. Additionally, it contains several sound effects that were present in the Japanese version but missing in the English version, as well as a voiced cutscene by Ray Chase (the Master of Masters)."
    },
    "x_scenes":  {
        Name: "The χ Scenes",
		VideoID: "09fTJp0kRds",
		Image: "video_x_scenes.png",
		Description: "This movie contains every main story cutscene in Kingdom Hearts Unchained χ & Union Cross, which excludes the Disney worlds. It's also interspersed with gameplay where appropriate to make the experience more complete. Additionally, it contains several sound effects that were present in the Japanese version but missing in the English version, as well as a voiced cutscene by Ray Chase (the Master of Masters)."
    },
    "story_ephemer":  {
        Name: "The Case of Ephemer",
		VideoID: "6k3vFRMGuAY",
		Image: "video_story_ephemer.png",
		Description: "A boy, whose inquisitive nature for the truth, finds himself at the foot of a great mystery affecting all Keyblade wielders. Watch the story of Ephemer as he makes his way through Union χ."
    },
    "story_skuld":  {
        Name: "The Case of Skuld",
		VideoID: "XXdyOgV7xXs",
		Image: "video_story_skuld.png",
		Description: "A girl, who values friendship and trust among all else, is put to the test when tensions arise between her fellow Keyblade wielders. Join Skuld as she strives to preserve the light between her friends in Union χ."
    },
    "story_ventus":  {
        Name: "The Case of Ventus",
		VideoID: "MhukMDIDrTU",
		Image: "video_story_ventus.png",
		Description: "A boy, whose first appearance takes place in a far-off future, shows the life he led in the Age of Fairy Tales. Explore the origins of Ventus as he shows you his beginnings in Union χ."
    },
    "story_brain":  {
        Name: "The Case of Brain",
		VideoID: "a9leUl8YjQQ",
		Image: "video_story_brain.png",
		Description: "A boy, who has a strong desire to defy fate, finds himself among new allies in a foreign world. Join Brain as he carves his own path in Union χ."
    },
    "story_lauriam":  {
        Name: "The Case of Lauriam",
		VideoID: "3dyunxHNr0I",
		Image: "video_story_lauriam.png",
		Description: "A boy, who would later become The Graceful Assassin, strives to solve the mystery behind a missing beloved. Uncover the truth behind the sudden disappearance alongside Lauriam in Union χ."
    },
    "story_player":  {
        Name: "The Case of the Player",
		VideoID: "nW1zyjItRdY",
		Image: "video_story_player.png",
		Description: "The Player character rarely speaks, but the words they do say give insight into their values and what they fight for. Experience your story as you journey through the Age of Fairy Tales in Union χ."
    },
    "all_bosses":  {
        Name: "All Bosses & Ending",
		VideoID: "OeCcoGpCcj8",
		Image: "video_all_bosses.png",
		Description: "All story mode bosses and the ending of Kingdom Hearts Union χ[Cross]."
    },
}