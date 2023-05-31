import puppeteer from "puppeteer";
import * as fs from "fs";
import PDFMerger = require("pdf-merger-js");

async function getURls() {
  console.log("getting Urls...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://tfg-docs.vercel.app/", {
    waitUntil: "networkidle0",
  });

  const links: string[] = await page.evaluate(() => {
    const linkElements = document.querySelectorAll("ol a");
    const links = Array.from(linkElements).map((element) => element["href"]);
    return links;
  });
  await browser.close();
  links.unshift("https://tfg-docs.vercel.app/");

  console.log(links);

  return links;
}

async function generatePDF(url: string, outputPath: string) {
  console.log("Generating pdf with url:", url);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    margin: { bottom: 10, left: 10, right: 10, top: 10 },
  });
  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
}

async function mergePDFs(inputPaths: string[], outputPath: string) {
  console.log("Mergin PDFs...");
  let merger = new PDFMerger();
  for (let key in inputPaths) {
    await merger.add(inputPaths[key]);
  }

  await merger.save(outputPath);
  const mergedPdfBuffer = await merger.saveAsBuffer();

  fs.writeFileSync(outputPath, mergedPdfBuffer);
}

async function main(outputPath: string) {
  const urls = await getURls();

  let outputPaths: string[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    await generatePDF(url, `output/${i}.pdf`);
    outputPaths.push(`output/${i}.pdf`);
  }
  await mergePDFs(outputPaths, outputPath);
}

main("result.pdf");
