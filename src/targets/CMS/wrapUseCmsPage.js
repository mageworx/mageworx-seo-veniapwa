import useCmsPageSeo from "../../hooks/CMS/useCmsPageSeo";

const wrapUseCmsPage = (original) => {
    return function useCmsPage(props, ...restArgs) {
        const { id } = props;

        const seoQueryResult = useCmsPageSeo({
            id
        });

        const { ...defaultReturnData } = original(
            props,
            ...restArgs
        );

        return {
            ...defaultReturnData,
            seoAttributes: seoQueryResult.seoAttributes,
        };
    };
};

export default wrapUseCmsPage;
