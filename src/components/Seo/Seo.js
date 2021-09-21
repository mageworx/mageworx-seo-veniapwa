import React from 'react';
import { Helmet } from 'react-helmet-async';

import Hreflangs from "./Hreflangs";
import Markup from "./Markup";
import Canonical from "./Canonical";

const Seo = props => {
    const {seoData} = props;
    if (!seoData) return null;

    const {
        meta_robots,
        mw_canonical_url,
        mw_hreflangs,
        mw_seo_markup
    } = seoData;

    let canonical;
    let meta_robots_JSX;
    let hreflangs;
    let markup;
    if (seoData) {
        meta_robots_JSX = meta_robots && <meta name="robots" content={meta_robots} />;
        canonical = <Canonical canonical={mw_canonical_url} />
        hreflangs = <Hreflangs mw_hreflangs={mw_hreflangs} />;
        markup = <Markup markup={mw_seo_markup} />
    }

    return (
        <>
            <Helmet>
                {meta_robots_JSX}
            </Helmet>
            {hreflangs}
            {markup}
            {canonical}
        </>
    )
};
export default Seo;
