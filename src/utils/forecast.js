const request=require('request')

const forecast= (latitude,longitude,callback) => { 
const url = 'http://api.weatherstack.com/current?access_key=1b94a9c54f18b08c1f68d5e666493bf7&query=' + latitude + ',' +longitude + '&units=f'
   
        request({url:url, json :true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)

        }else if(body.error) {
            callback('Unable to find location',undefined)

        }else {
            callback(undefined,body.current.weather_descriptions[0] +"It is currently " + body.current.temperature + "degress out.It feels like" + body.current.feelslike +"degrees out.")
        }
    })

}


module.exports=forecast