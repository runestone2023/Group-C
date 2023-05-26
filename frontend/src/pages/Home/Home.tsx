import { Col, Grid } from "@mantine/core";
import {
  MemberInfoCard,
  MemberInfoProps,
  MemberRole,
} from "./components/MemberCard";

const membersData: MemberInfoProps[] = [
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
  {
    avatar: "",
    name: "Mai Anh Duc",
    school: "HUST",
    role: MemberRole.FRONTEND_TEAM,
  },
];

const Home = () => {
  return (
    <>
      <Grid>
        {membersData.map((member, index) => (
          <Col span={3} mt={"lg"} key={index}>
            <MemberInfoCard
              name={member.name}
              avatar={member.avatar}
              school={member.school}
              role={member.role}
            />
          </Col>
        ))}
      </Grid>
    </>
  );
};

export default Home;
