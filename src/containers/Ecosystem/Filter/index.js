import React from 'react';
import variables from '../../../utils/variables';
import './index.css';
const Filter = ({ lang, filter, setFilter }) => {
    const onChangeFilter = (fltr) => {
        if (filter === fltr) { setFilter('none'); } else {
            setFilter(fltr);
        }
    };

    return (
        <div className="filter">
            <p className={filter === 'Dapp' ? 'filter_item filter_item_actived' : 'filter_item'} onClick={() => { onChangeFilter('Dapp'); }}>{variables[lang].ecosystem_filter_dapp}</p>
            <p className={filter === 'Contracts' ? 'filter_item filter_item_actived' : 'filter_item'} onClick={() => { onChangeFilter('Contracts'); }}>{variables[lang].ecosystem_filter_contracts}</p>
            <p className={filter === 'Tools' ? 'filter_item filter_item_actived' : 'filter_item'} onClick={() => { onChangeFilter('Tools'); }}>{variables[lang].ecosystem_filter_tools}</p>
        </div>
    );
};

export default Filter;
