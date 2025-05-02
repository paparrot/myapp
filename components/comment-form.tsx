'use client'

import { useState } from 'react'
import {ToastContainer, toast, Zoom} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CommentForm({ postId }: { postId: number }) {
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/submit-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ author, comment, postId }),
            })

            if (res.ok) {
                setAuthor('')
                setComment('')
                toast.success('Комментарий отправлен! Он появится после модерации.')
            } else {
                throw new Error('Ошибка при отправке комментария')
            }
        } catch (error) {
            toast.error('Что-то пошло не так. Попробуйте снова позже.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full md:w-auto relative">
            <h2 className="text-xl font-semibold mb-4">Ваш комментарий</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="border border-gray-300 dark:border-slate-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 w-full mb-2"
                />
                <textarea
                    placeholder="Комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="border border-gray-300 dark:border-slate-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 w-full mb-2"
                    rows={4}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="border w-full md:w-auto border-gray-300 text-slate-950 bg-gray-50 dark:bg-gray-800 dark:border-slate-500 dark:text-slate-50 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Отправка...
                        </span>
                    ) : 'Отправить'}
                </button>
            </form>

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