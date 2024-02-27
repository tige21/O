import Colors from '@/constants/Colors'

export interface ILabelColor {
	labelColor: string
}
export function getLabelColor(inputText: string) {
	let labelColor

	switch (inputText) {
		case 'besties':
			labelColor = Colors.green
			break
		case 'good to start':
			labelColor = Colors.deepBlue
			break
		case 'couple':
			labelColor = Colors.darkOrange
			break
		case 'friends':
			labelColor = Colors.orange
			break
		default:
			labelColor = Colors.deepBlue
	}

	return labelColor
}

export default getLabelColor
