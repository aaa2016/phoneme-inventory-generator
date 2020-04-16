// Phoneme lists for global use (can be strings or arrays)
// TODO: provide array, to allow for IPA phonemes that are more than one character long
var ipaC = "pm̥mɱn̼n̥nɳ̊ɳɲ̊ɲŋ̊ŋɴpbp̪b̪t̼d̼tdʈɖcɟkɡqɢʡʔszʃʒʂʐɕʑ\
ɸβfvθ̼ð̼θðθ̠ð̠ɹ̠̊˔ɹ̠˔ɻ˔çʝxɣχʁħʕhɦʋ̥ʋɹ̥ɹɻ̊ɻj̊jɰ̊ɰʔ̞ⱱ̟ⱱɾ̼ɾ̥ɾɽ̊ɽɢ̆ʡ̆\
ʙ̥ʙr̥rɽ̊r̥ɽrʀ̥ʀʜʢɬɮɭ̊˔ɭ˔ʎ̝̊ʎ̝ʟ̝̊ʟ̝l̥lɭ̊ɭʎ̥ʎʟ̥ʟʟ̠ɺɭ̆ʎ̆ʟ̆";
var ipaV = "iyɨʉɯuɪʏʊeøɘɵɤoø̞əo̞ɛœɜɞʌɔæɐaɶäɑɒ";
var sampaC = ["m","F","n","n`","J","N","N\\","p","b","p_d","b_d","t","d","t`","d`","c",
	"J\\","k","g","q","G\\",">\\","?","p\\","B","f","v","T","D","s","z","S","Z","s`",
	"z`","C","j\\","x","G","X","R","X\\","?\\","H\\","<\\","h","h\\","B_o","v\\","r\\",
	"r\\`","j","M\\","B\\","r","R\\","4","r`","K","K\\","l","l`","L","L\\","l\\"];
var sampaV = ["i","y","1","}","M","u","I","Y","I\\","U\\","U","e","2","@\\","8","7",
	"o","e_o","2_o","@","o_o","E","9","3","3\\","V","O","{","6","a","&","a_","A","Q"];
var simpleC = "pbtdkgfvszhmnwrly";
var simpleV = "iyueoa";

// Tab separated lists, if needed
/*"pm̥\tm\tɱ\tn̼\tn̥\tn\tɳ̊\tɳ\tɲ̊\
\tɲ\tŋ̊\tŋ\tɴ\t\n\
p\tb\tp̪\tb̪\tt̼\td̼\tt\td\tʈ\tɖ\tc\tɟ\tk\tɡ\tq\tɢ\tʡ\tʔ\t\n\
s\tz\tʃ\tʒ\tʂ\tʐ\tɕ\tʑ\t\n\
ɸ\tβ\tf\tv\tθ̼\tð̼\tθ\tð\tθ̠\tð̠\tɹ̠̊˔\tɹ̠˔\tɻ˔\tç\tʝ\tx\tɣ\tχ\tʁ\tħ\tʕ\th\tɦ\
ʋ̥\tʋ\tɹ̥\tɹ\tɻ̊\tɻ\tj̊\tj\tɰ̊\tɰ\tʔ̞\n\
ⱱ̟\tⱱ\tɾ̼\tɾ̥\tɾ\tɽ̊\tɽ\tɢ̆\tʡ̆\t\n\
ʙ̥\tʙ\tr̥\tr\tɽ̊r̥\tɽr\tʀ̥\tʀ\tʜ\tʢ\t\n\
ɬ\tɮ\tɭ̊˔\tɭ˔\tʎ̝̊\tʎ̝\tʟ̝̊\tʟ̝\t\n\
l̥\tl\tɭ̊\tɭ\tʎ̥\tʎ\tʟ̥\tʟ\tʟ̠\t\n\
ɺ\tɭ̆\tʎ̆\tʟ̆\t";*/
/*"i y\tɨ • ʉ\tɯ • u\n\
ɪ • ʏ\t\t• ʊ\n\e • ø\tɘ • ɵ\tɤ • o\n\ø̞\tə\t• o̞\n\
ɛ • œ\tɜ • ɞ\tʌ • ɔ\n\æ •\tɐ\n\a • ɶ\tä •\tɑ • ɒ";*/

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
			var outC = geninv(ipaC,minC,maxC,delimiter);
			var outV = geninv(ipaV,minV,maxV,delimiter);
		} else if (document.forms["mainForm"].source.value == "sampa") {
			var outC = geninv(sampaC,minC,maxC,delimiter);
			var outV = geninv(sampaV,minV,maxV,delimiter);
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
}
	
//////////////////////////////////