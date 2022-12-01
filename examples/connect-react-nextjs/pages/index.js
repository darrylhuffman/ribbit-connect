import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container, Paper, Box, FormControl, TextField, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, InputLabel , Select, MenuItem, RadioGroup , FormControlLabel, Radio, FormLabel, Button, Alert, AlertTitle, CircularProgress   } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';
import { useState } from 'react'
import * as yup from 'yup';
import { useRouter } from 'next/router';

const validationSchema = yup.object({
  clientID: yup.string().required('Client ID is required'),
  clientSecret: yup.string().required('Client Secret is required'),

  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),

  emailAddress: yup.string().email().when('notificationType', { is: '1', then: yup.string().required('Email is required when notification type is set to email')}),
  phoneNumber: yup.string().when('notificationType', { is: '2', then: yup.string().required('Phone number is required when notification type is set to Text Message (SMS)')}),


  amount: yup.number().required('Amount is required'),
  fullAmount: yup.number().required('Full amount is required'),
  loanTerms: yup.string().required('Loan terms is required'),
});


export default function Home() {
  const router = useRouter(),
    [responseError, setResponseError] = useState(null),
    [loading, setLoading] = useState(false);

  
  const handleSubmit = values => {
    setLoading(true)
    fetch('/api/getToken', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    .then(r => r.json())
    .then(r => {
      if(r.sessionToken) return router.push('/CONNECT/' + values.environment + '/' + r.sessionToken);
      else {
        setResponseError(r.error || 'An unhandled error occurred');
        setLoading(false)
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      clientID: '',
      clientSecret: '',
      firstName: Math.random() >= .5 ? 'John' : 'Jane',
      lastName: 'Doe',
      emailAddress: '',
      phoneNumber: '',
      addressLine1: '',
      city: '',
      state: '',
      zip: '',
      amount: 100,
      fullAmount: 100,
      loanTerms: 'monthly_oblig',
      notificationType: 0,
      environment: 'Test'
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>RIBBIT CONNECT in React/Next.js</title>
        <meta name="description" content="A demo website created with React/Next.js showcasing how to request a new CONNECT widget session via the API and also display it to the user." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && (
        <Box
          sx={{ display: 'flex', width: '100%', height: '100%', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
        >
          <CircularProgress sx={{ m: 'auto' }} />
        </Box>
      )}

      <main className={styles.main}>
        <form onSubmit={formik.handleSubmit}>
          <Container maxWidth="lg">
            <Grid container rowSpacing={1}>
              <Grid item md={7} sx={{ '& .textfield-group .MuiTextField-root': { my: 1, mr: 1 }, '& .MuiTextField-root, & .MuiFormControl-root': { my: 1 } }}>
                <Paper>
                  <Box
                    sx={{
                      p: 2
                    }}
                  >
                    <Typography variant='h5' gutterBottom>Application Information</Typography>
                    <Typography variant='body1' gutterBottom>
                     please be sure to use CONNECT credentials and not API credentials. You can find your credentials are available at test.RIBBIT.ai/CONNECT
                    </Typography>
                    <div>
                      <TextField
                        required
                        fullWidth
                        name='clientID'
                        value={formik.values.clientID}
                        onChange={formik.handleChange}
                        error={formik.touched.clientID && Boolean(formik.errors.clientID)}
                        helperText={(formik.touched.clientID || formik.submitCount > 0) && formik.errors.clientID}
                        label="Client ID"
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        fullWidth
                        name='clientSecret'
                        value={formik.values.clientSecret}
                        onChange={formik.handleChange}
                        error={formik.touched.clientSecret && Boolean(formik.errors.clientSecret)}
                        helperText={(formik.touched.clientSecret || formik.submitCount > 0) && formik.errors.clientSecret}
                        label="Client Secret"
                      />
                    </div>
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="env-label" sx={{ background: '#1e1e1e'}}>Environment</InputLabel>
                        <Select
                          required
                          labelId="env-label"
                          name='environment'
                          id="environment"
                          value={formik.values.environment}
                          onChange={formik.handleChange}
                        >
                          <MenuItem value='Development'>Development</MenuItem>
                          <MenuItem value='Test'>Test</MenuItem>
                          <MenuItem value='Production'>Production</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Box>
                </Paper>
                
                <Box sx={{ my: 2 }}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Customer Information</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className='textfield-group'>
                        <TextField
                          required
                          value={formik.values.firstName}
                          name='firstName'
                          onChange={formik.handleChange}
                          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                          helperText={(formik.touched.firstName || formik.submitCount > 0) && formik.errors.firstName}
                          label="First Name"
                        />
                        <TextField
                          required
                          name='lastName'
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                          helperText={(formik.touched.lastName || formik.submitCount > 0) && formik.errors.lastName}
                          label="Last Name"
                        />
                      </div>
                      <div className='textfield-group'>
                        <TextField
                          name='emailAddress'
                          value={formik.values.emailAddress}
                          onChange={formik.handleChange}
                          error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                          helperText={(formik.touched.emailAddress || formik.submitCount > 0) && formik.errors.emailAddress}
                          label="Email address"
                        />
                        <TextField
                          name='phoneNumber'
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={(formik.touched.phoneNumber || formik.submitCount > 0) && formik.errors.phoneNumber}
                          label="Phone number"
                        />
                      </div>
                      <div>
                        <TextField
                          fullWidth
                          name='addressLine1'
                          value={formik.values.addressLine1}
                          onChange={formik.handleChange}
                          error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                          helperText={(formik.touched.addressLine1 || formik.submitCount > 0) && formik.errors.addressLine1}
                          label="Address"
                        />
                      </div>
                      <div className='textfield-group'>
                        <TextField
                          name='city'
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          error={formik.touched.city && Boolean(formik.errors.city)}
                          helperText={(formik.touched.city || formik.submitCount > 0) && formik.errors.city}
                          label="City"
                        />
                        <TextField
                          name='state'
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          error={formik.touched.state && Boolean(formik.errors.state)}
                          helperText={(formik.touched.state || formik.submitCount > 0) && formik.errors.state}
                          label="State"
                        />
                        <TextField
                          name='zip'
                          value={formik.values.zip}
                          onChange={formik.handleChange}
                          error={formik.touched.zip && Boolean(formik.errors.zip)}
                          helperText={(formik.touched.zip || formik.submitCount > 0) && formik.errors.zip}
                          sx={{ width: '19ch'}}
                          label="ZIP"
                        />
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Loan Terms</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <TextField
                          required
                          fullWidth
                          name='amount'
                          value={formik.values.amount}
                          onChange={formik.handleChange}
                          error={formik.touched.amount && Boolean(formik.errors.amount)} 
                          helperText={(formik.touched.amount || formik.submitCount > 0) && Boolean(formik.errors.amount) && formik.touched.amount ? formik.errors.amount : 'This should be the full amount of the debt, or the average full amount for the portfolio'}
                          label="Amount"
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          fullWidth
                          name='fullAmount'
                          value={formik.values.fullAmount}
                          onChange={formik.handleChange}
                          error={formik.touched.fullAmount && Boolean(formik.errors.fullAmount)}
                          helperText={(formik.touched.fullAmount || formik.submitCount > 0) && Boolean(formik.errors.fullAmount) && formik.touched.fullAmount ? formik.errors.fullAmount : 'This should be the full amount of the debt, or the average full amount for the portfolio'}
                          label="Offer Amount"
                        />
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <InputLabel id="loanTerms-label" sx={{ background: '#1e1e1e'}}>Terms / Schedule of repayment *</InputLabel>
                          <Select
                            required
                            labelId="loanTerms-label"
                            name='loanTerms'
                            id="loanTerms"
                            value={formik.values.loanTerms}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value='daily_oblig'>Daily</MenuItem>
                            <MenuItem value='weekly_oblig'>Weekly</MenuItem>
                            <MenuItem value='biweekly_oblig'>Biweekly</MenuItem>
                            <MenuItem value='monthly_oblig'>Monthly</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Notifications</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <FormControl>
                          <FormLabel id="notificationTypeGroup">Select a notification method</FormLabel>
                          <RadioGroup
                            aria-labelledby="notificationTypeGroup"
                            name="notificationType"
                            value={formik.values.notificationType}
                            onChange={formik.handleChange}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="Email" />
                            <FormControlLabel value="2" control={<Radio />} label="Text message (SMS)" />
                            <FormControlLabel value="0" control={<Radio />} label="None" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Box sx={{ display: 'flex' }}>
                    <Button variant="contained" size="large" sx={{ mt: 2 }} type='submit'>
                      Launch CONNECT
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={5} sx={{ p: 5, my: 'auto' }}>
                <Typography variant='h4'>RIBBIT CONNECT</Typography>
                <Typography variant='h5' gutterBottom>Next.js example</Typography>
                <Typography variant='body1' gutterBottom>
                  Please use the following form to initialize a new CONNECT widget session. Please see the README.md for more details.
                </Typography>
                  
                {responseError && <Alert severity='error' sx={{ p: 1, my: 2}}>
                  <AlertTitle sx={{ fontWeight: 'bold' }}>Response Error</AlertTitle>
                  <Typography variant='body1' gutterBottom>{responseError}</Typography>
                </Alert>}

                {(Object.keys(formik.errors).length > 0 && formik.submitCount > 0) &&
                  <Alert severity="warning" sx={{ p: 1, my: 2}}>
                    <AlertTitle sx={{ fontWeight: 'bold' }}>Validation Error</AlertTitle>
                    {Object.keys(formik.errors).map(key => {
                      return <Typography variant='body1' gutterBottom>{formik.errors[key]}</Typography>
                    })}
                  </Alert>
                }
              </Grid>
            </Grid>
          </Container>
        </form>
      </main>
    </div>
  )
}
