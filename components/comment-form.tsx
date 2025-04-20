'use client'

import {useState} from 'react'

export default function CommentForm({postId}: { postId: number }) {
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [failed, setFailed] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch('/api/submit-comment', {
            method: 'POST',
            body: JSON.stringify({author, comment, postId}),
        })

        if (res.ok) {
            setSubmitted(true)
        }

        if (!res.ok) {
            setFailed(true);
        }
    }

    return submitted ? (
        <div
            className={"border py-2 rounded-lg bg-green-100 dark:bg-green-800 text-green-800 text-center dark:text-green-50 border-green-800 dark:border-green-100"}>
            <p>Комментарий отправлен! Он появится после модерации.</p>
        </div>
    ) : failed ? (
        <div
            className={"border py-2 rounded-lg bg-green-100 dark:bg-green-800 text-green-800 text-center dark:text-green-50 border-green-800 dark:border-green-100"}>
            <p>Что-то пошло не так. Попробуйте снова позже.</p>
        </div>
    ) : (<>
            <h2 className="text-xl font-semibold mb-4">Ваш комментарий</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="border dark:border-slate-500 bg-gray-50 dark:bg-slate-950 rounded-lg p-2 w-full mb-2"
                />
                <textarea
                    placeholder="Комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className="border dark:border-slate-500 bg-gray-50 dark:bg-slate-950 rounded-lg p-2 w-full mb-2"
                />
                <button type="submit"
                        className="border border-slate-950 text-slate-950 dark:border-slate-500 dark:text-slate-50 rounded-lg px-4 py-2">
                    Отправить
                </button>
            </form>
        </>
    )
}
