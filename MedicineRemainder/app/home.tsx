import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, StyleSheet } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Svg,{Circle} from 'react-native-svg'

const {width} = Dimensions.get('window')

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps{
    progress: number;
    totalDoses: number;
    completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View >
      <View >
        <Text >
          {Math.round(progress * 100)}%
        </Text>
        <Text>
          {completedDoses} of {totalDoses} doses
        </Text>
      </View>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

const HomeScreen = () => {
  return (
   <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient style={styles.header} colors={["#1a8e2d","#146922"]}>
            <View style={styles.headerContent}>
                <View style={styles.headerTop}>
                    <View style={{flex:1,}} >
                        <Text style={styles.greeting}>Dialy Progress</Text>
                    </View>
                    <TouchableOpacity style={styles.notificaitonButton}>
                     <Ionicons
                        name='notifications-outline'
                        size={24}
                        color={"white"}
                        
                     />   
                    { <View style={styles.notificaitonBadge} >
                        <Text style={styles.notificationCount}>1</Text>  
                    </View>}
                    </TouchableOpacity>
                </View>

                {/* Circular Progress bar */}

                <CircularProgress 
                    progress={50}
                    totalDoses={10}
                    completedDoses={5}
                />
            </View>
        </LinearGradient>
   </ScrollView>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa"
    },
    header: {
        paddingTop: 50,
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        alignItems: "center",
        paddingHorizontal: 20
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20
    },
    greeting:{
        fontSize: 8,
        fontWeight: "600",
        color: "white",
        opacity: 0.9,
    }, 
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    notificaitonButton: {
        position : "relative",
        padding: 8,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 12,
        marginLeft: 8,
    },
    notificaitonBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#ff5252",
        borderRadius: 10,
        height: 20,
        justifyContent: "center",
        paddingHorizontal: 4,
        borderWidth: 2,
        minWidth: 20,
        borderColor: "#145922", 
    },
    notificationCount: {
        fontSize: 11,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    progressDetails: {
        fontSize: 11,
        color: "white",
        fontWeight: "bold"
    },
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    progressTextContainer: {
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    progressPercentage: {
        fontSize: 14,
        color: "white",
        fontWeight: "bold"
    },
    progressLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: "bold"
    },

    progressRing: {
    
    }
 

})