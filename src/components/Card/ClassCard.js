import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const cardStyle = {
  maxWidth: 345,
  transition: 'transform  0.3s',
  ':hover': {
    transform: 'scale(1.05)',
  },
};
export default function ClassCard({name, teacherName}) {
  return (
    <Card sx={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={"https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=1380&t=st=1702229636~exp=1702230236~hmac=45393600dab479c8c9d4c1781c614d8ea0a5bc9709eb94269d6f7ee2bcf148a1"}
          alt="Class Cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Teacher: {teacherName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
