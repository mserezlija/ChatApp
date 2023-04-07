import "../App.css";

function InputMessages(props) {
    const { inputMessage, setInputMessage, sendMessage } = props;

    return (
        <div className="type_message">
            <input
                id="myInput"
                type="text"
                placeholder="Write your new message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            ></input>
            <button type="submit" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
}

export default InputMessages;
