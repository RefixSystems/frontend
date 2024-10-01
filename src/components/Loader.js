import * as React from 'react';
import loader from '../assests/images/loader.gif';

const Loader = () => (
  <div id="loader-wrapper" className="loader-on">
    <div id="loader">
      {/* Add your GIF image below */}
      <img
        src={loader}
        alt="Loading..."
        style={{ width: '150px', height: '150px' }}
      />
      {/* Optional: Use a text loader if needed */}
      <div className="text mt-3">Loading ...</div>
    </div>
  </div>
);

export default Loader;
