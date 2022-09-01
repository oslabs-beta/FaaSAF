import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Box, Button, TextField } from '@mui/material';

import { IReducers } from '../../Interfaces/IReducers';
import { ClusterTypes } from '../../Interfaces/ICluster';
import NavBar from './NavBar';
import Kube from '../Cards/Kube';
import './styles.css';
import { Get } from '../../Services';
import { apiRoute } from '../../utils';

const Home = () => {
  const clusterReducer = useSelector((state: IReducers) => state.clusterReducer);
  const [clusters, setClusters] = useState<ClusterTypes[]>([]);

  useEffect(() => {
    console.log('Signed in username from localStorage:', localStorage.getItem('username'));
    console.log('JWT token stored from localStorage:', localStorage.getItem('token'));
    console.log('Signed in userId from localStorage:', localStorage.getItem('userId'));
    const getClusters = async () => {
      const res = await Get(apiRoute.getRoute('cluster'), { authorization: localStorage.getItem('token') });
      setClusters(res);
    };
    getClusters();
  }, [clusterReducer.render]);

  const favClusters: JSX.Element[] = [];
  const nonFavClusters: JSX.Element[] = [];

  clusters.forEach((element, idx) => {
    if (element.favorite?.includes(localStorage.getItem('userId') as string)) {
      (favClusters as any).push(<Kube
        key={'fav' + idx}
        url={element.url}
        k8_port={element.k8_port}
        faas_port={element.faas_port}
        name={element.name}
        description={element.description}
        _id={element._id}
        favorite={element.favorite}
        favoriteStatus={true}
      />);
    }
    else {
      (nonFavClusters as any).push(<Kube
        key={'nonFav' + idx}
        url={element.url}
        k8_port={element.k8_port}
        faas_port={element.faas_port}
        name={element.name}
        description={element.description}
        _id={element._id}
        favorite={element.favorite}
        favoriteStatus={false}
      />);
    }
  });

  return (
    <div className="Kube-port">
      <div className="Kube-container">
        {favClusters}
        {nonFavClusters}
      </div>
      <NavBar />
    </div>
  );
};

export default Home;