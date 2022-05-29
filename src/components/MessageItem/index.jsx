import "./styles.css";

export function MessageItem({data, user}){
    return(
        <div 
            className="message--line"
            style={{justifyContent: user.id === data.author ? 'flex-end' : 'flex-start'}}
        >
            <div 
                className="message--item"
                style={{backgroundColor: user.id === data.author ? '#dcf8c6' : '#fff'}}
            >
                <div className="message--text">
                    {data.body}
                </div>
                <div className="message--data">
                    19:00
                </div>
            </div>
        </div>
    );
}