import React from 'react';
import ContentLoader from 'react-content-loader';

const FacebookLoader = () => (
  <ContentLoader
    speed={0.5}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor='#2c2e31'
  >
    <rect x="0" y="0" rx="5" ry="5" width="400" height="20" />
    <rect x="0" y="40" rx="5" ry="5" width="300" height="20" />
    <rect x="0" y="80" rx="5" ry="5" width="360" height="20" />
    <rect x="0" y="120" rx="5" ry="5" width="250" height="20" />
  </ContentLoader>
);

export default FacebookLoader;
