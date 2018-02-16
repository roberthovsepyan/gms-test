export default function (state={}, action) {
    switch (action.type) {
        case 'SET_TABLE_DATA':
            return {...state, data: action.payload};
        default:
            return state;
    }
};