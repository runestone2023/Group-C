import { Button, Card, Grid, Group, Image, Stack, Text } from "@mantine/core";
import { IconHandStop, IconRadar, IconRun } from "@tabler/icons-react";
import { useState } from "react";
import robotImage from "../../assets/robot.jpg";
import { API_URLS } from "../../config/apis/endpoint";
import { useCallApi } from "../../config/apis";
import { notiType, renderNotification } from "../../utils/helpers";
import useRobotControlMovement from "../../hooks/useRobotControl";
import demoRouteImg from "../../assets/demoroute.png";

export const ROBOT_ID = "67e55044-10b1-426f-9247-bb680e5fe0c8";

const RobotsManagement = () => {
  const [robotID, setRobotID] = useState<string>();
  const [_isStartPatrol, setIsStartPatrol] = useState(false);
  // const { handleButtonPress, handleButtonRelease } = useRobotControlMovement();

  const RegisterRobot = async () => {
    const { response, error } = await useCallApi(
      API_URLS.ROBOT.registerRobot()
    );
    if (!error && response?.status == 200) {
      const { data } = response;
      setRobotID(data);
      renderNotification("Register robot successfully", notiType.SUCCESS);
    } else {
      renderNotification(
        "Register robot to the backend failed",
        notiType.ERROR
      );
    }
  };

  const StartPatrol = async () => {
    const { response, error } = await useCallApi(
      API_URLS.ROBOT.startPatrol(ROBOT_ID)
    );

    if (!error && response?.status == 200) {
      setIsStartPatrol(true);
      renderNotification("Start the patrol successfully", notiType.SUCCESS);
    } else {
      setIsStartPatrol(false);
      renderNotification("Start the patrol failed", notiType.ERROR);
    }
  };

  const StopPatrol = async () => {
    if (!_isStartPatrol) {
      renderNotification("You have not started the patrol yet", notiType.ERROR);
      return;
    }

    const { response, error } = await useCallApi(
      API_URLS.ROBOT.stopPatrol(ROBOT_ID)
    );

    if (!error && response?.status == 200) {
      setIsStartPatrol(false);
      renderNotification("Stop the patrol successfully", notiType.SUCCESS);
    } else {
      setIsStartPatrol(true);
      renderNotification("Stop the patrol failed", notiType.ERROR);
    }
  };

  return (
    <>
      <Grid>
        <Grid.Col span={5}>
          <Card withBorder padding="xl" radius="md">
            <Card.Section
              sx={{
                backgroundImage: `url(${robotImage})`,
                height: 450,
                backgroundPosition: "center",
              }}
            />
            <Group position="apart" mt={"md"} align="center">
              <Text fz="lg" fw={600}>
                LEGO EV3 Robot
              </Text>
              <Button onClick={() => RegisterRobot()} leftIcon={<IconRadar />}>
                Register Robot
              </Button>
            </Group>
            <Text mb={"xs"}>Control Panel</Text>
            <Grid>
              <Grid.Col span={12}>
                <Button
                  onClick={() => StartPatrol()}
                  leftIcon={<IconRun />}
                  mr={"xs"}
                >
                  Start the patrol
                </Button>
                <Button
                  onClick={() => StartPatrol()}
                  disabled={!_isStartPatrol}
                  leftIcon={<IconHandStop />}
                >
                  Stop the patrol
                </Button>
              </Grid.Col>
              <Grid.Col span={3}></Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col span={1} />
        <Grid.Col span={5}>
          <Stack>
            <Text fz="lg" fw={600}>
              The Patrol
            </Text>
            <Image src={demoRouteImg} />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default RobotsManagement;
