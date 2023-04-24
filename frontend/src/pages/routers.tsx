import AppLayout from "../containers/AppLayout/AppLayout";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../config/router";
import RobotDetails from "./RobotDetails/RobotDetails";

const Home = React.lazy(() => import("./Home/Home"));
const RobotManagement = React.lazy(() => import("./RobotsManagement/index"));

const _404NotFound = React.lazy(
  () => import("../components/commons/_404NotFound")
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTER.HOME.INDEX} element={<AppLayout />}>
        <Route path={ROUTER.HOME.INDEX} element={<Home />} />
        <Route path={ROUTER.ROBOT.ALL_ROBOTS} element={<RobotManagement />} />
        <Route path={ROUTER.ROBOT.DETAILS} element={<RobotDetails />} />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
