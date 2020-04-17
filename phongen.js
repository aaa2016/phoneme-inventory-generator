// PHONEME LISTS for global use (can be strings or arrays)

// IPA
var ipaC = ["p","m̥","m","ɱ","n̼","n̥","n","ɳ̊","ɳ","ɲ̊","ɲ","ŋ̊","ŋ","ɴ","p","b","p̪",
"b̪","t̼","d̼","t","d","ʈ","ɖ","c","ɟ","k","ɡ","q","ɢ","ʡ","ʔ","s","z","ʃ","ʒ","ʂ","ʐ",
"ɕ","ʑ","ɸ","β","f","v","θ̼","ð̼","θ","ð","θ̠","ð̠","ɹ̠̊˔","ɹ̠˔","ɻ˔","ç","ʝ","x","ɣ",
"χ","ʁ","ħ","ʕ","h","ɦ","ʋ̥","ʋ","ɹ̥","ɹ","ɻ̊","ɻ","j̊","j","ɰ̊","ɰ","ʔ̞","ⱱ̟","ⱱ","ɾ̼",
"ɾ̥","ɾ","ɽ̊","ɽ","ɢ̆","ʡ̆","ʙ̥","ʙ","r̥","r","ɽ̊","r̥","ɽ","r","ʀ̥","ʀ","ʜ","ʢ","ɬ",
"ɮ","ɭ̊˔","ɭ˔","ʎ̝̊","ʎ̝","ʟ̝̊","ʟ̝","l̥","l","ɭ̊","ɭ","ʎ̥","ʎ","ʟ̥","ʟ","ʟ̠","ɺ","ɭ̆",
"ʎ̆","ʟ̆"];
var ipaV = ["i","y","ɨ","ʉ","ɯ","u","ɪ","ʏ","ʊ","e","ø","ɘ","ɵ","ɤ","o","ø̞","ə","o̞",
"ɛ","œ","ɜ","ɞ","ʌ","ɔ","æ","ɐ","a","ɶ","ä","ɑ","ɒ"];

// SIMPLE - not linguistically valid, but an easy example to demonstrate the tool
var simpleC = "pbtdkgfvszhmnwrlj";
var simpleV = "iyueoa";

/* // X-SAMPA implementation now uses chooseSource() function
var sampaC = ["m","F","n","n`","J","N","N\\","p","b","p_d","b_d","t","d","t`","d`","c",
	"J\\","k","g","q","G\\",">\\","?","p\\","B","f","v","T","D","s","z","S","Z","s`",
	"z`","C","j\\","x","G","X","R","X\\","?\\","H\\","<\\","h","h\\","B_o","v\\","r\\",
	"r\\`","j","M\\","B\\","r","R\\","4","r`","K","K\\","l","l`","L","L\\","l\\"];
var sampaV = ["i","y","1","}","M","u","I","Y","I\\","U\\","U","e","2","@\\","8","7",
	"o","e_o","2_o","@","o_o","E","9","3","3\\","V","O","{","6","a","&","a_","A","Q"];
*/

/////////////////////////////////

/*
*	Pick source phoneme list - returns nested arrays: [0] is C, [1] is V
*/

function chooseSource() {
	
	var cList = [];
	var vList = [];
	
	// Note: "\" in X-SAMPA phonemes needs the escape character "\\"
	
	// CONSONANTS (unvoiced or voiced)
	// Plosives
	var plosUn = ["p","t","c","k","?"];
	var plosVo = ["b","d","J\\","g"];
	// Fricatives
	var fricUn = ["f","T","s","S","h"];
	var fricVo = ["v","D","z","Z"];
	// Nasals
	var nas = ["m","n","J","N"];
	// Approximants
	var app = ["w","r//","4","l","j"];
	// Trills
	var tri = ["r","R"];
	// Affricates
	var aff = ["ts","dz","tS","dZ"];
	// TODO: Add the more exotic consonant options
		
	// Add user selected options to array
	if (document.getElementById("plosUn").checked) {cList = cList.concat(plosUn);}
	if (document.getElementById("plosVo").checked) {cList = cList.concat(plosVo);}
	if (document.getElementById("fricUn").checked) {cList = cList.concat(fricUn);}
	if (document.getElementById("fricVo").checked) {cList = cList.concat(fricVo);}
	if (document.getElementById("nas").checked) {cList = cList.concat(nas);}
	if (document.getElementById("app").checked) {cList = cList.concat(app);}
	if (document.getElementById("tri").checked) {cList = cList.concat(tri);}
	if (document.getElementById("aff").checked) {cList = cList.concat(aff);}
	
	// VOWELS (rounded or unrounded)
	// Tense
	var tenseRo = ["y","}","u","2","8","o","9","3\\","O","&","Q"];
	var tenseUn = ["i","1","M","e","@\\","7","E","3","V","a",'a_"',"A"];
	// Lax
	var laxRo = ["Y","U","2_o","o_o"];
	var laxUn = ["I","I\\","U\\","e_o","@","{","6"];
	
	// Add user selected options to array
	if (document.getElementById("tenseRo").checked) {vList = vList.concat(tenseRo);}
	if (document.getElementById("tenseUn").checked) {vList = vList.concat(tenseUn);}
	if (document.getElementById("laxRo").checked) {vList = vList.concat(laxRo);}
	if (document.getElementById("laxUn").checked) {vList = vList.concat(laxUn);}
	
	var chosenList = [cList,vList];
	
	return chosenList;

}

