var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const server = require('../server')
const fs = require('fs');

module.exports = function (router) {

	router.post('/', function (req, res, next) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('')
        let ID = Math.floor(Math.random() * chars.length);
        // let stdData = req.body
        let studentData = {
            id : ID,
            stdData : req.body
        }
        let json = JSON.stringify(studentData);
        console.log(json,"json")
        fs.writeFile(`data/${studentData.id}.json`, json,function(err,success){
            if(err){
            return false
            } else {
               res.send(200, response = {'status': 200, 'return': 'Student Data'});
            }
        });
    });
    
    router.get('/:studentId/propertyName', function (req, res, next) {
        let {studentId} = req.params
        console.log("11111111",studentId)
        fs.readFile(`data/${studentId}.json`,'utf-8', function read(err, data) {
            if (err) {
                console.log("error",err)
            }
            let data1 = JSON.parse(data)
            res.send(200, response = {'status': 200, 'return': 'Student Data',data : data1});
        });
    });
    
    router.put('/:studentId/propertyName', function (req, res, next) {
        let {studentId} = req.params
        let getData = req.body
        fs.readFile(`data/${studentId}.json`,'utf-8', async (err, data)=> {
            if (err) {
                console.log("error",err)
            }
            let data1 = JSON.parse(data)
            //  data2  = data1.delete(getData)
            let keys =  Object.keys(getData)
            await keys.forEach(item => {
                console.log("itemmm",item)
                delete data1[item]
            })
                await fs.writeFile(`data/${studentId}.json`, JSON.stringify(data1),function(err,success){
                if(err){
                return false
                } else {
                   res.send(200, response = {'status': 200, 'return': 'Student Data Deleted Successfully'});
                }
            });
        });
    });
}
