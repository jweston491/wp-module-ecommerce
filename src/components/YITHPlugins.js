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
import { StoreWonderCart } from "./StoreWonderCart";
import { EcomDash } from "./EcomDash";
import filter from "../icons/brands/yith-woocommerce-ajax-product-filter.svg";
import search from "../icons/brands/yith-woocommerce-ajax-search.svg";
import booking from "../icons/brands/yith-woocommerce-booking.svg";
import customizeAccount from "../icons/brands/yith-woocommerce-customize-myaccount-page.svg";
import gift from "../icons/brands/yith-woocommerce-gift-card.svg";
import wishList from "../icons/brands/yith-woocommerce-wishlist.svg";
import lightchest from '../icons/light-chest.svg';
import wondercartImg from '../icons/wonder-cart.svg';
import ecomdash from '../icons/ecomdash.svg'
import {
  YITH_WOOCOMMERCE_ACCOUNT_PAGE,
  YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
  YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
  YITH_WOOCOMMERCE_GIFT_CARDS,
  YITH_WOOCOMMERCE_WISHLIST
} from "../constants";

export function YITHPlugins({ woo, wpModules }) {
  const [yithPluginsMap, setYithPluginsMap] = useState(new Map([
    [
      "f7834881-f5df-43ab-9c7e-c4e6969f5606",
      {
        title: "nfd_slug_yith_woocommerce_gift_cards",
        name: "Gift Cards",
        desc: "Offer customizable gift cards with personalized messages for the recipient.",
        learnMore: YITH_WOOCOMMERCE_GIFT_CARDS,
        image: gift,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "93c942e4-36fb-46be-867b-5f0d014adb22",
      {
        title: "nfd_slug_yith_woocommerce_wishlist",
        name: "Wishlist",
        desc: "Let customers add products to lists and share them with family and friends.",
        learnMore: YITH_WOOCOMMERCE_WISHLIST,
        image: wishList,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "wondercart",
      {
        title: "nfd_slug_yith_wondercart",
        name: "WonderCart",
        desc: "Create custom upsell, cross-sell and other promotional campaigns to generate more sales.",
        learnMore: YITH_WOOCOMMERCE_WISHLIST,
        image: wondercartImg,
        primaryUrl: "admin.php?page=bluehost#/store/sales_discounts"
      },
    ],
    [
      "fc4cbc14-470d-471b-b448-c6666e5b763d",
      {
        title: "nfd_slug_yith_woocommerce_booking",
        name: "Booking and Appointments",
        desc: "Manage renting or booking of services and items so customers can do business with you.",
        learnMore: YITH_WOOCOMMERCE_BOOKING_APPOINTMENTS,
        image: booking,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "c7025d24-a05a-4f01-bca7-5c9bcd17bb76",
      {
        title: "nfd_slug_yith_woocommerce_ajax_product_filter",
        name: "Product Filter",
        desc: "Add an advanced filter to help customers find the right product with ease.",
        learnMore: YITH_WOOCOMMERCE_AJAX_PRODUCT_FILTER,
        image: filter,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "e307cb8f-24b5-46e1-81e3-83de32c62c78",
      {
        title: "yith-woocommerce-ajax-search",
        name: "Product Search",
        desc: "Speed up search for your customers with a predictive real-time search engine.",
        image: search,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "58701f50-cb5c-4b39-b030-edadf4af6f97",
      {
        title: "nfd_slug_yith_woocommerce_customize_myaccount_page",
        name: "Customize My Account Page",
        desc: "Add custom content like videos, files, discount codes, and more to your customers account page.",
        learnMore: YITH_WOOCOMMERCE_ACCOUNT_PAGE,
        image: customizeAccount,
        primaryUrl: "",
        clickToBuyId: ""
      },
    ],
    [
      "ecodash",
      {
        title: "nfd_slug_yith_woocommerce_ecomdash",
        name: "ecomdash",
        desc: "Boost sales by selling your products and services across multiple marketplaces.",
        learnMore: YITH_WOOCOMMERCE_ACCOUNT_PAGE,
        image: ecomdash,
        primaryUrl: "",
      },
    ]
  ]));
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

  useEffect(() => {
    yithProducts?.filter((product) => yithPluginsMap.has(product.id))
      .forEach((product) => {
        let updatedObject = yithPluginsMap.get(product.id);
        updatedObject.primaryUrl = product.primaryUrl;
        updatedObject.clickToBuyId = product.clickToBuyId;
        setYithPluginsMap(yithPluginsMap.set(String(product.id), updatedObject), ...yithPluginsMap);
      }
      )

  }, [yithProducts])


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
          {Array.from(yithPluginsMap.keys())
            .map((product, index) => {
              if (index === 2) {
                return (
                  <StoreWonderCart
                    key={index}
                    id={product}
                    yithPluginsMap={yithPluginsMap}
                  />
                )
              }
              if (index === 7) {
                return (
                  <EcomDash
                    key={index}
                    id={product}
                    yithPluginsMap={yithPluginsMap}
                  />
                )
              }
              return (
                <YithFeatureCard
                  key={product}
                  id={product}
                  yithProducts={yithPluginsMap.get(product)}
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
