import { useAppStore } from "@/stores/AppStore";
import axios from "axios";
import type { User } from "firebase/auth";

const httpClient = axios.create({
    baseURL: "http://localhost:3001",
});

httpClient.interceptors.request.use(async (config) => {
    const { user } = useAppStore.getState() as { user: User | null };
    if (user) {
        const token = ((await user.getIdToken()) as string) || "";
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default httpClient;
