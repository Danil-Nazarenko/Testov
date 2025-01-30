import React, { useState } from 'react';
import { Folder as FolderIcon, FolderOpen } from '@mui/icons-material';
import { Box, Button, List, ListItem, ListItemText, TextField, Alert } from '@mui/material'; // Добавлен импорт Alert
import { Folder } from '../utils/folderUtils';

interface TreeViewProps {
  folders: Folder[];
  addSubfolder: (parentFolderName: string, subfolderName: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ folders, addSubfolder }) => {
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [inputVisible, setInputVisible] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState('');

  // Переключение отображения подпапок
  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Отображение / скрытие поля ввода для подпапки
  const toggleInput = (folderName: string) => {
    setInputVisible((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Обработка ввода имени подпапки
  const handleInputChange = (folderName: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [folderName]: value,
    }));
  };

  // Добавление подпапки с проверкой
  const handleAddSubfolder = (folderName: string) => {
    const subfolderName = inputValues[folderName];

    // Проверка на наличие подпапки с таким именем в текущей папке
    const existingSubfolder = folders.find(
      (folder) => folder.name === folderName
    )?.subfolders.some((subfolder) => subfolder.name === subfolderName);

    if (!subfolderName.trim()) {
      setError('Имя подпапки не может быть пустым!');
      return;
    }

    if (existingSubfolder) {
      setError('Подпапка с таким именем уже существует в этой папке!');
      return;
    }

    addSubfolder(folderName, subfolderName);
    setInputValues((prev) => ({ ...prev, [folderName]: '' }));
    setInputVisible((prev) => ({ ...prev, [folderName]: false }));
    setError('');
  };

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>} {/* Отображение ошибки с использованием Alert */}
      <List>
        {folders.map((folder) => (
          <Box key={folder.name} sx={{ marginLeft: '20px' }}>
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => toggleFolder(folder.name)}>
                  {expandedFolders[folder.name] ? (
                    <FolderOpen sx={{ color: '#1976d2' }} />
                  ) : (
                    <FolderIcon sx={{ color: '#1976d2' }} />
                  )}
                </Button>
                <ListItemText primary={folder.name} sx={{ marginLeft: '10px', color: 'black' }} />
              </Box>
              <Button onClick={() => toggleInput(folder.name)}>➕</Button>
            </ListItem>

            {/* Поле ввода для подпапки */}
            {inputVisible[folder.name] && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Название подпапки"
                  value={inputValues[folder.name] || ''}
                  onChange={(e) => handleInputChange(folder.name, e.target.value)}
                />
                <Button onClick={() => handleAddSubfolder(folder.name)}>✅</Button>
              </Box>
            )}

            {/* Рекурсивный вызов для вложенных папок */}
            {expandedFolders[folder.name] && folder.subfolders.length > 0 && (
              <TreeView folders={folder.subfolders} addSubfolder={addSubfolder} />
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default TreeView;
