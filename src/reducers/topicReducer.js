
const initialState = {
    topics: []
}

const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TOPIC':
            return {
                topics: [
                    ...state.topics,
                    action.topic
                ]
            }
        case 'FIND_ALL_TOPICS':
            return {
                topics: action.topics
            }
        default:
            return state
    }
}

export default topicReducer
