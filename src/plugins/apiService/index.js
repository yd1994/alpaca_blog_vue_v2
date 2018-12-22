import articleService from './articlesService'
import categories from './categoriesService'
import articleTags from './articleTagService'
import categoriesArticles from './categoryArticlesService'
import systemInformationService from './systemInformationService'
import userService from './userService'
import imageService from './imageService'

export default {
  articles: articleService,
  categories: categories,
  articleTags: articleTags,
  categoriesArticles: categoriesArticles,
  systemInformation: systemInformationService,
  users: userService,
  images: imageService
}
