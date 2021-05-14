declare module '*/speeches.csv' {
	declare const speeches: Array<{
		date: string;
		quote: string;
		speaker: string;
		note?: string;
		source: string;
		url: string;
	}>;

	export = speeches;
}

declare module '*/speakers.csv' {
	declare const speakers: Array<{
		id: string;
		name: string;
		position: string;
	}>;

	export = speakers;
}

declare module '*/news.csv' {
	declare const news: Array<{
		date: string;
		content: string;
		source: string;
		url: string;
	}>;

	export = news;
}
