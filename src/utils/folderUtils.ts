export interface Subfolder {
  name: string;
  subfolders: Subfolder[]; // Массив для вложенных подпапок
}

export interface Folder {
  name: string;
  subfolders: Subfolder[]; // Массив для подпапок
}

// Функция для добавления новой папки
export const addFolder = (folders: Folder[], folderName: string): Folder[] => {
  const newFolder: Folder = { name: folderName, subfolders: [] };
  return [...folders, newFolder];
};

// Функция для добавления подпапки
export const addSubfolder = (
  folders: Folder[], 
  parentFolderName: string, 
  subfolderName: string, 
  parentSubfolderName?: string
): Folder[] => {
  const addToSubfolder = (folders: Folder[], parentFolderName: string, parentSubfolderName?: string): Folder[] => {
    return folders.map(folder => {
      if (folder.name === parentFolderName) {
        // Если подпапка уже существует
        if (parentSubfolderName) {
          // Находим подпапку и добавляем новую подпапку в её массив
          const parentSubfolder = folder.subfolders.find(subfolder => subfolder.name === parentSubfolderName);
          if (parentSubfolder) {
            parentSubfolder.subfolders.push({ name: subfolderName, subfolders: [] });
          }
        } else {
          // Добавляем подпапку в корневой список
          folder.subfolders.push({ name: subfolderName, subfolders: [] });
        }
      } else {
        // Иначе рекурсивно ищем в подпапках
        folder.subfolders = addToSubfolder(folder.subfolders, parentFolderName, parentSubfolderName);
      }
      return folder;
    });
  };

  // Возвращаем обновлённый список папок
  return addToSubfolder(folders, parentFolderName, parentSubfolderName);
};

