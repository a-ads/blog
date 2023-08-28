import React from 'react'
import { getImage, GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { kebabCase } from 'lodash-es'
import cn from 'classnames'

import { Link, Slider } from '@ui'
import { Breadcrumbs, Seo, Card, Banner } from '@components'
import ShareButtons from '../components/ShareButtons'

export function Head({ pageContext: { post, author } }) {
  return (
    <Seo title={post.meta_title} description={post.meta_description}>
      {post.json_ld ? (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: post.json_ld }}
        />
      ) : (
        <script type='application/ld+json'>
          {`{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.meta_title}",
            "datePublished": "${post.date}",
            "dateModified": "${post.date}",
            "author": [{
              "@type": "Person",
              "name": "${author.name}",
              "url": "https://a-ads.com/blog${author.slug}"
            }],
            "image": ["https://a-ads.com/blog/assets/${extractFilename(
              post.thumbnail?.childImageSharp?.gatsbyImageData?.images?.fallback
                ?.src
            )}"]
          }`}
        </script>
      )}
    </Seo>
  )
}

const extractFilename = (filePath: string) => {
  if (typeof filePath !== 'string') return ''

  const parts = filePath.split('/')
  return parts[parts.length - 1]
}

const TableOfContents = ({
  toc,
  className,
  text,
}: {
  toc: InnerHtmlString
  className?: string
  text: string
}) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <nav className={cn('relative toc-gatsby-config', className)}>
      <div className='up-desktop:sticky top-0 left-0 down-desktop:mt-8 down-desktop:mb-10 phone:my-7'>
        {/* Social buttons row */}
        <header className='flex items-end gap-8 down-desktop:hidden h-[6rem] mb-7'>
          <ShareButtons url={url} text={'test'} />
          {/*{(['twitter', 'fb', 'btc'] as SocialId[]).map((socialId) => (*/}
          {/*  <SocialButton key={socialId} socialId={socialId} />*/}
          {/*))}*/}
        </header>

        {/* If it's a short article, then the table of contents isn't passed  */}
        {toc && (
          <span className='h5 clr-black font-semibold'>
            Read in the article:
          </span>
        )}

        <div className='up-desktop:overflow-y-auto up-desktop:max-h-screen scroll-smooth'>
          {/* Same here  */}
          {toc && (
            <div
              aria-label='Table of contents'
              className='hover-link-blue mt-3 [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2 [&>ul]:body-4 [&>ul]:clr-blue'
              dangerouslySetInnerHTML={{ __html: toc }}
            />
          )}
          <div
            aria-label='Banner'
            className={cn('relative down-desktop:hidden', {
              'mt-6': Boolean(toc),
            })}
          >
            <div className='flex flex-col gap-4 z-1 relative p-7'>
              <StaticImage
                src='../../static/images/banners/banner-logo.png'
                alt='Logo'
                width={70}
                height={18}
                layout='fixed'
                placeholder='blurred'
              />
              <span className='clr-white font-bold text-[22px] font-secondary'>
                Promote your crypto project with us!
              </span>
              <Link
                external
                primary
                text='Start now'
                to='https://a-ads.com/campaigns/new'
                className='hover-link w-full h-12'
              />
            </div>
            <StaticImage
              src='../../static/images/banners/small-banner.jpg'
              alt='Banner'
              layout='fullWidth'
              placeholder='blurred'
              className='!absolute top-0 left-0 w-full h-full'
              imgStyle={{ zIndex: -1 }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

interface BlogPostPageProps {
  pageContext: {
    post: Pick<
      BlogPost,
      | 'title'
      | 'date'
      | 'reading_time'
      | 'thumbnail'
      | 'category_top_level'
      | 'category_second_level'
      | 'meta_title'
      | 'meta_description'
    >
    author: Author
    html: InnerHtmlString
    table_of_contents: InnerHtmlString
    related_posts: BlogPost[]
    json_ld: ''
  }
}

const BlogPostTemplate: React.FC<BlogPostPageProps> = ({
  pageContext: {
    post,
    author,
    html,
    table_of_contents,
    related_posts,
    json_ld,
  },
}) => {
  const breadcrumbsTags = [
    post.category_top_level?.[0],
    post.category_second_level?.[0],
  ].filter(Boolean) as string[]

  return (
    <>
      <header
        aria-label='Blog post header'
        className='container grid grid-cols-12 gap-8 down-desktop:block'
      >
        <div className='col-span-3' />
        <div className='flex flex-col col-span-9'>
          <Breadcrumbs tags={breadcrumbsTags} />
          <h1 className='mt-4'>{post.title}</h1>
          <Link
            text={post.category_top_level[0]}
            to={`/categories/${kebabCase(post.category_top_level[0])}`}
            className='clr-blue uppercase p-0 body-3 !font-bold'
          />
        </div>
      </header>
      <main className='relative pb-20'>
        <div className='container grid grid-cols-12 gap-8 down-desktop:block'>
          <TableOfContents
            text={html}
            toc={table_of_contents}
            className='col-span-3 down-desktop:hidden'
          />
          <section className='col-span-9'>
            <Link
              aria-label='Blog post info'
              to={author.slug}
              className='p-0 flex justify-between mb-7 down-tablet:mb-7 up-desktop:h-[6rem]'
            >
              <div aria-label='Author info' className='flex-center gap-8'>
                <GatsbyImage
                  image={getImage(author.thumbnail)!}
                  alt={author.name}
                  className='rounded-full h-[68px] w-[68px]'
                />
                <div className='flex flex-col'>
                  <span className='h4 font-secondary font-semibold'>
                    {author.name}
                  </span>
                  <span className='text-contrast clr-secondary body-3'>
                    {author.position}
                  </span>
                </div>
              </div>
              <div
                aria-label='Date and reading time'
                className='mt-[3.2rem] body-3 cursor-default down-tablet:hidden'
                onClick={(e) => e.preventDefault()} // Clicking on this element shouldn't redirect to the author's page
              >
                Updated: {post.date}
                {post.reading_time && ` • ${post.reading_time} min read`}
              </div>
            </Link>

            <div
              aria-label='Date and reading time on mobile'
              className='mb-5 body-4 hidden down-tablet:block'
            >
              Updated: {post.date}
              {post.reading_time && ` • ${post.reading_time} min read`}
            </div>

            <GatsbyImage
              image={getImage(post.thumbnail)!}
              alt={post.title}
              className='mb-3'
            />

            <TableOfContents
              toc={table_of_contents}
              className='hidden down-desktop:block'
            />

            <article
              dangerouslySetInnerHTML={{ __html: html }}
              className='article article--blog flow col-span-9'
            />
          </section>

          {/* Background images  */}
          <StaticImage
            src='../../static/images/backgrounds/left.png'
            alt='Background image'
            className='!absolute top-0 left-0 -z-10'
            quality={100}
            placeholder='none'
          />
          <StaticImage
            src='../../static/images/backgrounds/right.png'
            alt='Background image'
            className='!absolute bottom-0 right-0 -z-10'
            quality={100}
            placeholder='none'
          />
        </div>
      </main>
      <Banner />
      <div className='w-full relative down-tablet:hidden'>
        <section
          aria-label='Also read related articles'
          className='relative container py-20 tablet:pt-15'
        >
          <span className='h2 flex-between mb-10 tablet:pt-8'>
            Also read related articles
          </span>
          <Slider>
            {related_posts.map((relatedPost) => (
              // Hacky way to insert gaps between cards
              <div>
                <Card
                  key={relatedPost.title}
                  className='w-[95%]'
                  {...relatedPost}
                />
              </div>
            ))}
          </Slider>
        </section>

        {/* Background image  */}
        <StaticImage
          src='../../static/images/backgrounds/related-articles.png'
          alt='Background image'
          className='!absolute top-0 right-0 -z-10'
          quality={100}
          placeholder='none'
        />
      </div>
    </>
  )
}

export default BlogPostTemplate
