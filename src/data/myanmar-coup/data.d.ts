declare module '*/recent-fatality.csv' {
	declare const recentFatality: Array<{
		id: string;
		sex?: string;
		age?: string;
		dateOfIncident: string;
		organization?: string;
		remarks?: string;
	}>;

	export = recentFatality;
}
