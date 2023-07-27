import { Plugin, TFolder } from "obsidian";

export default class GitKeepPlugin extends Plugin {
  async onload() {
    // Traverse the vault on plugin load
    const vault = this.app.vault;
    const rootFolder = vault.getRoot();
    await this.traverseFolder(rootFolder);
  }

  async traverseFolder(folder: TFolder) {
    // Iterate through each item in the folder
    for (const item of folder.children) {
      if (item instanceof TFolder) {
        // If it's a subfolder, recursively traverse it
        await this.traverseFolder(item);
      }
    }

    // Check if the folder is empty and create .gitkeep if it is
    if (folder.children.length === 0 && folder.name) {
      await this.createGitKeepFile(folder);
    }
  }

  async createGitKeepFile(folder: TFolder) {
    this.app.vault.create(folder.path + "/" + folder.name, ".gitkeep");
    //await this.app.vault.modify(gitKeepFile, ''); // You can optionally add content to the .gitkeep file if needed.
  }
}
