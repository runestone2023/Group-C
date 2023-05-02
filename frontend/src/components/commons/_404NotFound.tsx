import { Anchor, Stack, Text } from "@mantine/core";
import ROUTER from "../../config/router";

const _404NotFound = () => {
  return (
    <Stack spacing="sm" align="center" justify="center">
      <Text c="black.8" fz={28} fw={700}>
        Page Not Found
      </Text>
      <Text c="black.8" fz="xl">
        Page was removed or URL is not correct
      </Text>
      <Text c="black.8" fz="xl">
        Back to&nbsp;
        <Anchor href={ROUTER.HOME.INDEX} color="primary.9" underline={false}>
          <Text span inherit fw={500} fz="xl">
            Home page
          </Text>
        </Anchor>
      </Text>
    </Stack>
  );
};

export default _404NotFound;
