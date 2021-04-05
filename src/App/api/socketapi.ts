import io from 'socket.io-client';
import { setPlayerNotPlaying, setPlayerPlaying } from '../redux/actions/PlayerActions';
import { onChatRecieved, onJoinRoom, onLeaveRoom } from "../redux/actions/RoomActions";
import { ApplicationStore } from "../redux/Store";
import { ChatMessage } from '../types/ChatMessage';
import { FullRoomResponse } from "../types/socketapi/FullRoomResponse";
export const socketAPI = io("192.168.68.134:4001", {
    autoConnect: false,
    reconnectionAttempts: 3,
    path: "/",
    transports: ["websocket"]
});

socketAPI.on("joined room", (room: FullRoomResponse) => {
    // Set the room
    ApplicationStore.dispatch(onJoinRoom({
        connected: true,
        connecting: false,
        room
    }));

    // Set the player
    if (room.on_deck.playing) {
        ApplicationStore.dispatch(setPlayerPlaying({
            song: room.on_deck.song!,
            dj: room.on_deck.current_dj!.username,
            playing: true,
            current_time: (Date.now() - room.on_deck.song_start_time.getTime() / 1000),
            song_start_time: room.on_deck.song_start_time.getTime(),
            volume: 0
        }))
    } else {
        ApplicationStore.dispatch(setPlayerNotPlaying({
            playing: false,
            volume: 0
        }));
    }
});

socketAPI.on("receive chat message", (message: ChatMessage) => {
    ApplicationStore.dispatch(onChatRecieved(message));
});

socketAPI.on("disconnect", () => {
    // Set the room
    ApplicationStore.dispatch(onLeaveRoom());

    // Set the player
    ApplicationStore.dispatch(setPlayerNotPlaying({
        playing: false,
        volume: 0
    }));

});

