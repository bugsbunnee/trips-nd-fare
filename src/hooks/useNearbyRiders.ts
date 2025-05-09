import { useAppSelector } from "@/src/store/hooks";
import { useMemo } from "react";
import { MapMarkerProps } from "@/src/components/maps/Map";

const useNearbyRiders = () => {
    const data = useAppSelector((state) => state.data);
    
    const nearbyRiders: MapMarkerProps[] = useMemo(() => {
        return data.nearbyRiders.map((rider) => ({
        identifier: rider._id,
        coordinate: rider.coordinates,
        title: `${rider.firstName} ${rider.lastName}`,
        }));
    }, [data.nearbyRiders]);

    return nearbyRiders;
};
 
export default useNearbyRiders;