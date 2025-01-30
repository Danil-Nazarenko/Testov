import React, { useState } from 'react';
import { TextField, Button, Alert, Box } from '@mui/material';

interface FolderFormProps {
  addFolder: (folderName: string) => void;
  existingFolders: string[]; // Добавляем список существующих папок
  existingSubfolders: string[][]; // Добавляем список подпапок для каждой папки
}

const FolderForm: React.FC<FolderFormProps> = ({ addFolder, existingFolders, existingSubfolders }) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!folderName.trim()) {
      setError('Имя папки не может быть пустым!');
      return;
    }

    if (existingFolders.includes(folderName)) {
      setError('Папка с таким именем уже существует!');
      return;
    }

    // Проверяем на совпадение с подпапками
    for (let i = 0; i < existingSubfolders.length; i++) {
      if (existingSubfolders[i].includes(folderName)) {
        setError('Подпапка с таким именем уже существует в одной из папок!');
        return;
      }
    }

    addFolder(folderName);
    setFolderName('');
    setError('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Имя новой папки"
        variant="outlined"
        fullWidth
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ width: '100%' }}>
        Создать папку
      </Button>
    </Box>
  );
};

export default FolderForm;


