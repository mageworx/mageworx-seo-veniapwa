const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    /* MageWorx seo-veniapwa start */
    const seoTargetables = Targetables.using(targets);

    // product
    const ProductDetails_seo = seoTargetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );
    const SeoProductDetails = ProductDetails_seo.addImport("{Seo} from '../../../../../../@mageworx/seo-veniapwa/src/components/Seo'");
    ProductDetails_seo.insertAfterJSX(
        '<section className={classes.description} />',
        `<${SeoProductDetails} seoData={productDetails.seoAttributes}/>`
    );

    // category
    const CategoryContent_seo = seoTargetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/Category/categoryContent.js'
    );
    const SeoCategoryContent = CategoryContent_seo.addImport("{Seo} from '../../../../../../@mageworx/seo-veniapwa/src/components/Seo'");
    CategoryContent_seo.insertAfterJSX(
        '<article className={classes.root} />',
        `<${SeoCategoryContent} seoData={talonProps.seoAttributes} />`
    );

    // cms page
    const CmsPage_seo = seoTargetables.reactComponent(
        '@magento/venia-ui/lib/RootComponents/CMS/cms.js'
    );
    const SeoCmsPage = CmsPage_seo.addImport("{Seo} from '../../../../../../@mageworx/seo-veniapwa/src/components/Seo'");
    CmsPage_seo.surroundJSX(
        '<CategoryList />',
        `<div>`
    );
    CmsPage_seo.insertAfterJSX(
        '<CategoryList />',
        `<${SeoCmsPage} seoData={talonProps.seoAttributes} />`
    );
    CmsPage_seo.insertAfterJSX(
        '<StoreTitle />',
        `<${SeoCmsPage} seoData={talonProps.seoAttributes} />`
    );
    /* MageWorx seo-veniapwa end */
}

module.exports = localIntercept;

