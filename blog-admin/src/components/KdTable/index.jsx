import styles from './style.less';
import { useState, useRef, useEffect } from 'react';
import { Table, Col, Row } from 'antd';
import SearchBar from "@/components/SearchBar"

export default (props) => {
    const { toolBar, searchBar, bordered = true, size = "small", reloadKey = null, loadData = null, pagination = true, ...rest } = props || {};
    const [paging, setPageing] = useState({ page: 1, pageSize: 10 });
    const [formData, setFormData] = useState({});
    const [dataSource, setDataSource] = useState({ datalist: [], page: 1, pageSize: 10, totalSize: 0 });
    const [reloadFlag, setReloadFlag] = useState(false);
    const mounting = useRef(true);
    /**
     * 查询数据
     */
    const queryData = async () => {
        if (loadData) {
            let dataTemp = await loadData({
                ...paging,
                ...formData
            });
            
            //删除可能出现页面为空的情况
            if (dataTemp?.datalist?.length < 1 && paging.page > 1) {
                setReloadPage({ ...paging, page: paging.page - 1 });
                return;
            }
            setDataSource(dataTemp);
        }
    }

    /**
     * 防止页面相同，不重新加载数据
     * @param {*} page
     */
    const setReloadPage = (np) => {
        setPageing((op) => {
            if (op.page === np.page && op.pageSize === np.pageSize) {
                setReloadFlag(!reloadFlag);
            }
            return np;
        });
    };

    // useEffect(() => {
    //     if(){}
    //     setReloadFlag(!reloadFlag);
    // }, [reloadKey])

    useEffect(() => {
        queryData();
    }, [paging, reloadFlag, reloadKey])

    useEffect(() => {
        if (mounting.current) {
            mounting.current = false;
        } else {
            setReloadPage({ ...paging, page: 1 });
        }
    }, [formData])

    const onSubmit = (values) => {
        setFormData(values);
    }

    const onPageChange = (page, pageSize) => {
        setReloadPage({ page, pageSize });
    }



    return <div>
        <Table {...rest} title={() => (<Col>
            {searchBar && <Row>
                <SearchBar onSubmit={onSubmit} source={searchBar}></SearchBar>
            </Row>}
            {toolBar && <Row>{toolBar}</Row>}
        </Col>)} bordered={bordered} dataSource={dataSource.datalist} size={size} pagination={{ current: dataSource.page, pageSize: dataSource.pageSize, total: dataSource.totalSize, showSizeChanger: true, onChange: onPageChange }}></Table>
    </div>
}