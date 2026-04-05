interface Municipality {
    municipalityName: string
}

function exampleAction({ municipalityName }: Municipality): void {
    console.log(`Doing stuff on ${municipalityName}...`);
    setTimeout(() => {
	console.log("Done!")
    }, 3000)
}

export default exampleAction;
