import { ChatMessage } from "../../types/ChatMessage";
import { FullRoomResponse } from "../../types/socketapi/FullRoomResponse";
import { CHAT_RECIEVED, IS_RECONNECTING, JOIN_ROOM, LEAVE_ROOM, SET_CONNECT_STATE } from "../actions/RoomActions";

export interface RoomState {
    connected: boolean;
    connecting: boolean;
    room?: FullRoomResponse;
    chats?: ChatMessage[];
}
export const initialRoomState: RoomState = {
    connected: false,
    connecting: false,
};

export const RoomReducer = (
    state: RoomState = initialRoomState,
    { type, payload }: { type: string, payload: RoomState | ChatMessage | boolean }
): RoomState => {
    switch(type){
        case SET_CONNECT_STATE:
            return {
                ...state,
                connecting: false,
                connected: payload as boolean
            };
        case IS_RECONNECTING:
            return {
                ...state,
                connecting: true,
                connected: false
            };
        case JOIN_ROOM:
            return {
                connected: true,
                connecting: false,
                room: (payload as RoomState).room!,
                chats: []
            }
        case LEAVE_ROOM:
            return {
                connected: false,
                connecting: false
            }
        case CHAT_RECIEVED:
            const st = state;
            console.log(st);
            const messages = [...st.chats || []];
            messages.push(payload as ChatMessage);
            st.chats = messages;
            return st;
        default:
            return state;
    }
}