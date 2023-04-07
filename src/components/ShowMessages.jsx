function Messages(props) {
    const { message } = props;

    return (
        <div className="showMessages">
            {message.map((message) => (
                <div
                    className={
                        message.myId === props.drone.clientId
                            ? "sentMessage"
                            : "receivedMessage"
                    }
                >
                    {message.text}
                </div>
            ))}
        </div>
    );
}

export default Messages;
