import Colors from '@/constants/Colors'
import { IQuestonLevelAndColor } from '@/features/converters/button-converters'
import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import Animated, {
	BounceIn,
	BounceOut,
	FadeIn,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated'

const { height } = Dimensions.get('screen')

interface ICard {
	color: string
	level?: IQuestonLevelAndColor
	text?: string
	direction?: string
	positionX: SharedValue<number>
}

const Card = (props: ICard) => {
	const { color, level, text, direction, positionX } = props

	const [press, setPress] = useState(false)

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: positionX.value }]
		}
	})

	const styles = StyleSheet.create({
		card: {
			width: '100%',
			height: height * 0.5,
			backgroundColor: color,
			borderRadius: 20
		},
		wrapper: {
			flex: 1,
			margin: 16,
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		topContent: {
			justifyContent: 'center',

			width: '100%',
			height: 20
		}
	})

	return (
		<Animated.View
			entering={FadeIn.duration(300).damping(3)}
			style={[styles.card, animatedStyles]}
		>
			<View style={styles.wrapper}>
				<View style={styles.topContent}>
					{!level ? null : (
						<View
							style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
						>
							<CardLabel
								levelBgColor={level.levelBgColor}
								levelTitle={level.levelTitle}
							/>
						</View>
					)}
				</View>

				<View style={{ width: '70%' }}>
					<Animated.Text
						entering={BounceIn}
						exiting={BounceOut}
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							color: level ? level?.levelBgColor : Colors.deepBlue,
							textAlign: 'center'
						}}
					>
						{!text ? 'amogus' : text}
					</Animated.Text>
				</View>

				<View style={{ width: '100%' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
						<TouchableOpacity onPress={() => setPress(!press)}>
							{press ? (
								<AntDesign
									name='heart'
									size={24}
									color={level ? level?.levelBgColor : Colors.deepBlue}
								/>
							) : (
								<AntDesign
									name='hearto'
									size={24}
									color={level ? level?.levelBgColor : Colors.deepBlue}
								/>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Animated.View>
	)
}

export default Card

export const CardLabel = ({
	levelBgColor,
	levelTitle
}: IQuestonLevelAndColor) => {
	const styles = StyleSheet.create({
		label: {
			justifyContent: 'center',
			borderRadius: 12,
			backgroundColor: levelBgColor,
			alignItems: 'center'
		},
		labelText: {
			fontSize: 12,
			marginLeft: 10,
			marginRight: 10,
			marginTop: 1,
			marginBottom: 1,
			color: 'white'
		}
	})

	return (
		<View style={styles.label}>
			<Text style={styles.labelText}>{levelTitle}</Text>
		</View>
	)
}
