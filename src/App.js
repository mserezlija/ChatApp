import "./App.css";
import { useState, useEffect } from "react";

const drone = new window.Scaledrone("BoauderdP5qY5ge6");

function App() {
    const [message, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
        });

        const room = drone.subscribe("chat");

        room.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
        });

        room.on("message", (message) => {
            if (message.clientId !== drone.clientId) {
                setMessage((prevMessages) => [...prevMessages, message.data]);
            }
            // console.log(message);
        });
    }, []);

    const sendMessage = () => {
        if (inputMessage === "") {
            alert("Can't send an empty message!");
            return;
        }
        const newMessage = {
            text: inputMessage,
            myId: drone.clientId,
        };

        drone.publish({
            room: "chat",
            message: newMessage,
        });

        setMessage((prevMessages) => [...prevMessages, newMessage]);

        const emptyInput = (document.getElementById("myInput").value = "");
        setInputMessage(emptyInput);
    };

    return (
        <div className="room_container">
            <div className="showMessages">
                {message.map((message) => (
                    <div
                        className={
                            message.myId === drone.clientId
                                ? "sentMessage"
                                : "receivedMessage"
                        }
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="type_message">
                <input
                    id="myInput"
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
