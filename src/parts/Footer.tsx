import React from 'react'

interface FooterLink {
    name: string
    link: string
    icon?: string
}

interface FooterSection {
    title: string
    content: FooterLink[]
}

const FooterContent: FooterSection[] = [
    {
        title: 'Policy',
        content: [
            { name: 'Return policy', link: 'https://www.google.fr' },
            { name: 'Buying policy', link: 'https://www.google.fr' },
            { name: 'Shipping policy', link: 'https://www.google.fr' },
        ],
    },
    {
        title: 'Support',
        content: [
            { name: 'Track order', link: 'https://www.google.fr' },
            { name: 'FAQ', link: 'https://www.google.fr' },
        ],
    },
    {
        title: 'About',
        content: [
            { name: 'GenericMarketplace.com', link: 'https://www.google.fr' },
            { name: 'How was it done ?', link: 'https://www.google.fr' },
        ],
    },
    {
        title: 'Connect',
        content: [
            {
                name: 'BlueSky',
                link: 'https://www.google.fr',
                icon: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/bluesky.svg',
            },
            {
                name: 'Instagram',
                link: 'https://www.google.fr',
                icon: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/instagram.svg',
            },
            {
                name: 'Youtube',
                link: 'https://www.google.fr',
                icon: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/youtube.svg',
            },
        ],
    },
]

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col bg-sky-950 justify-evenly md:items-center gap-4 text-white py-1.5">
            <div className="flex flex-col sm:flex-row md:flex-row justify-between max-w-7xl gap-4 px-8 py-1.5">
                {FooterContent.map((section) => {
                    return (
                        <div className="gap-1.5" key={section.title}>
                            <h2>{section.title}</h2>
                            {section.content.map((element) => {
                                return (
                                    <div
                                        className="flex flex-row gap-1.5 hover:underline"
                                        key={section.title + '_' + element.name}
                                    >
                                        {element.icon && (
                                            <img
                                                src={element.icon}
                                                width={20}
                                                height={20}
                                                className="icon white"
                                                alt={element.name + ' icon'}
                                            />
                                        )}
                                        <a href={element.link}>
                                            {element.name}
                                        </a>
                                        <p></p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <p className="my-4 text-center">
                website designed by Kévin Gallien
            </p>
        </div>
    )
}

export default Footer
