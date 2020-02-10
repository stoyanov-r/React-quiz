import React from 'react';
import classes from './Previewer.module.scss'

const Previewer = props => {
  return (
    <div className={classes.Previewer}>
      <div>
        {props.imageUrls.map((url, index) => (
          <img src={url} alt={url} key={`image-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Previewer;
