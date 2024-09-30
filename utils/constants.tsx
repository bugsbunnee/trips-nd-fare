import { icons } from '@/constants';
import { Foundation, Octicons } from '@expo/vector-icons';

export const TAB_ICONS = {
    index: (props: { color: string; }) => <Foundation name='home' size={icons.SIZES.LARGE} color={props.color} />,
    book: (props: { color: string; }) => <Octicons name='log' size={icons.SIZES.LARGE} color={props.color} />,
    account: (props: { color: string; }) => <Octicons name='person' size={icons.SIZES.LARGE} color={props.color} />,
};