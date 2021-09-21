import React from 'react';
import { Helmet } from 'react-helmet-async';

import {getCurrentHostname} from "./features";

const changeAllUrlsToLocal = (str) => {
    str = str.replaceAll(/\\\//g, "/");
    let resultUrl = str;

    let currentHost = getCurrentHostname();
    // for meta content
    resultUrl = resultUrl.replaceAll(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/g, `${currentHost}$2"`);
    // for script content (only url and image) (:?"image":")]
    resultUrl = resultUrl.replaceAll(/(:?"url":")https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"/g, `$1${currentHost}$3"`);
    resultUrl = resultUrl.replaceAll(/(:?"image":")https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"/g, `$1${currentHost}$3"`);
    return resultUrl;
}

const getMetaArrayFromStr = (str) => {
    return str.match(/<meta.+?\/>/gi);
}

const getScriptsArrayFromStr = (str) => {
    return str.match(/<script.+?>.+?<\/script>/gi);
}

const getContentAndAttributesOfMeta = (str) => {
    const metaData = {
        content: "",
        property: "",
    }
    let content = str.match(/<meta.+?content=\\?"(.+?)\\?".*\/>/i);
    let property = str.match(/<meta.+?property=\\?"(.+?)\\?".*\/>/i);
    if (content && content.length>1) {
        metaData.content = changeAllUrlsToLocal(content[1]);
    }
    if (property && property.length>1) {
        metaData.property = property[1];
    }
    return metaData;
}

const getContentAndAttributesOfScript = (str) => {
    const scriptData = {
        content: "",
        type: "",
    }
    let content = str.match(/<script.+?>(.+?)<\/script>/i);
    let type = str.match(/<script.+?type\=\\?"(.+?)\\?".*?>.+?<\/script>/i);
    if (content && content.length>1) {
        scriptData.content = changeAllUrlsToLocal(content[1]);
    }
    if (type && type.length>1) {
        scriptData.type = type[1];
    }
    return scriptData;
}

const getMetaResultOfJsxFromStr = (str) => {
    let metaArray = getMetaArrayFromStr(str);
    let result = metaArray.map((script, num) => {
        let attributes = getContentAndAttributesOfMeta(script);
        const {content, property} = attributes;
        return <meta key={num} property={property} content={content} />
    });
    return result;
}

const getScriptsResultOfJsxFromStr = (str) => {
    let scriptsArray = getScriptsArrayFromStr(str);
    let result = scriptsArray.map((script, num) => {
        let attributes = getContentAndAttributesOfScript(script);
        const {type, content} = attributes;
        return <script key={num} type={type}>{content}</script>
    });
    return result;
}

const Markup = props => {
    const {markup} = props;
    if (!markup) return null;

    let markup_result = [];
    if (markup.rich_snippets) {
        if (markup.rich_snippets.product) markup_result = markup_result.concat(getScriptsResultOfJsxFromStr(markup.rich_snippets.product));
        if (markup.rich_snippets.seller) markup_result = markup_result.concat(getScriptsResultOfJsxFromStr(markup.rich_snippets.seller));
        if (markup.rich_snippets.website) markup_result = markup_result.concat(getScriptsResultOfJsxFromStr(markup.rich_snippets.website));
        if (markup.rich_snippets.webpage) markup_result = markup_result.concat(getScriptsResultOfJsxFromStr(markup.rich_snippets.webpage));
    }
    if (markup.social_markup) {
        markup_result = markup_result.concat(getMetaResultOfJsxFromStr(markup.social_markup));
    }
    return (
        <Helmet>
            {markup_result}
        </Helmet>
    )
};

export default Markup;
