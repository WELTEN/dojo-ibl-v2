import glamorous from 'glamorous';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export const FormContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center'
});

export const InputField = glamorous(TextField)({
  marginTop: '-14px !important'
});

export const SubmitButton = glamorous(RaisedButton)({ marginLeft: 24 });
