import "./styles.css";
import api from "../../service/api";

export function Login({onReceive}){
    async function handleFacebookLogin(){
        let result = await api.fbPopup();
        if(result){
            onReceive(result.user);
        } else {
            alert("ERROR!");
        }
    }

    return(
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    );
}