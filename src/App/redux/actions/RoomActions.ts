import { ChatMessage } from "../../types/ChatMessage";
import { RoomState } from "../reducers/RoomReducer";

export const SET_CONNECT_STATE = "room:setConnectionState";
export const setConnectionState = (state: boolean) => {
    return {
        type: SET_CONNECT_STATE,
        payload: state
    }
}

export const IS_RECONNECTING = "room:isReconnecting";
export const isReconnecting = () => {
    return {
        type: IS_RECONNECTING,
        payload: true
    }
}

export const JOIN_ROOM = "room:onJoinRoom";
export const onJoinRoom = (state: RoomState) => {
    return {
        type: JOIN_ROOM,
        payload: state
    }
}

export const CHAT_RECIEVED = "room:onChatSent";
export const onChatRecieved = (state: ChatMessage) => {
    return {
        type: CHAT_RECIEVED,
        payload: state
    }
}

export const LEAVE_ROOM = "room:onLeaveRoom";
export const onLeaveRoom = () => {
    return {
        type: LEAVE_ROOM,
        payload: false
    }
}