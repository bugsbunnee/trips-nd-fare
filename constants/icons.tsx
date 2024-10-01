import { Foundation, Octicons } from '@expo/vector-icons';

export const SIZES = {
    NORMAL: 24,
    LARGE: 30,
    X_LARGE: 110,
};

export const TAB_ICONS = {
    home: (props: { color: string; }) => <Foundation name='home' size={SIZES.LARGE} color={props.color} />,
    history: (props: { color: string; }) => <Octicons name='log' size={SIZES.LARGE} color={props.color} />,
};

export default { SIZES, TAB_ICONS }
