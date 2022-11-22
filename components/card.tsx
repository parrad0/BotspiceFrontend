/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function CardFC({ image, url, label }: any) {
   return (
      <Card sx={{ borderRadius: '15px', maxWidth: '80%', mb: '12px' }}>
         <CardActionArea>
            <CardMedia component="img" height="140" image={image} alt="green iguana" />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  {label}
               </Typography>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(url, '_blank')}>
               Share
            </Button>
         </CardActions>
      </Card>
   );
}

export default CardFC;
