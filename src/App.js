import React, { Component } from 'react';
import {connect} from 'react-redux';
import csv from 'csvtojson';
import {titanic} from './titanic';

import {setTableData} from './actions/table';


class App extends Component {

    componentDidMount () {
        let data = [];
        csv()
            .fromString(titanic)
            .on('json', (jsonObj) => data.push(jsonObj))
            .on('done', () => this.props.setTableData(data));
    }

    handleSort = (event, sortKey) => {
        let data = this.props.table.data;
        if (Number.isNaN(Number(data[0][sortKey]))) {
            console.log(sortKey);
            data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        }
        else {
            data.sort((a, b) =>  {
                if (Number(a[sortKey]) > Number(b[sortKey])) {
                    return 1;
                }
                if (Number(a[sortKey]) < Number(b[sortKey])) {
                    return -1;
                }
                return 0;
            });
        }
        this.props.setTableData(data);
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
                <th key={header} onClick={e => this.handleSort(e, header)}>{header}
                </th>));
            let tableBody = this.props.table.data.map((row, index) => {
                let tableData = [];
                for (let key in row) {
                    if(row.hasOwnProperty(key)) {
                        tableData.push(<td>{row[key]}</td>);
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
        setTableData: (data) => dispatch(setTableData(data))
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
