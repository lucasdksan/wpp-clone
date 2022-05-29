import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./styles.css";
import api from '../../service/api';

export function NewChat({ chatlist, user, show, setShow }){
    const [ list, setList ] = useState([]);
    
    useEffect(()=>{
        const getList = async ()=> {
            if(user !== null){
                let results = await api.getContactList(user.id);
                setList(results);
            }
        };

        getList();
    },[]);

    function handleClose(){
        setShow(false);
    }

    async function addNewChat(item){
        await api.addNewChats(user, item);
    }

    return(
        <div 
            onClick={handleClose} 
            className="newChat" 
            style={{left: show ? 0 : -415}}
        >
            <div className="newChat--head">
                <div className="newChat--backbutton">
                    <ArrowBackIcon style={{color: '#ffffff'}}/>
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {
                    list.map((item, key)=>{
                        return (
                            <div onClick={()=>addNewChat(item)} className="newChat--item" key={key}>
                                <img className="newChat--itemavatar" src={item.avatar} alt="Icon Avatar" />
                                <div className="newChat--itemname">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}