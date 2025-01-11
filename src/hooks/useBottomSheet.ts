import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";

const useBottomSheet = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handleOpenSheet = useCallback(() => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        }
    }, []);

    useEffect(() => {
        handleOpenSheet();
    }, []);

    return {
        ref: bottomSheetModalRef,
        onOpenSheet: handleOpenSheet
    };
};
 
export default useBottomSheet;