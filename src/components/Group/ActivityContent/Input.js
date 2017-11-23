import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import LoadingSpinner from '../../LoadingSpinner';
import LiveUpdatingTextField from '../../LiveUpdatingTextField';
import * as firebase from 'firebase';
import injectFirebaseData from '../../InjectFirebaseData';
import { grey400 } from 'material-ui/styles/colors';

const LiveUpdatingInput = glamorous(LiveUpdatingTextField)({
  marginTop: -14,
  marginBottom: 24
});

const Input = ({ loading, data, input }) => {
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <LiveUpdatingInput
        floatingLabelText="Activity input"
        value={data}
        getRef={() => firebase.database().ref(`inputs/${input}`)}
        underlineStyle={{ borderColor: grey400 }}
        fullWidth
        multiLine
        rows={2}
      />
    </div>
  );
};

Input.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any,
  input: PropTypes.string.isRequired
};

const getRef = props => firebase.database().ref(`inputs/${props.input}`);

export default injectFirebaseData(Input, getRef);
