/**
 * http 共通请求
 */
import axios from 'axios';
export  function post(args){
    if(!args.url){
        return "";
    }

    axios.defaults.headers.common['x-user-id'] = 'JX000';
    axios.defaults.headers.common['x-pagination-index'] = args.curPage?args.curPage-1:0;
    axios.defaults.headers.common['x-pagination-size'] = '15';

    axios({
        method: 'post',
        url: args.url,
        data: args.data
    }).then((res) => {
        args.success(res.data);
        // this.tableData = res.data.userList;
        // this.total = res.data.total;
    }).catch(function (error) {
        args.error(error);
    });
}



