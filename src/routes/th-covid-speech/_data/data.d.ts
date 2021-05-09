declare module '*/speeches.csv' {
	declare const speeches: Array<{
		date: string;
		quote: string;
		speaker: string;
		note?: string;
		reference: string;
	}>;

	export = speeches;
}

declare module '*/speakers.csv' {
	declare const speakers: Array<{
		name: string;
		position: string;
	}>;

	export = speakers;
}