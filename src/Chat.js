import React, { useEffect, useState } from 'react'
import './Chat.css'
import MicNoneIcon from '@material-ui/icons/MicNone'
import { IconButton } from '@material-ui/core';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import firebase from 'firebase'
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move'

function Chat() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)

    useEffect(() => {
        if(chatId) {
            db.collection('chats').doc(chatId).collection('messages').orderBy("timestamp", "desc").onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    }, [chatId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photoUrl: user.photoUrl,
            email: user.email,
            displayName: user.displayName

        })

        setInput("")
    }
    return (
        <div className = "chat">
            <div className = "chat__header">
                    <h4>To: 
                        <span 
                            className = "chat__channelName">  
                            {chatName}
                        </span>
                    </h4>
                <strong>Details</strong>
            </div>
            <div className = "chat__messages">
                <FlipMove>
                { messages.map(({id, data}) => (
                    <Message 
                        key = {id}
                        contents = {data}
                    />
                ))}
                </FlipMove>
                
                
            </div>
            <div className ="chat__input">
                <form>
                    <input 
                        value = {input}
                        placeholder = "!message" 
                        type = "text" 
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <button onClick = {sendMessage}>Send Message</button>
                </form>
                <IconButton>
                    <MicNoneIcon className ="chat__mic" />
                </IconButton>
                

            </div>
        </div>
    )
}

export default Chat
