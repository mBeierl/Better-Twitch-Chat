const initialState = {
  messageInput: '',
  messages: [],
  hiddenMessages: [],
  currentChannel: '',
  snackbar: {
    open: false,
    message: ''
  },
  maxMessageCount: 20
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MESSAGE_INPUT':
      return {
        ...state,
        messageInput: action.message
      };

    case 'ADD_MESSAGE':
    {
      const newMessages = [...state.messages];
      newMessages.push(action.messageObj);
      if (newMessages.length > state.maxMessageCount) {
        newMessages.shift();
      }
      return {
        ...state,
        messages: newMessages
      };
    }

    case 'ADD_HIDDEN_MESSAGE':
    {
      return {
        ...state,
        hiddenMessages: [
          ...state.hiddenMessages,
          action.messageObj
        ]
      };
    }

    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, action.index),
          ...state.messages.slice(action.index + 1)
        ]
      };

    case 'SET_CURRENT_CHANNEL':
      return {
        ...state,
        currentChannel: action.channel
      };

    case 'SHOW_SNACKBAR':
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message
        }
      };

    case 'HIDE_SNACKBAR':
      return {
        ...state,
        snackbar: {
          open: false,
          message: ''
        }
      };

    default:
      return state;
  }
}
