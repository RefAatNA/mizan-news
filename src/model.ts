import {z} from 'zod';
const text=z.string().min(1).max(6000);
export const editionSchema=z.object({
 id:z.string().regex(/^[a-z0-9-]{5,80}$/),updatedAt:z.string().datetime({offset:true}),headline:text,dek:text,assessment:text,
 highlights:z.array(text).min(3).max(5),
 fronts:z.array(z.object({name:text,trend:z.enum(['تصعيد','هشّ','قيد المتابعة','دبلوماسية']),reason:text,confidence:z.enum(['مرتفعة','متوسطة','منخفضة'])})).min(5).max(8),
 articles:z.array(z.object({id:z.string().regex(/^[a-z0-9-]+$/),category:text,date:text,title:text,image:z.object({url:z.string().url().refine(v=>v.startsWith("https://")),alt:text,credit:text,sourceUrl:z.string().url().refine(v=>v.startsWith("https://")),license:text,licenseUrl:z.string().url().refine(v=>v.startsWith('https://')).optional(),context:z.enum(["أرشيفية","من الحدث","توضيحية"])}).optional(),fact:text,analysis:text,confidence:z.enum(['مرتفعة','متوسطة','منخفضة']),sources:z.array(z.object({label:text,url:z.string().url().refine(v=>v.startsWith('https://'))})).min(1).max(5)})).min(6).max(10),
 focus:z.object({title:text,body:text,alternative:text}),
 scenarios:z.array(z.object({horizon:text,title:text,body:text,signals:text,confidence:z.enum(['مرتفعة','متوسطة','منخفضة'])})).min(2).max(4),
 watch:z.array(text).min(3).max(6),review:text,limitations:text
});
export type Edition=z.infer<typeof editionSchema>;
