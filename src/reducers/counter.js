export default function (state={counter: 1}, action) {
    switch (action.type) {
        case 'INC_COUNTER':
            return {...state, counter: ++state.counter};
        default:
            return state;
    }
};