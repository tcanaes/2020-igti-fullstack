import React from 'react';
//import css from './rate.module.css';

export default function Stars({ rate }) {
  let rateStars = [];
  for (let i = 0; i < 10; i++)
    rateStars.push({
      id: `star-${i}`,
      star: i < rate ? 'star' : 'star_border',
    });

  return rateStars.map((star) => {
    return (
      <i
        key={star.id}
        style={{ color: 'orange' }}
        className="small material-icons"
      >
        {star.star}
      </i>
    );
  });
}
