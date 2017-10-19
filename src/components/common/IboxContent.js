import React from 'react';

class IboxContent extends React.Component {

    render() {
      const contentStyle = {
          flex: this.props.size
      };

      return (
        <div className="wrapper wrapper-content animated fadeIn">
            <div className="row">
                <div className="col-lg-12">
                  <div className="ibox-content">
                    <div className="heading ng-binding">
                        <small className="chat-date pull-right">

                        </small>
                        {this.props.title}
                    </div>
                    <div className="row m-sm">
                        <div className="col-md-12">
                          {this.props.children}
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      )
    }
}

export default IboxContent
