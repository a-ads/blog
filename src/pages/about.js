import React from 'react'
import Layout from '../layouts/index'

export default () => (
  <Layout>
    <article className='c-blog-post c-blog-post--static-page'>
      <div className='l-blog-post-container'>
        <section className='c-blog-post__header'>
          <h1 className='c-blog-post__title'>
            About A-ADS
          </h1>
        </section>
        <section className='c-blog-post__body'>
          <div className='c-blog-post__body__container'>
            <p>
              <strong>A-ADS</strong> (Anonymous Ads) is a bitcoin online advertising 
              network that doesn’t collect personal data.
            </p>
            <p>
              We believe there is a growing market for alternative 
              online advertising that is efficient for advertisers while 
              preserving users' privacy. That is why our ads neither 
              contain scripts nor use cookies and they can be safely 
              embedded anywhere.
            </p>
            <p>
              Our scalable infrastructure comprises dozens of servers 
              which deliver circa <strong>119</strong> million ad impressions a day to 
              visitors from all over the world.
            </p>
            <p>
              A-ADS offers transparent statistics, automated bitcoin 
              transactions, and diverse traffic from thousands of sites 
              and applications. It takes less than a minute to create 
              a new advertising campaign. No registration required,&nbsp;
              <a href='https://a-ads.com/campaigns/new' target='_blank' rel='noopener noreferrer'>try it yourself!</a>
              <br /><br />
            </p>
          </div>
        </section>
      </div>
    </article>
  </Layout>
)
