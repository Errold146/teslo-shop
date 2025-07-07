import Image from "next/image"

interface Props {
    src?: string
    alt: string
    className: React.StyleHTMLAttributes<HTMLImageElement>['className']
    width: number
    height: number
}

export const ProductImage = ({src, alt, className, width, height}: Props) => {

    const localSrc = src
        ? src.startsWith('http') || src.startsWith('/')
            ? src
            : `/products/${src}`
        : '/imgs/nophoto.jpg';

    return (
        <Image
            src={localSrc}
            alt={alt}
            width={width}
            height={height}
            priority
            className={className}
        />
    )
}
