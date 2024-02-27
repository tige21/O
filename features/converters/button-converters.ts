import Colors from '@/constants/Colors'

export interface IQuestonLevelAndColor {
	levelTitle: string
	levelBgColor: string
}
export function getQuestionLevelAndColor(inputText: string) {
	let levelTitle, levelBgColor

	switch (inputText) {
		case '🙂 Знакомство':
		case '🙂 Dots':
			levelTitle = 'light'
			levelBgColor = Colors.green
			break
		case '😏 Погружение':
		case '😏 Parallels':
			levelTitle = 'medium'
			levelBgColor = Colors.deepBlue
			break
		case '😌 Рефлексия':
		case '😌 Figures':
			levelTitle = 'deep'
			levelBgColor = Colors.darkOrange
			break
		default:
			levelTitle = inputText
			levelBgColor = Colors.deepBlue
	}

	return { levelTitle, levelBgColor }
}

export default getQuestionLevelAndColor
