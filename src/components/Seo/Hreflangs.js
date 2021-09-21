import React from 'react';
import { Helmet } from 'react-helmet-async';

import {findCodeFromConfig} from "./features";

const Hreflangs = props => {
    const {mw_hreflangs} = props;
    if (!mw_hreflangs || !mw_hreflangs.items) return null;

    let hreflangs_result = mw_hreflangs.items.map((item, itemNum) => {
        let elem_from_config = findCodeFromConfig(item.code, "lang",true);
        if (elem_from_config) {
            let url = elem_from_config + item.url;
            return <link key={item.code + itemNum} rel="alternate" hreflang={item.code} href={url} />;
        }
        else return null;
    })
    return (
        <Helmet>
            {hreflangs_result}
        </Helmet>
    );
    return null;
};

export default Hreflangs;
