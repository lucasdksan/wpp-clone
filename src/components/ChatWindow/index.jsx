import { useState, useEffect, useRef } from 'react';
// import Picker from 'emoji-picker-react';

import { MessageItem } from '../MessageItem';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

import "./styles.css";

export function ChatWindow({user}){
    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition !== undefined){
        recognition = new SpeechRecognition();
    }

    const [ emojiOpen, setEmojiOpen ] = useState(false);
    const [ text, setText ] = useState('');
    const [ listening, setListening ] = useState(false);
    const [ list, setList ] = useState([{author: 123, body: 'Um amor para mim.'}, {author: 1234, body: 'Para mim tbm'}]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    },[list]);

    const handleEmojiClick = (e, emojiObject) => {  
        setText(`${text} ${emojiObject.emoji}`);
    }

    function handleOpenEmoji(){
        setEmojiOpen(true);
    }

    function handleCloseEmoji(){
        setEmojiOpen(false);
    }

    function handleMicClick(){
        console.log('oi')
        if(recognition !== null){
            recognition.onstart = ()=>{
                setListening(true);
            }

            recognition.onend = ()=>{
                setListening(false);
            }

            recognition.onresult = (e)=>{
                setText(e.results[0][0].transcript);
            }

            recognition.start();
        }
    }

    function handleSendClick(){

    }

    return(
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--header-info">
                    <img className="header-info-img" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar Image" />
                    <div className="header-info-name">
                        Lucas da Silva Leoncio
                    </div>
                </div>
                <div className="chatWindow--header-buttons">
                    <div className="header-buttons-btn">
                        <SearchIcon style={{color: '#919191'}}/>
                    </div>
                    <div className="header-buttons-btn">
                        <AttachFileIcon style={{color: '#919191'}}/> 
                    </div>
                    <div className="header-buttons-btn">
                        <MoreVertIcon style={{color: '#919191'}}/>
                    </div>
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {
                    list.map((item, key)=>{
                        return (
                            <MessageItem
                                key={key}
                                data={item}
                                user={user}
                            />
                        )
                    })
                }
            </div>
            <div 
                className="chatWindow--emojiarea"
                style={{height: emojiOpen ? '200px' : '0px'}}
            >
                {/* <Picker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                /> */}
            </div>
            <div className="chatWindow--footer">
                <div className="chatWindow--pre">
                    <div 
                        className="header-buttons-btn"
                        onClick={handleCloseEmoji}
                        style={{width: emojiOpen ? 40:0}}
                    >
                        <CloseIcon style={{color: '#919191'}}/> 
                    </div>
                    <div 
                        className="header-buttons-btn"
                        onClick = {handleOpenEmoji}
                    >
                        <EmojiEmotionsIcon style={{color: emojiOpen ? '#009688' : '#919191'}}/> 
                    </div>
                </div>  
                <div className="chatWindow--input-area">
                    <input 
                        type="text" 
                        placeholder="Digite uma mensagem" 
                        className="chatWindow--input"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                    />
                </div>
                <div className="chatWindow--pos">
                    {
                        text === "" &&
                        <div onClick={handleMicClick} className="header-buttons-btn">
                            <MicIcon style={{color: listening ? '#126ece' : '#919191'}}/> 
                        </div>
                    }
                    {
                        text !== "" && 
                        <div onClick={handleSendClick} className="header-buttons-btn">
                            <SendIcon style={{color: '#919191'}}/> 
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}