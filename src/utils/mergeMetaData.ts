import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    url: 'https://esplendor.vercel.app',
    title: 'Esplendor Rings',
    description: 'Wedding and engagement rings by Esplendor Rings',
    siteName: 'Esplendor Rings',
    images: [
        {
            url: '/web-image.webp'
        },
    ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
    return {
        ...defaultOpenGraph,
        ...og,
        images: og?.images ? og.images : defaultOpenGraph.images,
    }
}
