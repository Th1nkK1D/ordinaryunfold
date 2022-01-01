import paper from 'paper';

export const createPinDefinition = (): paper.SymbolDefinition => {
	const pinStem = new paper.Path.Line(new paper.Point(0, 0), new paper.Point(0, -20));
	pinStem.strokeColor = 'black';

	const pinHead = new paper.Path.Circle(new paper.Point(0, -20), 5);
	pinHead.fillColor = '#C62828';

	return new paper.SymbolDefinition(new paper.Group([pinStem, pinHead]));
};
