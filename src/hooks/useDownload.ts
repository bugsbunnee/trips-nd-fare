import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';

const useDownload = () => {
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [initTimer, setInitTimer] = useState(false);

    const callback = useCallback((downloadProgress: FileSystem.DownloadProgressData) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    }, []);
      
    const onDownload = useCallback(async (uri: string) => {
        const fileUri = FileSystem.documentDirectory + 'test.png';
        const downloadResumable = FileSystem.createDownloadResumable(uri, fileUri, {}, callback);
        
        const result = await downloadResumable.downloadAsync();
        if (result) return result.uri;
    }, [callback]);

    const simulateDownload = useCallback(() => {
        setInitTimer(true);
    }, []);

    const resetProgress = useCallback(() => {
        setDownloadProgress(0);
    }, []);

    useEffect(() => {
        if (initTimer) {
            const interval = setInterval(() => {
                const progress = downloadProgress + .25;

                if (progress <= 1) {
                    return setDownloadProgress(progress);
                }

                clearInterval(interval);
                setInitTimer(false);
            }, 300);
    
            return () => clearInterval(interval);
        }
    }, [initTimer, downloadProgress]);

    return { downloadProgress, onDownload, resetProgress, simulateDownload };
};
 
export default useDownload;