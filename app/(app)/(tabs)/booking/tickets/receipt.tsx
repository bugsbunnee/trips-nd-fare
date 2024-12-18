import React, { useCallback, useRef, useState } from "react";
import Animated from "react-native-reanimated";
import DashedLine from "react-native-dashed-line";
import AppProgress from "@/components/ui/Progress";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import { FormError } from "@/components/forms";
import { colors, styles as defaultStyles } from "@/constants";
import { Image, Text } from "@/components/ui";
import { TICKETS } from "@/utils/data";
import { formatAmount, formatDate, generateScreenshot, getCountDown, getLocationCode, getTimeFromDate, sendLocalNotification } from "@/utils/lib";

import useFluidButtonStyle from "@/hooks/useFluidButtonStyle";
import useDownload from "@/hooks/useDownload";
import useMediaPermission from "@/hooks/useMediaPermission";


const TicketDownloadPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const insets = useSafeAreaInsets();
    const ticket = TICKETS[0];
    
    const countdown = getCountDown(ticket.departureDate, ticket.arrivalDate);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const ref = useRef<View>(null);
    const download = useDownload();
    const media = useMediaPermission();

    const style = useFluidButtonStyle({ 
        triggerAnimation: true, 
        colorList: [colors.light.primary, colors.light.primaryLight],
    });

    const handleDownload = useCallback(async () => {
        try {
            let uri = await generateScreenshot(ref);
            if (uri) await media.saveFileToLibrary(uri);

            download.simulateDownload();
        } catch (error) {
            setErrorMessage((error as Error).message)
        }
    }, []);

    const handleDownloadCompleted = useCallback(() => {
        sendLocalNotification({
            title: "Receipt downloaded successfully!",
            body: "Your receipt has been downloaded successfully!"
        });

        download.resetProgress();

        router.push('/booking/tickets/confirmation');
    }, []);

    return ( 
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <AppProgress 
                visible={download.downloadProgress > 0} 
                progress={download.downloadProgress} 
                onDone={handleDownloadCompleted}
            />

           <View style={styles.header} />

           <View style={styles.body}>
                <View ref={ref} collapsable={false} style={styles.receipt}>
                    <View style={styles.companyContainer}>
                        <Image 
                            src={require("@/assets/images/abc.png")}
                            style={styles.company}
                        />
                    </View>

                    <View>
                        <View style={[styles.row, styles.padding]}>
                            <View>
                                <Text type='default' style={styles.location}>{ticket.location}</Text>
                                <Text type='default' style={styles.code}>{getLocationCode(ticket.location)}</Text>
                                <Text type='default' style={styles.time}>{getTimeFromDate(ticket.departureDate)}</Text>
                            </View>

                            <View style={styles.flex}>
                                <View style={styles.row}>
                                    <View style={styles.dot} />

                                    <DashedLine 
                                        dashLength={2} 
                                        dashThickness={1} 
                                        dashGap={3} 
                                        style={styles.dash}
                                        dashColor={colors.light.borderMid} 
                                    />
                                    
                                    <View style={styles.imageContainer}>
                                        <Image src={require("@/assets/images/journey.png")} style={styles.logo} />
                                    </View>
                                    
                                    <DashedLine 
                                        dashLength={2} 
                                        dashThickness={1} 
                                        dashGap={3} 
                                        style={styles.dash}
                                        dashColor={colors.light.borderMid} 
                                    />

                                    <View style={styles.dot} />
                                </View>

                                <Text type='default' style={styles.duration}>{countdown.days > 0 ? countdown.days + 'D' : null} {countdown.hours}H {countdown.minutes}M</Text>
                            </View>

                            <View>
                                <Text type='default' style={styles.location}>{ticket.destination}</Text>
                                <Text type='default' style={styles.code}>{getLocationCode(ticket.destination)}</Text>
                                <Text type='default' style={styles.time}>{getTimeFromDate(ticket.arrivalDate)}</Text>
                            </View>
                        </View>

                        <View style={styles.separator}>
                            <View style={[styles.ball, { left: -28 }]} />
                        
                            <DashedLine
                                dashLength={2} 
                                dashThickness={1} 
                                dashGap={3} 
                                style={{ flex: 1, marginHorizontal: 9 }}
                                dashColor={colors.light.borderMid} 
                            /> 

                            <View style={[styles.ball, { right: -28 }]} />
                        </View>

                        <View style={styles.amountContainer}>
                            <Text type="default-semibold" style={styles.amount}>
                                <Text type="default-semibold">{formatAmount(ticket.amount)}</Text>
                                <Text type="default-semibold" style={styles.amountLabel}>/Trip</Text>
                            </Text>
                        </View>

                        <View style={{ padding: 27 }}>
                            <View style={[styles.detail, { marginBottom: 27 }]}>
                                <View style={styles.detailItem}>
                                    <Text type="default-semibold" style={styles.label}>Passenger Name</Text>
                                    <Text type="default-semibold" style={styles.value}>Joseph Ogbaji</Text>
                                </View>
                            
                                <View style={styles.detailItem}>
                                    <Text type="default-semibold" style={styles.label}>Departure Date</Text>
                                    <Text type="default-semibold" style={styles.value}>{formatDate(ticket.departureDate, 'MMM. DD, YYYY')}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.detail}>
                                <View style={styles.detailItem}>
                                    <Text type="default-semibold" style={styles.label}>Terminal</Text>
                                    <Text type="default-semibold" style={styles.value}>Ajah</Text>
                                </View>
                            
                                <View style={styles.detailItem}>
                                    <Text type="default-semibold" style={styles.label}>Seat Number</Text>
                                    <Text type="default-semibold" style={styles.value}>S4</Text>
                                </View>
                            </View>
                        
                            <DashedLine 
                                dashLength={2} 
                                dashThickness={1} 
                                dashGap={3} 
                                style={{ width: "100%", marginTop: 29 }}
                                dashColor={colors.light.grayDeep} 
                            />
                        
                        </View>
                        
                        <View style={styles.buttonContainer}>
                            <AnimatedTouchable style={[styles.button, style]} onPress={handleDownload}>
                                <Text type="default-semibold" style={styles.buttonText}>Download Receipt</Text>
                            </AnimatedTouchable>
                        </View>
                    </View>
                </View>

               <FormError error={errorMessage} />
           </View>
        </View>
     );
};

