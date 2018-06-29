

const ho = require("../base/httpOutput");
const express = require('express');
const router = express.Router();
const uuid = require("uuid");
var sd = require('silly-datetime');
const md5 = require("md5");

var createModal = 'CREATE TABLE IF NOT EXISTS teamSign(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,'
    + 'personal int,teamname text,username varchar(255),school_num text,phone_num text,email text,department text,'
    + 'username1 varchar(255),school_num1 text,phone_num1 text,email1 text,department1 text,'
    +'username2 varchar(255),school_num2 text,phone_num2 text,email2 text,department2 text,time text,remark text)';

    router.get("/list", (req, res, next) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send("数据库连接失败！");
                console.log("数据库连接失败！");
            } else {
                connection.query('select count(*) count from teamSign', function (err, count) {
                    if (err) {
                        console.log(err);
                        ho(res, ho.status.e500, err);
                    } else {
                        var count=count;
                        var current_page = req.query.current_page;
                         var num = req.query.num;
                        connection.query('select * from teamSign order by id desc limit ' + num + ' offset ' + num * (current_page - 1), function (err, result) {
                            if (err) {
                                console.log(err);
                                ho(res, ho.status.e500, err);
                            } else {
                                ho(res, ho.status.ok, {
                                    result: result,
                                    count: count
                                });
                            }
                            connection.release();
                        });
    
    
                    }
                });
    
    
            }
        });
    });

router.get("/getone", (req, res, next) => {
    var username = req.query.username;
    console.log("查询")

    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
            console.log("数据库连接失败！");
        } else {
            var str='select * from teamSign where school_num='+username+' or school_num1='+username+' or school_num2='+username;
            connection.query(str,
                function (err, result) {
                    if (err) {
                        ho(res, ho.status.e500, err);
                        console.log("查询数据失败")
                    } else {
                        ho(res, ho.status.ok, result);
                        console.log("查询数据成功")
                    }
                    connection.release();
                });
        }
    });
});

router.post("/team_create", (req, res, next) => {
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
        } else {
            connection.query(createModal, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("数据表创建成功");
                }
            });
            connection.query('insert into teamSign set?',
                {
                    personal: 0, teamname: req.body.teamname,username: req.body.username, school_num: req.body.school_num, 
                    phone_num: req.body.phone_num, email: req.body.email, department: req.body.department, 
                    username1: req.body.username1, school_num1: req.body.school_num1, 
                    phone_num1: req.body.phone_num1, email1: req.body.email1, department1: req.body.department1,
                    username2: req.body.username2, school_num2: req.body.school_num2, 
                    phone_num2: req.body.phone_num2, email2: req.body.email2, department2: req.body.department2,
                    remark: req.body.remark,time:time
                },
                function (err, result) {
                    if (err) {
                        ho(res, ho.status.e500, err);
                    } else {
                        ho(res, ho.status.ok);
                        
                    }
                    connection.release();

                });
        }
    });
});
router.post("/personal_create", (req, res, next) => {
    var time=sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
        } else {
            connection.query(createModal, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("数据表创建成功");
                }
            });
            connection.query('insert into teamSign set?',
                {
                    personal: 1,username: req.body.username, school_num: req.body.school_num, 
                    phone_num: req.body.phone_num, email: req.body.email, department: req.body.department, 
                    username1: req.body.username1, school_num1: req.body.school_num1, 
                    phone_num1: req.body.phone_num1, email1: req.body.email1, department1: req.body.department1,
                    username2: req.body.username2, school_num2: req.body.school_num2, 
                    phone_num2: req.body.phone_num2, email2: req.body.email2, department2: req.body.department2,
                    remark: req.body.remark,time:time
                },
                function (err, result) {
                    if (err) {
                        ho(res, ho.status.e500, err);
                    } else {
                        ho(res, ho.status.ok);
                        
                    }
                    connection.release();

                });
        }
    });
});
router.post("/remove", (req, res, next) => {
    var id = req.body.ids;
    console.log(id);
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
            console.log("数据库连接失败！")
        } else {
            var str;
            connection.query( 'delete from teamSign where id in(' +id+')', function (err, result) {
                if (err) {
                    ho(res, ho.status.e500, err);
                    console.log(err)
                } else {
                    ho(res, ho.status.ok, result);
                }
                connection.release();
            });
        }
    });
});


module.exports = router;