import React, { Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import LoadingSpinner from '../LoadingSpinner';
import NotFoundTitle from '../NotFoundTitle';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { transition } from '../../styles';
import { grey300 } from 'material-ui/styles/colors';
import ActivityContent from './ActivityContent';
import ChildActivities from './ChildActivities';
import ActivityComments from './ActivityComments';
import ItemDates from './ItemDates';
import { MULTI } from '../../lib/activityTypes';
import Aux from 'react-aux';

const ActivityWrapper = glamorous.section({
  position: 'relative',
  float: 'left',
  marginTop: 14,
  marginLeft: 48,
  marginBottom: 80,
  width: 'calc(75% - 48px)',
  transition
}, ({ open }) => {
  if (!open) return {
    marginLeft: 0,
    padding: 0,
    width: 0,
    opacity: 0
  };
});

const Activity = glamorous.section({
  position: 'relative',
  padding: '24px 48px',
  minHeight: 48,
  backgroundColor: grey300,
  borderRadius: 2,
  boxSizing: 'border-box',
  overflow: 'hidden',
  opacity: 1,
  whiteSpace: 'nowrap'
});

const CloseButton = glamorous(IconButton)({
  position: 'absolute !important',
  top: 24,
  right: 36
});

class CollapsibleActivity extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    openActivity: PropTypes.string.isRequired,
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
    this.updateListener(oldActivity, newActivity);
  };

  updateListener = (oldActivity, newActivity) => {
    this.setState({ loading: true, activity: null }, () => {
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
    });
  };

  componentWillUnmount = () => {
    this.getRef(this.props.openActivity).off();
    this.props.onClose();
  };

  fixDescriptionHeight = () => window.dispatchEvent(new Event('resize'));

  render = () => {
    const { open, openActivity, group, onClose } = this.props;
    const { loading, activity } = this.state;
    return (
      <ActivityWrapper open={open}>
        {!loading && activity &&
          <ItemDates
            activityKey={openActivity}
            group={group.key}
            creationDate={activity.creationDate}
          />
        }
        <Activity>
          {loading &&
            <LoadingSpinner css={{ marginTop: 4 }} />
          }
          {!loading && !activity &&
            <NotFoundTitle css={{ lineHeight: '48px' }}>
              {`Activity doesn't exist`}
            </NotFoundTitle>
          }
          {!loading && activity &&
            <Aux>
              <ActivityContent activity={activity} />
              {activity.type === MULTI &&
                <ChildActivities childActivitiesKey={activity.childActivitiesKey} />
              }
              <ActivityComments
                activity={activity}
                group={group}
              />
            </Aux>
          }
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Activity>
      </ActivityWrapper>
    );
  }
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
