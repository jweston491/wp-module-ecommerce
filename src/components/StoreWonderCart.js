import { Button, Card, Title } from "@newfold/ui-component-library";
import { __ } from "@wordpress/i18n";

export function StoreWonderCart({ yithPluginsMap, id }) {
  return (
    <Card id={yithPluginsMap.get(id).title}>
      <Card.Content className={"nfd-flex nfd-flex-col nfd-gap-3"}>
        <div className={"nfd-flex nfd-flex-row nfd-gap-3 nfd-items-center"}>
          <img
            src={yithPluginsMap.get(id).image}
            className="nfd-w-12 nfd-text-[--nfd-ecommerce-text-dark]"
          />
          <Title size="4" className="nfd-leading-normal nfd-my-4">
            {__(yithPluginsMap.get(id).name, "wp-module-ecommerce")}
          </Title>
        </div>
        <span>{yithPluginsMap.get(id).desc}</span>
      </Card.Content>
      <Card.Footer>
        <Button
          className="nfd-w-full nfd-h-9 nfd-border nfd-flex nfd-items-center nfd-gap-2"
          variant="secondary"
          as="a"
          href={yithPluginsMap.get(id).url}
        >
          <span>{"create"}</span>
        </Button>
      </Card.Footer>
    </Card>
  );

}