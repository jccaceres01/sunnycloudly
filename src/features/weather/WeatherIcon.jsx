import React from 'react';
import { config } from '../../config';

const WeatherIcon = ({icon, size, className }) => {
  return (
    <React.Fragment>
      <img src={`${config.baseImgUrl}/${icon}@${size}x.png`} alt="" className={className} />
    </React.Fragment>
  );
}

export default WeatherIcon;