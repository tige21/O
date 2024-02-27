// api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDeck } from './types/types'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://logotipiwe.ru/haur/api/v1/' }),
	endpoints: builder => ({
		getDecks: builder.query<IDeck[], void>({
			query: () => 'decks'
		}),
		getLevels: builder.query<any, string>({
			query: deckId => `levels?deckId=${deckId}`
		}),
		getQuestion: builder.query<any, { levelId: string; clientId: string }>({
			query: ({ levelId, clientId }) =>
				`question?&levelId=${levelId}&clientId=${clientId}`
		})
	})
})

export const { useGetDecksQuery, useGetLevelsQuery, useGetQuestionQuery } = api
