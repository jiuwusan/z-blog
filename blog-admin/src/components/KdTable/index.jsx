import styles from './style.less';
import { useRef, useEffect } from 'react';
import { Table, Col, Row } from 'antd';
import SearchBar from "@/components/SearchBar"

export default (props) => {
    const { dataSource, toolBar, searchBar, onSubmit, bordered = true, size = "small", loadData, pagination = true, ...rest } = props || {};
    const onPageChange = (pagination) => {
        console.log("onPageChange==", pagination);
    }
    return <div>
        <Table {...rest} title={() => (<Col>
            {searchBar && <Row>
                <SearchBar onSubmit={onSubmit} source={searchBar}></SearchBar>
            </Row>}
            {toolBar && <Row>{toolBar}</Row>}
        </Col>)} bordered={bordered} dataSource={dataSource.datalist} size={size} pagination={{ current: dataSource.page, onChange: onPageChange }}></Table>
    </div>
}