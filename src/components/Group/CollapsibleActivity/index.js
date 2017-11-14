import React, { Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import LoadingSpinner from '../../LoadingSpinner';
import NotFoundTitle from '../../NotFoundTitle';
import FormattedText from '../../FormattedText';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { transition, ellipsis } from '../../../styles';
import { grey300 } from 'material-ui/styles/colors';

const Activity = glamorous.section({
  position: 'relative',
  float: 'left',
  marginTop: 14,
  marginLeft: 48,
  padding: '24px 48px',
  width: 'calc(75% - 48px)',
  minHeight: 48,
  backgroundColor: grey300,
  borderRadius: 2,
  boxSizing: 'border-box',
  overflow: 'hidden',
  opacity: 1,
  whiteSpace: 'nowrap',
  transition
}, ({ open }) => {
  if (!open) return {
    marginLeft: 0,
    padding: 0,
    width: 0,
    opacity: 0
  };
});

const CloseButton = glamorous(IconButton)({
  position: 'absolute !important',
  top: 24,
  right: 48
});

const Name = glamorous.h2(ellipsis, {
  marginTop: 0,
  marginBottom: 18,
  maxWidth: 'calc(100% - 48px)',
  lineHeight: '48px',
});

const Description = glamorous(FormattedText)({
  marginBottom: 24,
  minWidth: 'calc(75vw - 240px)'
});

class CollapsibleActivity extends Component {
  static propTypes = {
    open: PropTypes.bool,
    openActivity: PropTypes.string,
    group: PropTypes.object.isRequired
  };

  state = {
    loading: true,
    activity: null
  };

  getRef = activityKey => firebase.database().ref(`activities/${activityKey}`);

  componentWillReceiveProps = (nextProps) => {
    const oldActivity = this.props.openActivity;
    const newActivity = nextProps.openActivity;

    if (newActivity === oldActivity) return;

    this.setState({ loading: true });

    this.getRef(oldActivity).off();
    this.getRef(newActivity).on('value', (snapshot) => {
      const activity = snapshot.val();
      if (!activity) {
        this.setState({
          loading: false,
          activity: null
        });
        return;
      }
      activity.key = snapshot.key;
      this.setState({
        loading: false,
        activity
      });

      this.fixDescriptionHeight();
    });
  };

  componentWillUnmount = () => {
    this.getRef(this.props.openActivity).off();
    this.props.onClose();
  };

  fixDescriptionHeight = () => window.dispatchEvent(new Event('resize'));

  render = () => (
    <Activity open={this.props.open}>
      {this.state.loading &&
        <LoadingSpinner css={{ marginTop: 4 }} />
      }
      {!this.state.loading && !this.state.activity &&
        <NotFoundTitle css={{ lineHeight: '48px' }}>
          {`Activity doesn't exist`}
        </NotFoundTitle>
      }
      {!this.state.loading && this.state.activity &&
        <div>
          <Name>{this.state.activity.name}</Name>
          <Description>{this.state.activity.description}</Description>
        </div>
      }
      <CloseButton onClick={this.props.onClose}>
        <Close />
      </CloseButton>
    </Activity>
  );
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch({ type: 'CLOSE', activity: '' });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CollapsibleActivity
);
