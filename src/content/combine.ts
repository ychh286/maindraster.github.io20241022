//import { AstroError } from 'astro/errors'
import { z, type ZodLiteral, type ZodNumber, type ZodObject, type ZodString, type ZodUnion } from 'astro/zod'

// 定义博客作者 schema
export const blogAuthorSchema = z.object({
  /**
   * The name of the author.
   */
  name: z.string().min(1),
  /**
   * The title of the author.
   */
  title: z.string().optional(),
  /**
   * The URL or path to the author's picture.
   */
  picture: z.string().optional(),
  /**
   * The URL to the author's website.
   */
  url: z.string().url().optional(),
})

// 定义主题 schema
export const topicSchema = z.object({
  /**
   * ID of the topic to associate with the current page if the page is not listed in any topic sidebar configuration.
   *
   * @see https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/
   */
  topic: z.string().optional(),
})

export type TopicFrontmatterSchema = z.input<typeof topicSchema>
export type StarlightBlogAuthor = z.infer<typeof blogAuthorSchema>

// 定义博客条目 schema
export const blogEntrySchema = ({ image }: SchemaContext) =>
  z.object({
    /**
     * The author(s) of the blog post.
     * If not provided, the authors will be inferred from the `authors` configuration option if defined.
     */
    authors: z.union([z.string(), blogAuthorSchema, z.array(z.union([z.string(), blogAuthorSchema]))]).optional(),
    /**
     * The date of the blog post which must be a valid YAML timestamp.
     * @see https://yaml.org/type/timestamp.html
     */
    date: z.date(),
    /**
     * The excerpt of the blog post used in the blog post list and tags pages.
     * If not provided, the entire blog post content will be rendered.
     */
    excerpt: z.string().optional(),
    /**
     * A list of tags associated with the blog post.
     */
    tags: z.string().array().optional(),
    /**
     * An optional cover image for the blog post.
     */
    cover: z
      .union([
        z.object({
          /**
           * Alternative text describing the cover image for assistive technologies.
           */
          alt: z.string(),
          /**
           * Relative path to an image file in your project, e.g. `../../assets/cover.png`.
           */
          image: image(),
        }),
        z.object({
          /**
           * Alternative text describing the cover image for assistive technologies.
           */
          alt: z.string(),
          /**
           * Relative path to an image file in your project to use in dark mode, e.g. `../../assets/cover-dark.png`.
           */
          dark: image(),
          /**
           * Relative path to an image file in your project to use in light mode, e.g. `../../assets/cover-light.png`.
           */
          light: image(),
        }),
      ])
      .optional(),
    /**
     * Defines whether the blog post is featured or not.
     * Featured blog posts are displayed in a dedicated sidebar group above recent blog posts.
     */
    featured: z.boolean().optional(),
    /**
     * ID of the topic to associate with the current page if the page is not listed in any topic sidebar configuration.
     *
     * @see https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/
     */
    topic: z.string().optional(),
  })

// 合并后的 schema 函数
export function combinedSchema(context: SchemaContext) {
  // 检查上下文以提供更好的迁移错误消息
  if (!context) {
//     throw new AstroError(
//       'Missing schema validation context.',
//       `You may need to update your content collections configuration in the \`src/content.config.ts\` file and pass the context to the schema function:

// \`docs: defineCollection({ loader: docsLoader(), schema: docsSchema({ extend: (context) => combinedSchema(context) }) })\`

// If you believe this is a bug, please file an issue at https://github.com/HiDeoo/starlight-blog/issues/new/choose`,
//     )
  }

  // 返回合并了 blog 和 topic 属性的 schema
  return blogEntrySchema(context).partial()
}

// 用于向后兼容的 blogSchema 函数
export function blogSchema(context: SchemaContext) {
  return combinedSchema(context)
}

interface SchemaContext {
  image: ImageFunction
}

// https://github.com/withastro/astro/blob/7d597506615fa5a34327304e8321be7b9c4b799d/packages/astro/src/assets/types.ts#L34-L42
type ImageFunction = () => ZodObject<{
  src: ZodString
  width: ZodNumber
  height: ZodNumber
  format: ZodUnion<
    [
      ZodLiteral<'png'>,
      ZodLiteral<'jpg'>,
      ZodLiteral<'jpeg'>,
      ZodLiteral<'tiff'>,
      ZodLiteral<'webp'>,
      ZodLiteral<'gif'>,
      ZodLiteral<'svg'>,
      ZodLiteral<'avif'>,
    ]
  >
}>
