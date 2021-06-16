"use strict"

const svg_dims = {
	w: 100,
	h: 100
};
const faces_pos = {
	x: svg_dims.w / 2,
	y: svg_dims.h
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
	"path": `M ${faces_pos.x} ${faces_pos.y} q 10 10 20 20`
}, ];

const EYES = [{
	"path": `M ${eyes_pos.x} ${eyes_pos.y} q 10 10 20 20`
}, ];

const NOSES = [{
	"path": `M ${noses_pos.x} ${noses_pos.y} q 10 10 20 20`
}, ];

const MOUTHS = [{
	"path": `M ${mouths_pos.x} ${mouths_pos.y} q 10 10 20 20`
}, ];

const HAIR = [{
	"path": `M ${hair_pos.x} ${hair_pos.y} q 10 10 20 20`
}, ];

const HAIRS = [{
	"path": `M ${hairs_pos.x} ${hairs_pos.y} q 10 10 20 20`
}, ];

const CLOTHES = [{
	"path": `M ${clothes_pos.x} ${clothes_pos.y} q 10 10 20 20`
}, ];

const ACCESSORIES = [{
	"path": `M ${accessories_pos.x} ${accessories_pos.y} q 10 10 20 20`
}, ];