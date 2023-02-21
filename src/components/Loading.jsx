import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Loading = ({busy}) => {
  if (busy) {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={solid('spinner')} spin />
      </React.Fragment>
    )
  }
}

export default Loading;