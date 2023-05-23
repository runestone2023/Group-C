import { Loader } from "tabler-icons-react";
import logo from "../../assets/studium-course-image-262x146.png";
import ROUTER from "../../config/router";

import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Group,
  Header,
  Image,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBuildingFactory2,
  IconSubscript,
  IconUser,
} from "@tabler/icons-react";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface NavLinkProps {
  icon: JSX.Element;
  color: string;
  label: string;
  to: string;
}

const navLinks: NavLinkProps[] = [
  {
    icon: <IconUser size="1rem" />,
    color: "yellow",
    label: "Our Team",
    to: ROUTER.HOME.INDEX,
  },
  {
    icon: <IconBuildingFactory2 size="1rem" />,
    color: "red",
    label: "Robot",
    to: ROUTER.ROBOT.ALL_ROBOTS,
  },
];

const NavLink = ({ icon, color, label, to }: NavLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text fw={400} size="md">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

const User = () => {
  const theme = useMantineTheme();

  const user = JSON.parse(localStorage.getItem("authUser") || "");
  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.fullname}
            </Text>
            <Text color="dimmed" size="xs">
              {user.role}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

const ProtectedLayout = () => {
  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: "calc(100vw - 32px)",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={true}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow mt="0">
              <div>
                {navLinks.map((link) => (
                  <NavLink {...link} key={link.label} />
                ))}
              </div>
            </Navbar.Section>
            {/* <Navbar.Section>
              <User />
            </Navbar.Section> */}
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: "100%" }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <Image
                    src={logo}
                    height={32}
                    width={32}
                    withPlaceholder
                    radius={4}
                  />
                </Anchor>
                <Text fw={700} fz="xl">
                  Robosistance - Group C
                </Text>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
};

export default ProtectedLayout;
