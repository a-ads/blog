import React from 'react'

import AadsServices from '../components/aads-services'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <article className='c-blog-article'>
        <section className='c-blog-article__header'>
          <div className='l-container'>
            <div className='c-blog-article__category'>
              <span>Customer Support</span>
            </div>
            <h1 className='c-blog-article__title'>
              {post.frontmatter.title}
            </h1>
          </div>
        </section>

        {post.frontmatter.thumbnail &&
          <section className='c-blog-article__big-picture'>
            <img src={post.frontmatter.thumbnail} alt='pic'/>
          </section>
        }

        <section className='c-blog-article__body'>
          <div className='c-blog-article__body__container l-container'  
              dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
        <section className='c-blog-article__tags'>
          <div className='c-blog-article__tags__container l-container'><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a></div>
        </section>
        <section className='c-blog-article__nearby-articles'>
          <div className='c-blog-article__nearby-articles__container l-container'>
            <div className='c-card c-card--prev-article'>
              <a href='#'>
                <div className='c-card__image'><img src='/images/card-sample.png' alt='card sample'/></div>
                <div className='c-card__text'>
                  <div className='c-card__text__category'>Customer Support</div>
                  <div className='c-card__text__title'>
                    Stripe’s Will Larson 
                    on engineering and infrastructure management
                  </div>
                </div>
              </a>
            </div>
            <div className='c-card c-card--next-article'>
              <a href='#'>
                <div className='c-card__image'><img src='/images/card-sample.png' alt='card sample'/></div>
                <div className='c-card__text'>
                  <div className='c-card__text__category'>Customer Support</div>
                  <div className='c-card__text__title'>
                    Stripe’s Will Larson 
                    on engineering and infrastructure management
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </article>
      <AadsServices />
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        thumbnail
      }
    }
  }
