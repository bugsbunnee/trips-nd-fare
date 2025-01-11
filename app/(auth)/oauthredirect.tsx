import React, { useEffect } from "react";
import { router } from "expo-router";

import ActivityIndicator from "@/components/ui/ActivityIndicator";

const OAuthRedirectPage: React.FC = () => {
    useEffect(() => {
        const timeout = setTimeout(() => router.push('/'), 4_000);
        return () => clearTimeout(timeout);
    }, []);

    return <ActivityIndicator visible />;
};
 
export default OAuthRedirectPage;