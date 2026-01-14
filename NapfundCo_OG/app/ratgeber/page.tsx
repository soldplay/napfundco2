import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import blogData from '@/data/blog-posts.json'

export const metadata: Metadata = {
  title: 'Ratgeber',
  description:
    'Tipps und Wissen rund um Tierernährung. Erfahren Sie alles über gesunde Fütterung für Hunde, Katzen und Pferde.',
}

export default function RatgeberPage() {
  return (
    <div className="min-h-screen bg-warmgray-50 py-12 lg:py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-2 text-warmgray-900">Ratgeber</h1>
          <p className="body-large mx-auto mt-4 max-w-2xl text-warmgray-600">
            Wissen und Tipps rund um die gesunde Ernährung Ihrer Tiere - von
            unseren Experten für Sie zusammengestellt.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link
            href="/ratgeber"
            className="rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white"
          >
            Alle
          </Link>
          {blogData.categories.map((category) => (
            <Link
              key={category}
              href={`/ratgeber?kategorie=${encodeURIComponent(category)}`}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-warmgray-700 hover:bg-warmgray-100"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Featured Post */}
        {blogData.posts.length > 0 && (
          <div className="mt-12">
            <Link
              href={`/ratgeber/${blogData.posts[0].slug}`}
              className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 lg:aspect-auto">
                  <div className="flex h-full items-center justify-center p-8">
                    <span className="text-6xl" aria-hidden="true">📚</span>
                  </div>
                </div>
                <div className="p-8">
                  <Badge>{blogData.posts[0].category}</Badge>
                  <h2 className="heading-3 mt-4 text-warmgray-900 group-hover:text-primary-600">
                    {blogData.posts[0].title}
                  </h2>
                  <p className="mt-4 text-warmgray-600">
                    {blogData.posts[0].excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-warmgray-500">
                    <span>{blogData.posts[0].author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {blogData.posts[0].readingTime} Min. Lesezeit
                    </span>
                  </div>
                  <div className="mt-6 flex items-center font-medium text-primary-600">
                    Weiterlesen
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogData.posts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/ratgeber/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl" aria-hidden="true">📖</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Badge variant="secondary" className="self-start">
                  {post.category}
                </Badge>
                <h3 className="heading-4 mt-3 text-warmgray-900 group-hover:text-primary-600">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-warmgray-600">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-warmgray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {post.readingTime} Min.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

