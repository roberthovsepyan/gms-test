export const setTableData = (data) => {
    return {
        type: 'SET_TABLE_DATA',
        payload: data
    }
};

export const sortTable = (column, direction) => {
    return {
        type: 'SORT_TABLE',
        payload: {column, direction}
    }
};

export const loading = () => {
    return {
        type: 'LOADING'
    }
};