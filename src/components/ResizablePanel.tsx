import React, { useState } from 'react';
import { Box } from '@mui/material';
import FlatChart from './FlatChart';
import TreeView from './TreeView';
import FolderForm from './FolderForm';
import { Folder } from '../utils/folderUtils'; // Импортируем тип Folder

interface ResizablePanelProps {
  setPanelWidth: React.Dispatch<React.SetStateAction<number>>;
  panelWidth: number;
  addFolder: (folderName: string) => void;
  folders: Folder[];  // Передаем список папок
  addSubfolder: (parentFolderName: string, subfolderName: string) => void;
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({ setPanelWidth, panelWidth, addFolder, folders, addSubfolder }) => {
  const [width, setWidth] = useState(panelWidth); // Начальная ширина панели

  // Обработчик начала изменения ширины
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(
        Math.min(startWidth + (moveEvent.clientX - startX), 500), // Максимальная ширина 500px
        100 // Минимальная ширина 100px
      );
      setPanelWidth(newWidth);
      setWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Box
      sx={{
        width: `${width}px`,
        backgroundColor: '#ffffff',
        color: 'black', // Сделал текст черным для контраста
        position: 'relative',
        cursor: 'col-resize',
        overflow: 'auto',
        padding: 2,
      }}
    >
      <FlatChart />
      <FolderForm
        addFolder={addFolder}
        existingFolders={folders.map((folder) => folder.name)} 
        existingSubfolders={folders.map((folder) => folder.subfolders.map(subfolder => subfolder.name))}
      />
      <TreeView folders={folders} addSubfolder={addSubfolder} />
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '10px',
          cursor: 'col-resize',
          backgroundColor: '#3498db',
        }}
      />
    </Box>
  );
};

export default ResizablePanel;
