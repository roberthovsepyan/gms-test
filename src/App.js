import React, { Component } from 'react';
import {connect} from 'react-redux';
import {v4} from 'uuid';
import csv from 'csvtojson';
import {titanic} from './utils/titanic';

import {setTableData, sortTable} from './actions/table';


class App extends Component {

    componentDidMount () {
        if (!this.props.table.data) {
            let data = [];
            csv()
                .fromString(titanic)
                .on('json', (jsonObj) => data.push(jsonObj))
                .on('done', () => this.props.setTableData(data));
        }
    }

    handleSort = (event, sortKey) => {
        let data = this.props.table.data;
        let direction;
        //can't sort correctly without predefined sorting (strings & numbers difference);
        if (sortKey === 'Name' || sortKey === 'Sex' || sortKey === 'Cabin' || sortKey === 'Embarked') {
            if (sortKey === this.props.table.sort.column && this.props.table.sort.direction === 'asc') {
                data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
                direction = 'desc';
            }
            else {
                data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
                direction = 'asc';
            }
        }
        else {
            if (sortKey === this.props.table.sort.column && this.props.table.sort.direction === 'asc') {
                data.sort((a, b) => {
                    if (Number(a[sortKey]) > Number(b[sortKey])) {
                        return -1;
                    }
                    if (Number(a[sortKey]) < Number(b[sortKey])) {
                        return 1;
                    }
                    return 0;
                });
                direction = 'desc';
            }
            else {
                data.sort((a, b) => {
                    if (Number(a[sortKey]) > Number(b[sortKey])) {
                        return 1;
                    }
                    if (Number(a[sortKey]) < Number(b[sortKey])) {
                        return -1;
                    }
                    return 0;
                });
                direction = 'asc';
            }
        }
        this.props.sortTable(sortKey, direction);
        this.props.setTableData(data);
    };

    checkSorting = (column) => {
        if (column === this.props.table.sort.column) {
            if (this.props.table.sort.direction === 'desc') {
                return 'sortedDesc';
            }
            else {
                return 'sortedAsc';
            }
        }
        else {
            return undefined;
        }
    };

    renderTable () {
        if (this.props.table.data) {
            let object = this.props.table.data[0], headers = [];
            for (let key in object) {
                if (object.hasOwnProperty(key)) {
                    headers.push(key);
                }
            }
            let tableHeaders = headers.map((header) => (
                <th key={header} onClick={e => this.handleSort(e, header)} className={this.checkSorting(header)}>{header}
                </th>));
            let tableBody = this.props.table.data.map((row, index) => {
                let tableData = [];
                for (let key in row) {
                    if(row.hasOwnProperty(key)) {
                        tableData.push(<td key={v4()}>{row[key]}</td>);
                    }
                }
                return <tr key={index}>{tableData}</tr>;
            });
            return (
                <table>
                    <thead>
                        <tr>
                            {tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            );
        }
        else {
            return undefined;
        }
    }


    render() {
        return (
            <div>
                <h2 style={{textAlign: 'center', margin: '20px'}}>Пассажиры Титаника</h2>
                <div className='container'>
                    {this.renderTable() || 'Загрузка...'}
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        table: state.table
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setTableData: (data) => dispatch(setTableData(data)),
        sortTable: (column, direction) => dispatch(sortTable(column, direction))
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
