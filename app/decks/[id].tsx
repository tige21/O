import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { CustomLabel } from '@/components/ui/CustomLabel'
import Colors from '@/constants/Colors'
import { decks } from '@/constants/data'
import { useGetLevelsQuery, useGetQuestionQuery } from '@/services/api'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface IDeck {
	title: any
	likes: number
	progress: number
	img: any
	id: any
}

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

function DeckId() {
	const router = useRouter()

	const { id } = useLocalSearchParams()

	const [userId, setUserId] = useState<any>()

	const [level, setLevel] = useState('2afed974-5981-4de8-83e3-239cffb164da')

	const { data: buttons, isLoading, isError } = useGetLevelsQuery(id.toString())

	const { data: question, refetch } = useGetQuestionQuery({
		levelId: level,
		clientId: userId
	})

	const positionX = useSharedValue(0)

	const startAnimation = () => {
		positionX.value = withTiming(-1000, { duration: 500 })
		positionX.value = 0
	}

	const textToShow =
		question?.text || 'Добро пожаловать, готовы выбрать вопрос?'

	const nextQuestion = (id: string) => {
		setLevel(id)
		refetch()
	}

	console.log(question)

	useEffect(() => {
		const getUserId = async () => {
			const user_id = await AsyncStorage.getItem('user_id')
			setUserId(user_id)
		}
		getUserId()
	}, [])

	const goBack = () => {
		router.back()
	}

	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.deck}>
				<View style={{ margin: 20, flex: 1, gap: 20 }}>
					<View style={styles.topContent}>
						<View style={styles.deckProgress}>
							<Image source={decks[0].img} style={styles.img} />
						</View>

						<Text
							style={{
								color: Colors.primary,
								fontSize: 16,
								fontWeight: 'bold'
							}}
						>
							lets be friends
						</Text>

						<TouchableOpacity onPress={goBack}>
							<AntDesign name='close' size={35} color={Colors.primary} />
						</TouchableOpacity>
					</View>

					<View style={styles.commonInformaion}>
						<Card color='#4980A3' text={textToShow} positionX={positionX} />
					</View>

					<View style={styles.levelsInfo}>
						<Text
							style={{ color: Colors.primary, fontSize: 12, fontWeight: '400' }}
						>
							there is gonna be 3 levels:
						</Text>
					</View>

					<View style={styles.sectionButtons}>
						{buttons &&
							buttons.map((button: any) => {
								return (
									<Button
										key={button.id}
										title={button.Name}
										onPress={() => {
											nextQuestion(button.ID)
											startAnimation() // Вызов функции анимации
										}}
										color={'#919F67'}
										size='large'
									/>
								)
							})}
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default DeckId

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	scrollContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	deck: {
		width: width - 32,
		height: height - 50,
		backgroundColor: 'white',
		borderRadius: 33
	},
	commonInformaion: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 25,
		marginTop: 5
	},
	topContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	deckProgress: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: '#00405F',
		fontSize: 20,
		fontWeight: 'bold'
	},
	likes: {
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
		height: 32,
		width: 32
	},
	levelsInfo: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	sectionButtons: {
		flexDirection: 'column',

		width: '100%',

		gap: 16
	},
	buttons: {
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		borderRadius: 33.5,
		height: 33,
		width: '100%'
	},
	commonButton: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 33.5,
		backgroundColor: Colors.primary,
		height: 54,
		width: 248
	}
})
