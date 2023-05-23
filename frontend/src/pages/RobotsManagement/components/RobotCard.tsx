import { Robot, RobotStatus } from "../../../types/models/robot";
import { Card, Group, Switch, Text, Button } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "../../../config/router";

interface Props {
  robot: Robot;
}

export const RobotCard = ({ robot }: Props) => {
  const navigate = useNavigate();
  const [isConnect, setIsConnect] = useState(
    robot.status === RobotStatus.CONNECTING ? true : false
  );
  console.log(robot.id);
  return (
    <Card withBorder padding="xl" radius="md">
      <Card.Section
        sx={{
          backgroundImage: `url(${robot.image})`,
          height: 250,
          backgroundPosition: "center",
        }}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {robot.name}
      </Text>
      <Group position="apart" mt={"md"}>
        <Switch
          onLabel={RobotStatus.CONNECTING}
          offLabel={RobotStatus.NOT_CONNECTED}
          size="xl"
          checked={isConnect}
          onChange={() => setIsConnect(!isConnect)}
        />
        <Button
          variant={"light"}
          radius={"md"}
          disabled={!isConnect}
          onClick={() => navigate(`${ROUTER.ROBOT.INDEX}/${robot.id}`)}
        >
          Control the robot
        </Button>
      </Group>
    </Card>
  );
};
