import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button, TextField } from '@mui/material';


export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function customizedAccordions({ data, handleAddChild, handleDataChange }) {

    return (
        <React.Fragment>
            {data?.map((value, index) => (
                <Accordion key={index}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{ value.name}</Typography>
                        <Button variant="contained" onClick={(e) => handleAddChild(e, value)}>Add Child</Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        {value?.children ?
                            customizedAccordions({data: value?.children, handleAddChild: handleAddChild, handleDataChange: handleDataChange}) :
                            <Box sx={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                                <Typography>
                                    Data
                                </Typography>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={value?.data} onChange={(e) => handleDataChange(e, value)} />
                            </Box>}
                    </AccordionDetails>
                </Accordion>
            ))}
            </React.Fragment>
    );
}