const DIFFICULTY_MAX = 4; // # n of icons
const CONF_INTERVAL_INIT = 1300;
const CONF_INTERVAL_MIN = 750;
const CONF_INTERVAL_DECRESE = 80;
const CONF_NEW_ICONS_RELEASE_LEVEL = 3;

var gen_interval = CONF_INTERVAL_INIT;
var unit_generator;

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "100",
  "hideDuration": "0",
  "timeOut": "500",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "fadeOut"
}

function unit_generate_fn() {

	var isOK = getTFByChance(80);

	var pTop = getRandomInt(320);
	var pLeft = getRandomInt(520);
	var difficulty = parseInt($('#score').text()) / CONF_NEW_ICONS_RELEASE_LEVEL;
	console.log('difficulty:'+difficulty);
	if (difficulty > DIFFICULTY_MAX) {
		difficulty = DIFFICULTY_MAX;
	}
	var icon = isOK ? "images/avocado_" + getRandomInt(difficulty) + ".png" : "images/guacamole_" + getRandomInt(difficulty) + ".png";

	var $mySpan = $("<span>", {
		"class": "pop_unit",
		"style": "top:" + pTop + "px;left:" + pLeft + "px;background-image: url(" + icon + ");"
	});

	$('#stage').append($mySpan);

	var to = isOK ? setTimeout(function(){
		$mySpan.remove();
		if (parseInt($('#life').text()) <= 0 ){
			game_end();
			alert("Game Over . . .");
		}
		$('#life').text(parseInt($('#life').text()) - 1);
		toastr.error('Lost life');
	}, gen_interval) : null;

	$mySpan.on( "click", { isOK : isOK, to: to }, function(event) {
		var isOK = event.data.isOK;
		var to = event.data.to;
		if (isOK) {
			$('#score').text(parseInt($('#score').text()) + 1);
			toastr.success('+1');
			gen_interval = gen_interval - CONF_INTERVAL_DECRESE;
			if (gen_interval < CONF_INTERVAL_MIN) {
				gen_interval = CONF_INTERVAL_MIN;
			}
			// TO-DO gain life
			clearTimeout(to);
		} else {
			game_end();
			alert("Game Over . . . score : " + $('#score').text());
		}
	});

	$mySpan.animate({
		width: 80, height: 80, // sets the base height and width
		opacity: 1
	}, 0, function() {
		$mySpan.animate({
			width: 80, height: 80,
			//width: 60, height: 60, // sets the alternative height and width
			//top: pTop + 10,
			//left: pLeft + 10,
			opacity: 0
		}, gen_interval, function() {
			$mySpan.remove();
		});
	});
}

function unit_remove_fn(odv) {
	odv.remove();
}

function game_start() {
	$('#score').text(0);
	$('#life').text(3);
	unit_generator = setInterval(unit_generate_fn, gen_interval);
}

function game_end() {
	clearInterval(unit_generator);
}

document.getElementById("game_start_btn").addEventListener("click", game_start);


/* return int 0 to range -1 */
function getRandomInt(range){
	return Math.floor(Math.random() * range);
}

/**
 * percentage : should be 0.0 to 100.0
 * return true or false
 */
function getTFByChance(percentage){
	var zeroToOne = Math.random();
	console.log('zeroToOne:'+zeroToOne);
	return (zeroToOne * 100 <= percentage) ? true : false;
}