const styles = StyleSheet.create({
    amount: {
        color: colors.light.primary,
        fontSize: 18,
        lineHeight: 22,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textAlign: "center"
    },
    amountContainer: { padding: 8, borderBottomWidth: 1, borderBottomColor: "#EDEDED" },
    amountLabel: {
        color: colors.light.graySemi,
        fontSize: 14,
        lineHeight: 17,
        fontWeight: defaultStyles.urbanistMedium.fontWeight,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
    },
    ball: {
        width: 28,
        height: 28,
        borderRadius: 28,
        position: "absolute",
        backgroundColor: colors.light.input,
    },
    body: {
        flex: 1,
        backgroundColor: colors.light.dewMid,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: -40,
        padding: 33,
        paddingBottom: 200
    },
    button: {
        padding: 20,
        borderWidth: 1,
        borderColor: colors.light.primary,
        borderRadius: 100,
        backgroundColor: colors.light.primaryLight
    },
    buttonContainer: { paddingHorizontal: 29, paddingVertical: 19 },
    buttonText: {
        textAlign: "center",
        fontSize: 15,
        color: colors.light.primary
    },
    code: {
        color: colors.light.primary,
        fontSize: 16,
        lineHeight: 26,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textTransform: "uppercase"
    },
    container: {
        backgroundColor: colors.light.dew,
        flex: 1,
    },
    company: { width: 63, height: 44, resizeMode: "contain" },
    companyContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 13,
        paddingBottom: 21,
        borderBottomWidth: 1,
        borderBottomColor: "#EDEDED"
    },
    dash: { width: 66 },
    detail: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    detailItem: { minWidth: 97 },
    dot: { 
        backgroundColor: colors.light.borderMid,
        width: 7,
        height: 7,
        borderRadius: 7
    },
    duration: {
        color: colors.light.graySemi,
        fontSize: 12,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        textTransform: "uppercase",
    },
    flex: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.light.primary,
        height: 221,
    },
    imageContainer: { 
        width: 35, 
        height: 35,
        borderRadius: 35,
        backgroundColor: colors.light.dew,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 10,
        lineHeight: 11,
        color: colors.light.grayDeep
    },
    location: {
        color: colors.light.graySemi,
        fontSize: 16,
        lineHeight: 26,
        fontWeight: defaultStyles.urbanistSemibold.fontWeight,
        fontFamily: defaultStyles.urbanistSemibold.fontFamily,
        textTransform: "capitalize"
    },
    logo: { width: 18, height: 18, resizeMode: "contain" },
    receipt: {
        padding: 11,
        borderRadius: 20,
        marginTop: -148,
        marginBottom: 11,
        backgroundColor: colors.light.white
    },
    row: { 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    time: {
        color: colors.light.graySemi,
        fontSize: 10,
        lineHeight: 26,
        fontFamily: defaultStyles.urbanistBold.fontFamily,
        textTransform: "uppercase"
    },
    padding: {
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    value: {
        fontSize: 14,
        marginTop: 5,
        color: colors.light.dark
    },
});
 
export default TicketDownloadPage;