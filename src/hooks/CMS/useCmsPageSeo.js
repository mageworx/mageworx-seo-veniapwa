import {useEffect, useMemo} from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_CMS_SEO = gql`
  query GetCmsPageSeo($id: Int!) {
       cmsPage(id: $id) {
            mw_canonical_url {
                url
                code
            }
            meta_robots
            mw_hreflangs {
                items {
                     url
                    code
                }
            }
            mw_seo_markup {
                social_markup
                rich_snippets {
                  website
                  seller
                  webpage
                }
            }
       }
  }
`;

const useCmsPageSeo = props => {
    const { id } = props;

    const { loading, error, data } = useQuery(GET_CMS_SEO, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            id: Number(id)
        }
    });

    const seoAttributes = useMemo(() => {
        if (!data || !data.cmsPage) {
            return null;
        }
        return data.cmsPage;
    }, [data]);

    return {
        error,
        loading,
        seoAttributes
    };
};

export default useCmsPageSeo;
