const prefix="http://localhost:8080";
const express = require('express');
const cors = require('cors');

const app = express();

// 允许所有域的请求
app.use(cors());

// 或者只允许特定域的请求
// app.use(cors({ origin: 'https://your-frontend-domain.com' }));

// 其他路由和中间件的配置

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

    function search(){
        $("#studentTb").bootstrapTable("destroy");
        loadTable();
    }
    function preAdd(){
        $('#myModal').modal('show');
        $("#id").val(0);//提示新增

        // saveStudent();
    }
    function preStudent(id)
    {
        loadTable();
        $('#myModal').modal('show');
        $.ajax({
            url: "/webapi/student/getId/" + id
        }).done(function(student) {
            // 展示需要修改的信息
            $("#id").val(student.id);
            $("#no").val(student.no);
            $("#name").val(student.name);
            $("#password").val("");
            $("#sex").val(student.sex);
            $("#score").val(student.score);

            // $('#updateStudentMode').modal('show');
            $("#myModal").modal = "show";
        });

    }

    function findByName()
    {
        let name = $("#inputName").val();
        $('#findByNameMode').modal('show');
        $.ajax({
            url: "/webapi/student/getName/" + name
        }).done(function(students){
            $('#findByNameMode').modal('hide');
            $('#findMode').modal('hide');
            let html=" ";
            let len = students.length;
            for(let i = 0;i<len;i++) {
                let rs = students[i];
                html += "<tr>"
                    + "<td>" + rs.id + "</td>"
                    + "<td>" + rs.name + "</td>"
                    + "<td>" + rs.no + "</td>"
                    + "<td>" + rs.score + "</td>"
                    + "<td><a href='#' onclick='preStudent(" + rs.id + ");'>编辑</a></td>"
                    + "</tr>"
                $("#studentTb").html(html);
            }

        })
    }
    function findById()
    {
        let id = $("#inputId").val();
        $('#findByIdMode').modal('show');
        $.ajax({
            url: "/webapi/student/getId/" + id
        }).done(function(rs){
            $('#findByIdMode').modal('hide');
            $('#findMode').modal('hide');

            let html=" ";
            html+="<tr>"
                +"<td>"+rs.id+"</td>"
                +"<td>"+rs.name+"</td>"
                +"<td>"+rs.no+"</td>"
                +"<td>"+rs.score+"</td>"
                +"<td><a href='#' onclick='preStudent("+rs.id+");'>编辑</a></td>"
                +"</tr>"
            $("#studentTb").html(html);

        })
    }
    function findByScore()
    {
        let score = $("#inputScore").val();
        $('#findByScoreMode').modal('show');
        $.ajax({
            url: "/webapi/student/getScore/" + score
        }).done(function(students){
            $('#findByScoreMode').modal('hide');
            $('#findMode').modal('hide');

            let html=" ";
            let len = students.length;
            for(let i = 0;i<len;i++)
            {
                rs = students[i];
                html+="<tr>"
                    +"<td>"+rs.id+"</td>"
                    +"<td>"+rs.name+"</td>"
                    +"<td>"+rs.no+"</td>"
                    +"<td>"+rs.score+"</td>"
                    +"<td><a href='#' onclick='preStudent("+rs.id+");'>编辑</a></td>"
                    +"</tr>"
                $("#studentTb").html(html);
            }
        })
    }
    function loadfindTable(){
        $.ajax({
            url:'/webapi/student/list'
        }).done(function(rs){
            let len=rs.length;
            let html=" ";
            for(let i = 0;i<len;i++){
                let item=rs[i];
                html+="<tr>"
                    +"<td>"+item.id+"</td>"
                    +"<td>"+item.name+"</td>"
                    +"<td>"+item.no+"</td>"
                    +"<td>"+item.score+"</td>"
                    +"</tr>"
            }
            $("#studentTb").html(html);
        })
    }

    function loadDetail()
    {
        $('#detailMode').modal('show');
    }
    function saveStudent() {
        //执行validate方法
        let id = $('#id').val();
        let data = $("#formStudent").serialize();
        // if(id !== 1)
        // {
        //     id = 1;
        // }

        if (id < 1) {
            //新增
            $.ajax({
                url: "/webapi/student/add",
                method: "post",
                data: data
            }).done(function (result) {
                if(result.code>0){
                    console.log(result);
                    window.location.reload();
                }
                else{
                    alert(result.msg);
                    // console.log(result);
                    // // alert("保存不成功")
                }
                // $("#myModal").modal('hide')
                //
                // loadTable();

            });
        } else {
            //更新
            loadTable();
            $.ajax({
                url:"/webapi/student/update",
                method:"put",
                data:data
                // data:{
                //     "id":student.id,
                //     "no":student.no,
                //     "name":student.name,
                //     "password":student.password,
                //     "sex":student.sex,
                //     "score":student.score
                // }
            }).done(function(result){
                if (result > 0) {
                    window.location.reload();
                } else {
                    alert("更新不成功")
                }
                // loadTable();
                // $("#myModal").modal('hide')
            });
        }
    }
    function deleteStudent(id) {
        if (confirm("是否确定删除")) {
            $.ajax({
                url: "/webapi/student/delete/" + id,
                method: "delete",
                success: function (result) {
                    // 删除成功，执行自动刷新操作
                    location.reload();
                    loadTable();
                },
                error: function (xhr) {
                    // 处理错误
                    console.error('删除失败: ' + xhr.statusText);
                }
                // }).done(function(){
                //
                //     loadTable();
                // });
            });
        }
    }
        // $.ajax({
        //     url: '/api/delete-data',
        //     type: 'DELETE',
        //     success: function (result) {
        //         // 删除成功，执行自动刷新操作
        //         location.reload();
        //     },
        //     error: function (xhr) {
        //         // 处理错误
        //         console.error('删除失败: ' + xhr.statusText);
        //     }
        // });

        // function editStudent(id){
        //     $("#myModal").modal('show');
        // }
        // function loadTable() {
        //     $.ajax({
        //         url: "/webapi/student/list"
        //     }).done(function (rs) {
        //         let len = rs.length;
        //         let html = "";
        //         for (let i = 0; i < len; i++) {
        //             let item = rs[i];
        //             html += "<tr>"
        //                 + "<td>" + item.id + "</td>"
        //                 + "<td>" + item.name + "</td>"
        //                 + "<td>" + item.sex + "</td>"
        //                 + "<td>" + item.score + "</td>"
        //                 + "<td><a href='#' onclick='preStudent(" + item.id + ");'>编辑</a>  <a href='#' onclick='deleteStudent(" +
        //                 item.id + ");'>删除</a></td>"
        //                 + "</tr>"
        //         }
        //         $('#studentTb').html(html);
        //     });
        // }
        //表单中操作内容
        function actionFormatter(value, size, index) {
            let result = "";
            result += "<a href='#' onclick='preStudent(" + size.id + ");'>编辑</a> &nbsp<a href='#' onclick='deleteStudent(" + size.id + ");'>删除</a> "
            ;
            return result;
        }

    function loadTable() {
        $('#studentTb').bootstrapTable('destroy');
        $('#studentTb').bootstrapTable({
            url: '/webapi/student/getByPage',
            striped: true, //设置为true会有隔行变色效果
            pagination: true, //设置为true会在底部显示分页条
            singleSelect: false, //设置为true将禁止多选
            pageSize: 10, //如果设c置了分页，每页数据条数
            pageNumber: 1, //如果设置了分页，首页页码
            sidePagination: "server", //设置在哪里进行分页，可选值为"client"或者

            queryParams: function (params) {
                let paraObj = {
                    size: params.limit,
                    page: params.offset / params.limit,
                    sort: "id",
                    direct: "desc",
                    name: $("#searchName").val()
                };

                return paraObj;
            },

            columns: [{
                field: 'id',
                title: '序号'
            }, {
                field: 'name',
                title: '姓名'
            }, {
                field: 'no',
                title: '学号'
            },
                // {
                //     field: 'age',
                //     title: '年龄'
                // }, {
                //     field: 'sex',
                //     title: '性别'
                // },
                {
                    field: 'score',
                    title: '成绩'
                }, {
                    field: 'ID',
                    title: '操作',
                    valign: 'middle',
                    formatter: 'actionFormatter'
                },]
        });
    }

    $(function () {
        // loadTable();
        $("#formStudent").validate({
            submitHandler: saveStudent
        });
        $('#studentTb').bootstrapTable({
            url: '/webapi/student/getByPage',
            striped: true,//隔行变色效果
            pagination: true,//底部显示分页条
            singleSelect: false,//禁止多选
            pageSize: 10,//如果分页，每页条数
            pageNumber: 1,//如果分页，首页页码
            sidePagination: "server",//设置在哪里分页，可选“client”
            queryParams: function (params) {

                let paraObj = {
                    size: params.limit,
                    page: params.offset / params.limit,
                    sort: "id",//options.sort
                    direct: "desc",
                    name: $("#searchName").val()//options.direct
                    // where:whereStr
                };
                /*if(options.listParamsBefore){
                options.listParamsBefore(paraObj);
            }*/
                return paraObj;
            },
            columns: [{
                field: 'id',
                title: '序号'
            }, {
                field: 'name',
                title: '姓名'
            }, {
                field: 'no',
                title: '学号'
            },
                // {
            //     field: 'age',
            //     title: '年龄'
            // }, {
            //     field: 'sex',
            //     title: '性别'
            // },
                {
                field: 'score',
                title: '成绩'
            }, {
                field: 'ID',
                title: '操作',
                valign: 'middle',
                formatter: 'actionFormatter'
            },]

        });
    })
