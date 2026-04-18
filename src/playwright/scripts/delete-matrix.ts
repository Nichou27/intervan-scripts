import { chromium } from "playwright"

export interface URLs {
    loginUrl: string;
    expensesMatrixUrl: string;
    resourcesMatrixUrl: string; 
}

async function deleteMatrix({ loginUrl, expensesMatrixUrl, resourcesMatrixUrl }: URLs): Promise<void> {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    page.on("dialog", async (dialog) => {
	await dialog.accept();
    })

    await page.goto(loginUrl);
    await page.locator("#ef_form_1000689_datosusuario").fill("admin");
    await page.locator("#ef_form_1000689_datosclave").fill("Intervan.2022");
    await page.locator("#form_1000689_datos_ingresar").click();
    await page.waitForLoadState();
    await page.goto(expensesMatrixUrl);
    await page.waitForLoadState()
   
    const totalItemsString: string = await page.locator("#cuerpo_js_cuadro_109000420_cuadro").locator(".ei-cuadro-pag-total").innerText();
    const regex: RegExp = /[0-9]/g;
    const totalItemsArray = totalItemsString.match(regex);
    if (totalItemsArray === null || totalItemsArray.length === 0) {
	throw new Error("There are no matrixes to delete")
    }
    const totalItemsNumber = Number(totalItemsArray.join(""));
    console.log(totalItemsNumber);
    for (let i = 0; i < totalItemsNumber; i++) {
	await page.locator("#cuadro_109000420_cuadro0_seleccion").click();
	await page.locator("#ci_109000416_eliminar").click();	
	await page.waitForLoadState();
    }

    await page.goto(resourcesMatrixUrl);
    await page.waitForLoadState();
    
    for (let i = 0; i < totalItemsNumber; i++) {
	await page.locator("#cuadro_109000429_cuadro0_seleccion").click();
	await page.locator("#ci_109000425_eliminar").click();
	await page.waitForLoadState();
    }
    browser.close();
}

export default deleteMatrix;
