import paper from 'paper/dist/paper-core';
import { BACK_HAIR, FACES, FRONT_HAIR } from './variation.json';

export const BASE_SIZE = 100;

const DEFAULT_COLOR = new paper.Color('#404040');
const BG_COLOR = new paper.Color('#171717');

export const drawAvatar = (backHair: string[], face: string, frontHair: string): paper.Group => {
	const paths = [
		...backHair.map((d) => new paper.Path(d)),
		new paper.Path(face),
		new paper.Path(frontHair)
	];

	paths.forEach((path) => {
		path.fillColor = BG_COLOR;
		path.strokeColor = DEFAULT_COLOR;
		path.strokeWidth = 4;
		path.strokeCap = 'round';
	});

	const eyes = [65.5, 35.5].map(
		(x) =>
			new paper.Shape.Ellipse({
				center: [x, 59.5],
				radius: [2.5, 7.5],
				fillColor: DEFAULT_COLOR
			})
	);

	return new paper.Group([...paths, ...eyes]);
};

export const generateAvatarSymbols = (): paper.SymbolDefinition[] => {
	const symbols: paper.SymbolDefinition[] = [];

	BACK_HAIR.forEach((backHair) =>
		FACES.forEach((face) =>
			FRONT_HAIR.forEach((frontHair) => {
				symbols.push(new paper.SymbolDefinition(drawAvatar(backHair, face, frontHair)));
			})
		)
	);

	return symbols;
};
