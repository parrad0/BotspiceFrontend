/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch } from '../redux/hooks/hook';
import { setShareModal } from '../redux/reducer/app';

function CardFC({ image, url, label }: any) {
   const dispatch = useAppDispatch();
   return (
      <Card sx={{ borderRadius: '15px', maxWidth: '80%', mb: '12px' }}>
         <CardActionArea onClick={() => window.open(url, '_blank')}>
            <CardMedia component="img" height="140" image={image} alt="green iguana" />
            <CardContent>
               <Typography gutterBottom variant="h5" component="div">
                  {label}
               </Typography>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <Button
               color="info"
               variant="contained"
               endIcon={<ShareIcon />}
               onClick={() => dispatch(setShareModal({ status: true, url }))}
            >
               Share
            </Button>
         </CardActions>
      </Card>
   );
}

export default CardFC;
