import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import {
  PieChart, Pie, Cell, LabelList,
} from 'recharts';
import colorPicker from '../../utils/colorPicker';
import './EmotionChart.css'

function EmotionChart({data, screenWidth, chartLoader}) {

  const [dimensions, setDimensions] = useState({height: 400, width: 640});
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
    if (screenWidth > 768) {
      setDimensions({height: 260, width: 740});
      setFontSize('18');
    } else if (screenWidth <= 768 && screenWidth >= 701) {
      setDimensions({height: 260, width: 600});
      setFontSize('13');
    }else if (screenWidth <= 700 && screenWidth >= 450) {
        setDimensions({height: 240, width: 400});
        setFontSize('13');
    }
    else {
      setDimensions({height: 180, width: 280});
      setFontSize('11');
    }
  }, [screenWidth]);

  return (
      <div className='chart-container'>
          {chartLoader && <Loader
              className='chart-container__loader'
              type='TailSpin'
              color='#fd9854'
              height={100}
              width={100}
              timeout={20000}
          />}
      <PieChart  width={dimensions.width}  height={dimensions.height} backgroundColor={'#fff'}>
        <Pie
            data={data}
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={dimensions.height * 0.4}
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
      </div>
  );
}

export default EmotionChart;
