import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {useNavigate} from "react-router-dom";

const cardStyle = {
  maxWidth: 345,
  transition: 'transform  0.3s',
  ':hover': {
    transform: 'scale(1.05)',
  },
};
export default function ClassCard({name, teacherName, classCode}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/class/' + classCode);
  };

  return (
    <Card sx={cardStyle}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          src={"https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
