'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from '@/components/mode-toggle';
import { useEffect, useState } from 'react';
import {debounce} from 'lodash';

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);

    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY || currentScrollY <= headerHeight) {
            setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
            setIsVisible(false);
        }
        setLastScrollY(currentScrollY);
    }, 50);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel();
        };
    }, [lastScrollY, headerHeight, handleScroll]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-slate-50 dark:bg-slate-900 shadow-md transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="max-w-2xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            width={48}
                            height={48}
                            className="rounded-lg"
                            src="/logo.png"
                            alt="Paparrot"
                        />
                    </Link>
                    <nav className="ml-auto text-sm flex font-medium space-x-6">
                        <Link className="block" href="/">
                            Посты
                        </Link>
                        <Link className="block" href="/about">
                            Обо мне
                        </Link>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}