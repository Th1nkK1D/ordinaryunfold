import paper from 'paper/dist/paper-core';
import { BACK_HAIR, FACES, FRONT_HAIR } from './variation.json';

const DEFAULT_COLOR = new paper.Color('#404040');
const BG_COLOR = new paper.Color('#171717');

function randomPickIn<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

export const drawAvatar = (): paper.Group => {
	const paths = [
		...randomPickIn(BACK_HAIR).map((d) => new paper.Path(d)),
		new paper.Path(randomPickIn(FACES)),
		new paper.Path(randomPickIn(FRONT_HAIR))
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
