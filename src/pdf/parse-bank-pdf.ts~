import fs from "node:fs/promises"
import { PDFParse, type TextResult } from "pdf-parse"

export interface Movements {
    date: string,
    amount: number,
    description: string
}

async function parseBankPDF(path: string): Promise<void> {
    if (!path || typeof path !== "string") {
	throw new Error("You must enter a valid, non-empty path");
    } 

    let fileBuffer;
    try {
	fileBuffer = await fs.readFile(path);
    } catch (error) {
	throw new Error(`Error reading pdf file at ${path}: ${error}`);
    }

    let text : string;
    try {
	const parser = new PDFParse(new Uint8Array(fileBuffer));
	const data: TextResult = await parser.getText();
	text = data.text;
    } catch(error) {
	throw new Error(`Error parsing file: ${error}`);
    }

    const textArray = text
	.split("\n")
	.filter((line) => {
	    const datePattern: RegExp =
		/(?:\d{1,2}\/\d{1,2}\/\d{2,4})\s(?:\D+\s)+(?:\d+\s)+/
	    if (line.match(datePattern)) return true;
	});
    
    let movements: Movements[] = [];
    for (const rawMovement of textArray) {
	console.log(rawMovement);
	const sectionedLine = new Array(3);
	sectionedLine[0] = rawMovement.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}/);
	sectionedLine[1] = "";
	sectionedLine[2] = 0;
	
	if (sectionedLine.length > 3) {
	    throw new Error(`Error parsing line ${sectionedLine}`);
	}
	
	let movement = {
	    date: sectionedLine[0] || "",
	    description: sectionedLine[1] || "",
	    amount: sectionedLine[2] || 0
	}
	movements.push(movement as Movements);
    }
    
    //console.log(movements);
}


export default parseBankPDF;
