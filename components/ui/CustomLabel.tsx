import Colors from '@/constants/Colors'
import { StyleSheet, Text, View } from 'react-native'

export const CustomLabel = ({ children }: { children: React.ReactNode }) => {
	return (
		<View style={styles.label}>
			<Text numberOfLines={1} adjustsFontSizeToFit style={styles.labelText}>
				{children}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	label: {
		borderWidth: 1,
		borderRadius: 24.5,
		borderColor: Colors.darkBlue,
		justifyContent: 'center',
		alignItems: 'center',
	},
	labelText: {
		color: Colors.darkBlue,
		fontSize: 14,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 1,
		marginBottom: 1,
	},
})
