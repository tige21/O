import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface IButton {
	title: string
	onPress?: () => void
	size?: string
	color: string
}

const Button = (props: IButton) => {
	const { title, onPress, color, size } = props

	const styles = StyleSheet.create({
		button: {
			justifyContent: 'center',
			alignItems: 'center',
			color: 'white',
			borderRadius: 33.5,
			backgroundColor: color,
			height: size === 'large' ? '14%' : 33,
			width: size === 'large' ? '100%' : 196,
		},
		text: {
			color: 'white',
			fontSize: size === 'large' ? 20 : 16,
		},
	})

	return (
		<TouchableOpacity onPress={onPress} style={[styles.button]}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	)
}

export default Button
