import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import ResizablePanel from './ResizablePanel';
import Menu from './Menu';
import { Folder, addFolder, addSubfolder } from '../utils/folderUtils';

const Layout = () => {
  const [panelWidth, setPanelWidth] = useState(300); // Начальная ширина панели
  const [folders, setFolders] = useState<Folder[]>([]); // Массив папок

  // Функция для добавления папки
  const handleAddFolder = (folderName: string) => {
    setFolders((prevFolders) => addFolder(prevFolders, folderName));
    console.log('Добавлена папка:', folderName);
  };

  // Функция для добавления подпапки
  const handleAddSubfolder = (parentFolderName: string, subfolderName: string) => {
    setFolders((prevFolders) => addSubfolder(prevFolders, parentFolderName, subfolderName));
    console.log(`Добавлена подпапка в ${parentFolderName}: ${subfolderName}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', userSelect: 'none'}}>
      {/* Закрепленное меню слева */}
      <Box
        sx={{
          width: '50px', // Фиксированная ширина меню
          backgroundColor: '#3498db',
          borderRight: '1px solid #ccc',
          overflow: 'auto',
          padding: 0,
          margin: 0,
        }}
      >
        <Menu />
      </Box>

      {/* Ресайзабельная панель */}
      <ResizablePanel
        setPanelWidth={setPanelWidth}
        panelWidth={panelWidth}
        addFolder={handleAddFolder} // Используем функцию для добавления папок
        folders={folders} // Передаем папки
        addSubfolder={handleAddSubfolder} // Передаем функцию добавления подпапок
      />

      {/* Основной контент */}
      <Box
        sx={{
          flex: 1, // Занимает оставшуюся ширину
          overflow: 'auto', // Прокрутка, если содержимое выходит за пределы
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;


