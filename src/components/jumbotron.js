import React from 'react';

export default () => ( //TODO: rename to jumbotron
  <div className='c-big-card'>
    <div className='c-big-card__image-container'>
      <img src='/images/img-main.png' alt='img main'/>
    </div>
    <div className='c-big-card__text-container l-container'>
      <a href='#'>
        <div className='c-big-card__text'>
          <div className='c-big-card__text__category'>
              Customer Support
          </div>
          <div className='c-big-card__text__title h1-like'>
            Putting $125M to work
            for you, our customers
          </div>
          <div className='c-big-card__text__description'>
            We just raised $125M in a round led by Mary Meeker at Kleiner 
            Perkins. Here’s what we’re going to do with it.
          </div>
        </div>
      </a>
    </div>
  </div>
)
