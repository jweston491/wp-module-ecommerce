import { Alert, Button, Title } from "@newfold/ui-component-library";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classNames from "classnames";
import { ReactComponent as ComingSoonIllustration } from "../icons/coming-soon.svg";
import { ReactComponent as WelcomeIllustration } from "../icons/store-live.svg";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";
import { OnboardingList } from "./OnboardingList";
import { Section } from "./Section";
import { SiteStatus } from "./SiteStatus";
import { IntegrationsSdk } from "../sdk/integrations";
import { FacebookConnectButton } from "@newfold/wp-module-facebook";

const Text = {
  Pending: {
    title: NewfoldRuntime.hasCapability("isEcommerce")
      ? __("Congrats on your new store!", "wp-module-ecommerce")
      : __("Congrats on your new site!", "wp-module-ecommerce"),
    description: __(
      "Your site is currently displaying a \"Coming Soon\" page.",
      "wp-module-ecommerce"
    ),
    Illustration: ComingSoonIllustration,
  },
  Live: {
    title: __("Ready to go to the next level?", "wp-module-ecommerce"),
    description: __("Your site is live to the world!", "wp-module-ecommerce"),
    Illustration: WelcomeIllustration,
  },
};

export function OnboardingScreen({
  comingSoon,
  toggleComingSoon,
  notify,
  showShadowBox,
}) {
  const { title, description, Illustration } = comingSoon
    ? Text.Pending
    : Text.Live;
    const section = new URLSearchParams(window.location.search);
    const facebook_token = section.get("facebook_token");

  const [hovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

 const iframeOnLoad= () => {
  window.frames["iframe-preview"].document.getElementById("wpadminbar").style.display = "none"
 }

useEffect(() => {
  IntegrationsSdk.status("hiive")
  if(!window.localStorage.getItem("facebook_token") || (window.localStorage.getItem("facebook_token") == null) || (window.localStorage.getItem("facebook_token") == "")){
    window.localStorage.setItem("facebook_token", facebook_token)
  }
},[])

  return (
    <Section.Container
      className="nfd-welcome-section"
      showShadowBox={showShadowBox}
    >
      <Section.Header title={__("Home", "wp-module-ecommerce")} />
      <Section.Content className="nfd-app-section-home">
        <div className="nfd-flex nfd-flex-col nfd-gap-6">
          <div
            className={classNames(
              "nfd-grid nfd-gap-6 nfd-min-h-[350px]",
              "sm:nfd-grid-cols-1",
              "xl:nfd-grid-cols-2"
            )}
          >
            <div className="nfd-flex nfd-flex-col nfd-justify-start nfd-items-start nfd-gap-4">
              <Title size={2}>{title}</Title>
              <p>
                {comingSoon ? (
                  <Alert
                    variant="warning"
                    className="nfd-text-red-600 nfd-text-sm nfd-bg-transparent nfd-p-0 "
                  >
                    {description}
                  </Alert>
                ) : (
                  <span className="nfd-text-[--nfd-ecommerce-text-info] nfd-text-sm">
                    {description}
                  </span>
                )}
              </p>
              <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseLeave}
                className={classNames(
                  "nfd-relative  nfd-flex-col nfd-justify-center nfd-items-center",
                  "nfd-border-[#CBD5E1] nfd-border-[1px] nfd-border-solid nfd-rounded-md"
                )}
              >
                <div className="nfd-flex nfd-justify-center nfd-items-center nfd-bg-gray-200 nfd-border-b nfd-border-[#dbd1d1] nfd-relative nfd-z-10">
                  <p className="nfd-font-bold">
                    {__("SITE PREVIEW", "wp-module-ecommerce")}
                  </p>
                </div>
                {comingSoon ? (
                  <div className="nfd-flex-col">
                    <Illustration
                      className={classNames("nfd-h-full", "nfd-w-full")}
                    />
                  </div>
                ) : (
                  <div className="nfd-flex-col">
                    <div
                      className={classNames(
                        "nfd-h-[216px] nfd-box-content",
                        "nfd-box-content nfd-z-[2] nfd-opacity-100",
                        "nfd-flex nfd-flex-col nfd-justify-center nfd-items-center",
                        "md:nfd-w-[520px] md:min-[783px]:nfd-w-[387px] md:min-[768px]:nfd-w-[670px]",
                        "lg:min-[1024px]:nfd-w-[486px] lg:nfd-w-[520px] lg:nfd-h-[258px]",
                        "xl:min-[1280px]:nfd-w-[360px]",
                        "2xl:nfd-w-[520px]"
                      )}
                    >
                      <iframe
                      onLoad={iframeOnLoad}
                      id="iframe-preview"
                        title="Preview"
                        className="nfd-w-[400%] nfd-min-h-[400%] nfd-basis-full nfd-scale-[0.25] nfd-overflow-hidden nfd-relative nfd-top-[-9px]"
                        src={NewfoldRuntime.homeUrl}
                        scrolling="no"
                        name="iframe-preview"
                        sandbox seamless
                      ></iframe>
                    </div>
                  </div>
                )}
                <div
                  className={classNames(
                    "nfd-absolute nfd-top-0 nfd-left-0 nfd-bottom-0 nfd-right-0 nfd-place-content-center nfd-grid",
                    "hover:nfd-animate-[wiggle_1s_ease-in-out_infinite]"
                  )}
                >
                  <Button
                   style={{
                    display: hovered ? "block" : "none",
                  }}
                    as="a"
                    className="nfd-bg-canvas "
                    href={NewfoldRuntime.siteDetails.url}
                    target="_blank"
                    variant="secondary"
                  >
                    {__("View your site", "wp-module-ecommerce")}
                  </Button>
                </div>
              </div>
            </div>
            <OnboardingList notify={notify} />
           <FacebookConnectButton />
            
          </div>
          <SiteStatus
            comingSoon={comingSoon}
            notify={notify}
            toggleComingSoon={toggleComingSoon}
          />
        </div>
      </Section.Content>
    </Section.Container>
  );
}
