
import Publication from "@/components/pages/Publication"
import { api } from "@/services/api"
import { Post } from "@/types/Post"
import { Metadata, ResolvingMetadata } from "next"

// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
    let posts: Post[] = (await api.post.get()).data

    return posts.map((post) => ({
        id: post.id,
    }))
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function  generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = (await params).slug
   
    // fetch data
    let post: Post | null = (await api.post.getByLinkname(id)).post
   
    return {
      title: post ? `${post.title} | Foxy Lady` : 'Blog | Foxy Lady',
      description: post ? post.description : 'Blog | Foxy Lady',
    }
  }
export default async function Page({ params }: Props) {

    return (
        <Publication id={(await params).slug} />
    )
}