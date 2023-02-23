/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const SquareShow = ({title, data, symbol = '', deg }) => {
  return (
    <div className="d-flex flex-column shadow rounded-2 border border-secondary p-3 me-1 mini-info">
      <p className="text-muted mb-0">{ title.toUpperCase() }</p>
      <strong>
        { `${data} ${symbol}`}

        { deg && <FontAwesomeIcon icon={solid('arrow-up')} css={css`
          transform: rotate(${deg}deg);
          margin-left: 0.3rem;
        `} />}
      </strong>
    </div>
  );
}

export default SquareShow;