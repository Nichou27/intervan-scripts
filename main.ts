import deleteMatrix from "@scripts/delete-matrix.ts"
import Animana from "@municipalities/municipalities.ts"
import { Command } from "commander"
import exampleAction from "@scripts/example-action.ts"

async function main(): Promise<void> {
    const program = new Command();

    program
	.name("intervan-scripts")
	.version("0.1.0")
	.description("A CLI tool for automating some tedious manual labor related to accounting");
    
    program
	.option("-m, --municipality <name>", "The name of the Municipality where you want the automation to work on")
	.option("-a, --action <name>", "The name of the action you want to perform");
    
    program.parse();
    
    const options = program.opts();
    if (options.municipality === undefined || options.action === undefined) {
	throw new Error("You must provide a municipality and and action. Run --help for more information")
    }
    const municipalityString = options.municipality.toLowerCase();
    const actionString = options.action.toLowerCase();
    
    switch(true) {
	case (municipalityString === "animana" && actionString === "delete-matrix"):
	    deleteMatrix(Animana);
	    break;
	case (municipalityString === "animana" && actionString === "example-action"):
	    exampleAction({ municipalityName: "Animana" });
	    break;
	case (options.debug):
	    console.log(options);
	default:
	    console.error("Please enter a valid input")
    }
}

main();
