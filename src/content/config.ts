import { defineCollection } from 'astro:content';
import { docsSchema,i18nSchema } from '@astrojs/starlight/schema';
import { docsLoader} from '@astrojs/starlight/loaders';
import { blogSchema } from 'starlight-blog/schema';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';
import { combinedSchema } from './combine';

const graph = defineCollection({
	loader: docsLoader(),//glob({ pattern: "**/*.(md|mdx)", base: "./src/content/docs" }),
	schema: docsSchema({
		extend: combinedSchema
	  })
  });

export const collections = {
	docs: defineCollection({ 
		loader: docsLoader(),
		schema: docsSchema({ 
		extend: (context) => blogSchema(context)
	}) }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};