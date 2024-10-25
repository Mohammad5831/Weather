const express = require('express');  
const axios = require('axios');  
const cors = require('cors');  

const app = express();  
const PORT = process.env.PORT || 3000;  
const OPENWEATHER_API_KEY = '20578f31d1a5ddbcf3099290fabc47a3'; 

// Middleware  
app.use(cors());  
app.use(express.json());  


app.get('/weather', async (req, res) => {  
    const city = req.query.city;  

    if (!city) {  
        return res.status(400).send('City is required');  
    }  

    try {  
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {  
            params: {  
                q: city,  
                appid: OPENWEATHER_API_KEY,  
                units: 'metric',  
            }  
        });  

        res.json(response.data);  
        console.log(response.data); 
    } catch (error) {  
        console.error(error);  
        res.status(500).send('Error fetching weather data');  
    }  
});  


// start server 
app.listen(PORT, () => {  
    console.log(`Server is listening on port:${PORT}`);  
});