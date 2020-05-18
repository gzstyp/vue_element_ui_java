/**
 * @作者 田应平
 * @创建时间 2020-05-01 18:21
 * @QQ号码 444141300
 * @官网 http://www.fwtai.com
*/
new Vue({
    fields : {
        name : '',
        gender : '',
        phoneNum : '',
        birthday : ''
    },
    el : '#app',
    data : function(){
        return {
            userInfo : {//表单的输入框的数据及dom(user对象)
                name : '',
                gender : '',
                phoneNum : '',
                birthday : ''
            },
            tableData : [//表格的数据
                {
                    name : '引路者',
                    gender : '1',
                    phoneNum : '13765121695',
                    birthday : '2016-08-06'
                }
            ],
            options: [{
                value : '',
                label : '选择'
            },{
                value : '1',
                label : '男生'
            },{
                value : '2',
                label : '女生'
            }],
            dialogVisible : false, //控制dialog对话框是否显示的
            editObj : {
                name : '',
                gender : '',
                phoneNum : '',
                birthday : ''
            },
            //保留要修改的数据
            userIndex : 0
        }
    },
    methods : {
        fnMessage : function(msg){
            this.$message(msg);
        },
        fnMsgError : function(msg){
            this.$message.error(msg);
        },
        fnMsgSuccess : function(msg){
            this.$message({
                message : msg,
                type : 'success'
            });
        },
        fnConfirm : function(msg,verify,cancel){
            this.$confirm(msg, '系统提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                //center: true
            }).then(() => {
                if(verify){
                    verify();
                }
            }).catch(() => {
                if(cancel){
                    cancel();
                }
            });
        },
        //dialog对话框右上角的关闭之前的操作
        handleClose : function(done) {
            /*有用,不要删除,this.$confirm('确认关闭?')
                .then(_ => {
                    done();
                })
            .catch(_ => {});*/
            this.dialogVisible = false;
        },
        checkFormAdd : function(){
            if(!this.userInfo.name){
                this.fnMsgError('请输入姓名');
                return;
            }
            if(!this.userInfo.gender){
                this.fnMsgError('请选择性别');
                return;
            }
            if(!this.userInfo.phoneNum){
                this.fnMsgError('电话号码不能为空');
                return;
            }
            if(!(/^1[3456789]\d{9}$/.test(this.userInfo.phoneNum))){
                this.fnMsgError('请输入正确的手机号');
                return;
            }
            if(!this.userInfo.birthday){
                this.fnMsgError('请选择生日');
                return;
            }
            return true;
        },
        //添加
        addUser : function(){
            var form = this.checkFormAdd();
            if(!form){
                return;
            }
            this.tableData.push(this.userInfo);
            this.userInfo = { //清空表单
                name : '',
                gender : '',
                phoneNum : '',
                birthday : ''
            }
            this.fnMsgSuccess('添加成功');
        },
        handleEdit : function(index,item){
            this.userIndex = index;
            /*this.editObj.name = item.name;
            this.editObj.gender = item.gender;
            this.editObj.phoneNum = item.phoneNum;
            this.editObj.birthday = item.birthday;*/
            this.editObj = {
                name : item.name,
                gender : item.gender,
                phoneNum : item.phoneNum,
                birthday : item.birthday
            }
            this.dialogVisible = true;
        },
        handleDelete : function(index,row){
            var _this = this;
            this.fnConfirm('删除之后是无法恢复,确认要删除吗?',function(){
                _this.tableData.splice(index,1);
                _this.fnMsgSuccess('删除成功');
            },function(){
                _this.fnMessage('已取消操作');
            });
        },
        checkFormEdit : function(){
            if(!this.editObj.name){
                this.fnMsgError('请输入姓名');
                return;
            }
            if(!this.editObj.gender){
                this.fnMsgError('请选择性别');
                return;
            }
            if(!this.editObj.phoneNum){
                this.fnMsgError('电话号码不能为空');
                return;
            }
            if(!(/^1[3456789]\d{9}$/.test(this.editObj.phoneNum))){
                this.fnMsgError('请输入正确的手机号');
                return;
            }
            if(!this.editObj.birthday){
                this.fnMsgError('请选择生日');
                return;
            }
            return true;
        },
        submitSave : function(){
            var form = this.checkFormEdit();
            if(!form){
                return;
            }
            var _this = this;
            //this.tableData[this.userIndex] = this.editObj;//这种方式不支持响应式的更新数据,没有及时渲染到页面上,没有实现数据双向绑定,是不是响应性的!!!
            //官方示例
            //Vue.set(vm.items, indexOfItem, newValue)//第1个参数是表格的数据,第2个是修改列表的索引值,第3个是编辑后的数据
            Vue.set(_this.tableData,this.userIndex,this.editObj);//第1个参数是表格的数据,第2个是修改列表的索引值,第3个是编辑后的数据,ok
            this.dialogVisible = false;
            this.fnMsgSuccess('操作成功');
        }
    }
});