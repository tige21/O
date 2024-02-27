import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Colors from '@/constants/Colors'
import { decks } from '@/constants/data'
import getQuestionLevelAndColor, {
	IQuestonLevelAndColor
} from '@/features/converters/button-converters'
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

	const [buttonState, setButtonState] = useState<IQuestonLevelAndColor>()

	const [level, setLevel] = useState('')

	const { data: buttons, isLoading, isError } = useGetLevelsQuery(id.toString())

	const { data: question, refetch } = useGetQuestionQuery({
		levelId: level,
		clientId: userId
	})

	let textToShow = question?.text || 'Добро пожаловать, готовы выбрать вопрос?'

	useEffect(() => {
		textToShow = 'Добро пожаловать, готовы выбрать вопрос?'
	}, [id])

	const positionX = useSharedValue(0)

	const startAnimation = () => {
		positionX.value = withTiming(-1000, { duration: 500 })
		positionX.value = 0
	}

	const nextQuestion = (id: string) => {
		setLevel(id)
		refetch()
	}

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
		<SafeAreaView style={styles.container}>
			<View style={styles.deck}>
				<View style={styles.wrapper}>
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
						<Card
							level={buttonState}
							color={Colors.beige}
							text={textToShow}
							positionX={positionX}
						/>
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
										key={button.ID}
										title={button.Name}
										onPress={() => {
											nextQuestion(button.ID)
											startAnimation()
											setButtonState(getQuestionLevelAndColor(button.Name))
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	wrapper: {
		margin: 20,
		flex: 1,
		gap: 12
	},
	scrollContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	deck: {
		width: width - 40,
		height: height * 0.87,
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
		height: '22%',
		width: '100%',
		gap: 12
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
