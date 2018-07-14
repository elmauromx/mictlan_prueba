import express from 'express';
let pythonShell = require('python-shell');
//import os from 'os';
//import fs from 'fs';
//import multer from 'multer';

//require('dotenv').config();

//module.exports = router;


export default function(){
  let router = express.Router();
  router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hola\n');
  })
  .get('/get_interfaces_config/:ip', (req, res, next) => {
    try{
      let ip = req.params.ip;
      //let ipRandom = parseInt(Math.floor((Math.random() * 10) + 0));
      //console.log("Random: ", ipRandom);
      let ipFile;
      if(ip==="172.16.35.99"){
        ipFile = "config/SHOWRUNCisco12000";
      }else {
        if (ip==="192.168.54.182") {
          ipFile = "config/SHOWRUNCiscoCRS";
        } else {
          let e = new Error("Device not found...");
          throw e;
        }
      }

      let pathFile = process.env.PYTHON_FOLDER + ipFile;
      var options = {
        mode: 'text',
        pythonPath: process.env.PYTHON_PATH,
        pythonOptions: ['-u'],
        args: [pathFile],
        scriptPath: process.env.PYTHON_FOLDER
      };
      pythonShell.run('PErouter_extractor_interface_description.py', options, function (err, results) {
        if (err) throw err;
      //let resultParse = results[1];

      //console.log("Results: ", results);
      let result = results.toString().replace(/"/g, '');
      result = result.toString().replace(/'/g, '"').replace(/" /g, '"');
      //var resultJSON = JSON.parse(result);
      let resultJSON = JSON.parse(result);
      //console.log("Results JSON ",resultJSON);
      //console.log("jsoncount: ", Object.keys(resultJSON).length);
      let interfacesJSON = {};
      for (var i = 0; i < Object.keys(resultJSON).length; i++) {
        //console.log(i + ": "+resultJSON[i].channelgroup);
        let body = [];

        if(!(resultJSON[i].interface===undefined)){
          body.push("interface " + resultJSON[i].interface);

        }

        if(!(resultJSON[i].description===undefined)){
          body.push("description " + resultJSON[i].description);

        }

        if(!(resultJSON[i].bundle===undefined || resultJSON[i].bundle==="") ){
          body.push("bundle id " + resultJSON[i].bundle);

        }

        if(!(resultJSON[i].channelgroup===undefined || resultJSON[i].channelgroup==="") ){
          body.push("channel-group " + resultJSON[i].channelgroup);

        }

        if(resultJSON[i].shutdown=="true"){
          body.push("shutdown");

        }


        interfacesJSON[i.toString()] = body;
      }
      //console.log("interfacesJSON: ", interfacesJSON);
      //console.log("ip: ", req.params.ip);
      return res.status(200).json(interfacesJSON);
      });





    } catch(err) {
      next(err);
      return res.status(500).json({ success: false,  message : err.message });


    }
  })
  .get('/show_run_config_interface2/:ip', (req, res, next) => {
    try{
      let jsonInterfaces = {
        "0" : [
          "interface Bundle-Ether8",
          "description BB:PE_ME_SWPOPMEX_1_A_PE_ME_COYOACAN_BE_8:0",
          "bfd address-family ipv4 multiplier 3",
          "bfd address-family ipv4 destination 192.168.113.33",
          "bfd address-family ipv4 fast-detect",
          "bfd address-family ipv4 minimum-interval 15",
          "nmtu 9198",
          "ipv4 address 192.168.113.34 255.255.255.252",
          "shutdown",
          "bundle minimum-active links 1",
          "load-interval 30"] ,
        "1" : [
          "interface GigabitEthernet0/0/0/6",
          "description BB:PE_ME_SWPOPMEX_2_A_PE_ME_CANCUN2_GI_0_19:0",
          "bundle id 24 mode on",
          "cdp",
          "load-interval 30",
          "ethernet filtering dot1q"
        ],
        "2": [
          "interface TenGigE0/0/0/0",
          "description BB:PC_MTY01_A_PC_MTY02_TENGI_0_0_0_0:0",
          "bundle id 6465 mode on",
          "cdp",
          "carrier-delay up 500 down 0",
          "load-interval 30"

        ]
      };


      //console.log("ip: ", req.params.ip);
      return res.status(200).json(jsonInterfaces);
    } catch(err) {
      next(err);
      return res.status(500).json({ success: false,  message : err.toString() });
    }
  })
  .get('/get_interfaces_config2/:ip', (req, res, next) => {
    try{
      let ip = req.params.ip;
      //let ipRandom = parseInt(Math.floor((Math.random() * 10) + 0));
      //console.log("Random: ", ipRandom);

      //let pathFile = process.env.PYTHON_FOLDER + ipFile;
      var options = {
        mode: 'text',
        pythonPath: process.env.PYTHON_PATH,
        pythonOptions: ['-u'],
        args: [ip],
        scriptPath: process.env.PYTHON_FOLDER
      };
      pythonShell.run('PErouter_extractor_interface_description.py', options, function (err, results) {
        if (err) throw err;
      //let resultParse = results[1];

      //console.log("Results: ", results);
      let result = results.toString().replace(/"/g, '');
      result = result.toString().replace(/'/g, '"').replace(/" /g, '"');
      //var resultJSON = JSON.parse(result);
      let resultJSON = JSON.parse(result);
      //console.log("Results JSON ",resultJSON);
      //console.log("jsoncount: ", Object.keys(resultJSON).length);
      let interfacesJSON = {};
      for (var i = 0; i < Object.keys(resultJSON).length; i++) {
        //console.log(i + ": "+resultJSON[i].channelgroup);
        let body = [];

        if(!(resultJSON[i].interface===undefined)){
          body.push("interface " + resultJSON[i].interface);

        }

        if(!(resultJSON[i].description===undefined)){
          body.push("description " + resultJSON[i].description);

        }

        if(!(resultJSON[i].bundle===undefined || resultJSON[i].bundle==="") ){
          body.push("bundle id " + resultJSON[i].bundle);

        }

        if(!(resultJSON[i].channelgroup===undefined || resultJSON[i].channelgroup==="") ){
          body.push("channel-group " + resultJSON[i].channelgroup);

        }

        if(resultJSON[i].shutdown=="true"){
          body.push("shutdown");

        }


        interfacesJSON[i.toString()] = body;
      }
      //console.log("interfacesJSON: ", interfacesJSON);
      //console.log("ip: ", req.params.ip);
      return res.status(200).json(interfacesJSON);
      });





    } catch(err) {
      next(err);
      return res.status(500).json({ success: false,  message : err.message });


    }
  })
    .post('/1', (req, res, next) => {
			try {

				console.log(JSON.stringify(req.headers));
				const f = req.file;
        console.log("F: ",f);
				if(!f){
					return res.json({ success: false, message: "File not received" });
				}


        return res.json({ success: true, message:"succesful"});

			} catch (err) {
				console.error("Try-catch Error %s", err);
				console.trace(err);
        next(err);
				return res.json({ success: false,  message : err.message });
			}
		});

  return router;
}
