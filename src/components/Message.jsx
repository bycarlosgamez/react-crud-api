import './Message.css';

const Message = ({ msg, bgColor }) => {
  let styles = {
    backgroundColor: bgColor,
  };
  return (
    <div className='message' style={styles}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
