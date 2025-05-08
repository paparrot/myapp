'use client'

import Image from 'next/image'
import {useState} from "react";

const AppImage = ({ src, alt, width, height, className }: {
    src: string;
    alt: string;
    width: string;
    height: string;
    className?: string;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative w-full h-auto my-4 ${className}`}>
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
                    style={{ width, height }}
                />
            )}
            <Image
                src={src}
                alt={alt}
                width={parseInt(width)}
                height={parseInt(height)}
                className={`rounded-lg ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoadingComplete={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default AppImage;