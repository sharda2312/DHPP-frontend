import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Get the form data from the request body
            const formData = req.body;

            // Format the data into the required JSON structure
            const requestData = {
                location: formData.location,
                area: parseFloat(formData.area),
                bath: parseInt(formData.bath),
                bed: parseInt(formData.bed),
                parking: formData.parking === 'yes' ? true : false,
                type: formData.type === 'yes' ? true : false
            };

            // Make a POST request to the prediction API
            const predictionResponse = await fetch('http://51.20.75.87/prediction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!predictionResponse.ok) {
                throw new Error('Failed to fetch prediction data');
            }

            // Parse the response JSON
            const predictionData = await predictionResponse.json();

            // Round off the output number
            const roundedPrediction = Math.round(predictionData);

            // Send the rounded-off prediction as the response
            res.status(200).json({ prediction: roundedPrediction });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
