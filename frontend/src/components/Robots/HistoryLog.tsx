import { Card, Text, Group } from "@mantine/core";

export const HistoryLog = () => {
  return (
    <>
      <Text weight={"bold"} size={"lg"}>
        Commands History
      </Text>
      <Card padding={"md"} radius={"lg"} mih={300}>
        <Group>
          <Text color="green" weight={"bold"}>
            14: 23 /19.04.2023
          </Text>
          <Text> Connected to RoboDoc</Text>
        </Group>
        <Group>
          <Text color="green" weight={"bold"}>
            14: 23 /19.04.2023
          </Text>
          <Text> Say Hello</Text>
        </Group>
        <Group>
          <Text color="green" weight={"bold"}>
            14: 23 /19.04.2023
          </Text>
          <Text> Go Forward</Text>
        </Group>
      </Card>
    </>
  );
};
