# MageWorx SEO Suite Ultimate extension for Magento Venia PWA
This add-on integrates [SEO Suite Ultimate extension for Magento 2](https://www.mageworx.com/magento2-extensions/seo-tools-services.html) using [MageWorx SeoBase GraphQl extension](https://github.com/mageworx/MageWorx_SeoBaseGraphQl)  with [Magento 2 Venia PWA storefront](https://magento.github.io/pwa-studio/venia-pwa-concept/).

## Features
- Canonical URLs to eliminate duplicate content
- Alternate URLs
- Meta robots
- Rich snippets
- Seller & Website markup

## Upload the extension
1. Create directory `@mageworx/seo-veniapwa` in the root of your project
2. Copy this project to `@mageworx/seo-veniapwa`
3. Run `yarn add file:./@mageworx/seo-veniapwa` in the root of your project
4. Open `local-intercept.js` in the root of your project and put this code into `function localIntercept`. Pay attention, `function localIntercept` must have `targets` as parameter (you can see example of `local-intercept.js` in `@mageworx/seo-veniapwa/documentation`).
```
/* MageWorx seo-veniapwa veniapwa start */
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
/* MageWorx seo-veniapwa veniapwa end */
```
5. Check that your `local-intercept` has this code before `module.exports`, if don't have you should add them (you can see example of `local-intercept.js` in `@mageworx/seo-veniapwa/documentation`)
```
const { Targetables } = require('@magento/pwa-buildpack');
```
6. Let's run your project
```
yarn watch
```

## Urls config
You can change or add your custom urls for hreflang in `@mageworx/seo-veniapwa/src/hreflangs.config.js`, for exmaple:
```
const hreflangs_config = {
   ...
   {type: "store", code: "default", url: "https://magento-store.com/"},
   {type: "store", code: "toys", url: "https://magento-toys.com/"},
   {type: "lang", code: "de-DE", url: "https://magento-store.com/de/"},
   {type: "lang", code: "en-US", url: "https://magento-store.com/en/"},
   ...
};
```
On frontend it will be look like:
```
<link rel="alternate" hreflang="de-DE" href="https://magento-store.com/de/gear/bags.html" data-rh="true">
<link rel="canonical" href="https://magento-store.com/gear/bags.html" data-rh="true">
```


