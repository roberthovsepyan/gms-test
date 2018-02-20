import React, { Component } from 'react';
import {connect} from 'react-redux';
import {v4} from 'uuid';
import csv from 'csvtojson';
import {titanic} from './utils/titanic';
import InfiniteScroll from 'react-infinite-scroller';

import {setTableData, sortTable, loading} from './actions/table';
import {incCounter} from './actions/counter';

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
        if (sortKey === this.props.table.sort.column && this.props.table.sort.direction === 'asc') {
            data.sort((a, b) => b[sortKey].localeCompare(a[sortKey], undefined, {numeric: true}));
            direction = 'desc';
        }
        else {
            data.sort((a, b) => a[sortKey].localeCompare(b[sortKey], undefined, {numeric: true}));
            direction = 'asc';
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

    loadMore = () => {
        this.props.incCounter();
    };

    hasMore = () => {
        return this.props.counter.counter<19;
    };

    renderBody () {
        return this.props.table.data.slice(0, 50*this.props.counter.counter).map((row, index) => {
            let tableData = [];
            for (let key in row) {
                if(row.hasOwnProperty(key)) {
                    tableData.push(<td key={v4()}>{row[key]}</td>);
                }
            }
            return <tr key={index}>{tableData}</tr>;
        });
    }

    renderHead () {
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

            return (
                <thead>
                    <tr>
                        {tableHeaders}
                    </tr>
                </thead>
            );
        }
        else {
            return undefined;
        }
    }


    render() {
        return (
            <div>
                <table>
                    {this.renderHead()}
                    {this.props.table.data && <InfiniteScroll
                        pageStart={0}
                        element='tbody'
                        loadMore={this.loadMore}
                        hasMore={this.hasMore()}
                        loader={<tr key='loader'><td key='load'>Загрузка...</td></tr>}>
                        {this.renderBody()}
                    </InfiniteScroll>}
                </table>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        table: state.table,
        counter: state.counter
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setTableData: (data) => dispatch(setTableData(data)),
        sortTable: (column, direction) => dispatch(sortTable(column, direction)),
        incCounter: () => dispatch(incCounter()),
        loading: () => dispatch(loading())
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
