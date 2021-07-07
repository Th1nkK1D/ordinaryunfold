import paper from 'paper';

export const BASE_SIZE = 100;

const FACE_VARIATION = [10, 15, 20];
const DEFAULT_COLOR = new paper.Color('#505050');

const drawAvatar = (y: number, xTop: number, xButtom: number): paper.Group => {
	const face = new paper.Path({
		segments: [
			new paper.Point(xTop, y),
			new paper.Point(100 - xTop, y),
			new paper.Point(100 - xButtom, 100 - y),
			new paper.Point(xButtom, 100 - y)
		],
		closed: true,
		strokeColor: DEFAULT_COLOR,
		strokeWidth: 4
	});

	const eyes = [65.5, 35.5].map(
		(x) =>
			new paper.Path({
				segments: [
					[x, 45],
					[x, 55]
				],
				strokeColor: DEFAULT_COLOR,
				strokeWidth: 8,
				strokeCap: 'round'
			})
	);

	return new paper.Group([face, ...eyes]);
};

export const generateAvatarSymbols = (): paper.SymbolDefinition[] => {
	const symbols: paper.SymbolDefinition[] = [];

	FACE_VARIATION.forEach((y) =>
		FACE_VARIATION.forEach((xTop) =>
			FACE_VARIATION.forEach((xBottom) =>
				symbols.push(new paper.SymbolDefinition(drawAvatar(y, xTop, xBottom)))
			)
		)
	);

	return symbols;
};
