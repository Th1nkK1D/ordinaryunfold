// Require https://github.com/tesseract-ocr/tesseract
import { IMAGES_DIR, TEXTS_DIR } from './config';
import { $ } from 'bun';
import { readdirSync } from 'fs';

const images = readdirSync(IMAGES_DIR).filter((file) => file.endsWith('.jpg'));

console.log(`Found ${images.length} images`);

for (const image of images) {
	const output = `${TEXTS_DIR}/${image.replace('.jpg', '')}`;

	if (!(await Bun.file(output + '.txt').exists())) {
		console.log(image + '...');
		await $`tesseract ${IMAGES_DIR}/${image} ${output} -l tha+eng -c preserve_interword_spaces=1`;
	}
}
