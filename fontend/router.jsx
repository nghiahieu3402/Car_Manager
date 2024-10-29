import React from 'react';
import CarManager from "./src/component/page/CarManager";
import { Routes, Route } from 'react-router-dom';
import GetPrice from './src/component/page/GetPrice';
import BrandMaxPrice from './src/component/page/BrandMaxPrice';
import ModelMaxPrice from './src/component/page/ModelMaxPrice';
import GetRoadPrice from './src/component/page/GetRoadPrice';

const renderAdminRouter = () => {
  const adminrouter = [
    {
      path: "/",
      component: <CarManager />,
    },
    {
      path: "/GetPrice",
      component: <GetPrice />,
    },
    {
      path: "/BrandMaxPrice",
      component: <BrandMaxPrice />,
    }
    , {
      path: "/ModelMaxPrice",
      component: <ModelMaxPrice />,
    },
    {
      path: "/Road-Price",
      component: <GetRoadPrice />,
    }



  ];

  return (
    <Routes>
      {adminrouter.map((item, key) => (
        <Route key={key} path={item.path} element={item.component} />
      ))}
    </Routes>
  );
}

const RouterCustom = () => {
  return renderAdminRouter();
}

export { RouterCustom };
