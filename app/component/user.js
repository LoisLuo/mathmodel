

const ho = require("../base/httpOutput");
const express = require('express');
const router = express.Router();
const uuid = require("uuid");
const md5 = require("md5");

//sign_up 组队为 1 
var createModal = 'CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,'
    + 'username varchar(255),password varchar(255),token text,sign_up int DEFAULT 0 NOT NULL)';

    router.get("/list", (req, res, next) => {
        var current_page=req.query.pageNumber;
        var num=req.query.pageSize;
        pool.getConnection(function (err, connection) {
            if (err) {
                res.send("数据库连接失败！");
                console.log("数据库连接失败！");
            } else {
                connection.query(createModal,function(err,result){
                    if(err){
                        console.log("数据表创建失败")
                   }else{
                    console.log("分类表创建成功");                 
                   }              
                });
                str='select count(*) count from users';
                connection.query(str,function (err, count) {
                        if (err) {
                            console.log(err);
                        } else {
                            str='select a.id,a.username from users a order by id desc limit '+num+' offset '+num*(current_page-1);
                            connection.query(str,function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        ho(res, ho.status.e500, err);
                                    } else {
                                        ho(res, ho.status.ok, {result:result,count:count});
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
            connection.query("select * from users where username=?", username,
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

router.post("/create", (req, res, next) => {
    var password = md5(req.body.password);
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
        } else {
            connection.query(createModal, function (err, result) {
                if (err) {
                    console.log(err)
                    console.log("users创建失败")
                } else {
                    console.log("数据表创建成功");
                }
            });
            connection.query('insert into users set?',
                {
                    username: req.body.username, password: password,token:null,sign_up:0
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

router.post("/update", (req, res, next) => {
    var username = req.body.username;
    var sign_up = req.body.sign_up;
    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
            console.log("数据库连接失败！")
        } else {
            var str='update users set sign_up= '+sign_up+' where username= '+username;
            connection.query(str,function (err, result) {
                if (err) {
                    ho(res, ho.status.e500, err);
                    console.log(err)
                    console.log("更新数据失败")
                } else {
                    ho(res, ho.status.ok, result);
                    console.log("更新数据成功")
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
            connection.query( 'delete from users where id in(' +id+')', function (err, result) {
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