import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Overlay,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FaBuilding, FaUser, FaXmark } from 'react-icons/fa6';
import { SiGoogleforms } from 'react-icons/si';
import Paragraph from '../../components/paragraph';
import { IoChatbubbleEllipsesOutline, IoSend } from 'react-icons/io5';
import {
  useChatBotMutation,
  useGetHomeDetailsQuery,
} from '../../redux/api/HomeApi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { useTheme } from '../../Contexts/ThemeContext';

function Chatbot() {
  const { color } = useTheme();
  const navigate = useNavigate();
  const phoneNumber = '+1234567890';
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showFormModal, setShowFormModal] = useState(true);
  const [logo, setLogo] = useState([]);
  const [options, setOptions] = useState(false);
  const [SendMessage, { isLoading }] = useChatBotMutation();
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);
  const [addId, setAddId] = useState(false);
  const chatbotRef = useRef(null);
  const { data: HomeData } = useGetHomeDetailsQuery({
    phoneNumber: '',
  });

  useEffect(() => {
    if (HomeData && HomeData.data) {
      setLogo(HomeData?.data?.logo[0]);
    }
  }, [HomeData]);

  useEffect(() => {
    setShowTooltip(true);
  }, []);

  const addMessage = async (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    await handleAddQuote(text);
  };

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsappClick = () => {
    setShowMore(false);
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const numericInput = phone.replace(/[^0-9]/g, '').slice(0, 10);
    setUserPhone(numericInput);
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(numericInput)) {
      setPhoneError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const hasUppercase = /[A-Z]/.test(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (hasUppercase) {
      setEmailError('Please use only lowercase letters.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }

    setUserEmail(email.toLowerCase());
  };

  const handleStartChat = async () => {
    const data = {
      phoneNumber: userPhone,
    };
    try {
      const response = await SendMessage({ data: data });

      if (response?.data) {
        if (response?.data?.statusCode === '200') {
          setAllMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now(),
              text: response?.data.message,
              sender: 'Bot',
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ]);
          if (response?.data?.statusCode === '200') {
            setOptions(true);
          }
          setShowFormModal(false);
        } else {
          setAllMessages((prevMessages) => [
            ...prevMessages,
            {
              id: Date.now(),
              text:
                'Hello ' + userName.charAt(0).toUpperCase() + userName.slice(1),
              sender: 'Bot',
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
            {
              id: Date.now(),
              text: response?.data.message,
              sender: 'Bot',
              time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            },
          ]);

          setShowFormModal(false);
        }
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddQuote = async (message) => {
    const data = {
      phoneNumber: userPhone,
      userName: userName,
      email: userEmail,
      query: addId ? '' : message,
      requestId: addId ? message : '',
    };

    try {
      const response = await SendMessage({ data: data });

      if (response?.data) {
        const newMessage = {
          id: Date.now(),
          text: response?.data.message,
          sender: 'Bot',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setAllMessages((prevMessages) => [...prevMessages, newMessage]);
        setAddId(false);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      addMessage(newMessage, 'You');
      setUserMessage(newMessage);
      setNewMessage('');
    }
  };
  useEffect(() => {
    const chatBody = document.getElementById('chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [allMessages]);

  const isFormValid =
    userName && !phoneError && userPhone && userEmail && !emailError;
  const renderTooltip = () => (
    <div
      style={{
        position: 'absolute',
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: '10px',
        backgroundColor: color,
        padding: '5px 10px',
        borderRadius: '4px',
        color: '#fff',
        whiteSpace: 'nowrap',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '100%',
          top: '50%',
          width: 0,
          height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: `5px solid ${color ?? '#00A8B2'}`,
          transform: 'translateY(-50%)',
        }}
      />
      <p className="p-0 m-0" style={{ fontSize: '12px', fontWeight: 400 }}>
        We're online
      </p>
      <p className="p-0 m-0" style={{ fontSize: '11px', fontWeight: 200 }}>
        How may I help you today?
      </p>
    </div>
  );
  useEffect(() => {
    setShowTooltip(true); // Show tooltip when the component mounts

    const handleClickOutside = (event) => {
      const chatbotContainer = chatbotRef.current;
      if (chatbotContainer && !chatbotContainer.contains(event.target)) {
        setShowChatBot(false); // Close the chatbot
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptions = (userText, botText) => {
    const newMessage1 = {
      id: Date.now(),
      text: userText,
      sender: 'You',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const newMessage2 = {
      id: Date.now(),
      text: botText,
      sender: 'Bot',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setAllMessages((prevMessages) => [
      ...prevMessages,
      newMessage1,
      newMessage2,
    ]);
    setOptions(false);
    if (userText === 'Yes') {
      setAddId(true);
    }
  };
  return (
    <div id="chatbot-container mb-5">
      <div
        className={`chat-icon-container  d-flex`}
        style={{
          position: 'fixed',
          bottom: '71px',
          right: '10px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showMore ? (
          <Button
            className={`chat-icon `}
            onClick={() => setShowMore(false)}
            style={{
              width: '50px',
              height: '50px',
              animation: 'blink 1s infinite',
              background: 'red',
              borderRadius: '50%',
              border: 'none',
              color: '#fff',
            }}
          >
            <FaXmark width={100} size={20} />
          </Button>
        ) : (
          <>
            {showChatBot ? (
              <Button
                className={`chat-icon `}
                onClick={() => setShowChatBot(false)}
                style={{
                  width: '50px',
                  height: '50px',
                  animation: 'blink 1s infinite',
                  background: 'red',
                  borderRadius: '50%',
                  border: 'none',
                  color: '#fff',
                }}
              >
                <FaXmark width={100} size={20} />
              </Button>
            ) : (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Button
                  className={`chat-icon `}
                  onClick={() => {
                    setShowMore(true);
                    setShowTooltip(false);
                  }}
                  style={{
                    width: '50px',
                    height: '50px',
                    animation: 'blink 1s infinite',
                    background: '#007bff',
                    borderRadius: '50%',
                    border: 'none',
                    color: '#fff',
                  }}
                >
                  <IoChatbubbleEllipsesOutline width={100} size={20} />
                </Button>
                {showTooltip && renderTooltip()}
              </div>
            )}
          </>
        )}
      </div>
      {showMore ? (
        <>
          <div
            className={`chat-icon-container  d-flex`}
            style={{
              position: 'fixed',
              bottom: '150px',
              right: '20px',
              height: '50px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              className={`chat-icon `}
              onClick={() => {
                setShowMore(false);
                setShowChatBot(true);
              }}
              style={{
                width: '50px',
                height: '50px',
                // animation: 'blink 1s infinite',
                background: color,
                borderRadius: '50%',
                border: 'none',
                color: '#fff',
              }}
            >
              <MdOutlineSupportAgent width={100} size={25} />
            </Button>
          </div>
          <div
            className={`chat-icon-container  d-flex`}
            style={{
              position: 'fixed',
              bottom: '70px',
              right: '100px',
              height: '50px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              className={`chat-icon `}
              onClick={handleWhatsappClick}
              style={{
                width: '50px',
                height: '50px',
                // animation: 'blink 1s infinite',
                background: '#28a745',
                borderRadius: '50%',
                border: 'none',
                color: '#fff',
              }}
            >
              <FaWhatsapp width={100} size={25} />
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className={`d-flex mx-2`}
        style={{
          position: 'fixed',
          bottom: '130px',
          right: '7px',
          zIndex: 1100,
        }}
      >
        {showChatBot ? (
          <Card
            ref={chatbotRef}
            id="chatbot-container"
            className="border-0"
            style={{
              maxWidth: '350px',
              maxHeight: '420px',
              width: '100%',
              height: '100%',
              backgroundColor: color,
              padding: '3px',
            }}
          >
            <Card.Header
              className="border-0 py-3 d-flex flex-row align-items-center justify-content-start gap-2"
              style={{ height: '100px' }}
            >
              <div>
                {showFormModal ? (
                  <div
                    className="bg-primary"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: 'none',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <FaBuilding size={20} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: '2px solid grey',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src={logo}
                      alt="Logo"
                      className="logo"
                      style={{ width: '48px', height: '48px' }}
                      roundedCircle
                    />

                    <div
                      style={{
                        position: 'absolute',
                        background: 'lightGreen',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        bottom: '1px',
                        right: '5px',
                        animation: 'blink 1s infinite',
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <Paragraph className="text-center fs-5 text-light my-2 ms-2">
                {showFormModal ? 'Chat with us now' : 'Refix Systems'}
              </Paragraph>
            </Card.Header>
            <Card.Body
              id={!showFormModal ? 'chat-body' : 'chat'}
              className="bg-light border-0 d-flex flex-column"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {showFormModal ? (
                <>
                  <div
                    className="rounded shadow p-3 mt-3"
                    style={{
                      borderLeft: `4px solid ${color ?? '#fff'}`,
                    }}
                  >
                    <Form.Control
                      placeholder="Enter your name"
                      className="my-3"
                      style={{ fontSize: '14px' }}
                      value={userName}
                      onChange={handleNameChange}
                    />
                    <InputGroup className="my-3">
                      <InputGroup.Text
                        className="input-group-prepend"
                        style={{ fontSize: '14px', height: '35px' }}
                      >
                        +91
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Enter your Phone number"
                        style={{ fontSize: '14px' }}
                        value={userPhone}
                        onChange={handlePhoneChange}
                        isInvalid={!!phoneError}
                      />
                    </InputGroup>
                    <Form.Control
                      placeholder="Enter your Email address"
                      className="my-3"
                      style={{ fontSize: '14px' }}
                      value={userEmail}
                      onChange={handleEmailChange}
                      isInvalid={!!emailError}
                    />
                  </div>
                  <div className="d-flex justify-content-end align-items-end mt-auto">
                    <span
                      className={`pointer d-flex flex-row gap-2 ${!isFormValid ? 'disabled' : ''}`}
                      style={{
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                      }}
                      onClick={isFormValid ? handleStartChat : null}
                    >
                      {isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <span>
                            <IoSend
                              size={20}
                              color={isFormValid ? color : '#ccc'}
                            />
                          </span>
                          <span
                            className="main"
                            style={{ color: isFormValid ? color : '#ccc' }}
                          >
                            Start Chat
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {allMessages.map((message) => (
                      <ListGroup.Item
                        key={message.id}
                        style={{
                          border: '0',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          backgroundColor: 'transparent',

                          alignItems:
                            message.sender === 'You'
                              ? 'flex-end'
                              : 'flex-start',
                        }}
                      >
                        <div className="mb-1  d-flex gap-2 flex-row align-items-center">
                          {message.sender === 'You' ? (
                            <FaUser size={20} />
                          ) : (
                            <MdOutlineSupportAgent size={23} />
                          )}
                          <strong className="">
                            {message.sender === 'You' ? 'You' : 'Bot'}
                          </strong>
                        </div>
                        <p
                          className="text-wrap mb-0"
                          style={{
                            fontSize: '14px',
                            fontWeight: 300,
                            backgroundColor:
                              message.sender === 'You' ? color : color,
                            borderRadius:
                              message.sender === 'You'
                                ? '10px 10px 0 10px'
                                : '10px 10px 10px 0',
                            padding: '8px',
                            color: '#fff',
                          }}
                        >
                          {message.text}
                        </p>
                        <small
                          className="text-muted"
                          style={{
                            textAlign:
                              message.sender === 'You' ? 'right' : 'left',
                            fontSize: '10px',
                          }}
                        >
                          {message.time}
                        </small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
              {options ? (
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="secondary"
                    className="custom-button custom-button-secondary"
                    onClick={() =>
                      handleOptions(
                        'No',
                        'Please enter your query here our team will contact you shortly'
                      )
                    }
                  >
                    No
                  </Button>
                  <Button
                    variant="primary"
                    className="custom-button custom-button-primary"
                    onClick={() =>
                      handleOptions(
                        'Yes',
                        'Please enter your enter Order id here'
                      )
                    }
                  >
                    Yes
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
            {showFormModal ? (
              <></>
            ) : (
              <Card.Footer className="bg-light">
                <div className="d-flex flex-row gap-2 justify-content-between align-items-center">
                  <Form.Control
                    placeholder="Enter Your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{
                      fontSize: '12px',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                  />

                  <IoSend
                    onClick={handleSendMessage}
                    size={30}
                    color={newMessage.length > 0 ? color : '#ccc'}
                    className="pointer"
                  />
                </div>
              </Card.Footer>
            )}
          </Card>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`chat-icon-container d-flex d-xxl-none d-xl-none d-lg-none`}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className="rounded-pill d-flex justify-content-between align-items-center"
          style={{
            width: '200px',
            height: '50px',
            animation: 'blink 1s infinite',
            borderRadius: '50px',
            border: 'none',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {/* <div
            className="d-flex justify-content-center align-items-center pointer"
            style={{
              width: '33.33%',
              height: '50px',
              borderTopLeftRadius: '50px',
              borderBottomLeftRadius: '50px',
              backgroundColor: '#007bff',
            }}
            onClick={handlePhoneClick}
          >
            <FaPhoneAlt size={20} />
          </div> */}
          {/* <div
            className="d-flex justify-content-center align-items-center pointer"
            style={{
              width: '33.33%',
              height: '50px',
              backgroundColor: '#28a745',
            }}
            onClick={handleWhatsappClick}
          >
            <FaWhatsapp size={20} />
          </div> */}
          {/* <div
            className="d-flex justify-content-center align-items-center pointer"
            style={{
              width: '33.33%',
              height: '50px',
              borderTopRightRadius: '50px',
              borderBottomRightRadius: '50px',
              backgroundColor: '#dc3545',
            }}
            onClick={() => navigate('/contact-us')}
          >
            <SiGoogleforms size={20} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
