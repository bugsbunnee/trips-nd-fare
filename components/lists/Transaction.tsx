import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { colors, styles as defaultStyles } from "@/constants";
import { DATE_FORMAT } from '@/constants/app';
import { Text } from "@/components/ui";
import { formatAmount, formatDate, getTransactionStatusColors } from '@/utils/lib';
import { Transaction as TransactionModel } from "@/utils/models";

interface Props {
    transaction: TransactionModel;
    onPress: () => void;
}

const Transaction: React.FC<Props> = ({ transaction, onPress }) => {
    const { bg, text } = useMemo(() => {
        return getTransactionStatusColors(transaction.status);
    }, [transaction.status]);

    return ( 
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <Text type='default' style={styles.transferHistoryItemTitle}>{transaction.description}t</Text>
                <Text type='default' style={styles.transferHistoryItemDate}>{formatDate(transaction.date, DATE_FORMAT.DATE_MID)}</Text>
            </View>
            <View>
                <Text type='default' style={[styles.transferHistoryItemTitle, { textAlign: 'right' }]}>{formatAmount(transaction.amount)}</Text>
                <View style={[styles.transferHistoryItemStatusBG, { backgroundColor: bg as unknown as string }]}>
                    <Text type='default' style={[styles.transferHistoryItemStatus, { color: text as unknown as string }]}>{transaction.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
     );
};

const styles = StyleSheet.create({
    failedBG: {
        backgroundColor: colors.light.dangerLight,
    },
    failedText: {
        color: colors.light.danger,
    },
    successBG: {
        backgroundColor: colors.light.successMid,
    },
    successText: {
        color: colors.light.successDark,
    },
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flex: 1,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.light.dewDark,
    },
    transferHistoryItemTitle: {
        color: colors.light.black,
        fontSize: 12,
        lineHeight: 14,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        textAlign: 'left'
    },
    transferHistoryItemDate: {
        color: colors.light.gray,
        marginTop: 4,
        fontSize: 10,
        lineHeight: 12,
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        textAlign: 'left'
    },
    transferHistoryItemStatusBG: {
        alignSelf: 'flex-end',
        marginTop: 4,
        padding: 2
    },
    transferHistoryItemStatus: {
        fontSize: 8,
        lineHeight: 10,
        textAlign: 'right',
        fontFamily: defaultStyles.urbanistMedium.fontFamily,
        textTransform: 'capitalize'
    }
});
 
export default Transaction;