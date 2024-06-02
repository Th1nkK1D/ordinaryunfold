export interface Match {
	id: string;
	league: string;
	kickoffAt: number;
	status: string;
	teams: string[];
	scores: { [minutes: string]: string };
	url: string;
}

export type Result = 'W' | 'D' | 'L';

export type TeamStats = Record<Result, number[]> & {
	name: string;
	points: number;
	GD: number;
};

export interface LeagueStats {
	timeScale: string[];
	teams: TeamStats[];
}
