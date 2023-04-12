import {
  Anchor,
  AppShell,
  Button,
  Group,
  Header,
  LoadingOverlay,
  Container,
  Text,
  Navbar,
} from "@mantine/core";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="0">
              Navbar Content
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60} px={"xs"} fw={"bolder"} fz="lg" c="red">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text>Robosistance</Text>
            </div>
          </Header>
        }
      >
        <Suspense fallback={<LoadingOverlay visible />}>
          {/* <Outlet /> */}
          <Text>App content</Text>
        </Suspense>
      </AppShell>
    </>
  );
}
