import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [message, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        const drone = new window.Scaledrone("BoauderdP5qY5ge6");
        drone.on("open", () => {
            const room = drone.subscribe("my-room");
            // console.log("Connected to room");
            room.on("message", (message) => {
                setMessage([...message, message]);
                console.log(message);
            });
        });
    }, []);

    const sendMessage = () => {
        if (inputMessage === "") {
            alert("Can't send an empty message!");
            return;
        }
        const newMessage = {
            text: inputMessage,
        };

        setMessage([...message, newMessage]);
        setInputMessage("");

        console.log("Message sent:", newMessage);
    };

    return (
        <div className="room_container">
            <div className="inside_container">
                {message.map((message) => (
                    <div className="sentMessage">{message.text}</div>
                ))}
                <div className="recievedMessage">tekst poruke </div>
            </div>
            <div className="type_message">
                <input
                    id="myInput"
                    required
                    type="text"
                    placeholder="Write your new message..."
                    onChange={(e) => setInputMessage(e.target.value)}
                ></input>
                <button type="submit" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
