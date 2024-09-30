import { Foundation, Octicons } from '@expo/vector-icons';

export const SIZES = {
    NORMAL: 24,
    LARGE: 30,
    X_LARGE: 110,
};

export const TAB_ICONS = {
    index: (props: { color: string; }) => <Foundation name='home' size={SIZES.LARGE} color={props.color} />,
    book: (props: { color: string; }) => <Octicons name='log' size={SIZES.LARGE} color={props.color} />,
    account: (props: { color: string; }) => <Octicons name='person' size={SIZES.LARGE} color={props.color} />,
};

export default { SIZES, TAB_ICONS }
