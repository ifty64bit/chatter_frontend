import { useQuery } from "@tanstack/react-query";
import { getMessageFromRoom } from "@/apis/message";
import { useAppStore } from "@/stores/AppStore";

function useMessageQuery() {
    const roomId = useAppStore((state) => state.currentRoom);
    return useQuery({
        queryKey: [roomId?.id],
        queryFn: () => getMessageFromRoom(roomId?.id!),
        enabled: !!roomId,
    });
}

export default useMessageQuery;
