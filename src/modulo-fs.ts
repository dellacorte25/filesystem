import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";

export default () => {
  const workDir = process.cwd();
  const fullDir = path.join(workDir, "documenti");
  
  console.log(`| - ${path.basename(fullDir)}`);

  function listAll(directoryPath: string) {
    try {
      const folders = fs.readdirSync(directoryPath, { withFileTypes: true });
  
      for (const folder of folders) {
        const fullPath = path.join(directoryPath, folder.name);
        const stats = fs.statSync(fullPath);

        let modDate = DateTime.fromMillis(stats.mtimeMs)
        console.log(`| - ${folder.name} (${modDate.setLocale("it").toFormat("m")} minuti fa)`);

        if (folder.isDirectory()){
          listAll(fullPath)
        }
      }
    } catch (error) {
      console.error("Errore durante la visualizzazione delle sottocartelle");
    }
  }
  
  listAll(fullDir);
}