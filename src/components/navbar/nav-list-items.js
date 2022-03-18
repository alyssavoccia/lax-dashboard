import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilePresentIcon from '@mui/icons-material/FilePresent';

export const secondaryListItems = (
  <div>
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
  </div>
);

export const highschoolAdminListItems = (
  <ListItem>
      <ListItemIcon>
        <FilePresentIcon />
      </ListItemIcon>
    <ListItemText primary="Player Submissions" />
  </ListItem>
)