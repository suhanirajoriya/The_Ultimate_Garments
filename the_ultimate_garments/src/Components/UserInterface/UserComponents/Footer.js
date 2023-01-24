
import { useStyles } from "./FooterCss"
import { Grid } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
export default function Footer() {
    var classes = useStyles()
    return (<div className={classes.mainContainer}>
        <Grid container>
            <Grid item xs={3}>
                <Grid className={classes.headingStyle}> LOCATION</Grid>
                <p className={classes.txtStyle}>
                    <p>    Head Office :- H.C. : 13, </p>
                    <p> Gulabchand Ki   Bagichi,</p>
                    <p> Behind Jhawar Estate, </p>
                    <p> Thatipur, Gwalior- 474011 (M.P.)  </p>
                </p>

            </Grid>
            <Grid item xs={3}>
                <Grid className={classes.headingStyle}>COMPANY</Grid>
                <p className={classes.txtStyle}>
                    <p><a>About us</a></p>
                    <p>The Ultimate Blog</p>
                    <p>Collaboration</p>
                    <p>Privacy Policy</p>
                    <p>Shipping Policy</p>
                    <p>Media</p>
                </p>
            </Grid>

            <Grid item xs={3}>
                <Grid className={classes.headingStyle}>NEED HELP</Grid>
                <p className={classes.txtStyle}>
                    <p>Contact Us</p>
                    <p>   Return, Refund and Cancellation</p>
                    <p>FAQ's</p>
                    <p>  Track Order</p>
                    <p>  Career</p>
                    <p>Sitemap</p>
                </p>
            </Grid>

            <Grid item xs={3}>
                <Grid className={classes.headingStyle}>LETS BE FRIEND</Grid>
                <p>

                    <FacebookIcon style={{padding:'5%',color:"white" }} />
                    <InstagramIcon  style={{padding:'5%',color:"white"}} />
                    <TwitterIcon  style={{padding:'5%',color:"white"}}/>
                    <LinkedInIcon  style={{padding:'5%',color:"white"}}/>
                    <YouTubeIcon  style={{padding:'5%',color:"white"}}/>

                </p>
                <p className={classes.headingStyle}>DOWNLOAD THE APP</p>
                <p className={classes.imgset}><img src='android.webp'/></p>
            </Grid>

        </Grid>
    </div>
    )
}