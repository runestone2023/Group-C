import {
  Button,
  Card,
  Col,
  Grid,
  Group,
  Image,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { IconHandStop, IconRadar, IconRun } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import robotImage from "../../assets/robot.jpg";
import { API_URLS } from "../../config/apis/endpoint";
import { useCallApi } from "../../config/apis";
import { notiType, renderNotification } from "../../utils/helpers";
import demoRouteImg from "../../assets/demoroute.png";

// export const ROBOT_ID = "z";
export const ROBOT_ID = "1";

const RobotsManagement = () => {
  const [robotID, setRobotID] = useState<string>();
  const [_isStartPatrol, setIsStartPatrol] = useState(false);
  // const { handleButtonPress, handleButtonRelease } = useRobotControlMovement();
  const [driveSpeed, setDriveSpeed] = useState(0);
  const [endDriveSpeed, setEndDriveSpeed] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [endRotationSpeed, setEndRotationSpeed] = useState(0);

  const SayHello = async () => {
    const api = API_URLS.ROBOT.sayHello();
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status == 200) {
      renderNotification("Say Hello ", notiType.SUCCESS);
    } else {
      renderNotification("Say hello command failed", notiType.ERROR);
    }
  };

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

  const ManuallyControlRobot = async (
    driveSpeed: number,
    rotationSpeed: number
  ) => {
    const api = API_URLS.ROBOT.manuallyControl(
      driveSpeed,
      rotationSpeed,
      ROBOT_ID
    );

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status == 200) {
      renderNotification("Send the command successfully", notiType.SUCCESS);
    } else {
      renderNotification("Send the command failed", notiType.ERROR);
    }
  };
  const [isRunning, setIsRunning] = useState(false);

  const handleMouseDown = () => {
    setIsRunning(true);
    ManuallyControlRobot(endDriveSpeed, endRotationSpeed);
  };

  const handleMouseUp = () => {
    setIsRunning(false);
    ManuallyControlRobot(0, 0);
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

            <Button onClick={() => SayHello()} my={"md"}>
              Say Hello / Beep sound
            </Button>
            <Text fz="lg" mb={"xs"} fw={600} mt={"md"}>
              Control Panel
            </Text>
            <Text c="dimmed">
              You can change the drive speed and rotation speed. Press and hold
              to moving robot, release to make it stop
            </Text>

            <Grid>
              <Col span={6}>
                <Text mb={"xs"} fw={600} mt={"xs"} c="dimmed">
                  Drive speed
                </Text>
                <Slider
                  value={driveSpeed}
                  onChange={setDriveSpeed}
                  onChangeEnd={setEndDriveSpeed}
                />
              </Col>
              <Col span={6}>
                <Text mb={"xs"} fw={600} mt={"xs"} c="dimmed">
                  Rotation speed
                </Text>
                <Slider
                  value={rotationSpeed}
                  onChange={setRotationSpeed}
                  onChangeEnd={setEndRotationSpeed}
                />
              </Col>
            </Grid>
            <Button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchCancel={handleMouseUp}
              miw={"100%"}
              mt={"xs"}
            >
              {isRunning ? "Running" : "Press and hold to start"}
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={1} />
        <Grid.Col span={5}>
          <Stack>
            <Text fz="lg" fw={600}>
              The Patrol Map
            </Text>
            <Image src={demoRouteImg} />
            <Group position="center">
              <Button
                onClick={() => StartPatrol()}
                leftIcon={<IconRun />}
                mr={"xs"}
              >
                Start the patrol
              </Button>
              <Button
                onClick={() => StopPatrol()}
                disabled={!_isStartPatrol}
                leftIcon={<IconHandStop />}
              >
                Stop the patrol
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default RobotsManagement;
