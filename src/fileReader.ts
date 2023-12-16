import { promises as fs } from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { processCodeWithOpenAI } from './openAIIntegration';


export async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
	const files = await fs.readdir(dirPath);
  
	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const stat = await fs.stat(filePath);
  
		if (stat.isDirectory()) {
			arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
		} else {
			arrayOfFiles.push(filePath);
		}
	}
	console.log('file system read, returning, this is the array of files: ', arrayOfFiles);
	return arrayOfFiles;
  }


  export async function readProjectFiles(): Promise<void> {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (workspaceFolders) {
		const projectRoot = workspaceFolders[0].uri.fsPath;
		const allProjectFiles = await getAllFiles(projectRoot);

		for (const file of allProjectFiles) {
		try {
			const filesContent = await fs.readFile(file, 'utf8');
			for (const content of filesContent) {
				const processedContent = await processCodeWithOpenAI('apiKey', content);
				console.log(processedContent);
				// Handle the processed content
			}
			// Process file content as needed
		} catch (error) {
			console.error(`Error reading file ${file}:`, error);
		}
		}
	}
}