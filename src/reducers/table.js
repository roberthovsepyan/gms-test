export default function (state={sort: {column: 'PassengerId', direction: 'asc'}, loading: false}, action) {
    switch (action.type) {
        case 'SET_TABLE_DATA':
            return {...state, data: action.payload};
        case 'SORT_TABLE':
            return {...state, sort: {column: action.payload.column, direction: action.payload.direction}};
        case 'LOADING':
            return {...state, loading: !state.loading};
        default:
            return state;
    }
};