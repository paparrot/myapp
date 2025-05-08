'use client'

import { useEffect, useState } from 'react'
import {toast, ToastContainer, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
    postId: number
    postSlug: string
    postTitle: string
}

export default function LikeButton({ postId, postSlug, postTitle }: Props) {
    const [liked, setLiked] = useState(false)

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const likedPosts: number[] = JSON.parse(localStorage.getItem('likedPosts') || '[]')
        setLiked(likedPosts.includes(postId))

        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        setTheme(savedTheme);
    }, [postId])

    const handleLikeClick = () => {
        const likedPosts: number[] = JSON.parse(localStorage.getItem('likedPosts') || '[]')

        if (!liked) {
            likedPosts.push(postId)
            localStorage.setItem('likedPosts', JSON.stringify(likedPosts))
            setLiked(true)
        } else {
            const updated = likedPosts.filter(id => id !== postId)
            localStorage.setItem('likedPosts', JSON.stringify(updated))
            setLiked(false)
        }
    }

    const handleCopyLink = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url).then(() => {
            toast.success('Ссылка скопирована!')
        }).catch((error) => {
            toast.error('Ошибка при копировании ссылки: ' + error)
        })
    }

    const handleShareOnTwitter = () => {
        const url = window.location.href
        const tweetText = `Читаю пост: ${postTitle} - ${url}`
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
        window.open(twitterUrl, '_blank')
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <button
                onClick={handleLikeClick}
                className={`px-4 py-2 w-full md:w-auto rounded-lg text-white transition-colors duration-200 ${
                    liked ? 'bg-green-400 dark:bg-green-800' : 'bg-gray-400 dark:bg-gray-800'
                }`}
            >
                {liked ? '💚 Вам нравится' : '🤍 Мне нравится'}
            </button>

            <button
                onClick={handleCopyLink}
                className="px-4 py-2 w-full md:w-auto flex-grow rounded-lg text-white bg-blue-400 dark:bg-blue-950 hover:bg-blue-600 dark:hover:bg-blue-900 transition-colors duration-200"
            >
                📋 Копировать ссылку
            </button>

            <button
                onClick={handleShareOnTwitter}
                className="px-4 py-2 w-full md:w-auto flex-grow rounded-lg text-white bg-black hover:bg-gray-800 transition-colors duration-200"
            >
                🗣️ Поделиться в X
            </button>

            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                newestOnTop
                closeOnClick
                rtl={false}
                transition={Zoom}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}