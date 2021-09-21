import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_CATEGORY_SEO = gql`
  query getCategorySeo($id: Int!) {
        category(id: $id) {
            id
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
                }
            }
        }
  }
`;

const useProductAttachments = (props) => {
    const { id } = props;

    const { error, loading, data } = useQuery(GET_CATEGORY_SEO, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            id
        }
    });

    const seoAttributes = useMemo(() => {
        if (!data || !data.category) {
            return null;
        }
        return data.category;
    }, [data]);

    return {
        error,
        loading,
        seoAttributes
    };
};

export default useProductAttachments;
