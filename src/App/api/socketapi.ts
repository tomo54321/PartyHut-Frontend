import io from 'socket.io-client';
import { setPlayerNotPlaying, setPlayerPlaying } from '../redux/actions/PlayerActions';
import { onChatRecieved, onJoinRoom, onLeaveRoom } from "../redux/actions/RoomActions";
import { ApplicationStore } from "../redux/Store";
import { ChatMessage } from '../types/ChatMessage';
import { FullRoomResponse } from "../types/socketapi/FullRoomResponse";
import { RoomDeckChange } from '../types/socketapi/RoomDeckChange';
import { RoomUser } from '../types/socketapi/RoomUser';
export const socketAPI = io("192.168.68.134:4001", {
    autoConnect: false,
    reconnectionAttempts: 3,
    path: "/",
    transports: ["websocket"]
});

(window as any).sockt = socketAPI;

socketAPI.on("joined room", (room: FullRoomResponse) => {
    const volume = ApplicationStore.getState().player.volume;

    // Set the room
    ApplicationStore.dispatch(onJoinRoom({
        connected: true,
        connecting: false,
        room
    }));

    const start_time = Date.parse(room.on_deck.song_start_time);
    // Set the player
    if (room.on_deck.playing) {
        const dj = room.users.find(usr => usr.id === room.on_deck.current_dj!);
        ApplicationStore.dispatch(setPlayerPlaying({
            song: room.on_deck.song!,
            dj: dj?.username || room.name,
            playing: true,
            current_time: (Date.now() - start_time/ 1000),
            song_start_time: start_time,
            volume
        }))
    } else {
        ApplicationStore.dispatch(setPlayerNotPlaying({
            playing: false,
            volume
        }));
    }
});

socketAPI.on("receive chat message", (message: ChatMessage) => {
    ApplicationStore.dispatch(onChatRecieved(message));
});

socketAPI.on("user join", (user: RoomUser) => {
    const room = ApplicationStore.getState().room.room!;
    const users = [...room.users];
    users.push(user);
    room.users = users;
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }))
});

socketAPI.on("user leave", ({ id } : { id: string }) => {
    const room = ApplicationStore.getState().room.room!;
    const users = [...room.users];
    const userIndex = users.findIndex(usr => usr.id === id);
    if(userIndex > -1){
        users.splice(userIndex, 1);
    }

    room.users = users;
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }))
});

socketAPI.on("joined queue", () => {
    const room = ApplicationStore.getState().room.room!;
    room.in_queue = true;
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }))
});
socketAPI.on("became dj", () => {
    const room = {...ApplicationStore.getState().room.room!};
    room.in_queue = false;
    room.is_dj = true;
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }))
});
socketAPI.on("no longer dj", () => {
    const room = {...ApplicationStore.getState().room.room!};
    room.in_queue = false;
    room.is_dj = false;
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }))
});

socketAPI.on("deck change", (deck: RoomDeckChange) => {
    const room = ApplicationStore.getState().room.room!;
    room.on_deck = deck;
    const volume = ApplicationStore.getState().player.volume;
    
    ApplicationStore.dispatch(onJoinRoom({
        connecting: false,
        connected: true,
        room
    }));

    if(room.on_deck.playing){
        
        const start_time = Date.parse(room.on_deck.song_start_time);
        const dj = room.users.find(usr => usr.id === room.on_deck.current_dj);

        ApplicationStore.dispatch(setPlayerPlaying({
            song: room.on_deck.song!,
            dj: dj?.username || room.name,
            playing: true,
            current_time: (Date.now() - start_time/ 1000),
            song_start_time: start_time,
            volume
        }))

    } else {
        ApplicationStore.dispatch(setPlayerNotPlaying({
            playing: false,
            volume
        }))
    }

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

