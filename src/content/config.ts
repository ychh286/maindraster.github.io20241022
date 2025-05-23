import { defineCollection } from 'astro:content';
import { docsSchema,i18nSchema } from '@astrojs/starlight/schema';
import { docsLoader} from '@astrojs/starlight/loaders';
import { blogSchema } from 'starlight-blog/schema';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';
import { combinedSchema } from './combine.ts';
import { glob } from 'astro/loaders';

// const graph = defineCollection({
// 	loader: docsLoader(),//,
// 	schema: docsSchema({
// 		extend: combinedSchema
// 	  })
//   });

export const collections = {
	docs: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({ 
		extend: combinedSchema //(context) => blogSchema(context)
	}) }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};