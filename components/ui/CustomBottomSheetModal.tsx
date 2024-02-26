import Colors from '@/constants/Colors'
import { buttons, decks } from '@/constants/data'
import { AntDesign } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import React, { forwardRef, useCallback, useMemo } from 'react'
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
export type Ref = BottomSheetModal

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('screen')

const CustomBottomSheetModal = forwardRef<Ref>((props, ref) => {
	const router = useRouter()

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[]
	)

	const goBack = () => {
		router.back()
	}

	const snapPoints = useMemo(() => ['70%', '80%'], [])

	return (
		<BottomSheetModal
			ref={ref}
			index={1}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
		>
			<View style={styles.wrapper}>
				<View style={styles.topContent}>
					<View style={styles.deckProgress}>
						<View style={styles.progressBar}>
							<View style={styles.progressColor}></View>
						</View>
						<View style={{ marginLeft: 10 }}>
							<Text style={{ color: '#ADADAD' }}>30/100</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.likes}>
						<Text style={{ color: 'white' }}>323</Text>
						<AntDesign name='heart' size={14} color='white' />
					</TouchableOpacity>
				</View>

				<View style={styles.commonInformaion}>
					<View>
						<Image source={decks[0].img} style={styles.img} />
					</View>
					<View>
						<Text style={styles.text}>lest be friends</Text>
					</View>
					<View style={{ width: '60%' }}>
						<Text
							style={{
								color: Colors.grey1,
								fontSize: 16,
								fontWeight: '400',
								textAlign: 'center',
							}}
						>
							Lorem ipsum dolor sit amet consectetur. Adipiscing duis ac diam in
							lobortis in elit vulputate.
						</Text>
					</View>
				</View>

				<View style={styles.levelsInfo}>
					<Text
						style={{ color: Colors.primary, fontSize: 12, fontWeight: '400' }}
					>
						there is gonna be 3 levels:
					</Text>
				</View>

				<View style={styles.sectionButtons}>
					{buttons.map((button, index) => {
						return (
							<TouchableOpacity
								key={index}
								style={[styles.buttons, { backgroundColor: button.bg }]}
							>
								<Text style={{ color: 'white' }}>{button.title}</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			</View>
		</BottomSheetModal>
	)
})

// export const BottomSheetBackground = () => {
// 	return <View style={[{ borderRadius: 33, backgroundColor: 'white' }]} />
// }

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: width,
		alignItems: 'center',
	},

	scrollContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},

	commonInformaion: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 25,
		marginTop: 5,
	},
	topContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 130,
	},
	deckProgress: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#00405F',
		fontSize: 20,
		fontWeight: 'bold',
	},
	likes: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
		backgroundColor: '#00405F',
		borderRadius: 10,
		height: 21,
		width: 61,
	},
	progressBar: {
		width: 80,
		height: 8,
		backgroundColor: '#EBEBEB',
		borderRadius: 4,
	},
	progressColor: {
		backgroundColor: '#D8D463',
		height: '100%',
		width: '30%',
		borderRadius: 4,
	},
	img: {
		height: 150,
		width: 150,
	},
	levelsInfo: {
		marginTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionButtons: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
		marginTop: 30,
		marginBottom: 30,
	},
	buttons: {
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		borderRadius: 33.5,
		height: 33,
		width: 196,
	},
	commonButton: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 33.5,
		backgroundColor: Colors.primary,
		height: 54,
		width: 248,
	},
})

export default CustomBottomSheetModal
