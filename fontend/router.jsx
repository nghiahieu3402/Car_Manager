import React from 'react';
import CarManager from "./src/component/page/CarManager";
import { Route, Routes } from 'react-router-dom';
import GetPrice from './src/component/page/GetPrice';
import BrandMaxPrice from './src/component/page/BrandMaxPrice';
import ModelMaxPrice from './src/component/page/ModelMaxPrice';
import GetRoadPrice from './src/component/page/GetRoadPrice';
import HistoryUpdate from './src/component/page/HistoryUpdate';
import HistoryDelete from './src/component/page/HistoryDelete';

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
    },
    {
      path: "/History-Update",
      component: <HistoryUpdate />,
    },

    {
      path: "/History-Delete",
      component: <HistoryDelete />,
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
