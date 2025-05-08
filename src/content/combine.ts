
import { z, type ZodLiteral, type ZodNumber, type ZodObject, type ZodString, type ZodUnion } from 'astro/zod';
import { graphConfigSchema, nodeStyleSchema } from 'starlight-site-graph/config'; // 来自 starlight-site-graph

// 从 starlight-site-graph 的 schema
const pageGraphConfigSchema = graphConfigSchema.extend({
  /**
   * Whether the graph component should be visible for this page, has precedence over global rules
   */
  visible: z.boolean().optional(),

  /**
   * Custom styles for the node defined by this page
   * Overrides any other styles that may be applied to this node
   */
  nodeStyle: nodeStyleSchema.partial().optional(),
});
export type PageGraphConfig = z.infer<typeof pageGraphConfigSchema>;

const pageSitemapConfigSchema = z.object({
  /**
   * Whether the page should be included in the sitemap, has precedence over global rules
   *
   * @optional
   */
  include: z.boolean().optional(),
  /**
   * Specifies the title of the page in the sitemap (and thus graph and backlinks). \
   * If not provided, either the `title` frontmatter field, the global `pageTitles` setting,
   *   or the last part of the page's path is used as the title
   * Otherwise, the `pageTitle` overrides all other title sources.
   *
   * @optional
   */
  pageTitle: z.string().optional(),
  /**
   * Determine for this page which links are included in the sitemap.
   * The link is included/excluded if the link's target _path_ matches one of the rules.
   * When a rule starts with `!`, the link is _excluded_ if matched.
   * Rules are evaluated in order, the first matching rule determines the inclusion of the link.
   * These rules have precedence over global rules.
   *
   * @optional
   */
  linkInclusionRules: z.array(z.string()).default([]),
});
export type PageSitemapConfig = z.infer<typeof pageSitemapConfigSchema>;

const pageBacklinksConfigSchema = z.object({
  /**
   * Whether the backlinks component should be visible for this page, has precedence over global rules
   */
  visible: z.boolean().optional(),
});
export type PageBacklinksConfig = z.infer<typeof pageBacklinksConfigSchema>;

// 从 starlight-blog 的 schema
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
});

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
  });

// 融合的 schema
export function combinedSchema(context: SchemaContext) {
  // 检查 context 是否存在

  // 创建 blog 部分的 schema
  const blogPart = blogEntrySchema(context).partial();

  // 创建 site-graph 部分的 schema
  const siteGraphPart = z.object({
    /**
     * The title of the page
     *
     * @required
     */
    title: z.string().optional(),
    /**
     * Specify direct links to other pages of the site
     *
     * @optional
     */
    links: z.array(z.string()).optional(),
    /**
     * Tags linked to this page (重复的字段，但保留以兼容两个插件)
     *
     * @optional
     */
    tags: z.array(z.string()).optional(),
    /**
     * Configuration for the sitemap
     *
     * @optional
     */
    sitemap: pageSitemapConfigSchema.optional().default({
      linkInclusionRules: ['**/*'],
    }),
    /**
     * Configuration for the graph component for this page
     *
     * Overrides global graph configuration
     *
     * @optional
     */
    graph: pageGraphConfigSchema.optional(),
    /**
     * Configuration for the backlinks component for this page
     *
     * Overrides global backlinks configuration
     *
     * @optional
     */
    backlinks: pageBacklinksConfigSchema.optional(),
  });

  // 返回融合后的 schema
  return z.object({
    ...blogPart.shape,
    ...siteGraphPart.shape,
  });
}

export type StarlightBlogAuthor = z.infer<typeof blogAuthorSchema>;
export type PageSiteGraphFrontmatter = z.infer<typeof pageSiteGraphSchema>;

interface SchemaContext {
  image: ImageFunction;
}

// https://github.com/withastro/astro/blob/7d597506615fa5a34327304e8321be7b9c4b799d/packages/astro/src/assets/types.ts#L34-L42
type ImageFunction = () => ZodObject<{
  src: ZodString;
  width: ZodNumber;
  height: ZodNumber;
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
  >;
}>;

// 导出合并后的 pageSiteGraphSchema，以便向外部提供兼容性
export const pageSiteGraphSchema = z.object({
  title: z.string().optional(),
  links: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  sitemap: pageSitemapConfigSchema.optional().default({
    linkInclusionRules: ['**/*'],
  }),
  graph: pageGraphConfigSchema.optional(),
  backlinks: pageBacklinksConfigSchema.optional(),
});
