import React from "react";
import building_png from '../../assets/building.png';

class Records extends React.Component {

  render() {
    return (
        <div style={{display: 'flex-inline', paddingTop: '60%'}}>
          <img src={building_png} alt='图片'/><span>建设中</span>
        </div>

    );
  }

}

export default Records;
