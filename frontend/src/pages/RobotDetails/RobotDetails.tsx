import { useParams } from "react-router-dom";
import { RobotStatus } from "../../types/models/robot";
import RobotCard from "../../components/Robots/RobotCard";
import { Col, Grid, Center, Card, Stack, Text } from "@mantine/core";
import MoveControl from "../../components/Robots/MoveControl";
import CommandInput from "../../components/Robots/CommandInput";
import { HistoryLog } from "../../components/Robots/HistoryLog";

const RobotDetails = () => {
  const params = useParams();
  console.log(params);
  const fakeData = {
    id: "123",
    name: "Robot 1",
    status: RobotStatus.CONNECTING,
    position: "HUST, Vietnam",
  };
  return (
    <>
      <RobotCard robot={fakeData} />
      <Grid mt={60}>
        <Col span={3}>
          <MoveControl />
        </Col>
        <Col span={9}>
          <Card bg={"gray"} shadow={"lg"} padding={"md"} radius={"lg"}>
            <Stack>
              <HistoryLog />
              <CommandInput />
            </Stack>
          </Card>
        </Col>
      </Grid>
    </>
  );
};

export default RobotDetails;
