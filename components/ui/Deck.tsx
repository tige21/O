import Colors from '@/constants/Colors'
import { labels } from '@/constants/data'
import getLabelColor from '@/features/converters/label-converters'
import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomLabel } from './CustomLabel'

export interface IDeck {
	title?: string
	likes?: number
	progress?: number
	img?: any
	id?: any
	onPresent: (id: string) => void
	onDismiss: () => void
	onPress?: () => void
}

function Deck({ title, likes, progress, img, id, onPresent }: IDeck) {
	return (
		<View style={styles.deck} key={id}>
			<View style={{ flexDirection: 'column' }}>
				<View
					style={{
						justifyContent: 'space-between',
						flexDirection: 'row',
						width: '100%'
					}}
				>
					<View style={styles.deckLabels}>
						{labels.map(label => {
							return (
								<CustomLabel
									labelColor={getLabelColor(label.title)}
									key={label.id}
								>
									{label.title}
								</CustomLabel>
							)
						})}
					</View>
					<TouchableOpacity style={styles.likes}>
						<Text style={{ color: 'white' }}>323</Text>
						<AntDesign name='heart' size={14} color='white' />
					</TouchableOpacity>
				</View>
				<View style={styles.commonInformaion}>
					<Image
						source={require('@/assets/images/img1.png')}
						style={styles.img}
					/>
					<View style={{ width: '100%' }}>
						<Text numberOfLines={1} style={styles.text}>
							{title}
						</Text>
					</View>
					<Link href={`/decks/${id}`} asChild>
						<TouchableOpacity style={styles.button}>
							<Text style={{ color: 'white' }}>play</Text>
						</TouchableOpacity>
					</Link>
				</View>

				<TouchableOpacity
					style={styles.questionIcon}
					onPress={() => onPresent(id)}
				>
					<AntDesign name='questioncircleo' size={24} color='#697BA4' />
				</TouchableOpacity>
			</View>
			{/* <View style={styles.deckLabels}>
				{labels.map(label => {
					return <CustomLabel key={label.id}>{label.title}</CustomLabel>
				})}
			</View>

			<View style={styles.commonInformaion}>
				<Image
					source={require('@/assets/images/img1.png')}
					style={styles.img}
				/>
				<View style={{ width: '100%', borderWidth: 1, borderStyle: 'solid' }}>
					<Text numberOfLines={1} style={styles.text}>
						{title}
					</Text>
				</View>
				<Link href={`/decks/${id}`} asChild>
					<TouchableOpacity style={styles.button}>
						<Text style={{ color: 'white' }}>play</Text>
					</TouchableOpacity>
				</Link>
			</View>
			<View style={styles.additionalInfo}>
				<TouchableOpacity style={styles.likes}>
					<Text style={{ color: 'white' }}>323</Text>
					<AntDesign name='heart' size={14} color='white' />
				</TouchableOpacity>
				<TouchableOpacity style={{ margin: 12 }} onPress={onPresent}>
					<AntDesign name='questioncircleo' size={24} color='#697BA4' />
				</TouchableOpacity>
			</View> */}
		</View>
	)
}

export default Deck

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#D8D463'
	},
	scrollContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	// deck: {
	// 	flex: 1,
	// 	marginTop: 20,
	// 	backgroundColor: 'white',
	// 	borderRadius: 20,
	// 	height: 221,
	// 	justifyContent: 'flex-start',
	// 	alignItems: 'flex-start',
	// 	flexDirection: 'row'
	// },
	deck: {
		flex: 1,
		marginTop: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		height: 221,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},
	commonInformaion: {
		flex: 1,
		zIndex: 100,
		height: '100%',

		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingBottom: 12,
		alignItems: 'center',
		gap: 20
	},
	topContent: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	deckLabels: {
		flexDirection: 'column',
		margin: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: 12
	},
	text: {
		textAlign: 'center',
		color: '#00405F',
		fontSize: 16,
		fontWeight: 'bold'
	},
	likes: {
		margin: 12,
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
		height: 75,
		width: 84
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		width: 86,
		backgroundColor: Colors.orange,
		borderRadius: 24.5
	},
	additionalInfo: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		height: '100%'
	},
	questionIcon: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 1000
	}
})
