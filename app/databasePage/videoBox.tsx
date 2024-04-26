import React, { useState } from 'react';

const videoBox = ({ source }: { source: string }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false); // Set loading to false once the iframe has loaded
  };

  return (
    <div>
      {loading && <p>Loading...</p>}{' '}
      {/* Conditional rendering of loading message */}
      <iframe
        className="videoBox"
        src={source}
        onLoad={handleLoad} // Call handleLoad when iframe is loaded
      ></iframe>
    </div>
  );
};

export default videoBox;
