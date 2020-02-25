var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const server = require('./server')
const request = require('supertest')
const fs = require('fs');

describe('Get Endpoints', () => {
	it('should get student data',  () => {
		const res =  request(router)
			.get('http://localhost:3000/4/propertyName');
            fs.readFile(`data/4.json`,'utf-8', function read(err, data) {
                if (err) {
                    console.log("error",err)
                }
                let data1 = JSON.parse(data)
                res.send(200, response = {'status': 200, 'return': 'Student Data',data : data1});
            });
	});
});

describe('post Endpoints', () => {
	it('should post student data',  () => {
		const res =  request(router)
			.post('http://localhost:3000/');
            let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('')
            let ID = Math.floor(Math.random() * chars.length);
            // let stdData = req.body
            let studentData = {
                id : ID,
                stdData : {
                    name : "testing1",
                    location: "mohali"
                }
            }
            let json = JSON.stringify(studentData);
            // console.log(json,"json")
            fs.writeFile(`data/${studentData.id}.json`, json,function(err,resp){
                if(err){
                  console.log("error",err)
                }
                res.send(200,'Student Data');
            });
	});
});

describe('delete Endpoints', () => {
	it('should delete student data',  () => {
		const res =  request(router)
			.put('http://localhost:3000/49/propertyName');
            let getData = {
                stdData:
            {
                    name:"testing1",
                    location:"mohali"
            }
         }
            fs.readFile(`data/49.json`,'utf-8',  (err, data)=> {
                if (err) {
                    console.log("error",err)
                }
                let data1 = JSON.parse(data)
                let keys =  Object.keys(getData)
                 keys.forEach(item => {
                    delete data1[item]
                })
                     fs.writeFile(`data/49.json`, JSON.stringify(data1),function(err,success){
                    if(err){
                    return false
                    } else {
                       res.send(200, "Student Data Deleted Successfully");
                    }
                });
            });
	});
});

