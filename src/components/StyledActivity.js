import glamorous from 'glamorous';
import Paper from 'material-ui/Paper';
import { ellipsis } from '../styles';

export const Item = glamorous(Paper)({
  position: 'relative',
  marginBottom: 12,
  padding: 12
}, ({ draggable, onClick }) => {
  if (draggable || onClick) return { cursor: 'pointer' };
});

export const Title = glamorous.h4(ellipsis, {
  margin: 0,
  lineHeight: '24px',
  fontSize: 16
});

export const Description = glamorous.p(ellipsis, {
  margin: 0,
  width: '100%',
  fontSize: 14
}, ({ hasActionButton }) => {
  if (hasActionButton) return { width: 'calc(100% - 24px)' };
});
