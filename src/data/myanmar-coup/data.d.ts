declare module '*/recent-fatality.csv' {
	declare const recentFatality: Array<{
		sex?: string;
		age?: string;
		dateOfIncident: string;
		organization?: string;
	}>;

	export = recentFatality;
}
