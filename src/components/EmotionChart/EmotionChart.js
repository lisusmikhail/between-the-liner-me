import React, {useEffect, useState} from 'react';
import {
  PieChart, Pie, Cell, LabelList,
} from 'recharts';
import colorPicker from '../../utils/colorPicker';

function EmotionChart({data, screenWidth}) {
  
  const [dimensions, setDimensions] = useState(500);
  const [fontSize, setFontSize] = useState('16');
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
                                   cx,
                                   cy,
                                   midAngle,
                                   innerRadius,
                                   outerRadius,
                                   percent,
                                   index,
                                 }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
        <text
            x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central' fontSize={fontSize}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
  };
  
  useEffect(() => {
    if (screenWidth >= 768) {
      setDimensions(500);
      setFontSize('14');
    } else if (screenWidth < 768 && screenWidth >= 450) {
      setDimensions(450);
      setFontSize('13');
    } else {
      setDimensions(300);
      setFontSize('11');
    }
  }, [screenWidth]);
  
  return (
      <PieChart className='pie-chart' width={dimensions} height={dimensions}>
        <Pie
            data={data}
            cx={dimensions / 2}
            cy={dimensions / 2}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={dimensions * 0.3}
            fill='#8884d8'
            dataKey='value'
        >
          <LabelList
              dataKey='name'
              position='outside'
              style={{stroke: '#0000', fontSize: fontSize}}
          />
          {
            data.map((entry, index) => {
              const color = colorPicker(entry)
              return <Cell key={`cell-${index}`} fill={color}/>;
            })
          }
        </Pie>
      </PieChart>
  );
}

export default EmotionChart;
