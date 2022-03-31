import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilePresentIcon from '@mui/icons-material/FilePresent';

export const adminListItems = (
  <List>
    <ListItem>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Team" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Player Data" />
    </ListItem>
  </List>
);

export const highschoolAdminListItems = (
  <ListItem>
      <ListItemIcon>
        <FilePresentIcon />
      </ListItemIcon>
    <ListItemText primary="Player Submissions" />
  </ListItem>
)