`

{/* <article className='c-blog-article'>
  <section className='c-blog-article__header'>
    <div className='l-container'>
      <div className='c-blog-article__category'><span>Customer Support</span></div>
      <h1 className='c-blog-article__title'>Putting $125M to work for you, our customers</h1>
    </div>
  </section>
  <section className='c-blog-article__big-picture'><img src='images/img-main.png' alt='pic'/></section>
  <section className='c-blog-article__body'>
    <div className='c-blog-article__body__container l-container'>
      <h2>
          We just raised $125M in a round led by Mary Meeker at Kleiner 
        Perkins. Here’s what we’re going to do with it.
      </h2>
      <p>
          2018 is shaping up to be a massive year for the Intercom platform. Historically, we’ve spent proportionately 
        way more on research and development than other software companies we track, and that won’t stop 
        any time soon. This funding will go straight into building great new software at a pace you’ve yet to see 
        from us. Last year, we shipped 156 new things. Now we’re accelerating that pace, and last month we 
        announced we’re doubling our entire R&D orgs in San Francisco, London, and Dublin over the next 
        18 months. So at a high level, here’s what we’re working on next.
      </p>
      <h3>
        Substantially improving our existing products, especially 
        for bigger businesses
      </h3>
      <p>
        All disruptive technologies start selling first to small companies, the early adopters in a market. Then, as the 
        customer base and market matures, successful disruptive technologies evolve with them, adding the 
        sophistication that ever larger customers need as they scale. Salesforce is a great example of this – when
        they started, they focused on sales teams with only 5 reps.
      </p>
      <figure className='--full-width'><img src='images/img7.png' alt='pic'/></figure>
      <figure className='--float-right'><img src='images/img3.png' height='290px' width='490px' alt='pic'/></figure>
      <p>
          Intercom is yet another example, where at the start, 
        we sold to tiny businesses. That segment is 
        still crucial to us today, and we’ll continue to serve them 
        well. Yet our success there is becoming clear – in the 
        last Y Combinator batch, 84% of all companies with 
        a messenger or live chat product on their site used 
        Intercom. Our next frontier is the generation or 
        two further along than them.
      </p>
      <blockquote>
        <p className='__text'><strong>
            Our team uses RealtimeBoard as a virtual whiteboard 
            for Scrum. It makes doing Scrum with remote teams 
            much easier. We have moved all of our Scrum processes 
            (planning, Backlog grooming, Scrum status, etc.) 
            to RealtimeBoard, so we can do all of our collaboration 
            there.</strong></p>
        <p className='__source'><strong>PATRICK TREESE, </strong>Software Engineer at <a href='#'>Trimble</a></p>
      </blockquote>
      <h4>Intercom has three cool things going for it in these respects:</h4>
      <ol>
        <li>
          Our applications were built as a suite from day one. 
          So the workflows across your sales, marketing and 
          support teams are connected in a way that you don’t 
          get when you buy different products from different 
          vendors – or sometimes even from the same vendor! 
          This means that cross-application technologies 
          (like our Operator bot) can join dots in pretty unique ways.
        </li>
        <li>
          Our Messenger directly interacts with the end user. So we 
          can not only build cool things to join dots across teams, but 
          also between you and your customer. So much of the potential 
          for smart automation in this space lies in the interactions 
          between the business and the customer.
        </li>
        <li>
          Finally, the data you store about your customers in your Intercom 
          database is incredibly and uniquely rich. This will become invaluable 
          training data to help you better serve your customers in the future.
        </li>
      </ol>
    </div>
  </section>
  <div className='c-soc-share --mobile'>
    <div className='c-soc-share__container'><a className='c-soc-share__item --facebook' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/fb-share.svg' alt='fb'/></div>
        <div className='c-soc-share__item-counter'>10</div></a><a className='c-soc-share__item --twitter' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/twitter-share.svg' alt='twitter'/></div>
        <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --slack' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/slack-share.svg' alt='slack'/></div>
        <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --fb-messenger' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/fb-messenger-share.svg' alt='fb-messenger'/></div>
        <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --linkedin' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/linkedin-share.svg' alt='linkedin'/></div>
        <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --email' href='#'>
        <div className='c-soc-share__item-pic'><img src='images/email-share.svg' alt='email'/></div>
        <div className='c-soc-share__item-counter'>8</div></a></div>
  </div>
  <div className='c-soc-share-wrapper --desktop'>
    <div className='c-soc-share --desktop'>
      <div className='c-soc-share__container'><a className='c-soc-share__item --facebook' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/fb-share.svg' alt='fb'/></div>
          <div className='c-soc-share__item-counter'>10</div></a><a className='c-soc-share__item --twitter' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/twitter-share.svg' alt='twitter'/></div>
          <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --slack' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/slack-share.svg' alt='slack'/></div>
          <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --fb-messenger' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/fb-messenger-share.svg' alt='fb-messenger'/></div>
          <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --linkedin' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/linkedin-share.svg' alt='linkedin'/></div>
          <div className='c-soc-share__item-counter'>8</div></a><a className='c-soc-share__item --email' href='#'>
          <div className='c-soc-share__item-pic'><img src='images/email-share.svg' alt='email'/></div>
          <div className='c-soc-share__item-counter'>8</div></a></div>
    </div>
  </div>
  <section className='c-blog-article__tags'>
    <div className='c-blog-article__tags__container l-container'><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a><a className='c-tag' href='#'>Scrum</a></div>
  </section>
  <section className='c-blog-article__nearby-articles'>
    <div className='c-blog-article__nearby-articles__container l-container'>
      <div className='c-card c-card--prev-article'><a href='#'>
          <div className='c-card__image'><img src='images/card-sample.png' alt='card sample'/></div>
          <div className='c-card__text'>
            <div className='c-card__text__category'>Customer Support</div>
            <div className='c-card__text__title'>
              Stripe’s Will Larson 
              on engineering and infrastructure management
            </div>
          </div></a></div>
      <div className='c-card c-card--next-article'><a href='#'>
          <div className='c-card__image'><img src='images/card-sample.png' alt='card sample'/></div>
          <div className='c-card__text'>
            <div className='c-card__text__category'>Customer Support</div>
            <div className='c-card__text__title'>
              Stripe’s Will Larson 
              on engineering and infrastructure management
            </div>
          </div></a></div>
    </div>
  </section>
</article> */}
