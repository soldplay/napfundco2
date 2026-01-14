import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ChevronLeft, User, Calendar, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import blogData from '@/data/blog-posts.json'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogData.posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogData.posts.find((p) => p.slug === params.slug)

  if (!post) {
    return { title: 'Artikel nicht gefunden' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogData.posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 via-cream to-secondary-50 py-12 lg:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/ratgeber"
              className="inline-flex items-center text-sm text-warmgray-600 hover:text-primary-600"
            >
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
              Zurück zum Ratgeber
            </Link>

            <Badge className="mt-6">{post.category}</Badge>

            <h1 className="heading-2 mt-4 text-warmgray-900">{post.title}</h1>

            <p className="body-large mt-4 text-warmgray-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warmgray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" aria-hidden="true" />
                <span>{post.author}</span>
                <span className="text-xs text-warmgray-400">
                  ({post.authorRole})
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{post.readingTime} Min. Lesezeit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            {/* Featured Image Placeholder */}
            <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100">
              <div className="flex h-full items-center justify-center">
                <span className="text-6xl" aria-hidden="true">📸</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg mx-auto mt-12 max-w-none">
              <p className="lead">
                {post.content ||
                  `Dieser Artikel behandelt das Thema "${post.title}". 
                  Hier würde der vollständige Artikelinhalt stehen, der von unseren 
                  Experten verfasst wurde.`}
              </p>

              <h2>Warum ist das Thema wichtig?</h2>
              <p>
                Die richtige Ernährung ist grundlegend für die Gesundheit und
                das Wohlbefinden Ihres Tieres. In diesem Artikel erfahren Sie
                alles Wichtige zum Thema.
              </p>

              <h2>Unsere Empfehlungen</h2>
              <p>
                Basierend auf unserer Erfahrung und wissenschaftlichen
                Erkenntnissen haben wir folgende Empfehlungen für Sie
                zusammengestellt:
              </p>
              <ul>
                <li>Achten Sie auf hochwertige Zutaten</li>
                <li>Passen Sie die Fütterung an die Bedürfnisse an</li>
                <li>Beobachten Sie Veränderungen bei Ihrem Tier</li>
                <li>Konsultieren Sie bei Fragen einen Tierarzt</li>
              </ul>

              <h2>Fazit</h2>
              <p>
                Mit dem richtigen Wissen und hochwertigen Produkten können Sie
                viel für die Gesundheit Ihres Tieres tun. Bei Fragen stehen wir
                Ihnen gerne zur Verfügung.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center justify-between border-t border-warmgray-200 pt-8">
              <p className="text-warmgray-600">Hat Ihnen der Artikel gefallen?</p>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Teilen
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-warmgray-100 bg-warmgray-50 py-12 lg:py-16">
          <div className="container-custom">
            <h2 className="heading-3 text-center text-warmgray-900">
              Weitere Artikel
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/ratgeber/${relatedPost.slug}`}
                  className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <Badge variant="secondary">{relatedPost.category}</Badge>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-warmgray-900 group-hover:text-primary-600">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-warmgray-600">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

