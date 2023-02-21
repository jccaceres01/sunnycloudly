/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import WeatherIcon from './WeatherIcon';
import { tempConverter } from '../../utils/convertion';

const ResumeView = ({dt, icon, temp}) => {
  return <div className="card border border-primary shadow-sm p-0 mx-1 my-1" css={css`
          min-width: 6rem;
        `}>
          <div className="card-body d-flex flex-column align-items-center justify-content-center p-0 bg-secondary text-white">
            <p className="p-0 m-0">{ new Date(dt * 1000).toDateString().substring(0, 10) }</p>
            <p className="p-0 m-0">{ new Date(dt * 1000).toTimeString().substring(0, 5) }</p>
            <WeatherIcon icon={icon} size={2} className="border border-primary rounded-circle shadow bg-primary" css={css`max-width: 32px`} />
            <p className="">{ tempConverter(temp, 'c') }</p>
          </div>
        </div>
}

export default ResumeView;