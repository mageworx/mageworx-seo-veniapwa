/**
 * Custom intercept file for the extension
 * By default you can only use target of @magento/pwa-buildpack.
 */

module.exports = targets => {
    // For extends productFullDetail component in local-intercept
    const { Targetables } = require('@magento/pwa-buildpack');
    const targetables = Targetables.using(targets);
    targetables.setSpecialFeatures('esModules','cssModules');

    const peregrineTargets = targets.of("@magento/peregrine");
    const talonsTarget = peregrineTargets.talons;

    // product
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
            "@mageworx/seo-veniapwa/src/targets/Product/wrapUseProductFullDetails"
        );
    });

    // category
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.Cms.useCmsPage.wrapWith(
            "@mageworx/seo-veniapwa/src/targets/CMS/wrapUseCmsPage"
        );
    });

    // cms
    talonsTarget.tap((talonWrapperConfig) => {
        talonWrapperConfig.RootComponents.Category.useCategoryContent.wrapWith(
            "@mageworx/seo-veniapwa/src/targets/Category/wrapUseCategoryContent"
        );
    });

};
