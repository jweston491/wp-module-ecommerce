import { __ } from "@wordpress/i18n";
import { Spinner } from "@newfold/ui-component-library";
import { YITHPluginsDefinitions } from "../configs/YITHPlugins.config";
import { Section } from "./Section";
import { useCardManager } from "./useCardManager";
import classNames from "classnames";
import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { YithFeatureCard } from "./YithFeatureCard";
import filter from "../icons/brands/yith-woocommerce-ajax-product-filter.svg";
import search from "../icons/brands/yith-woocommerce-ajax-search.svg";
import booking from "../icons/brands/yith-woocommerce-booking.svg";
import customizeAccount from "../icons/brands/yith-woocommerce-customize-myaccount-page.svg";
import gift from "../icons/brands/yith-woocommerce-gift-card.svg";
import wishList from "../icons/brands/yith-woocommerce-wishlist.svg";
import lightchest from '../icons/light-chest.svg'
import {
  YITH_WOOCOMMERCE_ACCOUNT_PAGE,
  YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
  YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
  YITH_WOOCOMMERCE_GIFT_CARDS,
  YITH_WOOCOMMERCE_WISHLIST
} from "../constants";

export function YITHPlugins({ woo, wpModules }) {
  const yithPluginsMap = new Map([
    [
      "f7834881-f5df-43ab-9c7e-c4e6969f5606",
      {
        title: "nfd_slug_yith_woocommerce_gift_cards",
        name: "Gift Cards",
        learnMore: YITH_WOOCOMMERCE_GIFT_CARDS,
        image: gift,
      },
    ],
    [
      "93c942e4-36fb-46be-867b-5f0d014adb22",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        name: "Wishlist",
        learnMore: YITH_WOOCOMMERCE_WISHLIST,
        image: wishList,
      },
    ],
    [
      "93c942e4-36fb-46be-867b-5f0d014adb22wondercart",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        name: "WonderCart",
        learnMore: YITH_WOOCOMMERCE_WISHLIST,
        image: wishList,
      },
    ],
    [
      "fc4cbc14-470d-471b-b448-c6666e5b763d",
      {
        title: "nfd_slug_yith_woocommerce_booking",
        name: "Booking and Appointments",
        learnMore: YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
        image: booking,
      },
    ],
    [
      "c7025d24-a05a-4f01-bca7-5c9bcd17bb76",
      {
        title: "nfd_slug_yith_woocommerce_ajax_product_filter",
        name: "Product Filter",
        learnMore: YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
        image: filter,
      },
    ],
    [
      "e307cb8f-24b5-46e1-81e3-83de32c62c78",
      {
        title: "yith-woocommerce-ajax-search",
        name: "Product Search",
        image: search,
      },
    ],
    [
      "58701f50-cb5c-4b39-b030-edadf4af6f97",
      {
        title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
        name: "Customize My Account Page",
        learnMore: YITH_WOOCOMMERCE_ACCOUNT_PAGE,
        image: customizeAccount,
      },
    ],
  ]);
  let [cards] = useCardManager(
    YITHPluginsDefinitions({ notify: wpModules.notify }),
    { refreshInterval: 10 * 1000, isPaused: () => !woo.isActive }
  );
  const [yithProducts, setYithProducts] = useState([]);
  useEffect(() => {
    const fecthApi = async () => {
      const data = await apiFetch({
        url: NewfoldRuntime.createApiUrl("/newfold-marketplace/v1/marketplace"),
      });
      setYithProducts(
        data?.products?.data.filter(
          (product) =>
            product.categories?.includes("eCommerce") &&
            product.categories?.length === 1
        )
      );
    }
    fecthApi()
  }, []);
  if (!woo.isActive) {
    return null;
  }

  return (
    <Section.Container id="ecommerce-features-wrapper" className={"nfd-border nfd-border-amber-300 nfd-rounded-xl nfd-pt-0"}>
      <div className="nfd-flex nfd-p-8 nfd-flex-row nfd-justify-between nfd-gap-6 nfd-items-center">
        <img
          src={lightchest}
          className="nfd-w-48 nfd-text-[--nfd-ecommerce-text-dark]"
        />
        <div className="nfd-flex nfd-flex-col nfd-gap-3">
          <h2 className="nfd-font-medium nfd-text-base">
            {__("Elevate Your Store with Exclusive WooCommerce Tools Included in Your Plan!", "wp-module-ecommerce")}
          </h2>
          {__(
            "Unlock the full power of your plan with access to a range of exclusive WooCommerce tools powered by \nYITH. Enhance your store and keep your customers coming back for more!",
            "wp-module-ecommerce"
          )}
        </div>
      </div>
      <Section.Content>
        {cards.length === 0 && (
          <div className="nfd-flex nfd-items-center nfd-text-center nfd-justify-center nfd-h-60">
            <Spinner size="8" className="nfd-text-primary" />
          </div>
        )}
        <div
          className={classNames(
            "nfd-grid nfd-gap-5",
            "sm:nfd-grid-cols-1",
            "md:nfd-grid-cols-2",
            "lg:nfd-grid-cols-3"
          )}
          id="ecommerce-features-container"
        >
          {yithProducts
            ?.filter((product) => yithPluginsMap.has(product.id))
            .map((product) => {
              return (
                <YithFeatureCard
                  key={product.id}
                  id={product.id}
                  yithProducts={product}
                  yithPluginsMap={yithPluginsMap}
                  cards={cards}
                />
              );
            })}
        </div>
      </Section.Content>
    </Section.Container>
  );
}
