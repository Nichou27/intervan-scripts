import deleteMatrix from "@scripts/delete-matrix.ts"
import Animana from "@municipalities/animana.ts"
import { Command } from "commander"
import exampleAction from "@scripts/example-action.ts"
import parseBankPDF from "@pdf/parse-bank-pdf.ts"

async function main(): Promise<void> {
    const program = new Command();

    program
	.name("intervan-scripts")
	.version("0.1.0")
	.description("A CLI tool for automating some tedious manual labor related to accounting");
    
    program
	.option("-m, --municipality <name>", "The name of the Municipality where you want the automation to work on")
	.option("-a, --action <name>", "The name of the action you want to perform")
	.option("-d, --date <name>", "Name of the month you want to perform the action on")
	.option("-n, --account-number <number>", "The abbreviated number of the account you want to perform the action on");
    
    program.parse();
    
    const options = program.opts();
    if (options.municipality === undefined || options.action === undefined) {
	throw new Error("You must provide a municipality and an action. Run --help for more information")
    }
    
    const municipalityString = options.municipality.toLowerCase();
    const actionString = options.action.toLowerCase();
    const accountNumber = options.accountNumber;
    const month = options.date;
    
    switch(true) {
	case (municipalityString === "animana" && actionString === "delete-matrix"):
	    await deleteMatrix(Animana);
	    break;
	case (municipalityString === "animana" && actionString === "example-action"):
	    exampleAction({ municipalityName: "Animana" });
	    break;
	case (municipalityString === "fernandez-oro" && actionString === "parse-bank-pdf" && accountNumber === "1588" && month === "january"):
	    await parseBankPDF("C:/Users/Usuario/Desktop/FernandezOro/1588/90000158800-Enero.pdf");
	    break;
	case (municipalityString === "fernandez-oro" && actionString === "parse-book-pdf" && accountNumber === "1588" && month === "january"):
	    await parseBankPDF("C:/Users/Usuario/Desktop/FernandezOro/1588/libro-banco-foro-Enero.pdf");
	    break;
	case (municipalityString === "fernandez-oro" && actionString === "parse-bank-pdf" && accountNumber === "1588" && month === "february"):
	    await parseBankPDF("C:/Users/Usuario/Desktop/FernandezOro/1588/90000158800-Febrero.pdf");
	    break;
	case (municipalityString === "fernandez-oro" && actionString === "parse-book-pdf" && accountNumber === "1588" && month === "february"):
	    await parseBankPDF("C:/Users/Usuario/Desktop/FernandezOro/1588/libro-banco-foro-febrero.pdf");
	    break;
	case (options.debug):
	    console.log(options);
	    break;
	default:
	    console.error("Please enter a valid input")
    }
}

main();
