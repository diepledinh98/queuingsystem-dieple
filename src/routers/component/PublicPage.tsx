import React from 'react';
import { Routes } from 'react-router-dom';

import { publicRouter } from '../index';
import ShowRouter from './ShowRouter';

const PublicPage: React.FC = () => {
  return <Routes>{ShowRouter({ routers: publicRouter })}</Routes>;
};
export default PublicPage;
