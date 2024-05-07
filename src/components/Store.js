import { __ } from "@wordpress/i18n";
import { QuickLook } from "./QuickLook";
import { Section } from "./Section";
import { WooCommerceUnavailable } from "./WooCommerceUnavailable";
import { YITHPlugins } from "./YITHPlugins";
import { SiteStatus } from "./SiteStatus";
import { NewfoldRuntime } from "../sdk/NewfoldRuntime";

export function Store(props) {
  return (
    <>
      <Section.Container>
        <Section.Header title={__("Store", "wp-module-ecommerce")} />
        <WooCommerceUnavailable {...props} />
        <QuickLook {...props} />
        <Section.Content className={"nfd-pt-0"} subClassName={"nfd-pb-4"} >
          <Section.Block>
            <YITHPlugins {...props} />
          </Section.Block>
        </Section.Content>
        {NewfoldRuntime.hasCapability("isEcommerce") &&
          props.state.wp.comingSoon &&
          <Section.Content>
            <Section.Block>
              <SiteStatus
                comingSoon={props.state.wp.comingSoon}
                notify={props.wpModules.notify}
                toggleComingSoon={props.actions.toggleComingSoon}
              />
            </Section.Block>
          </Section.Content>
        }
      </Section.Container>
    </>
  );
}
