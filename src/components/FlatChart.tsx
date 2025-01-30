import { Box } from '@mui/material';
import React, { useState } from 'react';

const data = [
  { name: 'Красная секция', value: 60, color: '#ff3333' },
  { name: 'Зелёная секция', value: 40, color: '#33cc33' },
  { name: 'Синяя секция', value: 20, color: '#3399ff' },
];

const FlatChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setTooltip(`Количество элементов: ${data[index].value}`);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setTooltip(null);
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        height: '20px',
        position: 'relative',
      }}
    >
      {data.map((section, index) => {
        const sectionWidth = (section.value / totalValue) * 100;
        return (
          <Box
            key={index}
            style={{
              width: `${sectionWidth}%`,
              backgroundColor: section.color,
              opacity: activeIndex === index ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
      {tooltip && (
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '11px',
            pointerEvents: 'none',
            backgroundColor: 'rgba(34, 32, 32, 0.23)',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          {tooltip}
        </Box>
      )}
    </Box>
  );
};

export default FlatChart;


