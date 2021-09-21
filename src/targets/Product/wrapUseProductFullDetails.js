import useProductSeo from "../../hooks/Product/useProductSeo";

const wrapUseProductFullDetails = (original) => {
    return function useProductFullDetails(props, ...restArgs) {
        const { product } = props;

        const seoQueryResult = useProductSeo({
            urlKey: product.url_key
        });

        const { productDetails, ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        return {
            ...defaultReturnData,
            productDetails: {
                ...productDetails,
                seoAttributes: seoQueryResult.seoAttributes,
            }
        };
    };
};

export default wrapUseProductFullDetails;
