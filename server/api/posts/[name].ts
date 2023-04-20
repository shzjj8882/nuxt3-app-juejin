import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 文章目录
const postsDir = path.join(process.cwd(), "content");

export default defineEventHandler(async (event) => {
  const fileName = getRouterParam(event, 'name') + ".md";
  // 获取文章内容
  const fullPath = path.join(postsDir, fileName);
  try {
    fs.accessSync(fullPath);
    // ...省略读取文章内容部分代码
  } catch (err) {
    // 没有此文件或没有访问权限
    throw createError({
      statusCode: 404,
      statusMessage: "文章不存在"
    });
  }
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  // 解析扉页信息
  const matterInfo = matter(fileContent);

  // 转换markdown为HTML
  const processedContent = await remark().use(html).process(matterInfo.content);
  const content = processedContent.toString();
  return {
    title: matterInfo.data.title as String,
    content,
  };
});
