import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function TeamPageCard({ name, position, grad, agility, broad, three, wb}) {
  return (
    <Card elevation={0} sx={{ minWidth: 275, mt: 3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {position ? position : 'POS'} &bull; {grad ? grad : 'GRAD'}
        </Typography>

        <Stack spacing={2} alignItems="center">
          {/* ROW 1 */}
          <Stack direction="row" spacing={2}>
            <Stack>
              <Typography color="primary" variant="button" display="block" gutterBottom>50's Wall Ball</Typography>
              <Typography variant="h6">{wb ? wb : 'N/A'}</Typography>
            </Stack>
            <Stack>
              <Typography color="primary" variant="button" display="block" gutterBottom>Broad Jump</Typography>
              <Typography variant="h6">{broad ? broad : 'N/A'}</Typography>
            </Stack>
          </Stack>
          {/* ROW 2 */}
          <Stack direction="row" spacing={3}>
            <Stack>
              <Typography color="primary" variant="button" display="block" gutterBottom>300's</Typography>
              <Typography variant="h6">{three ? three : 'N/A'}</Typography>
            </Stack>
            <Stack>
              <Typography color="primary" variant="button" display="block" gutterBottom>5-10-5</Typography>
              <Typography variant="h6">{agility ? agility : 'N/A'}</Typography>
            </Stack>
  
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default TeamPageCard;