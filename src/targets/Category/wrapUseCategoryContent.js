import useCategorySeo from "../../hooks/Category/useCategorySeo";

const wrapUseCategoryContent = (original) => {
    return function useCategoryContent(props, ...restArgs) {
        const { categoryId } = props;

        const seoQueryResult = useCategorySeo({
            id: categoryId
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

export default wrapUseCategoryContent;
