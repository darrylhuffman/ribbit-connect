const axios = require('axios').default;
const https = require('https');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed' });

    const body = JSON.parse(req.body);
	try {
        const urls = { Development: 'https://dev.ribbit.ai/v4/CONNECT/session', Test: 'https://sandbox.ribbit.ai/v4/CONNECT/session', Production: 'https://prod.ribbit.ai/v4/CONNECT/session'}

        const payload = {
            "token": {
                "clientId": body.clientID,
                "clientSecret": body.clientSecret
            },
            "customer": {
                "firstName": body.firstName,
                "lastName": body.lastName,
                "emailAddress": body.emailAddress,
                "phoneNumber": body.phoneNumber,
                "address": {
                    "addressLine1": body.addressLine1,
                    "city": body.city,
                    "state": body.state,
                    "zip": body.zip
                }
            },
            "terms": {
                "transactionAmount": body.amount,
                "fullAmount": body.fullAmount,
                "loanTerms": body.loanTerms
            },
            "settings": {
            },
            "notificationType": body.notificationType
        };

		const response = (await axios.post(urls[body.environment], payload, {
			headers: { 
				"Content-Type": "application/json",
                'accept-encoding': null
			},
            httpsAgent: new https.Agent({ rejectUnauthorized: false })      
		}));

        if(response.status >= 300) throw(response)

		res.status(200).json(response.data)
  }
	catch(error) {
		res.status(500).json({ error: error.response?.data?.error })
	}
    //res.status(200).json({ name: 'John Doe' })
  }
  