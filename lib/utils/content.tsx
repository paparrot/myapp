import parse, { Element } from 'html-react-parser';
import AppImage from '@/components/app-image';

export const processContent = (content: string): React.ReactNode => {
    return parse(content, {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.name === 'img' && domNode.attribs) {
                const { src, alt = '', width = '800', height = '600', class: className = '' } = domNode.attribs;

                return (
                    <div className={`relative w-full h-auto my-4 ${className}`}>
                        <AppImage
                            src={src}
                            alt={alt}
                            width={width}
                            height={height}
                            className="rounded-lg"
                        />
                    </div>
                );
            }
            return undefined;
        },
    });
};