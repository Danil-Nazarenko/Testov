import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Красная секция', value: 400 },
  { name: 'Зелёная секция', value: 300 },
  { name: 'Синяя секция', value: 200 },
];

const FlatChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const colors = ['#ff3333', '#33cc33', '#3399ff']; // Яркие цвета для секций

  return (
    <ResponsiveContainer width="100%" height="33%">
      <BarChart data={data}>
        <XAxis dataKey="name" tick={{ fill: '#333' }} />
        <YAxis tick={{ fill: '#333' }} />
        <Tooltip
          formatter={(value) => [`Значение: ${value}`, 'Элементов']}
          labelFormatter={(label) => `Секция: ${label}`}
        />
        <Bar
          dataKey="value"
          onMouseEnter={(_, index) => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={activeIndex === index ? colors[index] : `${colors[index]}90`} // Прозрачность для неактивных ячеек
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FlatChart;

