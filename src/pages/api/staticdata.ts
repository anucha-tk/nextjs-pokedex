import { promises as fs } from "node:fs";
import path from "node:path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd(), "data");
	//Read the json data file data.json
	const fileContents = await fs.readFile(`${jsonDirectory}/en.json`, "utf8");
	//Return the content of the data file in json format
	res.status(200).json(fileContents);
}
