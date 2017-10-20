import React from 'react';

import { Content, Title, BoxHeader, Collapsator, BoxBody } from './StyleIboxContent';

class IboxContent extends React.Component {

    render() {

      const contentStyle = {
        flex: this.props.size
      };

      return (
        <Content style={contentStyle}>
            <BoxHeader>
                <Title>{this.props.title}</Title>
            </BoxHeader>
            <BoxBody>
                {this.props.children}
            </BoxBody>
        </Content>
      )
    }
}

export default IboxContent
