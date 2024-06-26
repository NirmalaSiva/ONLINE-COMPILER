const express = require('express');
const cors = require('cors');

const { generateFile} = require('./generateFile');
const { executeJava} = require('./executeJava');
const { executeCpp} = require('./executeCpp');
const { executePy } = require('./executePy');
const { executeC } = require('./outputs/executeC');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/',(req, res)=>{
  return res.json({hello: "world!"});

});

app.post("/run", async (req, res)=>{

  //console.log(req);
  const language = req.body.language;
  const code = req.body.code;
  console.log(language, code.length);

   if(code === undefined){
    return res.status(400).json({success:false, error:"empty code body!"});
   }
   try{
   // need to generate a c++ file with content from the request
   const filepath = await generateFile(language, code);
   // need to run the file and send the response

   let output;

   console.log(language);
   
   if(language === "cpp"){
    output = await executeCpp(filepath);
   }else if(language === "py"){
    output = await executePy(filepath);
   } else if(language ===  "java"){
    output = await executeJava(filepath);
   }else{
    output = await executeC(filepath);
   }
   return res.json({filepath, output});
  }
  catch(err){
    res.status(500).json({err});
  }
});
app.listen(5000, ()=>{
    console.log('Listening on port 5000!');
});
