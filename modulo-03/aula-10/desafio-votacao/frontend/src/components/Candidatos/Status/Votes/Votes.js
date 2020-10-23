import React from 'react';
import CountUp from 'react-countup';
import { formatNumber } from '../../../../utils/formatter';
import css from './votes.module.css';

// export default function Votes({ votes }) {
//   return (
//     <div className={`${css.votesContainer}`}>
//       <p>{votes}</p>
//     </div>
//   );
// }

export default function Votes({ votes }) {
  return (
    <div className={`${css.votesContainer}`}>
      <CountUp start={votes - 100} end={votes} duration={0.75} separator=".">
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
