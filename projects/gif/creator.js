// https://www.matthewflickinger.com/lab/whatsinagif/bits_and_bytes.asp
// static rectangles gif: 4749463839610A000A00910000FFFFFFFF00000000FF00000021F90400000000002C000000000A000A000002168C2D99872A1CDC33A00275EC95FAA8DE608C04914C01003B
// traffic lights gif: 4749463839610B001D00A20500FF000000FF00FFFF008E8E8E000000FFFFFF00000000000021FF0B4E45545343415045322E30030100000021F90404640000002C000000000B001D0000033048BADCDE23BE4821ADEB62A525D393F78CE4279A1BD7A1179B1EA0F3963413DCCFAD377A6FF7B8053028F43976B564020021F90404320000002C02000B00070010000003197827ACCB0DCA49E1B30ABBCDF7F8CE271E62699EA3198247020021F90404640000002C02000200070010000003197807ACCB0DCA49E1B30ABBCDF7F8CE271E62699EA319824502003B

const headerBlock = "474946383961";

let gifWidth = "0A00"; // 10
let gifHeight = "0A00"; // 10
let colors = ["FFFFFF", "FF0000", "0000FF", "000000"];

function compileGIF() {	
	let globalColorTableFlag = "1";
	let colorResolution = "001";
	let sortFlag = "0";
	let globalColorTableSize = to_fixed_length(dec_to_hex(Math.log2(colors.length) - 1), 3);
	let packedFieldLogical = globalColorTableFlag + colorResolution + sortFlag + globalColorTableSize;
	packedFieldLogical = "91"; // hex_to_dec(packedFieldLogical).toString();
	
	let backgroundColorIndex = "00";
	let pixelAspectRatio = "00";
	let logicalScreenDescriptor = gifWidth + gifHeight + packedFieldLogical + backgroundColorIndex + pixelAspectRatio;
	
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

	let completeGIF = headerBlock + logicalScreenDescriptor + globalColorTable + graphicControlExtension + imageDescriptor + localColorTable + imageData + trailer;
	
	return completeGIF;
}