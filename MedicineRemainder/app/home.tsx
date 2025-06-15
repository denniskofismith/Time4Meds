import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'
import {useState, useEffect, useRef, useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const {width} = Dimensions.get('window')

interface CircularProgressProps{
    progress: number;
    totalDoses: number;
    completedDoses: number;
}

function CircularProgress({
   progress,
   totalDoses,
   completedDoses, 
}:CircularProgressProps){
    const animationValue = useRef(new Animated.Value(0)).current
    const size = width * 0.55
    const strokeWidth = 15
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI  * radius;

    useEffect(() => {
        Animated.timing(animationValue,{
            toValue: progress,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    },[progress])

    const strokeDashoffeset = animationValue.interpolate({
        inputRange: [0,1],
        outputRange: [circumference,0],

    })

    return (
        <View>
            <View>
                <Text >{Math.round(progress)}%</Text>
                <Text> {completedDoses} of {totalDoses} doeses </Text>
            </View>
        </View>
    )
}

const HomeScreen = () => {
  return (
   <ScrollView showsVerticalScrollIndicator={false}>
        \<LinearGradient colors={["#1a8e2d","#146922"]}>
            <View>
                <View>
                    <View>
                        <Text>Dialy Progress</Text>
                    </View>
                    <TouchableOpacity>
                     <Ionicons
                        name='notifications-outline'
                        size={24}
                        color={"white"}
                     />   
                    </TouchableOpacity>
                </View>

                {/* Circular Progress bar */}
            </View>
        </LinearGradient>
   </ScrollView>
  )
}

export default HomeScreen