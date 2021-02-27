// https://www.matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp

const headerBlock = "474946383961";

let colors = ["FFFFFF", "FF0000", "0000FF", "000000"];

let width = "0A00"; // 10
let height = "0A00"; // 10

let globalColorTableFlag = "1";
let colorResolution = "001";
let sortFlag = "0";
let globalColorTableSize = to_fixed_length(dec_to_hex(Math.log2(colors.length) - 1), 3);
let packedFieldLogical = globalColorTableFlag + colorResolution + sortFlag + globalColorTableSize;
packedFieldLogical = hex_to_dec(packedFieldLogical).toString();

let backgroundColorIndex = "00";
let pixelAspectRatio = "00";
let logicalScreenDescriptor = width + height + packedFieldLogical + backgroundColorIndex + pixelAspectRatio;

let globalColorTable = "";
for (color of colors) {
	globalColorTable += color;
}

const extensionIntroducer = "21";
const graphicControlLabel = "F9";
let byteSize = "04";
/*
const futureUse = "000";
let disposalMethod = "000";
let userInputFlag = "0";
let transparentColorFlag = "0";
*/
let packedFieldGraphic = "00";
let delayTime = "0000";
let transparentColorIndex = "00";
const blockTerminator = "00";
let graphicControlExtension = extensionIntroducer + graphicControlLabel + byteSize + packedFieldGraphic + delayTime + transparentColorIndex + blockTerminator;

const imageSeparator = "2C";
let imageLeft = "0000";
let imageTop = "0000";
let imageWidth = "0A00";
let imageHeight = "0A00";
/*
local color table flag 0
interlace flag 0
sort flag 0
future use 00
size local color table 000
*/
let packedFieldImage = "00";
let imageDescriptor = imageSeparator + imageLeft + imageTop + imageWidth + imageHeight + packedFieldImage;

let localColorTable = "";

let lzw = "02";
let imageData = lzw + "168C2D99872A1CDC33A00275EC95FAA8DE608C04914C01" + blockTerminator;

const trailer = "3B";

function compileGIF() {
	let completeGIF = headerBlock + logicalScreenDescriptor + globalColorTable + graphicControlExtension + imageDescriptor + localColorTable + imageData + trailer;

	document.getElementById("output-code").innerHTML = completeGIF
	;
}

document.onload = compileGIF();