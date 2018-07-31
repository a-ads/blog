import React from 'react';

export default ({
  title,
  category,
  thumbnail,
  description,
  link
}) => ( //TODO: rename to jumbotron
  <div className='c-big-card'>
    <div className='c-big-card__image-container'>
      <img src={thumbnail} alt='title'/>
    </div>
    <div className='c-big-card__text-container l-container'>
      <a href={link}>
        <div className='c-big-card__text'>
          <div className='c-big-card__text__category'>
            {category}
          </div>
          <div className='c-big-card__text__title h1-like'>
            {title}
          </div>
          <div className='c-big-card__text__description'>
            {description}
          </div>
        </div>
      </a>
    </div>
  </div>
)
