import { useCallback, useEffect } from "react";
import { getMyBookings } from "@/store/data/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const useBookings = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.data);
    
    const handleFetchBookings = useCallback(() => {
        dispatch(getMyBookings())
    }, [dispatch]);

    useEffect(() => {
        handleFetchBookings();
    }, [handleFetchBookings]);

    return {
        bookings: data.bookings,
        isLoading: data.isLoading,
        onRefresh: handleFetchBookings,
    };
};
 
export default useBookings;