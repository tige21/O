import CustomBottomSheetModal from '@/components/ui/CustomBottomSheetModal'
import Deck from '@/components/ui/Deck'
import { useGetDecksQuery } from '@/services/api'
import { IDeck } from '@/services/types/types'
import { AntDesign } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width } = Dimensions.get('window')

const Page = () => {
	const { data: decks, isLoading, error } = useGetDecksQuery()
	console.log(decks)
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [deckId, setDeckId] = useState('')

	const [filtedDecks, setFilteredDecks] = useState<any>(decks)

	const handleDismissSheet = () => bottomSheetRef.current?.dismiss()
	const handleOpenSheet = (id: string) => {
		bottomSheetRef.current?.present()
		setDeckId(id)
	}

	const [inputValue, setInputValue] = useState()

	const onFilteredDecks = useCallback(
		(text: any) => {
			if (text) {
				const result = decks?.filter(item =>
					item.name.toLowerCase().includes(text.toLowerCase())
				)
				setFilteredDecks(result)
			} else {
				// Если строка поиска пуста, показываем все колоды
				setFilteredDecks(decks)
			}
		},
		[decks]
	)

	// Заглушка
	const [selectedDeck, setSelectedDeck] = useState<
		| IDeck
		| {
				description: 'Вопросы на для любой пары друзей, партнеров или незнакомцев. Читающий задает вопрос другому.'
				id: '1'
				name: '😉 Для пары'
		  }
	>()

	useEffect(() => {
		const findDeck = decks?.find((item: IDeck) => item.id === deckId.toString())
		if (findDeck) {
			setSelectedDeck(findDeck)
		}
	}, [deckId, decks])

	const scrollY = useSharedValue(0)

	const scrollRef = useAnimatedRef<Animated.ScrollView>()

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: event => {
			scrollY.value = event.contentOffset.y
		}
	})

	const searchBarStyle = useAnimatedStyle(() => {
		const searchBarWidth = interpolate(
			scrollY.value,
			[0, 100],
			[width - 32, 40],
			Extrapolate.CLAMP
		)

		const translateX = interpolate(
			scrollY.value,
			[0, 100],
			[0, width - 32 - 40], // Плавное смещение вправо
			Extrapolate.CLAMP
		)

		return {
			width: withTiming(searchBarWidth, { duration: 500 }),
			transform: [{ translateX: withTiming(translateX, { duration: 500 }) }]
		}
	})

	return (
		<SafeAreaView style={styles.container}>
			<Animated.View style={[styles.searchBar, searchBarStyle]}>
				<TextInput
					style={{ flex: 1 }}
					placeholder='search for deck you want'
					onChangeText={text => onFilteredDecks(text)}
				/>
				<AntDesign name='search1' size={16} color='black' />
			</Animated.View>

			{isLoading ? (
				<View>
					<Text>Loading</Text>
				</View>
			) : (
				<Animated.ScrollView
					ref={scrollRef}
					onScroll={scrollHandler}
					contentContainerStyle={{
						paddingBottom: 65,
						marginTop: 70,
						margin: 16,
						gap: 20
					}}
					scrollEventThrottle={16}
				>
					{decks &&
						decks.map((deck: any) => {
							return (
								<Deck
									key={deck.id}
									title={deck.name}
									id={deck.id}
									onPresent={handleOpenSheet}
									onDismiss={handleDismissSheet}
								/>
							)
						})}
				</Animated.ScrollView>
			)}

			<CustomBottomSheetModal
				error={error}
				deck={selectedDeck}
				ref={bottomSheetRef}
			/>
		</SafeAreaView>
	)
}

export default Page

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	searchBar: {
		flex: 1,
		position: 'absolute',
		top: 50,
		left: 16,
		right: 16,
		zIndex: 1000,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingHorizontal: 12
	},
	scrollContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		position: 'absolute',
		top: '10%',
		left: '50%'
	},
	deck: {
		flex: 1,
		margin: 16,
		height: 139,
		backgroundColor: 'white',
		borderRadius: 33
	},
	commonInformaion: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 100
	},
	topContent: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	deckProgress: {
		flexDirection: 'row',
		margin: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#00405F',
		fontSize: 16,
		fontWeight: 'bold'
	},
	likes: {
		margin: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
		backgroundColor: '#00405F',
		borderRadius: 10,
		height: 21,
		width: 61
	},
	progressBar: {
		width: 80,
		height: 8,
		backgroundColor: '#EBEBEB',
		borderRadius: 4
	},
	progressColor: {
		backgroundColor: '#D8D463',
		height: '100%',
		width: '30%',
		borderRadius: 4
	},
	img: {
		height: 54,
		width: 54
	}
})
