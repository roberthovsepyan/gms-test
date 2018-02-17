export default function (state={sort: {column: 'PassengerId', direction: 'asc'}}, action) {
    switch (action.type) {
        case 'SET_TABLE_DATA':
            return {...state, data: action.payload};
        case 'SORT_TABLE':
            return {...state, sort: {column: action.payload.column, direction: action.payload.direction}};
        default:
            return state;
    }
};