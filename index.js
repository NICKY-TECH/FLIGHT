const express=require('express');

const flight=[

];



let regexStringForTime=/^[0-9]{1,2}(AM|am|pm|PM)$/;
let regexStringForDate=/^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4,4}$/;
let regexStringForPrice=/^[0-9]{1,}$/;
let regexStringForTitle=/^[a-zA-Z\s]{1,}$/;


const app=express();
app.use(express.json());

app.post('/flights',(req,res)=>{
  let dateTrial=regexStringForDate.test(req.body.date);
  let trial=regexStringForTime.test(req.body.time);
  let priceTest=regexStringForPrice.test(req.body.price);
  let titleTest=regexStringForTitle.test(req.body.title);
    if(req.body.price && req.body.title && req.body.date && req.body.time && trial && dateTrial && priceTest && titleTest){
      const flightObj={
        title:req.body.title,
        time:req.body.time,
        price:req.body.price,
        date:req.body.date

    };
    flight.push(flightObj);
   return  res.status(201).json(
        flightObj
        );
    }else if((!(req.body.price))||(!(req.body.title))||(!(req.body.date))||(!(req.body.time))){
     return  res.status(400).json({
        'message':'all fields are required'
      });
    }else if(!(trial)){
      return  res.status(400).json({
        'message':'invalid time format',
        'info':'expected formats are: 1AM,10am,2pm,13PM'
      });

    }else if(!(dateTrial)){
      return  res.status(400).json({
        'message':'invalid date format',
        'info':'expected format DAY-MONTH-YEAR'
      })
    }else if(!(priceTest)){
      return  res.status(400).json({
        'message':'invalid entry',
        'info':'only numeric values are expected in this field'
      })
    }else if(!(titleTest)){
      return  res.status(400).json({
        'message':'invalid entry',
        'info':'only alphabetic values are expected in this field'
      })
    }
    


})



app.get('/flights',(req,res)=>{
    res.status(200).json(flight);
})



app.get('/flights/:title',(req,res)=>{
  let searchedFlight=flight.find(item=>{
  if(item.title==(req.params.title)){
    return item
  }
})
  if(searchedFlight){
    return res.status(200).json(searchedFlight);
  }else{
    return res.status(404).json({
'message':'no flight with such title'
    })
  }

})

app.patch('/flights/:title',(req,res)=>{
  let dateTrial=regexStringForDate.test(req.body.date);
  let trial=regexStringForTime.test(req.body.time);
  let priceTest=regexStringForPrice.test(req.body.price);
  let titleTest=regexStringForTitle.test(req.body.title);
  let searchedFlightVariable=flight.find(specific=>{
    if(specific.title==req.params.title){
      return specific;
    }
  });

  if(searchedFlightVariable){
 let searchedFlight=flight.indexOf(searchedFlightVariable);
  // flight.splice(searchedFlight,searchedFlight)
  if(req.body && dateTrial && trial && titleTest){
    const updatedFlight=Object.assign(searchedFlightVariable,req.body);
    flight[searchedFlight]=updatedFlight;
    return res.status(201).json({
      'message':'flight details updated successfully',
      'flight':updatedFlight
  });
    }else if((req.body) && (!(dateTrial))){
      return  res.status(400).json({
        'message':'invalid date format',
        'info':'expected format DAY-MONTH-YEAR'
      })

    }else if((req.body) && (!(trial))){
      return  res.status(400).json({
        'message':'invalid time format',
        'info':'expected formats are: 1AM,10am,2pm,13PM'
      });

    }else if((req.body) && (!(priceTest))){
      return  res.status(400).json({
        'message':'invalid entry',
        'info':'only numeric values are expected in this field'
      });

    }else if(!(titleTest)){
      return  res.status(400).json({
        'message':'invalid entry',
        'info':'only alphabetic values are expected in this field'
      })
    }
    else{
      return res.status(401).json({
        'message':'all fields are empty, nothing to update'
      });

    }
    
}else{
  return res.status(404).json({
'message':'no flight with that title exists'
  })
}

})

app.delete('/flights/:title',(req,res)=>{
  let searchedFlightVariable=flight.find(specific=>{
    if(specific.title==req.params.title){
      return specific;
    }
  })

  if(searchedFlightVariable){
 let searchedFlight=flight.indexOf(searchedFlightVariable);
 flight.splice(searchedFlight,searchedFlight);
 res.status(200).json({
  'message':'flight details deleted successfully',
  'deletedFlight':searchedFlightVariable
 })
  }
});


app.use('*',(req,res)=>{
  res.status(400).json({
    'message':'invalid request'
  })
})


app.listen(3000,()=>{
    console.log('server running on port 3000');
})

// for(let i=0;i<flight.length;i++){
//   if(flight[i].title==req.params.title){
//     res.send('wow')
//   }else{
//     console.log('na')
//   }
// }
// })
