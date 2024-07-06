# Senates Blind Test's Datasets

## Files

- [candidates-final.csv](candidates-final.csv) : 799 candidates in the final round
  - Include education and experience OCR results from the introduction paper using [Tesseract](https://github.com/tesseract-ocr/tesseract) with basic manual cleaning.
  - Provinces and districts name were parsed.
  - The actual candidates number is 800 according to the rule (and from the [iLaw's observation](https://docs.google.com/spreadsheets/d/1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ/edit)), however `นาย วันชัย พวยไพบูลย์ กลุ่ม 6 จาก สุพรรณบุรี` is missing from the [semi-final candidates list from the Election Commission of Thailand](https://github.com/PanJ/senate67/blob/main/district-candidates-round3-1718623978749.json), thus no introduction document was found. Still no clue of what happened.
- [candidates-semifinal.csv](candidates-semifinal.csv) : 3000 candidates in the semi-final round
  - Also include education and experience OCR results but without any further cleaning.
  - Provinces and districts are ID number as described [here](https://github.com/PanJ/senate67/blob/main/province-districts.json).
- [interesting-winners.csv](interesting-winners.csv) : Final candidates whose I think their introduction is interesting. -[job-groups.json](job-groups.json) : Job group's id and name

## Sources

- [PanJ/Senate67](https://github.com/PanJ/senate67)
- [iLaw](https://docs.google.com/spreadsheets/d/1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ/edit)
