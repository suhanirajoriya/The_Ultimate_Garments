import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function FilterComponent() {

    return (
        <div>
            <Accordion sx={{ width: '70%' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography fullWidth>Size</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>   <Button sx={{ color: 'black' }} fullWidth>S</Button></div>
                    <div>    <Button sx={{ color: 'black' }} fullWidth>M</Button></div>
                    <div> <Button sx={{ color: 'black' }} fullWidth>xS</Button></div>
                    <div> <Button sx={{ color: 'black' }} fullWidth>XL</Button></div>
                    <div> <Button sx={{ color: 'black' }} fullWidth>XXL</Button></div>


                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: '70%' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography fullWidth>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <div>  <FormControlLabel value="female" control={<Radio />} /><span style={{ fontSize: '13px' }}>Price : High to Low</span></div>
                        <div>     <FormControlLabel value="male" control={<Radio />} /><span style={{ fontSize: '13px' }}>Price : Low to High</span></div>

                    </RadioGroup>

                </AccordionDetails>
            </Accordion>

        </div >
    );
}
