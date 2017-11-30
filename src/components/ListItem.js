import glamorous from 'glamorous';
import { grey300 } from 'material-ui/styles/colors';

export const ContentBlock = glamorous.section({
  display: 'inline-flex',
  alignItems: 'center'
});

const ListItem = glamorous.article({
  marginBottom: 6,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}, ({ withBorder }) => {
  if (withBorder) return {
    paddingBottom: 6,
    borderBottom: `2px solid ${grey300}`
  };
});

export default ListItem;
