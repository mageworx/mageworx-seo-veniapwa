import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_PRODUCT_SEO = gql`
  query getProductSeo($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        url_key
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
              product
            }
        }
      }
    }
  }
`;

const useProductSeo = (props) => {
    const { urlKey } = props;

    const { error, loading, data } = useQuery(GET_PRODUCT_SEO, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            urlKey: urlKey
        }
    });

    const seoAttributes = useMemo(() => {
        if (!data) {
            // The product isn't in the cache and we don't have a response from GraphQL yet.
            return null;
        }

        // Note: if a product is out of stock _and_ the backend specifies not to
        // display OOS items, the items array will be empty.

        // Only return the product that we queried for.
        const product = data.products.items.find(
            item => item.url_key === urlKey
        );

        if (!product) {
            return null;
        }
        return product;
    }, [data, urlKey]);

    return {
        error,
        loading,
        seoAttributes
    };
};

export default useProductSeo;
