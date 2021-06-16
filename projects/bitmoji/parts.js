"use strict"

const svg_dims = {
	w: 100,
	h: 100
};
const faces_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h * 3 / 4
};
const eyes_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h / 2 - 10
};
const noses_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h / 2
};
const mouths_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h / 2 + 10
};
const hair_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h / 4
};
const hairs_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h * 3 / 4
};
const clothes_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h * 3 / 4
};
const accessories_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h / 2
};

const FACES = [{
	"path": `M ${faces_pos.x} ${faces_pos.y} q -40 -30 0 -60 q 40 30 0 60`
}, ];

const EYES = [{
	"path": `M ${eyes_pos.x - 15} ${eyes_pos.y} q 5 5 10 0 M ${eyes_pos.x + 15} ${eyes_pos.y} q -5 5 -10 0`
}, ];

const NOSES = [{
	"path": `M ${noses_pos.x - 3} ${noses_pos.y} q 1.5 1.5 3 0 M ${noses_pos.x + 3} ${noses_pos.y} q -1.5 1.5 -3 0`
}, ];

const MOUTHS = [{
	"path": `M ${mouths_pos.x - 7} ${mouths_pos.y} q 7 7 14 0`
}, ];

const HAIR = [{
	"path": `M ${hair_pos.x} ${hair_pos.y}`
}, ];

const HAIRS = [{
	"path": `M ${hairs_pos.x} ${hairs_pos.y}`
}, ];

const CLOTHES = [{
	"path": `M ${clothes_pos.x - 10} ${clothes_pos.y} q 10 10 20 0`
}, ];

const ACCESSORIES = [{
	"path": `M ${accessories_pos.x} ${accessories_pos.y}`
}, ];