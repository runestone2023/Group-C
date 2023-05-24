import AppLayout from "../containers/AppLayout/AppLayout";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../config/router";

const RobotManagement = React.lazy(() => import("./RobotsManagement/index"));

const _404NotFound = React.lazy(
  () => import("../components/commons/_404NotFound")
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTER.HOME.INDEX} element={<AppLayout />}>
        <Route path={ROUTER.HOME.INDEX} element={<RobotManagement />} />
        <Route path="*" element={<_404NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
