import {useState,useEffect, use} from 'react'
import {View,Text, StyleSheet, TouchableOpacity, Dimensions}from 'react-native'
import {useRouter} from 'expo-router'
import * as LocalAuthentication from 'expo-local-authentication'
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'

const {width} = Dimensions.get('window');


export default function AuthScreen() {

    const [hasBiometrics, sethasBiometrics] = useState(false)
    const [isAuthenticating, setisAuthenticating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(()=>{
        checkBiometrics()
    },[])
    const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    sethasBiometrics(hasHardware && isEnrolled)

}
    const authenticate = async () => {
        try{
            setisAuthenticating(true)
            setError(null)

            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            const supportTypes = await LocalAuthentication.supportedAuthenticationTypesAsync()

            const auth = await LocalAuthentication.authenticateAsync({
                promptMessage: hasHardware && hasBiometrics ? 'Use face ID/Touch ID ' : 'Enter your Pin to acces medications',
                fallbackLabel:  'Use Pin', 
                cancelLabel: 'Cancel',
                disableDeviceFallback: false
            })

            if(auth.success) {
                router.replace("/home")
            } else{
                setError("Authentication Failed: please try again ")
                setisAuthenticating(false)
            }
        }
        catch (error) {

        }
    }
    return (
        <LinearGradient colors={["#4CAF50","#2E7D32"]} style={styles.container} >
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name='medical' size={80} color={'white'}/> 
                </View>

                <Text style={styles.title}>
                    Time4Meds
                </Text>
                <Text style={styles.subtitle}>
                    Your Personal Medication Reminder
                </Text>

                <View style={styles.card}>
                    <Text style={styles.welcomeText}>
                        Welcome Back!
                    </Text>
                    <Text style={styles.InstructionText}>
                        {
                            hasBiometrics ? 
                            'Use face ID/Touch ID Or PIN to acces your medications' : 
                            'Enter your PIN to access your medications'
                        }
                    </Text>
                    <TouchableOpacity style={[styles.button, isAuthenticating && styles.buttonDisabled]}
                    onPress={authenticate}
                    disabled={isAuthenticating}
                    >
                        <Ionicons 
                        name={hasBiometrics ? 'finger-print-outline' : 'keypad-outline'}
                        size={24}
                        color='white'
                        />
                        <Text  style={styles.buttonText}>
                            {
                            isAuthenticating ? 'Verifying....' : hasBiometrics ? 'Authenticate' : 'Enter PIN'
                            }
                        </Text>
                    </TouchableOpacity>
                    {error &&  
                    (<View style={styles.errorContainer}> 
                        <Ionicons name='alert-circle' size={20} color={'#f44336'} />\
                        <Text>{error}</Text>
                    </View>)
                    }
                </View>
            </View>  
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",

    },
    iconContainer: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textShadowColor: "rgba(0,0,0,0.2",
        textShadowOffset: {width:1,height:1},
        textShadowRadius: 3,
    },
    subtitle: {
         fontSize: 8,
        color: "rgba(255,255,255,0.9",
        marginBottom: 40,
        textAlign: "center"
    },
    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        width: width - 40,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    welcomeText:{
        fontSize: 20,
        fontWeight: "bold",
        color: '#333',
        marginBottom: 10,
    },
    InstructionText: {
         fontSize: 16,
        color: '#666',
        textAlign: "center",
        marginBottom: 20,
    },

    button: {
        backgroundColor: "#4CAF50",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: "100%",
        alignItems: "center",
       justifyContent: "center",
       flexDirection: "row"
    },
    buttonIcon: {
        marginRight: 10
    },
    buttonDisabled:{
        opacity: 0.7,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    errorText: {
        color: "#f44336",
        fontSize: 14,
        marginLeft: 8,
    }
})