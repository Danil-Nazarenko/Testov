import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { Link } from '@tanstack/react-router';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const menuItems = [
  { path: '/', icon: <HomeIcon />, tooltip: 'Главная' },
  { path: '/chart', icon: <BarChartIcon />, tooltip: 'График' },
  { path: '/tree', icon: <FolderIcon />, tooltip: 'Дерево' },
  { path: '/create-folder', icon: <CreateNewFolderIcon />, tooltip: 'Создать папку' }
];

const Menu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = (path: string) => {
    setActiveItem(path);
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 100,
      bgcolor: 'background.paper',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    }}>
      <List sx={{ p: 0, m: 0 }}>
        {menuItems.map(({ path, icon, tooltip }) => (
          <Tooltip key={path} title={tooltip} placement="right">
            <ListItemButton
              component={Link}
              to={path}
              onClick={() => handleClick(path)}
              sx={{
                justifyContent: 'center',
                backgroundColor: activeItem === path ? 'white' : '#3498db', // Синий фон по умолчанию
                color: activeItem === path ? '#3498db' : 'white', // Белая иконка при активной кнопке
                padding: 0, // Убираем отступы
                minWidth: '48px', // Устанавливаем фиксированную ширину кнопки для квадратной формы
                height: '48px', // Фиксируем высоту
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: activeItem === path ? 'white' : '#2980b9', // Более темный синий при наведении
                  color: '#3498db',
                },
                '&:active': {
                  backgroundColor: '#2980b9',  // Темно-синий фон при нажатии
                  color: 'white',  // Белая иконка при нажатии
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
                {icon}
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Menu;

