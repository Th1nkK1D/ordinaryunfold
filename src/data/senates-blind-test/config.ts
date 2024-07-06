export const IMAGES_DIR = 'images';
export const TEXTS_DIR = 'texts';
export const PROVINCE_CANDIDATES_OUTPUT = 'candidates-semifinal.csv';
export const NATIONAL_CANDIDATES_OUTPUT = 'candidates-final.csv';

export const CANDIDATES_URL =
	'https://github.com/PanJ/senate67/raw/main/district-candidates-round3-1718623978749.json';

// Generated with quicktype
export interface OfficialCandidate {
	mno: number;
	title: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	post_title: null;
	flag_title: number;
	age: number;
	province: number;
	district: number;
	job_group: number;
	image_url: string;
	pdf_url: string;
	status_pass: number;
}
