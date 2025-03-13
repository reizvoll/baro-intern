'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo } from '@/api/api'
import { Todo } from '../types/todo'

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [listid, setListId] = useState(0)
  const queryClient = useQueryClient()

  // createTodo API를 호출하는 뮤테이션
  const createMutation = useMutation({
    mutationFn: (newTodo: Todo) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  })

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return
    const id = (listid +1).toString()
    setListId(listid +1)
    createMutation.mutate({
      id: id,
      title,
      completed: false,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        className="border rounded px-2 py-1 flex-1"
        type="text"
        placeholder="내용을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-400 text-white px-4 py-1 rounded hover:bg-green-500"
      >
        추가
      </button>
    </form>
  )
}
