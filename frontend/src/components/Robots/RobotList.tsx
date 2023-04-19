import { Col, Grid, Text } from "@mantine/core";
import { Robot, RobotStatus } from "../../types/models/robot";
import RobotCard from "./RobotCard";

const fakeData: Robot[] = [
  {
    id: "123",
    name: "Robot 1",
    status: RobotStatus.CONNECTING,
    position: "HUST, Vietnam",
  },
  {
    id: "123",
    name: "Robot 2",
    status: RobotStatus.NOT_CONNECTED,
    position: "HUST, Vietnam",
  },
  {
    id: "123",
    name: "Robot 3",
    status: RobotStatus.CONNECTING,
    position: "HUST, Vietnam",
  },
  {
    id: "123",
    name: "Robot 4",
    status: RobotStatus.ERROR,
    position: "HUST, Vietnam",
  },
];

const RobotList = () => {
  return (
    <>
      <Text m={"md"} weight={"bolder"} size={"xl"}>
        {" "}
        Robots Management
      </Text>
      <Grid>
        {fakeData.map((robot, index) => (
          <Col span={12} key={index}>
            <RobotCard robot={robot} />
          </Col>
        ))}
      </Grid>
    </>
  );
};

export default RobotList;
