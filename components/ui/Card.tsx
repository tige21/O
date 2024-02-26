import Colors from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Animated, {
	FadeIn,
	SharedValue,
	useAnimatedStyle,
} from 'react-native-reanimated'

const { height } = Dimensions.get('screen')

interface ICard {
	color: string
	level?: string
	text?: string
	direction?: string
	positionX: SharedValue<number>
}

const cards = [
	{
		question: 'You are gay?',
	},
	{
		question: 'Go you like gachi?',
	},
	{
		question: 'How much fisting cost?',
	},
]

const Card = (props: ICard) => {
	const { color, level, text, direction, positionX } = props

	const [press, setPress] = useState(false)

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: positionX.value }],
		}
	})

	const styles = StyleSheet.create({
		card: {
			width: '100%',
			height: height * 0.45,
			backgroundColor: color,
			borderRadius: 20,
		},
		wrapper: {
			flex: 1,
			margin: 16,
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		topContent: {
			justifyContent: 'center',

			width: '100%',
			height: 20,
		},
	})

	return (
		<Animated.View
			entering={FadeIn.duration(300).damping(3)}
			style={[styles.card, animatedStyles]}
		>
			<View style={styles.wrapper}>
				<View style={styles.topContent}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
						<View
							style={{
								justifyContent: 'center',
								borderRadius: 12,
								backgroundColor: 'white',
								width: '15%',
								alignItems: 'center',
							}}
						>
							<Text style={{ fontSize: 12, color: Colors.primary }}>light</Text>
						</View>
					</View>
				</View>

				<View style={{ width: '70%' }}>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							color: 'white',
							textAlign: 'center',
						}}
					>
						{!text ? 'amogus' : text}
					</Text>
				</View>

				<View style={{ width: '100%' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<TouchableOpacity onPress={() => setPress(!press)}>
							{press ? (
								<AntDesign name='heart' size={24} color='white' />
							) : (
								<AntDesign name='hearto' size={24} color='white' />
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Animated.View>
	)
}

export default Card