/////////////////////////////////

/*
*	Main function to generate inventory - runs from button
*/
function generate() {
		
		// Obtain setting values
		var minC = document.forms["mainForm"].minC.value;
		var minV = document.forms["mainForm"].minV.value;
		var maxC = document.forms["mainForm"].maxC.value;
		var maxV = document.forms["mainForm"].maxV.value;
		var delimiter = document.forms["mainForm"].delimiter.value;
		
		// Check which source the user chooses
		if (document.forms["mainForm"].source.value == "ipa") {
			// TODO: implement shopper selector for IPA
			var outC = geninv(ipaC,minC,maxC,delimiter);
			var outV = geninv(ipaV,minV,maxV,delimiter);
		} else if (document.forms["mainForm"].source.value == "sampa") {
			var sampaIn = chooseSource(); // Use shopper selector: [0] is C, [1] is V
			var outC = geninv(sampaIn[0],minC,maxC,delimiter);
			var outV = geninv(sampaIn[1],minV,maxV,delimiter);
		} else { // Use simple as default
			var outC = geninv(simpleC,minC,maxC,delimiter);
			var outV = geninv(simpleV,minV,maxV,delimiter);
		}
		
		// Check for blank outputs (indicative of error)
		if (outC == "" || outV == "") {
			// Display error message
			document.getElementById("messageField").innerHTML = 
				"Output could not provided - seek assistance";
		} else {
			// Output the result
			document.forms["mainForm"].outC.value = outC;
			document.forms["mainForm"].outV.value = outV;
		
			// Display success message
			document.getElementById("messageField").innerHTML = 
				"Output provided";
		}
	
}

/////////////////////////////////

/*
*	Generation algorithm: picks between [quantMin] and [quantMax] items from [list]
*		using [delim] as a delimiter
*/
function geninv(list,quantMin,quantMax,delim) {
	
	var output = "";
	
	// Pick random number of items to pick between specified limits
	var min = Math.ceil(quantMin);
	// If fewer items than max, set that as max
	if (list.length<quantMax) {
		var max = list.length;
	} else {
    	var max = Math.floor(quantMax);
    }
    var toGenerate = Math.floor(Math.random() * (max - min + 1)) + min;
	//console.log("Number being generated: "+toGenerate);
	
	// Initiate counter for infinite loop protection during duplicate checking
	var infLoopCounter = 0;
	
	// Loop for number of items required
	for (i=0;i<toGenerate;i++) {
		// Pick random item from list
		var rand = list[Math.floor(Math.random() * list.length)];
		
		// Check if already in list
		if (output.includes(rand)) {
			infLoopCounter++;
			// Check if high number of duplicates found
			if (infLoopCounter<10000) {
				i--;
			} else {
				// Return no output
				return "";
			}		
		} else {
			// Add to output - if last one, do not add delimiter
			if (i<(toGenerate-1)) {
					output += rand+delim;
			} else {
					output += rand;
			}
		}
	}
	
	return output;
	
}

/////////////////////////////////

/*
*	Resets messages and text areas
*/
function reset() {
	document.forms["mainForm"].minC.value = "5";
	document.forms["mainForm"].maxC.value = "20";
	document.forms["mainForm"].minV.value = "3";
	document.forms["mainForm"].maxV.value = "10";
	document.forms["mainForm"].outC.value = "";
	document.forms["mainForm"].outV.value = "";
	document.getElementById("messageField").innerHTML = ""; // TODO: not working
	showHideDiv();
}
	
//////////////////////////////////

/*
*	Show/hide div element
*/

function showHideDiv(name) {
  var x = document.getElementById(name);
  if (document.forms["mainForm"].source.value == "sampa") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 