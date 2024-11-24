import { usePermissions, saveToLibraryAsync } from 'expo-media-library';
import { useCallback } from "react";

const useMediaPermission = () => {
    const [permissionResponse, requestMediaPermission] = usePermissions({ writeOnly: true });

    const saveFileToLibrary = useCallback(async (uri: string) => {
        if (!permissionResponse || !permissionResponse.granted) {
            let { granted } = await requestMediaPermission();
            if (!granted) return;
        }

        await saveToLibraryAsync(uri);
    }, [permissionResponse, requestMediaPermission]);

    return { permissionResponse, saveFileToLibrary };
};
 
export default useMediaPermission;