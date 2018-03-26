window.setInterval(everyOneSecond, 1000);

function everyOneSecond(){
	var floatChanceFeeding = parseFloat(document.getElementById("chanceFeeding").innerHTML) + 0.1;
	if( floatChanceFeeding > 100.0) {
		document.getElementById("chanceFeeding").innerHTML = 100.0;
	} else {
		document.getElementById("chanceFeeding").innerHTML = floatChanceFeeding.toFixed(1);
	}
	var floatChanceHunting = parseFloat(document.getElementById("chanceHunting").innerHTML) - 0.01;
	if( floatChanceHunting < 0.0) {
		document.getElementById("chanceHunting").innerHTML = 0.0;
	} else {
		document.getElementById("chanceHunting").innerHTML = floatChanceHunting.toFixed(2);
	}
}

document.getElementById("btnFeeding").addEventListener("click", feeding);
function feeding(){
	if (getTFByChance(parseInt(document.getElementById("chanceFeeding").innerHTML))) {
		document.getElementById("gram").innerHTML = parseInt(document.getElementById("gram").innerHTML) + 1;
		document.getElementById("chanceFeeding").innerHTML = parseFloat(document.getElementById("chanceFeeding").innerHTML) - 1.0;
		document.getElementById("chanceHunting").innerHTML = parseFloat(document.getElementById("chanceHunting").innerHTML) + 1.0;
	} else {
		document.getElementById("gram").innerHTML = 0;
		document.getElementById("chanceFeeding").innerHTML = 100.0;
	}
}

document.getElementById("btnHunting").addEventListener("click", hunting);
function hunting(){
	if (getTFByChance(parseInt(document.getElementById("chanceHunting").innerHTML))) {
		alert('got something');
		// TO-DO
	} else {
		alert('failed');
		// TO-DO
		document.getElementById("gram").innerHTML = parseInt(document.getElementById("gram").innerHTML) / 2;
	}
}

function pulse() {
	$('#avocado').animate({
		width: 300, height: 300, // sets the base height and width
		opacity: 0.5
	}, 700, function() {
		$('#avocado').animate({
			width: 320, height: 320, // sets the alternative height and width
			opacity: 1
		}, 700, function() {
			pulse();
		});
	}); 
};

pulse();

/**
 * percentage : should be 0.0 to 100.0
 * return true or false
 */
 function getTFByChance(percentage){
 	var zeroToOne = Math.random();
 	console.log('zeroToOne:'+zeroToOne);
 	return (zeroToOne * 100 <= percentage) ? true : false;
 }