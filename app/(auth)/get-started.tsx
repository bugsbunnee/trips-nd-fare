import React from "react";

import { Link, router } from "expo-router";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";

import { Button, GoogleSignInButton, Image, OrDivider, Text } from "@/src/components/ui";
import { APP_COLORS } from "@/src/constants/colors";
import { useAppSelector } from "@/src/store/hooks";

import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import ActivityIndicator from "@/src/components/ui/ActivityIndicator";

const GetStartedPage: React.FC = () => {
    const { height } = useWindowDimensions();
    const { isAuthenticating } = useAppSelector((state) => state.auth);

    return ( 
        <ParallaxScrollView
            headerHeight={height * 0.4}
            headerBackgroundColor={{ light: APP_COLORS.WHITE, dark: APP_COLORS.WHITE }}
            headerImage={
                <Image
                    contentFit='cover'
                    src={require('@/src/assets/images/welcome.png')}
                    style={styles.image}
                />
            }
        >
            <ActivityIndicator visible={isAuthenticating} />
            
            <View>
                <Text type='subtitle' style={styles.title}>Let's get started</Text>
                <Text type='default' style={styles.description}>Sign up or log in to find out the best car for you</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button label="Sign Up" onPress={() => router.push('/sign-up')} />
                
                <OrDivider />  
                
                <GoogleSignInButton label='Login with Google' />

                <Link href='/sign-in' asChild>
                    <TouchableOpacity style={styles.signinContainer}>
                        <Text type='default' style={styles.signinText}>Already have an account? <Text type='default-semibold' style={styles.sigininTextCTA}>Log in</Text></Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ParallaxScrollView>
    );
};
 
const styles = StyleSheet.create({
    description: {
        color: APP_COLORS.GRAY,
        fontSize: 17,
        letterSpacing: 0.1,
        marginTop: 10,
        textAlign: 'center',
    },
    container: {},
    buttonContainer: { marginTop: 36 },
    image: {
        height: '100%',
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    signinContainer: { marginVertical: 40 },
    signinText: { color: APP_COLORS.GRAY, textAlign: 'center' },
    sigininTextCTA: { color: APP_COLORS.PRIMARY },
    title: {
        color: APP_COLORS.DARK,
        fontSize: 28,
        lineHeight: 33,
        textAlign: 'center',
    },
});

export default GetStartedPage;