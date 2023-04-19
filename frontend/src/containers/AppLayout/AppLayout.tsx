import { AppShell, Header, LoadingOverlay, Text, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import NavbarCustomer from "../Navbar/Navbar";
import { Suspense } from "react";
const AppLayout = () => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Flex align={"center"}>
            <Text weight={"bolder"} size={24}>
              Robotsistance
            </Text>
          </Flex>
        </Header>
      }
      navbar={<NavbarCustomer />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Suspense fallback={<LoadingOverlay visible />}>
        <Outlet />
      </Suspense>
    </AppShell>
  );
};

export default AppLayout;
