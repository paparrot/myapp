'use client'

import { useMemo } from 'react'
import { Term } from '@/lib/types/post-list'

type PostFiltersProps = {
    categories: string[]
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    search: string
    setSearch: (search: string) => void
}

export default function PostFilters({
    categories,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch
}: PostFiltersProps) {
    return (
        <div className="flex flex-col gap-4 items-start md:items-center mb-4 w-full">
            {categories.length > 0 && (
                <div className="flex w-full items-center gap-2">
                    <label htmlFor="category" className="font-semibold whitespace-nowrap">
                        Категории:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-grow border rounded-lg px-2 py-1 border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                    >
                        <option value="">Все</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Поиск по заголовку или описанию..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg px-3 py-1 border-gray-300 dark:bg-gray-800 dark:border-gray-500 dark:text-white"
                />
            </div>
        </div>
    )
}