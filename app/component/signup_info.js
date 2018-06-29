

const ho = require("../base/httpOutput");
const express = require('express');
const router = express.Router();
const uuid = require("uuid");
const md5 = require("md5");

var createModal = 'CREATE TABLE IF NOT EXISTS signInfo(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,'
    + 'personal int DEFAULT 1 NOT NULL,username varchar(255),teamname text,'
    +'school_num text,phone_num text,email text,department text,remark text)';

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
                str='select count(*) count from signInfo';
                connection.query(str,function (err, count) {
                        if (err) {
                            console.log(err);
                        } else {
                            str='select a.id,a.username from signInfo a order by id desc limit '+num+' offset '+num*(current_page-1);
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
    var id = req.query.id;
    console.log("查询")

    pool.getConnection(function (err, connection) {
        if (err) {
            res.send("数据库连接失败！");
            console.log("数据库连接失败！");
        } else {
            connection.query("select * from signInfo where id=?", id,
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
                } else {
                    console.log("数据表创建成功");
                }
            });
            connection.query('insert into signInfo set?',
                {
                    personal: 1,username: req.body.username,school_num: req.body.school_num, 
                    phone_num: req.body.phone_num, email: req.body.email, department: req.body.department, 
                    remark: req.body.remark
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
            connection.query( 'delete from signInfo where id in(' +id+')', function (err, result) {
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