declare module '*.module.css'

// Oh boy we need a refactor here

type UnknownObject = Record<string, unknown>

type CategoriesTopLevelNames =
  | 'Advertisers'
  | 'Guides'
  | 'News-trends'
  | 'Publishers'
type CategoriesSecondLevelNames =
  | 'Altcoins'
  | 'Bitcoin'
  | 'Defi'
  | 'How-to'
  | 'Mining'
  | 'Ratings'

type InnerHtmlString = string

interface Author {
  name: string
  thumbnail: GatsbyImageProps['image']
  position: string
  description: string
  slug: string
  postCount?: number
  posts?: BlogPostCard[]
  postsHeader?: BlogPostCard[]
  twitter_link?: string
  facebook_link?: string
  linkedin_link?: string
  html?: string
  json_ld?: string
}

type BlogPostCard = Pick<
  BlogPost,
  | 'title'
  | 'thumbnail'
  | 'category_top_level'
  | 'category_second_level'
  | 'reading_time'
  | 'slug'
>

interface BlogPost {
  title: string
  thumbnail: GatsbyImageProps['image']
  category_top_level: CategoriesTopLevelNames[]
  category_second_level: CategoriesSecondLevelNames[] | null
  reading_time: string
  slug: string
  author: Author
  date: string
  html: InnerHtmlString
  table_of_contents: string
  related_posts: BlogPostCard[]
  meta_title: string
  meta_description: string
  popularity: string
}
