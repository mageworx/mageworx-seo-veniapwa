import React from 'react';
import { Helmet } from 'react-helmet-async';

import {findCodeFromConfig, getCurrentHostname} from "./features";

const Canonical = props => {
    const {canonical} = props;
    if (!canonical) return null;

    let canonical_result
    if (canonical.url) {
        if (canonical.url.match(/https?:\/\//i)) {
            canonical_result = <link rel="canonical" href={canonical.url} />;
        }
        else if (canonical.code) {
            let elem_from_config = findCodeFromConfig(canonical.code, "store", true);
            if (elem_from_config) {
                canonical_result = <link rel="canonical" href={elem_from_config + canonical.url} />;
            }
            else return null;
        }
        else {
            canonical_result = <link rel="canonical" href={getCurrentHostname(true) + canonical.url} />;
        }
        return (
            <Helmet>
                {canonical_result}
            </Helmet>
        );
    }
    return null;
};

export default Canonical;
